import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Map from "./Map"
import { SafeAreaView } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

export default function BottomTabNav(){
  return (
    <SafeAreaView style={{flex: 1}}>
      <Tab.Navigator>
        <Tab.Screen name="Map" component={Map} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}