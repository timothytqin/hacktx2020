import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Coin from "../components/Coin";
import Stars from "./Stars";
import c from "../const";

export default function ListingItem({ listing }) {
  return (
    <View style={styles.container}>
      <View style={styles.imagePanel}>
        <View style={styles.image} />
      </View>
      <View style={styles.detailsPanel}>
        <Text style={styles.title}>{listing.name}</Text>
        <Text style={styles.subtitle}>
          sold by <Text style={c.bold}>{listing.seller.name}</Text>{" "}
          <Stars stars={listing.seller.stars} />
        </Text>
        <Text style={styles.subtitle}>
          <Text style={c.bold}>{listing.distance}</Text> miles away
        </Text>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.bedBath}>
            <FontAwesome name="bed" size={13} color={"#c4c4c4"} />
            <Text style={styles.bedBathQuantity}> {listing.bed}</Text>
          </View>
          <View style={styles.bedBath}>
            <FontAwesome name="bath" size={13} color={"#c4c4c4"} />
            <Text style={styles.bedBathQuantity}> {listing.bath}</Text>
          </View>
        </View>
      </View>
      <View style={styles.coinPanel}>
        <Coin />
        <Text style={styles.coinQuantity}>{listing.cost}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: 100,
    backgroundColor: "#373737",
    borderRadius: 10,
    flexDirection: "row",
    padding: 10,
  },
  imagePanel: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 15,
    backgroundColor: "#696969",
  },
  detailsPanel: {
    flex: 5,
    marginHorizontal: 5,
  },
  title: { fontWeight: "700", fontSize: 16, color: "#e3e3e3" },
  subtitle: { color: "#c4c4c4", fontSize: 10, marginVertical: 1 },
  bedBath: {
    backgroundColor: "#1d1d1d",
    padding: 7,
    borderRadius: 7,
    flexDirection: "row",
    marginRight: 5,
  },
  bedBathQuantity: {
    color: "#c4c4c4",
    fontSize: 13,
    fontWeight: "500",
  },
  coinPanel: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  coinQuantity: {
    color: "#e3e3e3",
    fontSize: 24,
    fontWeight: "700",
  },
});
