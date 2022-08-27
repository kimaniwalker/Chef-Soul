import React, { useState } from 'react'
import { Alert, StyleSheet, View, TextInput } from 'react-native'
import Container from '../../styles/container'
import Wrapper from '../../styles/wrapper'
import { supabase } from '../../utils/supabase'
import Button from '../../styles/button'
import Heading from '../../styles/heading'
import { useUserContext } from '../../context/user'
import { useNavigation } from '@react-navigation/native';
import { getUser, storeUser } from '../../utils/localStorage'
import AppleLogin from './AppleLogin'
import GoogleLogin from './GoogleLogin'
import Colors from '../../utils/colors'
import * as AppleAuthentication from 'expo-apple-authentication';


export default function Auth({ setIsAuthenticated }: any) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const { isFetching, user, setUserId } = useUserContext()
    const [focused, setFocused] = useState(false)


    React.useEffect(() => {
        checkLogin()
    }, [user])


    async function signInWithEmail() {

        const { user, error } = await supabase.auth.signIn({
            email: email,
            password: password,
        })

        if (user) {
            //await storeUser(user)
            setIsAuthenticated(true)
        }
        if (error) Alert.alert(error.message)

    }


    async function signUpWithEmail() {
        setLoading(true)
        const { user, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        })
        if (!user) Alert.alert('Something went wrong')

        if (user) {
            const { data, error } = await supabase
                .from('profiles')
                .insert([
                    { id: user.id, username: user.email, userId: user.id }
                ])
            if (error) Alert.alert(error.message)
        }
        if (error) Alert.alert(error.message)
        setLoading(false)
    }

    async function checkLogin() {

        try {
            let user = await getUser()
            if (user && user.user) {
                let credentials = await AppleAuthentication.getCredentialStateAsync(user.user)
                if (credentials == 1) {
                    setUserId(user.user)

                }
            }


        } catch (error: any) {
            Alert.alert(error.message)
        }

    }





    return (
        <Wrapper>

            <Container style={styles.container}>

                <Heading style={{ textAlign: 'center', marginBottom: 75 }}>Choose from thousands of online recipes and find the perfect meal for you or your family.</Heading>

                <Container style={{ flex: 0, alignItems: 'flex-start' }}>
                    <AppleLogin setUserId={setUserId} setIsAuthenticated={setIsAuthenticated} />
                    <GoogleLogin />
                </Container>



            </Container>
        </Wrapper>







    )
}

const styles = StyleSheet.create({

    verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: 'stretch',
    },
    mt20: {
        marginTop: 20,
    },
    input: {
        width: '100%',
        borderWidth: 2,
        padding: 16,
        marginVertical: 16
    },
    inputFocused: {
        width: '100%',
        borderWidth: 2,
        padding: 16,
        marginVertical: 16,
        backgroundColor: 'white'
    },
    container: {
        padding: 16,
        flex: 1
    }
})