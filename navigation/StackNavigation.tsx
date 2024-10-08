// navigation/StackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import AlertScreen from '../screens/AlertScreen';
import ActiveShootingScreen from '../screens/ActiveShootingScreen';

const Stack = createStackNavigator();

const StackNavigator = () => (
    <NavigationContainer independent>
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Alert" component={AlertScreen} />
            <Stack.Screen name="ActiveShooting" component={ActiveShootingScreen} />
        </Stack.Navigator>
    </NavigationContainer>
);

export default StackNavigator;