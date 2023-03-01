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
import renderPlatforms from "../components/Platforms";
import FilterModal from "../components/FilterModal";

export default function GamesScreen() {
  // const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [gameSearch, setGameSearch] = useState("");
  const [debouncedGameSearch] = useDebounce(gameSearch, 300); // debounce for 500ms

  const { height, width } = useWindowDimensions();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games?key=b01f1892725446428389154406012e19&search=${debouncedGameSearch}&page=${page}`
        );
        if (page === 1) {
          setGames(response.data.results);
        } else {
          setGames((prevGames) => [...prevGames, ...response.data.results]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchGames();
  }, [page, debouncedGameSearch]);

  const handleEndReached = () => {
    setPage((prevPage) => prevPage + 1);
  };

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
      <Header onSearch={setGameSearch} onFilterPress={handleFilterPress} />
      <FlatList
        data={games}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.flatListContainer}
        onEndReachedThreshold={0.5}
        onEndReached={handleEndReached}
        // windowSize={5}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: item.background_image }}
              style={styles.image}
            />
            {renderPlatforms(item)}
            <View style={styles.cardContent}>
              <Text style={styles.title}>
                {item.name}{" "}
                {item.rating > 4 ? "🎯" : item.rating > 3 ? "👍" : ""}
              </Text>
              <View style={styles.metacriticBox}>
                <Text style={styles.metacriticScore}>{item.metacritic}</Text>
              </View>
            </View>
          </View>
        )}
      />
      <FilterModal visible={filterModalVisible} onClose={handleFilterClose} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flatListContainer: {
    paddingVertical: 20,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#222",
    width: "90%",
    height: "auto", // add this line to adjust the card height based on its content
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: "#000",
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
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardContent: {
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    width: "80%",
    fontWeight: "bold",
    color: "#fff",
  },
  metacriticBox: {
    backgroundColor: "limegreen",
    padding: 5,
    borderRadius: 3,
  },
  metacriticScore: {
    color: "white",
    fontWeight: "bold",
  },
  filterModalContainer: {
    flex: 1,
    backgroundColor: "#111",
    padding: 20,
  },
  filterInput: {
    backgroundColor: "#222",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    color: "#fff",
  },
});
