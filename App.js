// App.js
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import UserNameEnter from './screens/UserNameEnter';
import RentalHouseScreen from './screens/RentalHouseScreen';
import SchoolScreen from './screens/SchoolScreen';
import WorkScreen from './screens/WorkScreen';
import RestaurantScreen from './screens/RestaurantScreen';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName='Login'>
              <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
              <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />
              <Stack.Screen name="Register" options={{headerShown: false}} component={RegisterScreen} />
              <Stack.Screen name="Username" options={{headerShown: false}} component={UserNameEnter} />
              <Stack.Screen name="School" options={{headerShown: false}} component={SchoolScreen} />
              <Stack.Screen name="RentalHouse" options={{headerShown: false}} component={RentalHouseScreen} />
              <Stack.Screen name="Work" options={{headerShown: false}} component={WorkScreen} />
              <Stack.Screen name="Restaurant" options={{headerShown: false}} component={RestaurantScreen} />

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