import React from 'react'
import { ScrollView, StyleSheet, View, FlatList, ImageBackground, Platform, Pressable, Alert } from 'react-native'
import { useUserContext } from '../../context/user'
import Heading from '../../styles/heading'
import SubHeading from '../../styles/subheading'
import Colors from '../../utils/colors'
import Button from '../../styles/button'
import { UseFetchRecipes } from '../../utils/useFetchRecipes'
import { useNavigation } from '@react-navigation/native';
import Loading from '../Loading'

type CategoryItem = {
    name: string,
    image: string,
    id: number,
    navigation: any
}

export default function Recommended() {


    const { profileInfo } = useUserContext()
    const [data, setData] = React.useState<any>([])
    const [results, setResults] = React.useState<any>([])
    const [query, setQuery] = React.useState('')
    const [isFetching, setIsFetching] = React.useState(false)
    const [scrollIndex, setScroll] = React.useState(0)
    const currentDate = new Date();
    const navigation: any = useNavigation()

    React.useEffect(() => {
        getTimeOfDay()

        if (profileInfo && query) {
            getData()
            setScroll(0)
        }

    }, [query])


    async function getData() {
        setIsFetching(true)

        let data = await UseFetchRecipes({
            query: query,
            dietary_needs: profileInfo.dietary_needs
        })
        setData(data)
        setResults(data.results)
        setIsFetching(false)

    }

    async function getMoreData() {

        if (results.length < 50) {
            let newdata = await UseFetchRecipes({
                query: query,
                dietary_needs: profileInfo.dietary_needs
            })
            setResults((currentResults: any) => [...currentResults, ...newdata.results])

            setScroll(scrollIndex + 10)
        } else {
            Alert.alert('Unable to find more recipes , try again later')
        }
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
    if (data.status === 'failure' || data.length < 1) return (
        <View style={styles.wrapper}>
            <View style={styles.titleRow}>
                <Heading style={{ fontSize: 24 }}>Recommended</Heading>
                <Button style={{ width: 100, height: 25, marginTop: 0 }} disabled={true} onPress={() => navigation.navigate('Categories')}>View All</Button>
            </View>
            <View style={styles.categoryRow}>

                <SubHeading style={{ padding: 16, color: Colors.error }}>Something wen't wrong. I couldn't find any recipes, i'll try again later</SubHeading>
            </View>
        </View>
    )
    return (
        <>

            <View style={styles.wrapper}>
                <View style={styles.titleRow}>
                    <Heading style={{ fontSize: 24 }}>Recommended</Heading>
                    <Button style={{ width: 100, height: 25, marginTop: 0 }} disabled={false} onPress={() => navigation.navigate('Categories')}>View All</Button>
                </View>

                <View>
                    <ScrollView>
                        <View style={styles.categoryRow}>
                            <FlatList
                                data={results}
                                keyExtractor={(item: any) => item.id}
                                onEndReached={() => {
                                    getMoreData()
                                }}
                                onEndReachedThreshold={0.5}
                                getItemLayout={(data, index) => (
                                    { length: 320, offset: 320 * index, index }
                                )}
                                horizontal={true}
                                initialNumToRender={5}
                                initialScrollIndex={scrollIndex}
                                renderItem={({ item }) => (
                                    <Category name={item.title} image={item.image} id={item.id} navigation={navigation} />
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

    <View style={styles.categoryWrapper}>
        <Pressable
            android_ripple={{ color: '#ccc' }}
            style={({ pressed }) => [styles.button, pressed ? styles.buttonPressed : null]}
            onPress={() => item.navigation.navigate('MealsItem', {
                id: item.id,
                query: item.name
            })}
        >
            <View style={styles.categoryItem}>
                <ImageBackground style={styles.image} source={{ uri: item.image }}>

                    <SubHeading style={styles.title}>{item.name}</SubHeading>

                </ImageBackground>
            </View>
        </Pressable>
    </View>


)

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 50,
    },
    categoryWrapper: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
    },
    categoryItem: {
        width: 312,
        height: 231,
        borderWidth: 2,
        marginBottom: 12,
        borderRadius: 8,
        borderColor: '#ccc',
        elevation: 4,
        shadowColor: 'lightgray',
        shadowOffset: { width: 2, height: 2 },
        shadowRadius: 9,
        shadowOpacity: 1,
        backgroundColor: 'white',
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible'
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
        width: '90%',
        borderBottomWidth: 1,
        borderColor: '#ccc'
    },
    image: {
        flex: 1,
        justifyContent: 'flex-end',
        overflow: 'hidden',

    },
    title: { fontSize: 16, color: 'white', backgroundColor: Colors.primary, padding: 8 },
    button: {

    },
    buttonPressed: {
        opacity: 0.5
    },
})
