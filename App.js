import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import FavoritesScreen from "./containers/FavoritesScreen";
import ProfileScreen from "./containers/ProfileScreen";
import HomeTabNavigator from "./Navigation/HomeTabNavigator";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Options for the main navigator
const mainNavOptions = {
  headerShown: false,
};

// Options for the tab navigator
const tabNavOptions = {
  tabBarActiveTintColor: "red",
  tabBarInactiveTintColor: "#444",
  tabBarActiveBackgroundColor: "#111",
  tabBarInactiveBackgroundColor: "#111",
};

const homeTabOptions = {
  tabBarLabel: "Home",
  headerShown: false,
};

export default function App() {
  return (
    <NavigationContainer>
      {/* Main navigator */}
      <Stack.Navigator screenOptions={mainNavOptions}>
        <Stack.Screen name="Main">
          {/* Tab navigator */}
          {() => (
            <Tab.Navigator screenOptions={tabNavOptions}>
              {/* Home tab */}
              <Tab.Screen
                name="Home"
                component={HomeTabNavigator}
                options={homeTabOptions}
              />

              {/* Collection tab */}
              <Tab.Screen
                name="Collection"
                component={FavoritesScreen}
                options={{ headerShown: false }}
              />

              {/* Profil tab */}
              <Tab.Screen
                name="Profil"
                component={ProfileScreen}
                options={{ headerShown: false }}
              />
            </Tab.Navigator>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
