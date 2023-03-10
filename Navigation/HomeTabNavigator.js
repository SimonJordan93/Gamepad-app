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

import SignInScreen from "../containers/SignInScreen";
import SignUpScreen from "../containers/SignUpScreen";

const Stack = createNativeStackNavigator();
const GamesStack = createNativeStackNavigator();
const PlatformsStack = createNativeStackNavigator();
const GenresStack = createNativeStackNavigator();
const StoresStack = createNativeStackNavigator();
const UserStack = createNativeStackNavigator();

const headerStyle = {
  backgroundColor: "black",
  height: 10,
};

const headerTitleStyle = {
  color: "white",
  fontSize: 12,
};

const UserStackNavigator = ({ setToken }) => (
  <UserStack.Navigator screenOptions={{ headerShown: false }}>
    <UserStack.Screen name="SignIn" options={{ title: "Sign in" }}>
      {(props) => <SignInScreen {...props} setToken={setToken} />}
    </UserStack.Screen>
    <UserStack.Screen name="SignUp" options={{ title: "Sign up" }}>
      {(props) => <SignUpScreen {...props} setToken={setToken} />}
    </UserStack.Screen>
  </UserStack.Navigator>
);

const GamesStackNavigator = ({ userToken }) => (
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
    <GamesStack.Screen name="Game" options={{ title: "" }}>
      {(props) => <GameScreen {...props} userToken={userToken} />}
    </GamesStack.Screen>
  </GamesStack.Navigator>
);

const PlatformsStackNavigator = ({ userToken }) => (
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
    <PlatformsStack.Screen name="PlatformsGame" options={{ title: "" }}>
      {(props) => <PlatformsGameScreen {...props} userToken={userToken} />}
    </PlatformsStack.Screen>
  </PlatformsStack.Navigator>
);

const GenresStackNavigator = ({ userToken }) => (
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
    <GenresStack.Screen name="GenresGame" options={{ title: "" }}>
      {(props) => <GenresGameScreen {...props} userToken={userToken} />}
    </GenresStack.Screen>
  </GenresStack.Navigator>
);

const StoresStackNavigator = ({ userToken }) => (
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
    <StoresStack.Screen name="StoresGame" options={{ title: "" }}>
      {(props) => <StoresGameScreen {...props} userToken={userToken} />}
    </StoresStack.Screen>
  </StoresStack.Navigator>
);

const HomeTabNavigator = ({ setToken, userToken }) => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="GamesStackNavigator">
      {(props) => <GamesStackNavigator {...props} userToken={userToken} />}
    </Stack.Screen>
    <Stack.Screen name="PlatformsStackNavigator">
      {(props) => <PlatformsStackNavigator {...props} userToken={userToken} />}
    </Stack.Screen>
    <Stack.Screen name="GenresStackNavigator">
      {(props) => <GenresStackNavigator {...props} userToken={userToken} />}
    </Stack.Screen>
    <Stack.Screen name="StoresStackNavigator">
      {(props) => <StoresStackNavigator {...props} userToken={userToken} />}
    </Stack.Screen>
    <Stack.Screen name="UserStackNavigator">
      {(props) => <UserStackNavigator {...props} setToken={setToken} />}
    </Stack.Screen>
  </Stack.Navigator>
);

export default HomeTabNavigator;
