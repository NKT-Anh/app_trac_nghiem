import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../Screen/Auth/LoginScreen';
import RegisterScreen from '../Screen/Auth/RegisterScreen';
import ForgotPasswordScreen from '../Screen/Auth/ForgotPasswordScreen';
import VerifyEmailScreen from '../Screen/Auth/VerifyEmailScreen';
import { StyleSheet } from 'react-native';
import HomeScreen from '../Screen/User/HomeScreen';
const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      
    </Stack.Navigator>
  )
}

export default AuthNavigator

const styles = StyleSheet.create({})