import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";

import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

import { useDebounce } from "use-debounce";

import renderPlatforms from "../components/Platforms";
import FilterModal from "../components/FilterModal";

export default function GamesScreen() {
  // const navigation = useNavigation();
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [gameSearch, setGameSearch] = useState("");
  const [debouncedGameSearch] = useDebounce(gameSearch, 300);
  const flatListRef = useRef(null);

  const { height, width } = useWindowDimensions();

  useFocusEffect(
    React.useCallback(() => {
      // alert(" Games was focused");
      const fetchGames = async () => {
        try {
          const resGames = await axios.get(
            `https://api.rawg.io/api/games?key=b01f1892725446428389154406012e19&search=${debouncedGameSearch}&page=${page}`
          );
          if (page === 1) {
            setGames(resGames.data.results);
          } else {
            setGames((prevGames) => [...prevGames, ...resGames.data.results]);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchGames();

      return () => {
        // alert(" Games was unfocused");
        fetchGames;
      };
    }, [page, debouncedGameSearch])
  );

  const handleEndReached = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleFilterPress = () => {
    setFilterModalVisible(true);
  };

  const handleFilterClose = () => {
    setFilterModalVisible(false);
  };

  const handleTextChange = (text) => {
    setGameSearch(text);
    setPage(1);
    flatListRef.current.scrollToOffset({ offset: 0, animated: false });
  };

  return (
    <View>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBarInput}
          onChangeText={handleTextChange}
          value={gameSearch}
          placeholder="  Search games"
          placeholderTextColor="#999"
        />
      </View>
      {games ? (
        <FlatList
          ref={flatListRef}
          data={games}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.flatListContainer}
          onEndReachedThreshold={0.5}
          onEndReached={handleEndReached}
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
                {item.metacritic && (
                  <View style={styles.metacriticBox}>
                    <Text style={styles.metacriticScore}>
                      {item.metacritic}
                    </Text>
                  </View>
                )}
              </View>
              <TouchableOpacity style={styles.showGameButton}>
                <Text style={styles.showGameButtonText}>
                  See game details →
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <View style={styles.noGames}>
          <Text style={styles.noGamesText}>No Games Found</Text>
        </View>
      )}

      <FilterModal visible={filterModalVisible} onClose={handleFilterClose} />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBarContainer: {
    paddingVertical: 10,
    backgroundColor: "black",
    alignItems: "center",
  },
  searchBarInput: {
    color: "#FFF",
    borderColor: "#FFF",
    borderWidth: 2,
    borderRadius: 5,
    height: 30,
    width: "70%",
  },
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
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardContent: {
    paddingVertical: 10,
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
  showGameButton: {
    width: "50%",
    paddingHorizontal: 8,
    paddingVertical: 5,
    // backgroundColor: "#FFF",
    // borderRadius: 5,
  },
  showGameButtonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  filterModalContainer: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },
  filterInput: {
    backgroundColor: "#111",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    color: "#fff",
  },
  noGames: {
    // flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  noGamesText: {
    color: "white",
    fontSize: 36,
  },
});