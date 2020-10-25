import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Listing from '../screens/Listing';
import Profile from '../screens/Profile';
import Map from './Map';

const Stack = createStackNavigator();

export default function HomeStackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Map"
        component={Map}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Listing"
        component={Listing}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
