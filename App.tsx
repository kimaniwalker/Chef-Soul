import React from 'react';
import { useFonts, Montserrat_700Bold } from '@expo-google-fonts/montserrat'
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
