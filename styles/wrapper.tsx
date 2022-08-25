import React, { ReactNode } from 'react'
import { View, StyleSheet, ImageBackground } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Colors from '../utils/colors'

export default function Wrapper({ style, children }: { style?: object, children: ReactNode }) {




    return (
        <>
            <View style={[styles.wrapper, style]}>
                <ImageBackground
                    blurRadius={3}
                    style={styles.image}
                    source={require('../assets/foodBg.png')}>
                    <LinearGradient
                        style={{ flex: 1, opacity: .9 }}
                        colors={['transparent', '#F8EDE3', '#FFF2F2', '#F8EDE3', 'transparent']}>
                        <View style={{ padding: 16, flex: 1, opacity: 1 }}>
                            {children}
                        </View>



                    </LinearGradient>
                </ImageBackground>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        width: '100%',
        backgroundColor: Colors.dark

    },
    image: {
        flex: 1,
        backgroundColor: 'white',
        height: '100%'

    }
})
