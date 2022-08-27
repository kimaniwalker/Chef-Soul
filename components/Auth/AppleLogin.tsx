import * as AppleAuthentication from 'expo-apple-authentication';
import 'react-native-url-polyfill/auto'
import { supabase } from '../../utils/supabase'
import { Alert, Pressable, StyleSheet } from 'react-native';
import { storeUser } from '../../utils/localStorage';


export default function AppleLogin({ setUserId, setIsAuthenticated }: any) {
    return (
        <AppleAuthentication.AppleAuthenticationButton
            buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
            buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
            cornerRadius={48}
            style={{
                width: '100%', height: 50, shadowOffset: { width: 2, height: 2 },
                shadowRadius: 9,
                shadowOpacity: 1,
                elevation: 4,
            }}
            onPress={async () => {
                try {
                    const credential = await AppleAuthentication.signInAsync({
                        requestedScopes: [
                            AppleAuthentication.AppleAuthenticationScope.EMAIL,
                        ],
                    });

                    // signed inq
                    if (credential && credential.email) {
                        const { data, error } = await supabase
                            .from('profiles')
                            .insert([
                                { userId: credential.user, username: credential.email }
                            ])

                        if (error) Alert.alert(error.message)
                    }
                    setUserId(credential.user)
                    storeUser(credential)
                    setIsAuthenticated(true)
                } catch (e: any) {
                    if (e.code === 'ERR_CANCELED') {
                        // handle that the user canceled the sign-in flow
                    } else {
                        // handle other errors
                    }
                }
            }}
        />

    );
}

const styles = StyleSheet.create({
    button: {

    },
    buttonPressed: {
        opacity: 0.5
    },
})