import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Router from "./screens/BottomTabNav"

export default function App() {
  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  );
}
