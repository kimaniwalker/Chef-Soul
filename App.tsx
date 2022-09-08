import React from 'react';
import { useFonts, Montserrat_700Bold } from '@expo-google-fonts/montserrat'
import { NavigationContainer } from '@react-navigation/native';
import { FavoritesWrapper } from './context/favorites';
import { UserWrapper, useUserContext } from './context/user';
import Loading from './components/Loading';
import AuthenticatedRoutes from './utils/AuthenticatedRoutes';
import AuthScreen from './screens/AuthScreen'
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [isReady, setIsReady] = React.useState(false)
  const [expoPushToken, setExpoPushToken] = React.useState('');
  const [notification, setNotification] = React.useState<any>(false);
  const notificationListener = React.useRef<any>();
  const responseListener = React.useRef<any>();

  let [fontsLoaded] = useFonts({
    'montserratBold': Montserrat_700Bold,
  });


  React.useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token!));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
      triggerNotification()
    };
  }, []);


  async function triggerNotification() {
    await schedulePushNotification();
  }


  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "ChefSoul",
        body: 'Choose from thousands of online recipes and find the perfect meal for you and your family',
        sound: 'jingle.wav',
        data: { data: 'goes here' },
      },
      trigger: { seconds: 2 },
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

  const Navigation = () => {
    const { isAuthenticated, profileInfo } = useUserContext()
    return (
      <NavigationContainer>
        {!isAuthenticated && (
          <AuthScreen />
        )}
        {isAuthenticated && profileInfo && (
          <AuthenticatedRoutes />
        )}
      </NavigationContainer>
    )
  }

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <UserWrapper>
      <FavoritesWrapper>
        <Navigation />
      </FavoritesWrapper>
    </UserWrapper>

  )
}
