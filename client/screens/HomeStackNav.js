import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Map from './Map';
import { SafeAreaView } from 'react-native-safe-area-context';

const Stack = createStackNavigator();

export default function BottomTabNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Map" component={Map} />
    </Stack.Navigator>
  );
}
