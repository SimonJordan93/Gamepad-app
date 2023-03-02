import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { NavigationContainer } from "@react-navigation/native";

import GamesScreen from "../containers/GamesScreen";
import PlatformsScreen from "../containers/PlatformsScreen";
import GenresScreen from "../containers/GenresScreen";
import StoresScreen from "../containers/StoresScreen";

const Stack = createNativeStackNavigator();

const HomeTabNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    {/* Games Stack */}
    <Stack.Screen name="Games" component={GamesScreen} />
    {/* Platforms Stack */}
    <Stack.Screen name="Platforms" component={PlatformsScreen} />
    {/* Genres Stack */}
    <Stack.Screen name="Genres" component={GenresScreen} />
    {/* Stores Stack */}
    <Stack.Screen name="Stores" component={StoresScreen} />
  </Stack.Navigator>
);

export default HomeTabNavigator;
