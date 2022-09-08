import React from 'react'
import Container from '../../styles/container'
import Heading from '../../styles/heading'
import SubHeading from '../../styles/subheading'
import { Text, Image, View, ScrollView, StyleSheet, Pressable, Alert, SafeAreaView } from 'react-native'
import Loading from '../Loading'
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../../utils/colors'
import { FontAwesome } from '@expo/vector-icons';
import { useFavoritesContext } from '../../context/favorites'
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function MealInfo({ data, navigation }: any) {

    const { checkIfFavorited, removeItem, addItem, favorites } = useFavoritesContext()
    const isFavorited = checkIfFavorited(data.id)

    const ingredients = data?.extendedIngredients
    const wine_pairing = data?.winepairing
    const instructions = data?.instructions
    const instructionItems = instructions?.replace(/(<([^>]+)>)/gi, "").split(".")
    const summary = data?.summary


    async function handleUpdateFav() {
        try {
            if (isFavorited) {
                removeItem(data.id)
            } else {
                addItem(data.id)
            }
        } catch (error: any) {
            Alert.alert(
                "Something went wrong",
                error.message,
                [
                    { text: "OK", }
                ]
            );
        }
    }

    if (!data) return <Loading />
    return (
        <>
            <StatusBar hidden />
            <Container style={{ backgroundColor: 'white' }}>
                <ScrollView style={{ width: '100%' }}>
                    <Image style={{ width: '100%', height: 350, }} source={{ uri: data.image }} />

                    <View style={styles.heartIcon}>
                        <Pressable
                            android_ripple={{ color: '#fff' }}
                            onPress={handleUpdateFav}
                        >

                            {isFavorited ? (
                                <FontAwesome style={styles.heartIcon} name="heart" size={32} color="red" />
                            ) : (
                                <FontAwesome5 style={styles.heartIcon} name="heart" size={32} color="white" />
                            )}
                        </Pressable>
                    </View>

                    <View style={styles.arrow}>

                        <Pressable onPress={() => navigation.goBack()}>
                            <Ionicons name="ios-arrow-back-sharp" size={32} color="white" />

                        </Pressable>

                    </View>




                    <View style={{ width: '100%', padding: 16 }}>
                        <Heading style={{ textAlign: 'center' }}>{data.title}</Heading>

                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 16 }}>
                            <View style={{ width: 100, alignItems: 'center', marginHorizontal: 8 }}>
                                <FontAwesome5 name="clock" size={24} color={Colors.dark} />
                                <SubHeading style={{ marginTop: 8, color: 'black' }}>{`${data.readyInMinutes} minutes`}</SubHeading>
                            </View>

                            <View style={{ width: 100, alignItems: 'center', marginHorizontal: 8 }}>
                                <MaterialCommunityIcons name="silverware-fork-knife" size={24} color={Colors.dark} />
                                <SubHeading style={{ marginTop: 8, color: 'black' }}>{`${data.servings} servings`}</SubHeading>
                            </View>

                            <View style={{ width: 100, alignItems: 'center', marginHorizontal: 8 }}>
                                <FontAwesome5 name="thumbs-up" size={24} color={Colors.dark} />
                                <SubHeading style={{ marginTop: 8, color: 'black' }}>{`${data.aggregateLikes} likes`}</SubHeading>
                            </View>

                        </View>


                        <SubHeading style={{ marginTop: 16 }}>Summary</SubHeading>
                        <Text>{summary?.replace(/(<([^>]+)>)/gi, "")}</Text>

                        <SubHeading style={{ marginTop: 16 }}>Instructions</SubHeading>
                        {instructionItems && instructionItems.map((item: string, index: number) => (

                            <Text key={index}>{item.trim()}</Text>
                        ))}

                        <SubHeading style={{ marginTop: 16 }}>Ingredients</SubHeading>
                        {ingredients && ingredients.map((element: any) => (

                            <View key={element.id} style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white' }}>
                                <Text style={{ width: 200 }}>{element.original}</Text>
                                <Image style={{ width: 100, height: 100 }} source={{ uri: `https://spoonacular.com/cdn/ingredients_100x100/${element.image}` }} />
                            </View>

                        ))}
                    </View>

                </ScrollView>
            </Container>
        </>
    )
}

const styles = StyleSheet.create({
    heartIcon: {
        position: 'absolute',
        right: 5,
        top: 10,
        margin: 5
    },
    arrow: {
        position: 'absolute',
        left: 10,
        top: 16,
        margin: 5
    }
})
