// App.js
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import UserNameEnter from './screens/UserNameEnter';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName='Login'>
              <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
              <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />
              <Stack.Screen name="Register" options={{headerShown: false}} component={RegisterScreen} />
              <Stack.Screen name="Username" options={{headerShown: false}} component={UserNameEnter} />

          </Stack.Navigator>
      </NavigationContainer>
  );  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;