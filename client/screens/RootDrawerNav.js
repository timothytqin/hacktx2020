import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import Home from './HomeStackNav';
import Create from './CreateListing';
import Theme from '../Theme';

const Drawer = createDrawerNavigator();

export default function RootDrawerNav() {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        labelStyle: { fontWeight: '800', fontSize: 20 },
        itemStyle: { borderRadius: 20, paddingHorizontal: 10 },
        activeTintColor: Theme.colors.primary,
      }}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Create" component={Create} />
    </Drawer.Navigator>
  );
}
