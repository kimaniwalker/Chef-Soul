
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from './colors';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MealsHeader from '../components/Meals/MealsHeader';
import ExploreScreen from '../screens/ExploreScreen';
import CategoryScreen from '../screens/CategoryScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MealsScreen from '../screens/MealsScreen'
import MealsItem from '../screens/MealsItem';

const AuthenticatedRoutes = () => {
    const Tab = createBottomTabNavigator();

    return (


        <Tab.Navigator
            sceneContainerStyle={{}}
            screenOptions={{
                headerShown: false,
                tabBarStyle: { paddingVertical: 16, height: 95, justifyContent: 'center' },
                tabBarActiveTintColor: Colors.secondary,
                tabBarLabelStyle: { fontFamily: 'montserratBold', fontSize: 12, color: 'black' }

            }}
        >
            <Tab.Screen
                options={{
                    tabBarIcon: ({ }) => (<Ionicons name="ios-star-outline" size={24} color={Colors.dark} />),
                }}

                name="Explore" component={ExploreScreen} />
            <Tab.Screen
                options={{
                    headerShown: false,
                    tabBarIcon: ({ }) => (<MaterialCommunityIcons name="format-list-group" size={24} color={Colors.dark} />),
                }} name="Categories" component={CategoryScreen} />


            <Tab.Screen
                options={{

                    tabBarIcon: ({ }) => (<Ionicons name="heart-outline" size={24} color={Colors.dark} />),
                }} name="Favorites" component={FavoritesScreen} />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ }) => (<Ionicons name="search" size={24} color={Colors.dark} />),
                }} name="Search" component={SearchScreen} />
            <Tab.Screen
                options={{

                    tabBarIcon: ({ }) => (<Ionicons name="ios-settings-outline" size={24} color={Colors.dark} />),
                }} name="Profile" component={ProfileScreen} />

            <Tab.Screen
                options={{
                    tabBarLabel: '',
                    tabBarShowLabel: false,
                    headerShown: true,
                    header: (({ route, navigation }) => (<MealsHeader route={route} navigation={navigation} />)),
                    tabBarIcon: () => null,
                    tabBarStyle: { opacity: 0 },
                    tabBarItemStyle: { position: 'absolute' }
                }} name="Meals" component={MealsScreen} />

            <Tab.Screen
                options={{
                    tabBarLabel: '',
                    tabBarShowLabel: false,
                    headerShown: false,
                    header: (({ route, navigation }) => (<MealsHeader route={route} navigation={navigation} />)),
                    tabBarIcon: () => null,
                    tabBarStyle: { opacity: 0 },
                    tabBarItemStyle: { position: 'absolute' }
                }} name="MealsItem" component={MealsItem} />
        </Tab.Navigator>

    )
}

export default AuthenticatedRoutes