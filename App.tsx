import React from 'react';
import { useFonts, Montserrat_700Bold } from '@expo-google-fonts/montserrat'
import { NavigationContainer } from '@react-navigation/native';
import { FavoritesWrapper } from './context/favorites';
import { UserWrapper, useUserContext } from './context/user';
import Loading from './components/Loading';
import AuthenticatedRoutes from './utils/AuthenticatedRoutes';
import AuthScreen from './screens/AuthScreen'
import * as Notifications from 'expo-notifications';
import * as Linking from 'expo-linking';
const prefix = Linking.createURL('/');
const config = {
  screens: {
    Explore: 'Explore',
    Categories: 'Categories',
    Favorites: 'Favorites',
    Search: 'Search',
    Profile: 'Profile',
    Meals: 'Meals',
    MealsItem: 'MealsItem/:id',
  },
};


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const notificationListener = React.useRef<any>();
  const responseListener = React.useRef<any>();


  let [fontsLoaded] = useFonts({
    'montserratBold': Montserrat_700Bold,
  });

  React.useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      if (response.notification.request.content.data.url) {
        const url = response.notification.request.content.data.url;
        Linking.openURL(url as string);
      }

    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);


  const Navigation = () => {
    const { isAuthenticated, profileInfo } = useUserContext()


    const linking = {
      prefixes: [prefix],
      config,
    };

    return (
      <NavigationContainer linking={linking} fallback={<Loading />}>
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
