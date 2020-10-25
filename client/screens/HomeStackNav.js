import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Map from "./Map";
import Profile from "./Profile";
import Listing from "./Listing";
import { SafeAreaView } from "react-native-safe-area-context";

const Stack = createStackNavigator();

export default function BottomTabNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Listing" component={Listing} />
    </Stack.Navigator>
  );
}
