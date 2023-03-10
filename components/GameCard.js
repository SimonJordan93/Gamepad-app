import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Linking,
} from "react-native";

import renderPlatforms from "../components/Platforms";

export default function GameCard({ game }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        {renderPlatforms({ platformdData: game })}
        <View style={styles.ratingAndFavorites}>
          <View style={styles.ratingBox}>
            <Text style={styles.ratingCount}>+ {game.ratings_count}</Text>
            <Text style={styles.rating}>{game.rating}</Text>
          </View>
          <TouchableOpacity style={styles.favoriteButton}>
            <Text style={styles.favoriteButtonText}>♥︎ Add to favorites</Text>
          </TouchableOpacity>
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
            <Text style={[styles.metaValue, styles.link]}>{game.website}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
    marginBottom: 10,
  },
  ratingAndFavorites: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
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
    textAlign: "center",
    padding: 5,
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    backgroundColor: "white",
    borderRadius: 3,
    overflow: "hidden",
  },
  favoriteButton: {
    padding: 5,
    backgroundColor: "white",
    borderRadius: 3,
    overflow: "hidden",
    justifyContent: "center",
  },
  favoriteButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
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
