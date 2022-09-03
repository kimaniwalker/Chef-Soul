import React from 'react'
import { Alert, StyleSheet } from 'react-native'
import Container from '../../styles/container'
import Wrapper from '../../styles/wrapper'
import Heading from '../../styles/heading'
import { useUserContext } from '../../context/user'
import { getUser } from '../../utils/localStorage'
import AppleLogin from './AppleLogin'
import Colors from '../../utils/colors'
import * as AppleAuthentication from 'expo-apple-authentication';


export default function Auth({ setIsAuthenticated }: any) {

    const { isFetching, user, setUserId } = useUserContext()


    React.useEffect(() => {
        checkLogin()
    }, [user])

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
                    {/*  <GoogleLogin /> */}
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