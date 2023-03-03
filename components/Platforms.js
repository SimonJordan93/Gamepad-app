import React from "react";
import { View, StyleSheet, Image } from "react-native";

const renderPlatforms = (item) => {
  const supportedPlatforms = item.parent_platforms;
  if (!supportedPlatforms) return null;
  return (
    <View style={styles.supportedPlatforms}>
      {supportedPlatforms.map((platform) => {
        // console.log(platform.platform.id);
        const platformId = platform.platform.id;
        if (platformId === 1) {
          return (
            <Image
              key={platformId}
              source={require("../assets/img/rawg-logo.png")}
              style={styles.platformLogos}
            />
          );
        }
        if (platformId === 2) {
          return (
            <Image
              key={platformId}
              source={require("../assets/img/rawg-logo.png")}
              style={styles.platformLogos}
            />
          );
        }
        if (platformId === 3) {
          return (
            <Image
              key={platformId}
              source={require("../assets/img/rawg-logo.png")}
              style={styles.platformLogos}
            />
          );
        }
        if (platformId === 4) {
          return (
            <Image
              key={platformId}
              source={require("../assets/img/rawg-logo.png")}
              style={styles.platformLogos}
            />
          );
        }
        if (platformId === 5) {
          return (
            <Image
              key={platformId}
              source={require("../assets/img/rawg-logo.png")}
              style={styles.platformLogos}
            />
          );
        }
        if (platformId === 6) {
          return (
            <Image
              key={platformId}
              source={require("../assets/img/rawg-logo.png")}
              style={styles.platformLogos}
            />
          );
        }
        if (platformId === 7) {
          return (
            <Image
              key={platformId}
              source={require("../assets/img/rawg-logo.png")}
              style={styles.platformLogos}
            />
          );
        }
        if (platformId === 8) {
          return (
            <Image
              key={platformId}
              source={require("../assets/img/rawg-logo.png")}
              style={styles.platformLogos}
            />
          );
        }
        if (platformId === 9) {
          return (
            <Image
              key={platformId}
              source={require("../assets/img/rawg-logo.png")}
              style={styles.platformLogos}
            />
          );
        }
        if (platformId === 10) {
          return (
            <Image
              key={platformId}
              source={require("../assets/img/rawg-logo.png")}
              style={styles.platformLogos}
            />
          );
        }
        if (platformId === 11) {
          return (
            <Image
              key={platformId}
              source={require("../assets/img/rawg-logo.png")}
              style={styles.platformLogos}
            />
          );
        }
        if (platformId === 12) {
          return (
            <Image
              key={platformId}
              source={require("../assets/img/rawg-logo.png")}
              style={styles.platformLogos}
            />
          );
        }
        if (platformId === 13) {
          return (
            <Image
              key={platformId}
              source={require("../assets/img/rawg-logo.png")}
              style={styles.platformLogos}
            />
          );
        }
        if (platformId === 14) {
          return (
            <Image
              key={platformId}
              source={require("../assets/img/rawg-logo.png")}
              style={styles.platformLogos}
            />
          );
        } else {
          return null;
        }
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  supportedPlatforms: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  platformLogos: {
    height: 20,
    width: 20,
    color: "black",

    marginRight: 5,
    marginTop: 2,
  },
});

export default renderPlatforms;
