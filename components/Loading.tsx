import React from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'

export default function Loading() {


    return (
        <>
            <View style={styles.wrapper}>
                <ActivityIndicator size='large' />
            </View>
        </>
    )
}
const styles = StyleSheet.create({

    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16
    }

})


