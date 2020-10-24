import React from 'react';
import { ScrollView, Text, View, Image } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { FontAwesome } from '@expo/vector-icons';
import Coin from '../components/Coin';
import ListingItem from '../components/ListingItem';
import Theme from '../Theme';

const mapStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#242f3e',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#746855',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#242f3e',
      },
    ],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#263c3f',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#6b9a76',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#38414e',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#212a37',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9ca5b3',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#746855',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#1f2835',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#f3d19c',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [
      {
        color: '#2f3948',
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#17263c',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#515c6d',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#17263c',
      },
    ],
  },
];

export default function Map() {
  const renderContent = () => (
    <>
      <View
        style={{
          width: '100%',
          backgroundColor: Theme.colors.gray5,
          paddingHorizontal: '5%',
          paddingVertical: '2%',
          height: 700,
        }}
      >
        <View
          style={{
            width: '10%',
            height: 3,
            backgroundColor: '#525252',
            borderRadius: 5,
            alignSelf: 'center',
          }}
        />
        <Text
          style={{
            fontSize: 24,
            fontWeight: '600',
            color: '#c4c4c4',
            backgroundColor: '#121212',
            marginVertical: 20,
          }}
        >
          Looking for a place to stay?
        </Text>
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
          }}
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
        // customMapStyle={mapStyle}
      >
        <Marker
          coordinate={{
            longitude: -97.7452074,
            latitude: 30.2880541,
          }}
        >
          <Callout></Callout>
        </Marker>
      </MapView>
      <BottomSheet
        ref={sheetRef}
        snapPoints={['70%', '10%']}
        initialSnap={1}
        borderRadius={25}
        renderContent={renderContent}
      />
    </>
  );
}
