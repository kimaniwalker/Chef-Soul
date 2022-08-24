import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { ReactNode } from 'react';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';




const Tab = createBottomTabNavigator();

export default function Navigator({ children }: { children: ReactNode }) {
    return (


        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen}
                options={{
                    title: "Explore",
                    tabBarIcon: ({ focused, size, color }) => (<AntDesign name="home" size={size} color={color} focused={focused} />),
                    tabBarStyle: { position: 'absolute' },
                    tabBarActiveTintColor: 'black',
                    tabBarLabelStyle: { fontFamily: 'montserratBold' }
                }} />
            <Tab.Screen name="Profile" component={ProfileScreen} />

            <Tab.Screen
                name="Home Page"
                component={HomeScreen}
                options={{
                    title: "Explore",
                    tabBarIcon: ({ focused, size, color }) => (<AntDesign name="home" size={size} color={color} focused={focused} />),
                    tabBarStyle: { position: 'absolute' },
                    tabBarActiveTintColor: 'black',
                    tabBarLabelStyle: { fontFamily: 'montserratBold' }
                }}
            />
            <Tab.Screen
                name="Categories"
                component={HomeScreen}
                options={{
                    title: "Categories",
                    tabBarIcon: ({ }) => (<Ionicons name="ios-menu-sharp" size={24} color="black" />),
                    tabBarStyle: { position: 'absolute' },
                    tabBarActiveTintColor: 'black',
                    tabBarLabelStyle: { fontFamily: 'montserratBold' }
                }}
            />
            <Tab.Screen
                name="Favorites"
                component={HomeScreen}
                options={{
                    title: "Favorites",
                    tabBarIcon: ({ }) => (<FontAwesome5 name="heart" size={24} color="black" />),
                    tabBarStyle: { position: 'absolute' },
                    tabBarActiveTintColor: 'black',
                    tabBarLabelStyle: { fontFamily: 'montserratBold' }
                }}
            />

            <Tab.Screen
                name="Create"
                component={HomeScreen}
                options={{
                    title: "Grocery List",
                    tabBarIcon: ({ }) => (<Ionicons name="ios-list-outline" size={24} color="black" />),
                    tabBarStyle: { position: 'absolute' },
                    tabBarActiveTintColor: 'black',
                    tabBarLabelStyle: { fontFamily: 'montserratBold' }
                }}
            />


        </Tab.Navigator>



    );
}