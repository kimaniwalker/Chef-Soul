import React from 'react'
import { useUserContext } from '../context/user'
import { UseFetchRecipes } from '../utils/useFetchRecipes'
import { Text } from 'react-native'
import Loading from '../components/Loading'
import { Hits } from '../components/Search/Hits'
import MealsItem from '../components/Meals/MealsItem'

export default function MealsScreen(route: any) {
    const query = route.route.params.query
    const { profileInfo } = useUserContext()
    const [data, setData] = React.useState([])
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
        setFetching(false)
    }

    //if (fetching || !data) return <Loading />
    return (
        <>
            <Hits hits={data} />
        </>
    )
}
