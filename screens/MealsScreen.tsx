import React from 'react'
import { useUserContext } from '../context/user'
import { UseFetchRecipes } from '../utils/useFetchRecipes'
import { Text, Alert } from 'react-native'
import Loading from '../components/Loading'
import { Hits } from '../components/Search/Hits'
import MealsItem from '../components/Meals/MealsItem'
import Container from '../styles/container'

export default function MealsScreen(route: any) {
    const query = route.route.params.query
    const { profileInfo } = useUserContext()
    const [data, setData] = React.useState([])
    const [results, setResults] = React.useState<any>([])
    const [fetching, setFetching] = React.useState(false)


    React.useEffect(() => {
        getData()
    }, [query])



    async function getData() {
        setFetching(true)
        let data = await UseFetchRecipes({
            query: query,
            dietary_needs: profileInfo.dietary_needs,
        })
        setData(data)
        setResults(data.results)
        setFetching(false)
    }

    async function getMoreData() {

        if (results.length < 30) {
            let newdata = await UseFetchRecipes({
                query: query,
                dietary_needs: profileInfo.dietary_needs,
            })
            setResults((currentResults: any) => [...currentResults, ...newdata.results])
        } else {
            Alert.alert('Unable to find more recipes , try again later')
        }


    }

    if (fetching) return <Loading />
    return (
        <>
            <Container>
                <Hits hits={results} getMoreData={getMoreData} fetching={fetching} />
            </Container>
        </>
    )
}
