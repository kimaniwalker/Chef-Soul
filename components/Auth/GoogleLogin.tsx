import React from 'react';
import { Alert, Pressable, StyleSheet, View, Text } from 'react-native';
import Button from '../../styles/button';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { useUserContext } from '../../context/user';
import 'react-native-url-polyfill/auto'
import { supabase } from '../../utils/supabase'
import * as Random from 'expo-random';
import { storeUser } from '../../utils/localStorage';

WebBrowser.maybeCompleteAuthSession();

export default function GoogleLogin() {

    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: '759148329243-idagpibhgc7v3rgdg2dll63iqgnis263.apps.googleusercontent.com',
    });
    const [userInfo, setUserInfo] = React.useState<any>([])
    const { checkUserExist, profileInfo, setUserId, setIsAuthenticated } = useUserContext()

    React.useEffect(() => {
        if (response?.type === 'success') {
            const { authentication } = response;
            if (authentication) {
                storeUser(authentication)
                getInfo(authentication)
            }

        }
    }, [response]);

    async function getInfo(authInfo: any) {
        let url = `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${authInfo.accessToken}`
        try {
            let res = await fetch(url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            })

            let session = await res.json()

            setUserInfo(session)
            let userExist = await checkUserExist(session.email)
            if (userExist) {
                setUserId(userExist.userId)
                setIsAuthenticated(true)
            } else {
                let uuid = Random.getRandomBytes(16).join()
                const { data, error } = await supabase
                    .from('profiles')
                    .insert([
                        { userId: uuid, username: session.email }
                    ])
                setUserId(uuid)
                setIsAuthenticated(true)
                if (error) Alert.alert(error.message)
            }

        } catch (error: any) {
            Alert.alert(error.message)
        }
    }

    return (
        <Button style={{ width: '100%', backgroundColor: '#0F9D58', marginTop: 16 }} disabled={!request} onPress={() => {
            promptAsync();
        }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}><Ionicons name="ios-logo-google" size={18} color="#DB4437" /><Text style={styles.buttonText}>Continue with Google</Text></View></Button>

    )
}


const styles = StyleSheet.create({
    button: {

    },
    buttonPressed: {
        opacity: 0.5
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'montserratBold',
        marginHorizontal: 8
    }
})