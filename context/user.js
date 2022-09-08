import { createContext, useContext, useState, useEffect } from 'react';
import 'react-native-url-polyfill/auto'
import { supabase } from '../utils/supabase';
import * as SplashScreen from 'expo-splash-screen';
import { Alert } from 'react-native'


// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();
const UserContext = createContext();
UserContext.displayName = 'UserContext'

export function UserWrapper({ children }) {

    const [userId, setUserId] = useState('')
    const [profileInfo, setProfileInfo] = useState([])
    const [isFetching, setIsFetching] = useState()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [err, setErr] = useState("")


    useEffect(() => {
        fetchUser()
    }, [userId, isAuthenticated])

    const fetchUser = async () => {

        try {
            await getProfileData()
            SplashScreen.hideAsync()
        } catch (e) {
            // error reading value
            setErr(e)
            Alert.alert(e.message)
        }
    }

    const getProfileData = async () => {
        setIsFetching(true)

        try {
            const { data, error, status } = await supabase
                .from("profiles")
                .select()
                .eq("userId", userId)
                .single();
            setProfileInfo(data)
            if (data) {
                setIsAuthenticated(true)
            }
            if (error) {
                throw error;
            }

        } catch (e) {
            // error reading value
            setErr(e.message)

        }
        setIsFetching(false)
    }

    const checkUserExist = async (email) => {
        setIsFetching(true)

        try {
            const { data, error, status } = await supabase
                .from("profiles")
                .select()
                .eq("username", email)
                .single();
            setProfileInfo(data)
            if (error && status !== 406) {
                throw error;
            }
            if (data) {
                setIsFetching(false)
                return data
            } else {
                setIsFetching(false)
                return false
            }


        } catch (e) {
            // error reading value
            setErr(e.message)
            Alert.alert(e.message)
        }

    }



    return (
        <UserContext.Provider value={{ errMsg: err, isFetching, profileInfo, isAuthenticated, setIsAuthenticated, userId, setUserId, checkUserExist }} >
            {children}
        </UserContext.Provider>
    );
}

export function useUserContext() {
    return useContext(UserContext);
}