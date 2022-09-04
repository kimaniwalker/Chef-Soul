import React from 'react'
import { FlatList, Alert } from 'react-native'
import Loading from '../components/Loading'
import MealsItem from '../components/Meals/MealsItem'
import { useFavoritesContext } from '../context/favorites'
import Container from '../styles/container'
import SubHeading from '../styles/subheading'
import { UseGetFavoritesInfo } from '../utils/useFetchRecipes'
import Colors from '../utils/colors'
import Header from '../components/Header'

export default function FavoritesScreen() {

    const { favorites } = useFavoritesContext()
    const [favData, setFavData] = React.useState<any>([])
    const [isFetching, setIsFetching] = React.useState(false)

    React.useEffect(() => {
        getData()
    }, [favorites])

    async function getData() {
        setIsFetching(true)
        let data = await UseGetFavoritesInfo({ ids: favorites })
        setFavData(data)
        setIsFetching(false)
        if (data.status === 'failure') {
            Alert.alert(
                "Something went wrong",
                data.message,
                [
                    { text: "OK" }
                ]
            );
        }
    }

    if (isFetching) return <Loading />
    if (favData.length < 1) return <Container><SubHeading style={{ color: Colors.error, textAlign: 'center' }}>You don't have any recipes in your favorites. Navigate to the explore screen and find something you like.</SubHeading></Container>
    return (
        <>
            <Header />
            <Container style={{ marginTop: 0, alignItems: 'center' }}>

                <FlatList
                    data={favData}
                    keyExtractor={(item: any) => item.id}
                    numColumns={2}
                    initialNumToRender={5}
                    renderItem={({ item }: any) => (
                        <MealsItem id={item.id} title={item.title} image={item.image} />
                    )}
                />
            </Container>
        </>
    )
}
