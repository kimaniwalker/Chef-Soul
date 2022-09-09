import React from 'react'
import { ScrollView, Button } from 'react-native'
import CategoryThumbnail from '../components/Category/CategoryThumbnail'
import Header from '../components/Header'
import Recommended from '../components/Explore/Recommended'
import Videos from '../components/Explore/Videos'
import Loading from '../components/Loading'
import * as Notifications from 'expo-notifications';
import { useUserContext } from '../context/user'
import updateProfileToken from '../utils/useUpdateUser'

type ExploreProps = {

}

export default function ExploreScreen(props: ExploreProps) {

    const [results, setResults] = React.useState<any>("")
    const [isFetching, setIsFetching] = React.useState(false)
    const { profileInfo } = useUserContext()

    React.useEffect(() => {
        registerForPushNotificationsAsync().then(token => {
            if (profileInfo && token && !profileInfo.push_token) {
                updateProfile(token!)
            }
        }).then(() => cancelNotifications());
    }, [])

    async function registerForPushNotificationsAsync() {
        let token;

        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync({
                ios: {
                    allowAlert: true,
                    allowBadge: true,
                    allowSound: true,
                    allowAnnouncements: true,
                },
            });
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        return token;
    }

    async function updateProfile(token: string) {
        await updateProfileToken({
            id: profileInfo.id,
            push_token: token
        })
    }

    async function cancelNotifications() {
        await Notifications.cancelAllScheduledNotificationsAsync();
    }

    if (isFetching) return <Loading />
    return (
        <>
            <Header />
            <ScrollView>
                <CategoryThumbnail />
                <Recommended />
                <Videos />
            </ScrollView>
        </>
    )
}
