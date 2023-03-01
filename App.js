import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Constants from "expo-constants";

import HomeScreen from "./containers/HomeScreen";
import FavoritesScreen from "./containers/FavoritesScreen";
import ProfileScreen from "./containers/ProfileScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "#444",
        tabBarActiveBackgroundColor: "#111",
        tabBarInactiveBackgroundColor: "#111",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Collection"
        component={FavoritesScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profil"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          options={{ headerShown: false }}
          component={MainTabNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
