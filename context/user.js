import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import 'react-native-url-polyfill/auto'
import * as SplashScreen from 'expo-splash-screen';


// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();
const UserContext = createContext();
UserContext.displayName = 'UserContext'

export function UserWrapper({ children }) {

    const user = supabase.auth.user()
    const session = supabase.auth.session()

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
    }, [user, session])

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
            const { data, error, status } = await supabase
                .from("profiles")
                .select()
                .eq("id", user.id)
                .single();
            setProfileInfo(data)
            if (error && status !== 406) {
                throw error;
            }


        } catch (e) {
            // error reading value
            setErr(e.message)
        }
        setIsFetching(false)
    }

    return (
        <UserContext.Provider value={{ user, session, errMsg: err, isFetching, profileInfo, isAuthenticated, setIsAuthenticated }} >
            {children}
        </UserContext.Provider>
    );
}

export function useUserContext() {
    return useContext(UserContext);
}