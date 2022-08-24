import React from 'react'
import { FlatList, View, StyleSheet } from 'react-native'
import CategoryItem from './CategoryItem'
import Header from '../../components/Header'
import Categories from '../../data/categories.json'


export default function Category({ navigation }: { navigation: any }) {

    function pressHandler(itemData: any) {
        navigation.navigate('Meals', {
            query: itemData.item.name
        })
    }

    React.useLayoutEffect(() => {

    }, []);

    return (
        <>
            <Header />
            <View style={styles.container}>
                <FlatList data={Categories}
                    keyExtractor={(item) => item.id}
                    renderItem={(itemData) => (
                        <CategoryItem
                            title={itemData.item.name}
                            color={itemData.item.categoryColor}
                            onPress={() => pressHandler(itemData)}
                        />
                    )}
                    numColumns={2}

                />

            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }

})
