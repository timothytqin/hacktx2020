import React, { useContext } from 'react';
import {
  ScrollView,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { FontAwesome } from '@expo/vector-icons';
import ListingItem from '../components/ListingItem';
import Theme from '../Theme';
import { BlurView } from 'expo-blur';
import { StatusBar } from 'expo-status-bar';
import Logo from '../assets/logo.svg';
import ProfileIcon from '../assets/profile.svg';
import MapStyles from '../MapStyles.json';
import CustomMarker from '../components/MapMarker';
import { AuthContext } from '../App';
import CreateListing from './CreateListing';

const HomeHeader = ({ navigation }) => {
  return (
    <View
      intensity={100}
      style={{
        backgroundColor: Theme.colors.gray5,
        paddingHorizontal: 20,
        paddingVertical: 20,
        paddingTop: 50,
        flexDirection: 'row',
        borderRadius: 30,
      }}
    >
      <StatusBar style="dark" />
      <TouchableOpacity
        style={{ flexDirection: 'row' }}
        onPress={() => navigation.openDrawer()}
      >
        <Logo />
        <Text
          style={{
            fontWeight: '800',
            color: Theme.colors.gray1,
            fontSize: 25,
            marginLeft: 10,
            marginTop: 5,
          }}
        >
          Haven
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginLeft: 'auto', marginTop: 5 }}
        onPress={() => navigation.navigate('Profile')}
      >
        <ProfileIcon />
      </TouchableOpacity>
    </View>
  );
};

export default function Map({ navigation }) {
  const { user, listingIds, listingsById } = useContext(AuthContext);
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
          paddingTop: '2%',
          minHeight: Dimensions.get('screen').height * 0.7,
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
            Welcome, {user.name}
          </Text>
          <Text
            style={{
              fontSize: 24,
              fontWeight: '700',
              color: Theme.colors.gray1,
              marginBottom: 20,
            }}
          >
            {user.donor
              ? 'Have an extra place?'
              : 'Looking for a place to stay?'}
          </Text>
        </View>
        {!user.donor ? (
          <FlatList
            data={listingIds}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <ListingItem
                listing={listingsById[item]}
                displayCost={true}
                onPress={() =>
                  navigation.navigate('Listing', {
                    listing: listingsById[item],
                    listingId: item,
                  })
                }
                key={item}
              />
            )}
          />
        ) : (
          <CreateListing nested={true} />
        )}
      </BlurView>
    </>
  );

  const sheetRef = React.useRef(null);
  return (
    <>
      <HomeHeader navigation={navigation} />
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 30.2880541,
          longitude: -97.7452074,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        customMapStyle={MapStyles}
      >
        {listingIds.map((id) => {
          const listing = listingsById[id];
          return (
            <Marker coordinate={listing.location}>
              <CustomMarker listing={{ cost: listing.cost }} />
              <Callout
                style={{ borderRadius: 20, padding: 5 }}
                onPress={() => navigation.navigate('Listing', { listing })}
              >
                <Text style={{ color: Theme.colors.gray1, fontWeight: '700' }}>
                  {listing.name}
                </Text>
              </Callout>
            </Marker>
          );
        })}
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
