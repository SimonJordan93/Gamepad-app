import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";

export default function Header({ onSearch, onFilterPress }) {
  const navigation = useNavigation();
  const route = useRoute();

  const handleBrowsePress = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerBar}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/adaptive-icon.png")}
            style={styles.logo}
          />
        </View>
        {route.name === "Games" ? (
          <View style={styles.searchBarContainer}>
            <TextInput
              style={styles.searchBarInput}
              onChangeText={onSearch}
              placeholder="Search games"
              placeholderTextColor="#999"
            />
          </View>
        ) : (
          <View style={styles.searchBarContainer}>
            <Text style={styles.searchViewText}>GAMEPAD</Text>
          </View>
        )}
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.browseButtons}>
        <TouchableOpacity
          style={styles.browseBtn}
          activeOpacity={0.6}
          onPress={() => handleBrowsePress("Games")}
        >
          <Text style={styles.browseBtnTitle}>Games</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.browseBtn}
          activeOpacity={0.6}
          onPress={() => handleBrowsePress("Platforms")}
        >
          <Text style={styles.browseBtnTitle}>Platforms</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.browseBtn}
          activeOpacity={0.6}
          onPress={() => handleBrowsePress("Genres")}
        >
          <Text style={styles.browseBtnTitle}>Genres</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.browseBtn}
          activeOpacity={0.6}
          onPress={() => handleBrowsePress("Stores")}
        >
          <Text style={styles.browseBtnTitle}>Stores</Text>
        </TouchableOpacity>
      </View>
      {route.name === "Games" && (
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.filterButton}
          onPress={onFilterPress}
        >
          <Text style={styles.filterButtonText}>Refine Search</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#111",
  },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  searchBarContainer: {
    flex: 1,
    backgroundColor: "#222",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
  },
  searchBarInput: {
    color: "#ccc",
    fontSize: 16,
    fontWeight: "bold",
  },
  searchViewText: {
    color: "#222",
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
  loginButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "red",
    borderRadius: 5,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  browseButtons: {
    flexDirection: "row",
    height: 40,
  },
  browseBtn: {
    flex: 1,
    height: "100%",

    justifyContent: "center",
    alignItems: "center",
  },
  activeBrowseBtn: {
    borderBottomColor: "red",
    borderBottomWidth: 2,
  },
  browseBtnTitle: {
    color: "red",
    fontWeight: "bold",
  },
  filterButton: {
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#111",
  },
  filterButtonText: { color: "red", fontSize: 16, fontWeight: "bold" },
});
