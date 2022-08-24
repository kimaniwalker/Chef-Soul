import React from 'react'
import { View, Text, StyleSheet } from 'react-native'


export default function Heading({ style, children }: { style?: object, children: string }) {


    return (
        <>
            <View >
                <Text style={[styles.heading, style]}>{children}</Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 32,
        fontFamily: 'montserratBold',
        color: 'black',
        marginVertical: 16,
    }
})
