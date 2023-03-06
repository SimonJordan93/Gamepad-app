import React from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";

export default function FilterModal({ visible, onClose }) {
  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.filterModalContainer}>
        {/* Filter inputs */}
        <TextInput style={styles.filterInput} placeholder="Type of game" />
        <TextInput style={styles.filterInput} placeholder="Console" />
        <TextInput style={styles.filterInput} placeholder="Release date" />
        <TextInput style={styles.filterInput} placeholder="Rating" />
        <TextInput style={styles.filterInput} placeholder="Name" />
        {/* Close button */}
        <TouchableOpacity style={styles.filterButton} onPress={onClose}>
          <Text style={styles.filterButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
