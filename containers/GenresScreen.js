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

export default function GenresScreen() {
  const navigation = useNavigation();
  const [genres, setGenres] = useState([]);

  // const { height, width } = useWindowDimensions();

  useFocusEffect(
    React.useCallback(() => {
      // alert("Platforms was focused");
      const fetchGenres = async () => {
        try {
          const resGenres = await axios.get(
            `https://api.rawg.io/api/genres?key=b01f1892725446428389154406012e19`
          );

          setGenres(resGenres.data.results);
          // console.log(resPlatforms.data.results);
        } catch (error) {
          console.log(error);
        }
      };
      fetchGenres();

      return () => {
        // alert("Platforms was unfocused");
        fetchGenres;
      };
    }, [])
  );

  return (
    <View>
      <FlatList
        data={genres}
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
                  navigation.navigate("FilteredGenresGamesScreen", {
                    genreId: item.id,
                  })
                }
              >
                <Text style={styles.genresTitle}>{item.name}</Text>
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
  genresTitle: {
    color: "white",
    fontSize: 50,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
