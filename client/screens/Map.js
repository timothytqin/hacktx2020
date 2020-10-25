import React from 'react';
import {
  ScrollView,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { FontAwesome } from '@expo/vector-icons';
import ListingItem from '../components/ListingItem';
import Theme from '../Theme';
import { BlurView } from 'expo-blur';

export default function Map({ navigation }) {
  const dummyData = {
    name: '26 West Apartments',
    bed: 3,
    bath: 3,
    cost: 2,
    seller: {
      name: 'Steve Han',
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
        onPress={() => navigation.navigate('Profile')}
      >
        <FontAwesome name="user-circle" size={24} />
      </TouchableOpacity>
    ),
  });
  const renderContent = () => (
    <>
      <BlurView
        intensity={100}
        style={{
          width: '100%',
          backgroundColor: Theme.colors.gray5,
          paddingVertical: '2%',
          height: 700,
        }}
      >
        <View
          style={{
            width: '10%',
            height: 5,
            backgroundColor: Theme.colors.gray3,
            borderRadius: 5,
            alignSelf: 'center',
          }}
        />
        <View style={{ paddingLeft: 20 }}>
          <Text
            style={{
              fontSize: 28,
              fontWeight: '800',
              color: Theme.colors.primary,
              marginTop: 20,
            }}
          >
            Welcome, user
          </Text>
          <Text
            style={{
              fontSize: 24,
              fontWeight: '700',
              color: Theme.colors.gray1,
              marginBottom: 20,
            }}
          >
            Looking for a place to stay?
          </Text>
        </View>
        <FlatList
          data={[dummyData, dummyData, dummyData]}
          renderItem={({ item }) => (
            <ListingItem
              listing={item}
              displayCost={true}
              onPress={() => navigation.navigate('Listing')}
              key={item.name}
            />
          )}
        />
      </BlurView>
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
                name: '26 West Apartments',
                bed: 3,
                bath: 3,
                cost: 2,
                seller: {
                  name: 'Steve Han',
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
        snapPoints={['70%', '15%']}
        initialSnap={1}
        borderRadius={30}
        renderContent={renderContent}
      />
    </>
  );
}
