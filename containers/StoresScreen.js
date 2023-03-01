import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Platform,
  TouchableOpacity,
  Pressable,
  TextInput,
  Modal,
} from "react-native";
// import { ActivityIndicator } from "react-native";
import axios from "axios";
import Constants from "expo-constants";
import { useWindowDimensions } from "react-native";
import { useDebounce } from "use-debounce";

import Header from "../components/Header";

import FilterModal from "../components/FilterModal";
const StoresScreen = () => {
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  const handleFilterPress = () => {
    setFilterModalVisible(true);
  };

  const handleFilterClose = () => {
    setFilterModalVisible(false);
  };
  return (
    <SafeAreaView
      style={{
        marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
      }}
    >
      <Header onFilterPress={handleFilterPress} />

      <FilterModal visible={filterModalVisible} onClose={handleFilterClose} />
    </SafeAreaView>
  );
};

export default StoresScreen;
