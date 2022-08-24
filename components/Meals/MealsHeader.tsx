import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import Heading from '../../styles/heading';
import Colors from '../../utils/colors';

export default function MealsHeader({ navigation, route }: any) {

    let query = route.params.query

    return (
        <>

            <View style={{ backgroundColor: Colors.light }}>

                <SafeAreaView>
                    <View style={styles.headerRow}>
                        <View style={{ marginLeft: 16, alignSelf: 'center', flex: 0 }}>
                            <Pressable onPress={() => navigation.goBack()}>
                                <Ionicons name="ios-arrow-back-sharp" size={32} color="black" />

                            </Pressable>

                        </View>
                        <View style={{ justifyContent: 'center', flex: 1, paddingRight: 24 }}>
                            <Heading style={{ fontSize: 24, textAlign: 'center', marginLeft: 8, textTransform: 'uppercase' }}>{query}</Heading>
                        </View>

                    </View>
                </SafeAreaView>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    headerRow: {
        height: 100,
        flexDirection: 'row',
        paddingHorizontal: 16,
        backgroundColor: Colors.light,
        alignItems: 'center',

    },
})
