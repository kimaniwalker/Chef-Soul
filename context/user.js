import { createContext, useContext, useState, useEffect } from 'react';
import 'react-native-url-polyfill/auto'
import { supabase } from '../utils/supabase';
import * as SplashScreen from 'expo-splash-screen';


// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();
const UserContext = createContext();
UserContext.displayName = 'UserContext'

export function UserWrapper({ children }) {

    const user = supabase.auth.user()
    const session = supabase.auth.session()

    const [userId, setUserId] = useState('')
    const [profileInfo, setProfileInfo] = useState([])
    const [isFetching, setIsFetching] = useState()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [err, setErr] = useState("")


    useEffect(() => {
        fetchUser()

        supabase.auth.onAuthStateChange((event, session) => {
            if (event == 'SIGNED_OUT') {
                setIsAuthenticated(false)
            }
            if (event == 'SIGNED_IN') {
                setIsAuthenticated(true)
            }
        })
    }, [user, session, userId, isAuthenticated])

    const fetchUser = async () => {

        try {
            await getProfileData()
            SplashScreen.hideAsync()
        } catch (e) {
            // error reading value
            setErr(e)
        }
    }

    const getProfileData = async () => {
        setIsFetching(true)

        try {
            if (user) {

                const { data, error, status } = await supabase
                    .from("profiles")
                    .select()
                    .eq("id", user.id)
                    .single();
                setProfileInfo(data)
            } else {
                const { data, error, status } = await supabase
                    .from("profiles")
                    .select()
                    .eq("userId", userId)
                    .single();
                setProfileInfo(data)
                if (data) {
                    setIsAuthenticated(true)
                }
            }
            if (error && status !== 406) {
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
        }

    }



    return (
        <UserContext.Provider value={{ user, session, errMsg: err, isFetching, profileInfo, isAuthenticated, setIsAuthenticated, userId, setUserId, checkUserExist }} >
            {children}
        </UserContext.Provider>
    );
}

export function useUserContext() {
    return useContext(UserContext);
}