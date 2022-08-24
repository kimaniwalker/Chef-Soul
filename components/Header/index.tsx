import React from 'react'
import { Image, SafeAreaView, StyleSheet, View } from 'react-native'
import Colors from '../../utils/colors'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Header({ logoOnly }: { logoOnly?: boolean }) {

    const [isFocused, setIsFocused] = React.useState(false)
    const navigation: any = useNavigation()

    function pressHandler() {

        navigation.navigate('Search')
    }

    return (
        <>
            <View style={styles.wrapper}>
                <SafeAreaView>

                    <View style={styles.row}>

                        {logoOnly ? (
                            <Image style={styles.image} source={require('../../assets/logo3.png')} />

                        ) : (<>
                            <Image style={styles.image} source={require('../../assets/logo3.png')} />
                            <Ionicons onPress={pressHandler} style={styles.search} name="search" size={38} color={Colors.secondary} />

                        </>)}


                    </View>
                </SafeAreaView>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        height: 150,
        backgroundColor: Colors.light
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',
        height: '100%',
        padding: 16
    },
    image: {
        width: 85,
        height: 85
    },
    search: {

    }

})