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

const GenresScreen = () => {
  return (
    <View
      style={{
        marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
      }}
    ></View>
  );
};

export default GenresScreen;
