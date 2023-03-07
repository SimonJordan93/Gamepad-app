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
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { useDebounce } from "use-debounce";

import renderPlatforms from "../components/Platforms";
import FilterModal from "../components/FilterModal";

export default function FilterPlatformsGamesScreen({ route }) {
  const navigation = useNavigation();
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [gameSearch, setGameSearch] = useState("");
  const [debouncedGameSearch] = useDebounce(gameSearch, 300);
  const [sortingOption, setSortingOption] = useState("");
  const flatListRef = useRef(null);

  const { height, width } = useWindowDimensions();

  useFocusEffect(
    React.useCallback(() => {
      // alert(" Games was focused");
      const fetchGames = async () => {
        try {
          const resGames = await axios.get(
            `https://api.rawg.io/api/games?key=b01f1892725446428389154406012e19&platforms=${route.params.platformId}&search=${debouncedGameSearch}&page=${page}&ordering=${sortingOption}`
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
    }, [page, debouncedGameSearch, sortingOption])
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

  const handleSortByAToZ = () => {
    setSortingOption("name");
    setFilterModalVisible(false);
    flatListRef.current.scrollToOffset({ offset: 0, animated: false });
  };

  const handleSortByZToA = () => {
    setSortingOption("-name");
    setFilterModalVisible(false);
    flatListRef.current.scrollToOffset({ offset: 0, animated: false });
  };

  const handleSortByEarliest = () => {
    setSortingOption("released");
    setFilterModalVisible(false);
    flatListRef.current.scrollToOffset({ offset: 0, animated: false });
  };

  const handleSortByMostRecent = () => {
    setSortingOption("-released");
    setFilterModalVisible(false);
    flatListRef.current.scrollToOffset({ offset: 0, animated: false });
  };

  const handleSortByHighest = () => {
    setSortingOption("-rating");
    setFilterModalVisible(false);
    flatListRef.current.scrollToOffset({ offset: 0, animated: false });
  };

  const handleSortByLowest = () => {
    setSortingOption("rating");
    setFilterModalVisible(false);
    flatListRef.current.scrollToOffset({ offset: 0, animated: false });
  };

  const handleResetSort = () => {
    setSortingOption("");
    setFilterModalVisible(false);
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
        <TouchableOpacity
          style={styles.filterButton}
          onPress={handleFilterPress}
        >
          <Text style={styles.filterButtonText}>Filters</Text>
        </TouchableOpacity>
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

              {renderPlatforms({ platformdData: item })}
              <View style={styles.cardContent}>
                <Text style={styles.title}>
                  {item.name}{" "}
                  {item.rating > 4 ? "🎯" : item.rating > 3 ? "👍" : ""}
                </Text>

                <View style={styles.ratingBox}>
                  <Text style={styles.ratingScore}>{item.rating}</Text>
                  <Text style={styles.ratingCount}>+ {item.ratings_count}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.showGameButton}
                onPress={() =>
                  navigation.navigate("PlatformsGame", { id: item.id })
                }
              >
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

      <FilterModal
        visible={filterModalVisible}
        onClose={handleFilterClose}
        onSortByAToZ={handleSortByAToZ}
        onSortByZToA={handleSortByZToA}
        onSortByEarliest={handleSortByEarliest}
        onSortByMostRecent={handleSortByMostRecent}
        onSortByHighest={handleSortByHighest}
        onSortByLowest={handleSortByLowest}
        onResetSort={handleResetSort}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBarContainer: {
    paddingVertical: 10,
    backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "space-around",
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
    color: "#FFF",
  },
  ratingScore: {
    fontSize: 16,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 5,
    padding: 5,
    color: "white",
    fontWeight: "bold",
    marginBottom: 5,
  },
  ratingCount: {
    fontSize: 12,
    color: "white",
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
  filterButton: {
    paddingVertical: 10,
    alignItems: "center",
  },
  filterButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
