import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import MealsItem from '../Meals/MealsItem';

export function Hits({ hits, fetching, getMoreData }: { hits: any, fetching?: boolean, getMoreData: () => void }) {


    return (
        <FlatList
            data={hits}
            keyExtractor={(item) => item.id}
            onEndReached={() => {
                getMoreData()
            }}
            onEndReachedThreshold={0.5}
            numColumns={2}
            renderItem={({ item }) => (
                <MealsItem id={item.id} title={item.title} image={item.image} />
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