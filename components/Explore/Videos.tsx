import React from 'react'
import { ScrollView, StyleSheet, View, FlatList } from 'react-native'
import Container from '../../styles/container'
import Heading from '../../styles/heading'
import SubHeading from '../../styles/subheading'
import { UseGetRecipeVideos } from '../../utils/useFetchRecipes'
import VideoItem from './VideoItem'
import Button from '../../styles/button'
import { useNavigation } from '@react-navigation/native';
import Colors from '../../utils/colors'
import Loading from '../../components/Loading'
import { useUserContext } from '../../context/user'


type CategoryItem = {
    youtubeId: string
}
export default function Videos() {
    const { profileInfo } = useUserContext()
    const [data, setData] = React.useState<any>([])
    const [query, setQuery] = React.useState('')
    const [isFetching, setIsFetching] = React.useState(false)
    const currentDate = new Date();
    const navigation: any = useNavigation()

    React.useEffect(() => {
        getTimeOfDay()

        if (query && profileInfo) {
            getData()
        }

    }, [query])


    async function getData() {
        setIsFetching(true)

        let data = await UseGetRecipeVideos({
            query: query,
            type: query,
            diet: profileInfo.diet,
            excludeIngredients: profileInfo.excluded,
            offset: Math.floor(Math.random() * 15)
        })
        setData(data)
        setIsFetching(false)

    }

    function getTimeOfDay() {
        let hour = currentDate.getHours()

        if (hour <= 11) {
            setQuery('breakfast')
        } else if (hour >= 12 && hour <= 4) {
            setQuery('lunch')
        } else {
            setQuery('dinner')
        }
    }


    if (isFetching) return <Loading />
    return (
        <>

            <View style={styles.wrapper}>
                <View style={styles.titleRow}>
                    <Heading style={{ fontSize: 24 }}>Featured Videos</Heading>
                    <Button style={{ width: 100, height: 25, marginTop: 0 }} disabled={true} onPress={() => navigation.navigate('Categories')}>Subscribe</Button>
                </View>

                <View>
                    <ScrollView>
                        <View style={styles.categoryRow}>
                            <FlatList
                                data={data.videos}
                                keyExtractor={(item: any) => item.youTubeId}
                                onEndReached={() => {

                                }}
                                horizontal={true}
                                initialNumToRender={5}
                                renderItem={({ item }) => (
                                    <VideoItem uri={item.youTubeId} />
                                )}
                            />
                        </View>
                    </ScrollView>
                </View>



            </View>


        </>
    )
}

const Category = (item: CategoryItem) => (
    <>
        <View style={styles.categoryWrapper}>
            <View style={styles.categoryItem}>

            </View>


        </View>
    </>

)

const styles = StyleSheet.create({
    wrapper: {

    },
    categoryWrapper: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
    },
    categoryItem: {
        width: 250,
        height: 100,
        borderWidth: 2,
        marginBottom: 12
    },
    categoryRow: {
        flexDirection: 'row'
    },
    titleRow: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 8
    },
    seperator: {
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#ccc',
    }
})
