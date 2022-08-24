import React from 'react'
import { ImageBackground, ScrollView, StyleSheet, View, Platform, Pressable } from 'react-native'
import Button from '../../styles/button'
import Heading from '../../styles/heading'
import SubHeading from '../../styles/subheading'
import CategoryItem from './CategoryItem'
import * as Images from '../../assets'
import { useNavigation } from '@react-navigation/native';



type ItemCategory = {
    id: Number,
    name: string,
    image: any
}

export default function CategoryThumbnail() {

    const CategoryImages = Images
    const navigation: any = useNavigation()


    return (
        <>

            <View style={styles.wrapper}>
                <View style={styles.titleRow}>
                    <Heading style={{ fontSize: 24 }}>Categories</Heading>
                    <Button style={{ width: 100, height: 25, marginTop: 0 }} disabled={true} onPress={() => navigation.navigate('Categories')}>View All</Button>
                </View>

                <View>
                    <ScrollView horizontal={true} >
                        <View style={styles.categoryRow}>
                            <Category name='breakfast' id={102} image={CategoryImages.breakfast} />
                            <Category name='lunch' id={103} image={CategoryImages.lunch} />
                            <Category name='dinner' id={104} image={CategoryImages.dinner} />
                            <Category name='dessert' id={105} image={CategoryImages.desert} />
                            <Category name='drinks' id={106} image={CategoryImages.drink} />
                            <Category name='finger foods' id={107} image={CategoryImages.fingerfood} />
                            <Category name='salad' id={108} image={CategoryImages.salad} />
                            <Category name='sauce' id={109} image={CategoryImages.sauce} />
                            <Category name='salad' id={110} image={CategoryImages.salad} />
                            <Category name='soup' id={111} image={CategoryImages.soup} />
                            <Category name='salad' id={112} image={CategoryImages.appetizer} />
                        </View>
                    </ScrollView>
                </View>

                <View style={styles.seperator}>

                </View>

            </View>


        </>
    )
}

const Category = (item: ItemCategory) => {

    const navigation: any = useNavigation()

    function pressHandler() {
        navigation.navigate('Meals', {
            query: item.name
        })
    }

    return (

        <>
            <View style={styles.categoryWrapper}>
                <Pressable
                    android_ripple={{ color: '#ccc' }}
                    style={({ pressed }) => [styles.button, pressed ? styles.buttonPressed : null]}
                    onPress={pressHandler}
                >
                    <View style={styles.categoryItem}>
                        <ImageBackground style={{ height: '100%' }} source={item.image} />
                    </View>
                </Pressable>

                <SubHeading style={{ textTransform: 'uppercase' }}>{item.name}</SubHeading>

            </View>
        </>

    )
}

const styles = StyleSheet.create({
    wrapper: {
        height: 175,
        marginTop: 50,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryWrapper: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
    },
    categoryItem: {
        width: 100,
        height: 100,
        marginBottom: 12,
        borderRadius: 8,
        borderColor: '#ccc',
        borderWidth: 2,
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
    button: {

    },
    buttonPressed: {
        opacity: 0.5
    },
})
