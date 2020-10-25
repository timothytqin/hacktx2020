import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import Signup from './Signup';
import Setup from './Setup';

const Stack = createStackNavigator();
const AuthStackNav = () => {
  return (
    <Stack.Navigator screenOptions={{ header: () => null }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Setup" component={Setup} />
    </Stack.Navigator>
  );
};

export default AuthStackNav;
