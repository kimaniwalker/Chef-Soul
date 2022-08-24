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


export default function Auth({ setIsAuthenticated }: any) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const { isFetching, user, session } = useUserContext()
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
            await storeUser(user)
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

        if (user) {
            const { data, error } = await supabase
                .from('profiles')
                .insert([
                    { id: user.id, username: user.email }
                ])
            if (error) Alert.alert(error.message)
        }
        if (error) Alert.alert(error.message)
        setLoading(false)
    }

    async function checkLogin() {

        if (user && session) {
            setIsAuthenticated(true)
        }
    }





    return (
        <Wrapper>

            <Container style={styles.container}>
                <Heading style={{ textAlign: 'center', marginBottom: 25 }}>Choose from thousands of online recipes and find the perfect meal for you or your family.</Heading>
                <TextInput
                    onFocus={() => setFocused(true)}
                    style={[!focused ? styles.input : styles.inputFocused]}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    placeholder="email@address.com"
                    autoCapitalize={'none'}
                />


                <TextInput
                    style={[!focused ? styles.input : styles.inputFocused]}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry={true}
                    placeholder="Password"
                    autoCapitalize={'none'}
                />


                <Container style={{ flexDirection: 'row', flex: 0 }}>


                    <Button style={{ width: '50%' }} disabled={isFetching} onPress={() => signInWithEmail()}>Sign In</Button>


                    <Button style={{ width: '50%' }} disabled={isFetching} onPress={() => signUpWithEmail()} >Sign Up</Button>
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