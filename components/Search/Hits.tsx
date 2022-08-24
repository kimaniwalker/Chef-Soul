import React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import MealsItem from '../Meals/MealsItem';

export function Hits({ hits }: any) {


    return (
        <FlatList
            data={hits.results}
            keyExtractor={(item) => item.id}
            //ItemSeparatorComponent={() => <View style={styles.separator} />}
            onEndReached={() => {

            }}
            numColumns={2}
            renderItem={({ item }) => (
                <MealsItem id={item.id} title={item.title} image={item.image} />
                /*  <View style={styles.item}>
                     <Text>{item.title}</Text>
                 </View> */
            )}
        />
    );
};

const styles = StyleSheet.create({
    separator: {
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    item: {
        padding: 18,
    },
});