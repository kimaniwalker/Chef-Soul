import React from 'react'
import { View, Pressable, StyleSheet, Text } from 'react-native'
import Colors from '../utils/colors'

export default function Button({ style, children, onPress, disabled }: { style?: object, children: string, onPress: () => void, disabled: boolean }) {


    return (
        <>
            <View style={[styles.button, style]}>
                <Pressable
                    android_ripple={{ color: '#ccc' }}
                    disabled={disabled}
                    style={({ pressed }) => pressed ? styles.buttonPressed : null}
                    onPress={onPress}>
                    <Text style={styles.buttonText}>{children}</Text>
                </Pressable>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 48,
        marginTop: 50,
        backgroundColor: Colors.dark,
        marginHorizontal: 2

    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'montserratBold'
    },
    buttonPressed: {
        opacity: .75
    },
})
