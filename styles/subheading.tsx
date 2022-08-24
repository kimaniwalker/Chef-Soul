import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Colors from '../utils/colors'

export default function SubHeading({ style, children }: { style?: object, children: string }) {


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
        fontSize: 16,
        fontFamily: 'montserratBold',
        color: Colors.secondary,
        marginBottom: 4
    }
})
