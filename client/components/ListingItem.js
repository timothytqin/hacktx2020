import React from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Coin from "../components/Coin";
import Stars from "./Stars";
import Theme from "../Theme";

export default function ListingItem({ listing, displayCost, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imagePanel}>
        <View style={styles.image} />
      </View>
      <View style={styles.detailsPanel}>
        <Text style={styles.title}>{listing.name}</Text>
        <Text style={styles.subtitle}>
          sold by{" "}
          <Text style={Theme.typography.bold}>{listing.seller.name}</Text>{" "}
          <Stars stars={listing.seller.stars} />
        </Text>
        <Text style={styles.subtitle}>
          <Text style={Theme.typography.bold}>{listing.distance}</Text> miles
          away
        </Text>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.bedBath}>
            <FontAwesome name="bed" size={13} color={Theme.colors.gray3} />
            <Text style={styles.bedBathQuantity}> {listing.bed}</Text>
          </View>
          <View style={styles.bedBath}>
            <FontAwesome name="bath" size={13} color={Theme.colors.gray3} />
            <Text style={styles.bedBathQuantity}> {listing.bath}</Text>
          </View>
        </View>
      </View>
      {displayCost && (
        <View style={styles.coinPanel}>
          <Coin />
          <Text style={styles.coinQuantity}>{listing.cost}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: Theme.colors.gray5,
    borderRadius: 25,
    flexDirection: "row",
    padding: 10,
    marginVertical: 5,
  },
  imagePanel: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 25,
    backgroundColor: "#696969",
  },
  detailsPanel: {
    flex: 5,
    marginLeft: 10,
  },
  title: { ...Theme.typography.bold, fontSize: 16, color: Theme.colors.gray1 },
  subtitle: { color: Theme.colors.gray3, fontSize: 10, marginVertical: 1 },
  bedBath: {
    backgroundColor: "#1d1d1d",
    padding: 7,
    borderRadius: 7,
    flexDirection: "row",
    marginRight: 5,
  },
  bedBathQuantity: {
    color: Theme.colors.gray3,
    fontSize: 13,
    fontWeight: "500",
  },
  coinPanel: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  coinQuantity: {
    color: "#e3e3e3",
    fontSize: 24,
    ...Theme.typography.bold,
  },
});
