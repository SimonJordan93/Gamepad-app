import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from "react-native";

import axios from "axios";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

// import { useWindowDimensions } from "react-native";

export default function StoresScreen() {
  const navigation = useNavigation();
  const [stores, setStores] = useState([]);

  // const { height, width } = useWindowDimensions();

  useFocusEffect(
    React.useCallback(() => {
      // alert("Platforms was focused");
      const fetchStores = async () => {
        try {
          const resStores = await axios.get(
            `https://api.rawg.io/api/stores?key=b01f1892725446428389154406012e19`
          );

          setStores(resStores.data.results);
          // console.log(resPlatforms.data.results);
        } catch (error) {
          console.log(error);
        }
      };
      fetchStores();

      return () => {
        // alert("Platforms was unfocused");
        fetchStores;
      };
    }, [])
  );

  return (
    <View>
      <FlatList
        data={stores}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.flatListContainer}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <ImageBackground
              imageStyle={{ borderRadius: 10 }}
              source={{ uri: item.image_background }}
              style={styles.image}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("FilteredStoresGamesScreen", {
                    storeId: item.id,
                  })
                }
              >
                <Text style={styles.storesTitle}>{item.name}</Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flatListContainer: {
    paddingVertical: 30,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#222",
    width: "90%",
    height: "auto", // add this line to adjust the card height based on its content
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: "#222",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    aspectRatio: 16 / 9,
  },
  storesTitle: {
    color: "white",
    fontSize: 50,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
