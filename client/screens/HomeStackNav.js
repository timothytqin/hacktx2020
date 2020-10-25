import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Map from './Map';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text } from 'react-native';
import Theme from '../Theme';
import Logo from '../assets/logo.svg';
import Profile from '../assets/profile.svg';
import { StatusBar } from 'expo-status-bar';

const Stack = createStackNavigator();

const HomeHeader = () => {
  return (
    <View
      style={{
        backgroundColor: Theme.colors.gray5,
        paddingHorizontal: 20,
        paddingVertical: 10,
        paddingTop: 50,
        flexDirection: 'row',
      }}
    >
      <StatusBar style="dark" />
      <Logo />
      <Text
        style={{
          fontWeight: '800',
          color: Theme.colors.gray1,
          fontSize: 25,
          marginLeft: 10,
          marginTop: 5,
        }}
      >
        Refuge
      </Text>
      <Profile style={{ marginLeft: 'auto', marginTop: 5 }} />
    </View>
  );
};

export default function BottomTabNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Map"
        component={Map}
        options={{ header: () => <HomeHeader /> }}
      />
    </Stack.Navigator>
  );
}
