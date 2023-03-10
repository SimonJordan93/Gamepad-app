import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";

import FavoritesScreen from "./containers/FavoritesScreen";
import ProfileScreen from "./containers/ProfileScreen";
import HomeTabNavigator from "./Navigation/HomeTabNavigator";

import Header from "./components/Header";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Options for the main navigator
const mainNavOptions = {
  headerShown: false,
};

// Options for the tab navigator
const tabNavOptions = {
  tabBarActiveTintColor: "white",
  tabBarInactiveTintColor: "#444",
  tabBarActiveBackgroundColor: "#111",
  tabBarInactiveBackgroundColor: "#111",
};

export default function App() {
  // User Token
  const [userToken, setUserToken] = useState(null);

  const setToken = async (token) => {
    if (token) {
      await AsyncStorage.setItem("userToken", token);
      // console.log(token);
    } else {
      await AsyncStorage.removeItem("userToken");
    }

    setUserToken(token);
  };

  const homeTabOptions = {
    header: () => <Header userToken={userToken} setUserToken={setUserToken} />,
  };

  return (
    <NavigationContainer style={{ backgroundColor: "black" }}>
      {/* Main navigator */}
      <Stack.Navigator screenOptions={mainNavOptions}>
        <Stack.Screen name="Main">
          {/* Tab navigator */}
          {() => (
            <Tab.Navigator screenOptions={tabNavOptions}>
              {/* Home tab */}
              <Tab.Screen name="Home" options={homeTabOptions}>
                {(props) => (
                  <HomeTabNavigator
                    {...props}
                    setToken={setToken}
                    userToken={userToken}
                  />
                )}
              </Tab.Screen>

              {/* Collection tab */}
              <Tab.Screen
                name="Favorites"
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
