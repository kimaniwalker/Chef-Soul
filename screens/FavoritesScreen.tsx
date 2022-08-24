import React from 'react'
import { FlatList, Alert } from 'react-native'
import Loading from '../components/Loading'
import MealsItem from '../components/Meals/MealsItem'
import { useFavoritesContext } from '../context/favorites'
import { useUserContext } from '../context/user'
import Container from '../styles/container'
import SubHeading from '../styles/subheading'
import { UseGetFavoritesInfo } from '../utils/useFetchRecipes'

export default function FavoritesScreen() {

    const { favorites } = useFavoritesContext()
    const [favData, setFavData] = React.useState<any>([])

    React.useEffect(() => {
        getData()
    }, [favorites])

    async function getData() {
        let data = await UseGetFavoritesInfo({ ids: favorites })
        setFavData(data)

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

    if (!favData) return <Loading />
    return (
        <>
            <Container style={{ marginTop: 60, alignItems: 'flex-start' }}>

                <FlatList
                    data={favData}
                    keyExtractor={(item: any) => item.id}
                    //ItemSeparatorComponent={() => <View style={styles.separator} />}
                    onEndReached={() => {

                    }}
                    numColumns={2}
                    renderItem={({ item }: any) => (
                        <MealsItem id={item.id} title={item.title} image={item.image} />

                    )}
                />
            </Container>
        </>
    )
}
