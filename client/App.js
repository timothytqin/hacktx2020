import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/HomeStackNav';

export default function App() {
  return (
    <NavigationContainer>
      <Home />
    </NavigationContainer>
  );
}
