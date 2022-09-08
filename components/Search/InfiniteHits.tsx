import React from 'react';
import { StyleSheet, View, FlatList, Text, Pressable } from 'react-native';
import Loading from '../Loading';
import { useNavigation } from '@react-navigation/native';


export function InfiniteHits({ isFetching, hits }: any) {
    const navigation: any = useNavigation()

    function pressHandler(id: number, title: string) {
        navigation.navigate('MealsItem', {
            id: id,
            query: title
        })
    }

    if (isFetching) return <Loading />
    return (
        <View style={styles.wrapper}>
            <FlatList
                data={hits}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                onEndReached={() => {

                }}
                renderItem={({ item }: any) => (
                    <View style={styles.item}>
                        <Pressable
                            android_ripple={{ color: '#ccc' }}
                            style={({ pressed }) => [styles.button, pressed ? styles.buttonPressed : null]}
                            onPress={() => pressHandler(item.id, item.title)}
                        >
                            <Text>{item.title}</Text>
                        </Pressable>
                    </View>

                )}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    separator: {
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    item: {
        padding: 18,
        width: '100%',

    },
    wrapper: {

    },
    title: {

    },
    button: {
        flex: 1
    },
    buttonPressed: {
        opacity: 0.5
    },
});