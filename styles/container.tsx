import React, { ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'

export default function Container({ style, children }: { style?: object, children: ReactNode }) {


    return (
        <>
            <View style={[styles.container, style]}>

                {children}
            </View>
        </>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

})
