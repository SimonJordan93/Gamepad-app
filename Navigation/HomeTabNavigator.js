import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import GamesScreen from "../containers/GamesScreen";
import PlatformsScreen from "../containers/PlatformsScreen";
import GenresScreen from "../containers/GenresScreen";
import StoresScreen from "../containers/StoresScreen";

const Stack = createNativeStackNavigator();

const HomeTabNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Games">{() => <GamesScreen />}</Stack.Screen>
    <Stack.Screen name="Platforms">{() => <PlatformsScreen />}</Stack.Screen>
    <Stack.Screen name="Genres">{() => <GenresScreen />}</Stack.Screen>
    <Stack.Screen name="Stores">{() => <StoresScreen />}</Stack.Screen>
  </Stack.Navigator>
);

export default HomeTabNavigator;
