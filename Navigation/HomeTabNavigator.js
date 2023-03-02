import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import GamesScreen from "../containers/GamesScreen";
import PlatformsScreen from "../containers/PlatformsScreen";
import GenresScreen from "../containers/GenresScreen";
import StoresScreen from "../containers/StoresScreen";
// import Screen1 from "../containers/Screen1";
// import Screen2 from "../containers/Screen2";

const Stack = createNativeStackNavigator();
const GamesStack = createNativeStackNavigator();
const PlatformsStack = createNativeStackNavigator();
const GenresStack = createNativeStackNavigator();
const StoresStack = createNativeStackNavigator();

const GamesStackNavigator = () => (
  <GamesStack.Navigator screenOptions={{ headerShown: false }}>
    <GamesStack.Screen name="Games" component={GamesScreen} />
    {/* <GamesStack.Screen name="GamesScreen1" component={Screen1} />
    <GamesStack.Screen name="GamesScreen2" component={Screen2} /> */}
  </GamesStack.Navigator>
);

const PlatformsStackNavigator = () => (
  <PlatformsStack.Navigator screenOptions={{ headerShown: false }}>
    <PlatformsStack.Screen name="Platforms" component={PlatformsScreen} />
    {/* <PlatformsStack.Screen name="PlatformsScreen1" component={Screen1} />
    <PlatformsStack.Screen name="PlatformsScreen2" component={Screen2} /> */}
  </PlatformsStack.Navigator>
);

const GenresStackNavigator = () => (
  <GenresStack.Navigator screenOptions={{ headerShown: false }}>
    <GenresStack.Screen name="Genres" component={GenresScreen} />
    {/* <GenresStack.Screen name="GenresScreen1" component={Screen1} />
    <GenresStack.Screen name="GenresScreen2" component={Screen2} /> */}
  </GenresStack.Navigator>
);

const StoresStackNavigator = () => (
  <StoresStack.Navigator screenOptions={{ headerShown: false }}>
    <StoresStack.Screen name="Stores" component={StoresScreen} />
    {/* <StoresStack.Screen name="StoresScreen1" component={Screen1} />
    <StoresStack.Screen name="StoresScreen2" component={Screen2} /> */}
  </StoresStack.Navigator>
);

const HomeTabNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="GamesStackNavigator" component={GamesStackNavigator} />
    <Stack.Screen
      name="PlatformsStackNavigator"
      component={PlatformsStackNavigator}
    />
    <Stack.Screen
      name="GenresStackNavigator"
      component={GenresStackNavigator}
    />
    <Stack.Screen
      name="StoresStackNavigator"
      component={StoresStackNavigator}
    />
  </Stack.Navigator>
);

export default HomeTabNavigator;
