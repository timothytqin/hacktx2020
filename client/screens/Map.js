import React from "react";
import { ScrollView, Text, View, Image } from "react-native";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";
import { FontAwesome } from "@expo/vector-icons";
import Coin from "../components/Coin";
import ListingItem from "../components/ListingItem";
import Theme from "../Theme";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

export default function Map({ navigation }) {
  const dummyData = {
    name: "26 West Apartments",
    bed: 3,
    bath: 3,
    cost: 2,
    seller: {
      name: "Steve Han",
      uid: 69,
      stars: 4,
    },
    distance: 2,
    uid: 69,
  };
  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity
        style={{ margin: 10 }}
        onPress={() => navigation.navigate("Profile")}
      >
        <FontAwesome name="user-circle" size={24} />
      </TouchableOpacity>
    ),
  });
  const renderContent = () => (
    <>
      <View
        style={{
          width: "100%",
          backgroundColor: Theme.colors.gray5,
          paddingHorizontal: "5%",
          paddingVertical: "2%",
          height: 700,
        }}
      >
        <View
          style={{
            width: "10%",
            height: 3,
            backgroundColor: "#525252",
            borderRadius: 5,
            alignSelf: "center",
          }}
        />
        <Text
          style={{
            fontSize: 24,
            fontWeight: "600",
            color: Theme.colors.gray3,
            backgroundColor: "#121212",
            marginVertical: 20,
          }}
        >
          Looking for a place to stay?
        </Text>
        <FlatList
          data={[dummyData, dummyData, dummyData]}
          renderItem={({ item }) => (
            <ListingItem
              listing={item}
              displayCost={true}
              onPress={() => navigation.navigate("Listing")}
            />
          )}
        />
      </View>
    </>
  );

  const sheetRef = React.useRef(null);
  return (
    <>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 30.2880541,
          longitude: -97.7452074,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            longitude: -97.7452074,
            latitude: 30.2880541,
          }}
        >
          <Callout>
            <ListingItem
              listing={{
                name: "26 West Apartments",
                bed: 3,
                bath: 3,
                cost: 2,
                seller: {
                  name: "Steve Han",
                  uid: 69,
                  stars: 4,
                },
                distance: 2,
                uid: 69,
              }}
              displayCost={false}
            />
          </Callout>
        </Marker>
      </MapView>
      <BottomSheet
        ref={sheetRef}
        snapPoints={["70%", "10%"]}
        initialSnap={1}
        borderRadius={25}
        renderContent={renderContent}
      />
    </>
  );
}
