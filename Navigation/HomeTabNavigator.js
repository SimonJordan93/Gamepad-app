import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from "react-native";

import GamesScreen from "../containers/GamesScreen";
import PlatformsScreen from "../containers/PlatformsScreen";
import GenresScreen from "../containers/GenresScreen";
import StoresScreen from "../containers/StoresScreen";

import FilteredPlatformsGamesScreen from "../containers/FilteredPlatformsGamesScreen";
import FilteredGenresGamesScreen from "../containers/FilteredGenresGamesScreen";
import FilteredStoresGamesScreen from "../containers/FilteredStoresGamesScreen";

import GameScreen from "../containers/GameScreen";
import PlatformsGameScreen from "../containers/PlatformsGameScreen";
import GenresGameScreen from "../containers/GenresGameScreen";
import StoresGameScreen from "../containers/StoresGameScreen";

const Stack = createNativeStackNavigator();
const GamesStack = createNativeStackNavigator();
const PlatformsStack = createNativeStackNavigator();
const GenresStack = createNativeStackNavigator();
const StoresStack = createNativeStackNavigator();

const headerStyle = {
  backgroundColor: "black",
  height: 10,
};

const headerTitleStyle = {
  color: "white",
  fontSize: 12,
};

const GamesStackNavigator = () => (
  <GamesStack.Navigator
    screenOptions={{
      headerShown: Platform.OS === "ios" ? true : false,
      headerStyle,
      headerTitleStyle,
    }}
  >
    <GamesStack.Screen
      name="Games"
      component={GamesScreen}
      options={{ title: "Games" }}
    />
    <GamesStack.Screen
      name="Game"
      component={GameScreen}
      options={{ title: "" }}
    />
  </GamesStack.Navigator>
);

const PlatformsStackNavigator = () => (
  <PlatformsStack.Navigator
    screenOptions={{
      headerShown: Platform.OS === "ios" ? true : false,
      headerStyle,
      headerTitleStyle,
    }}
  >
    <PlatformsStack.Screen name="Platforms" component={PlatformsScreen} />
    <PlatformsStack.Screen
      name="FilteredPlatformsGamesScreen"
      component={FilteredPlatformsGamesScreen}
      options={{ title: "" }}
    />
    <PlatformsStack.Screen
      name="PlatformsGame"
      component={PlatformsGameScreen}
      options={{ title: "" }}
    />
  </PlatformsStack.Navigator>
);

const GenresStackNavigator = () => (
  <GenresStack.Navigator
    screenOptions={{
      headerShown: Platform.OS === "ios" ? true : false,
      headerStyle,
      headerTitleStyle,
    }}
  >
    <GenresStack.Screen name="Genres" component={GenresScreen} />
    <GenresStack.Screen
      name="FilteredGenresGamesScreen"
      component={FilteredGenresGamesScreen}
      options={{ title: "" }}
    />
    <GenresStack.Screen
      name="GenresGame"
      component={GenresGameScreen}
      options={{ title: "" }}
    />
  </GenresStack.Navigator>
);

const StoresStackNavigator = () => (
  <StoresStack.Navigator
    screenOptions={{
      headerShown: Platform.OS === "ios" ? true : false,
      headerStyle,
      headerTitleStyle,
    }}
  >
    <StoresStack.Screen name="Stores" component={StoresScreen} />
    <StoresStack.Screen
      name="FilteredStoresGamesScreen"
      component={FilteredStoresGamesScreen}
      options={{ title: "" }}
    />
    <StoresStack.Screen
      name="StoresGame"
      component={StoresGameScreen}
      options={{ title: "" }}
    />
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
