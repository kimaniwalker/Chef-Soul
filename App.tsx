import React from 'react';
import { useFonts, Montserrat_700Bold } from '@expo-google-fonts/montserrat'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { FavoritesWrapper } from './context/favorites';
import { UserWrapper, useUserContext } from './context/user';
import Loading from './components/Loading';
import AuthenticatedRoutes from './utils/AuthenticatedRoutes';
import AuthScreen from './screens/AuthScreen'


export default function App() {

  const [isReady, setIsReady] = React.useState(false)

  let [fontsLoaded] = useFonts({
    'montserratBold': Montserrat_700Bold,
  });

  if (!fontsLoaded) {
    return <Loading />
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


  return (

    <UserWrapper>
      <FavoritesWrapper>
        <Navigation />
      </FavoritesWrapper>
    </UserWrapper>

  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
