import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons'

// Custom Screens
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';
import Marketplace from '../screens/Marketplace';
import Profile from '../screens/ProfileScreen/Profile';
import ViewScreen from '../screens/ViewScreen/ViewScreen';
import GlobalParams from '../components/GlobalParams/GlobalParams';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// To be removed in Phase 4
const Signed = false;

const TabNav = () => {
  console.log('Test')
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={Marketplace} options={{
      tabBarLabel: 'Home',
      tabBarIcon: ({ color, size }) => (
        <MaterialCommunityIcons name="home" color={color} size={size} />
      ),
    }}/>
      <Tab.Screen name="Browse" component={Marketplace} options={{
      tabBarLabel: 'Browse',
      tabBarIcon: ({ color, size }) => (
        <MaterialCommunityIcons name="basket" color={color} size={size} />
      ),
    }}/>
      <Tab.Screen name="Search" component={NewPasswordScreen} options={{
      tabBarLabel: 'Search',
      tabBarIcon: ({ color, size }) => (
        <MaterialCommunityIcons name="compass" color={color} size={size} />
      ),
    }}/>
      <Tab.Screen name="Cart" component={ResetPasswordScreen} options={{
      tabBarLabel: 'Cart',
      tabBarIcon: ({ color, size }) => (
        <MaterialCommunityIcons name="cart" color={color} size={size} />
      ),
    }}/>
      <Tab.Screen name="Settings" component={ResetPasswordScreen} options={{
      tabBarLabel: 'Profile',
      tabBarIcon: ({ color, size }) => (
        <MaterialCommunityIcons name="cog" color={color} size={size} />
      ),
    }}/>
    </Tab.Navigator>
  )
};

const Navigation = () => {
  return (
    <GlobalParams>
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={Signed ? "Marketplace" : "SignIn"}>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
      <Stack.Screen name="Marketplace" component={TabNav} />

      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="View" component={ViewScreen} />
    </Stack.Navigator>
    </GlobalParams>

  )
}

export default Navigation