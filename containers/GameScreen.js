import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

import renderPlatforms from "../components/Platforms";

export default function GameScreen({ route }) {
  const [game, setGame] = useState(null);
  const gameId = route.params.id;

  useFocusEffect(
    React.useCallback(() => {
      const fetchGame = async () => {
        try {
          const resGame = await axios.get(
            `https://api.rawg.io/api/games/${gameId}?key=b01f1892725446428389154406012e19`
          );
          setGame(resGame.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchGame();

      return () => {
        fetchGame;
      };
    }, [gameId])
  );

  if (!game) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFF" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={{ uri: game.background_image }}
        style={styles.image}
      >
        <Text style={styles.title}>{game.name}</Text>
      </ImageBackground>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          {renderPlatforms({ platformdData: game })}
          <View style={styles.ratingBox}>
            <Text style={styles.ratingCount}>+ {game.ratings_count}</Text>
            <Text style={styles.rating}>{game.rating}</Text>
          </View>
        </View>

        {game.description_raw && (
          <Text style={styles.description}>{game.description_raw}</Text>
        )}

        {game.metacritic && (
          <View style={styles.metaContainer}>
            <Text style={styles.metaLabel}>Metacritic Score:</Text>
            <Text style={styles.metaValue}>{game.metacritic}</Text>
          </View>
        )}

        {game.released && (
          <View style={styles.metaContainer}>
            <Text style={styles.metaLabel}>Release Date:</Text>
            <Text style={styles.metaValue}>{game.released}</Text>
          </View>
        )}

        {game.publishers &&
          game.publishers.length > 0 &&
          game.publishers[0].name && (
            <View style={styles.metaContainer}>
              <Text style={styles.metaLabel}>Publishers:</Text>
              <Text style={styles.metaValue}>{game.publishers[0].name}</Text>
            </View>
          )}

        {game.genres && (
          <View style={styles.metaContainer}>
            <Text style={styles.metaLabel}>Genres:</Text>
            {game.genres.map((genre) => {
              return (
                <Text key={genre.id} style={styles.metaValue}>
                  {genre.name}
                </Text>
              );
            })}
          </View>
        )}

        {game.website && (
          <View style={styles.metaContainer}>
            <Text style={styles.metaLabel}>Website:</Text>
            <TouchableOpacity onPress={() => Linking.openURL(game.website)}>
              <Text style={[styles.metaValue, styles.link]}>
                {game.website}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    // flex: 1,
    aspectRatio: 16 / 9,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#FFF",
    shadowColor: "#333",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 30,
  },
  card: {
    backgroundColor: "#000",
    padding: 20,
    shadowColor: "#333",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  cardHeader: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    // alignItems: "center",
    marginBottom: 10,
  },
  ratingBox: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  ratingCount: {
    padding: 5,
    fontSize: 18,
    color: "#fff",
    marginRight: 10,
  },
  rating: {
    marginTop: 10,
    textAlign: "center",
    padding: 5,
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    backgroundColor: "white",
    borderRadius: 3,
    overflow: "hidden",
  },
  description: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 10,
  },
  metaContainer: {
    flexDirection: "row",
    marginBottom: 5,
  },
  metaLabel: {
    color: "#999",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
  },
  metaValue: {
    color: "#fff",
    fontSize: 16,
    marginRight: 5,
  },
  link: {
    textDecorationLine: "underline",
  },
});
