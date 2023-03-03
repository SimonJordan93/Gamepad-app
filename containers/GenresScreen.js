import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";

import axios from "axios";

// import { useWindowDimensions } from "react-native";

export default function GenresScreen() {
  const [genres, setGenres] = useState([]);

  // const { height, width } = useWindowDimensions();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games?key=b01f1892725446428389154406012e19`
        );

        setGenres(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGenres();
  }, []);

  return (
    <View>
      <FlatList
        data={genres}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.flatListContainer}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: item.background_image }}
              style={styles.image}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flatListContainer: {
    paddingBottom: 50,
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
    flex: 1,
    aspectRatio: 16 / 9,
    borderRadius: 10,
  },
});
