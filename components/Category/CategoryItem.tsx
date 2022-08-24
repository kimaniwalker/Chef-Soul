import React from 'react'
import { View, Pressable, Text, StyleSheet, Platform } from 'react-native'

export default function CategoryItem({ title, color, onPress }: { title: string, color: string, onPress: () => void }) {


    return (
        <>
            <View style={styles.gridItem}>
                <Pressable
                    android_ripple={{ color: '#ccc' }}
                    style={({ pressed }) => [styles.button, pressed ? styles.buttonPressed : null]}
                    onPress={onPress}
                >
                    <View style={[styles.innerContainer, { backgroundColor: color }]}>
                        <Text style={styles.title}>{title}</Text>
                    </View>
                </Pressable>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 16,
        height: 150,
        borderRadius: 8,
        borderWidth: 3,
        elevation: 4,
        shadowColor: 'lightgray',
        shadowOffset: { width: 2, height: 2 },
        shadowRadius: 9,
        shadowOpacity: 1,
        backgroundColor: 'white',
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible'
    },
    button: {
        flex: 1
    },
    buttonPressed: {
        opacity: 0.5
    },
    innerContainer: {
        flex: 1,
        padding: 16,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontFamily: 'montserratBold',
        fontSize: 18
    }
})
