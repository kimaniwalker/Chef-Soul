import React from 'react'
import { ScrollView, Button } from 'react-native'
import CategoryThumbnail from '../components/Category/CategoryThumbnail'
import Header from '../components/Header'
import Recommended from '../components/Explore/Recommended'
import Videos from '../components/Explore/Videos'
import * as Notifications from 'expo-notifications';
import Loading from '../components/Loading'
import Search from '../components/Search/Index'


type ExploreProps = {

}

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});


export default function ExploreScreen(props: ExploreProps) {
    const [expoPushToken, setExpoPushToken] = React.useState('');
    const [notification, setNotification] = React.useState<any>(false);
    const notificationListener = React.useRef<any>();
    const responseListener = React.useRef<any>();
    const [results, setResults] = React.useState<any>("")
    const [isFetching, setIsFetching] = React.useState(false)
    const [count, setCount] = React.useState(0)
    const [isSearching, setIsSearching] = React.useState(false)



    React.useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token!));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });
        triggerNotification()

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);


    async function triggerNotification() {
        if (count <= 0) {
            await schedulePushNotification();
            setCount(count + 1)
        }
    }




    async function schedulePushNotification() {


        await Notifications.scheduleNotificationAsync({
            content: {
                title: "ChefSoul",
                body: 'Choose from thousands of online recipes and find the perfect meal for you and your family',
                sound: 'jingle.wav',
                data: { data: 'goes here' },
            },
            trigger: { seconds: 86400, repeats: true },
        });
    }

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
