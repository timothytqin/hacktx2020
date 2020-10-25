import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import Home from './HomeStackNav';
import Create from './CreateListing';

const Drawer = createDrawerNavigator();

export default function RootDrawerNav() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Create" component={Create} />
    </Drawer.Navigator>
  );
}
