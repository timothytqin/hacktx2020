import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { FontAwesome } from '@expo/vector-icons';
import Coin from '../assets/token.svg';
import ListingItem from '../components/ListingItem';
import Theme from '../Theme';
import Stars from '../components/Stars';
import { FlatList } from 'react-native-gesture-handler';
import BackButton from '../components/BackButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Root, Popup } from 'popup-ui';

export default function Profile({ navigation }) {
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
  return (
    <Root>
      <SafeAreaView>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainerStyle}
        >
          <BackButton navigation={navigation} />
          <View style={styles.header}>
            <View style={styles.pfp} />
            <View style={styles.details}>
              <Text style={styles.name}>Steve Han</Text>
              <Stars stars={4} style={{ marginBottom: 5 }} />
              <View style={styles.tag}>
                <Text style={styles.tagText}>Donor</Text>
              </View>
            </View>
          </View>
          <View style={styles.bio}>
            <Text style={styles.labelText}>Bio</Text>
            <Text style={styles.bioText}>
              I’m a current student at the University of Texas at Austin. Since
              this semester is completely online, I’m staying at home. However,
              I still have to pay the lease for my apartment in West Campus.
              Instead of wasting the apartment, I choose to donate it to those
              in need.
            </Text>
          </View>
          <View style={styles.listings}>
            <Text style={styles.labelText}>Listings</Text>
            {/* <FlatList
            data={[dummyData, dummyData, dummyData]}
            renderItem={({ item }) => (
              <ListingItem
                listing={item}
                displayCost={true}
                onPress={() => navigation.navigate('Listing')}
                key={item.name}
              />
            )}
            scrollEnabled={false}
          /> */}
            <TouchableOpacity
              style={{ ...styles.receiptButton, marginLeft: 20 }}
              onPress={() => navigation.navigate('Create')}
            >
              <Text style={styles.receiptText}>Create Listing +</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tokens}>
            <Coin />
            <Text style={styles.tokenCount}> Tokens: 20</Text>
          </View>
          <TouchableOpacity
            style={styles.receiptButton}
            onPress={() => {
              // TODO: firebase function to clear tokens
              Popup.show({
                type: 'Success',
                title: 'Successfully claimed tokens',
                button: true,
                textBody: 'Your tax receipt is sent to you email',
                buttonText: 'Ok',
                callback: () => {
                  Popup.hide();
                },
              });
            }}
          >
            <Text style={styles.receiptText}>Get my tax receipt</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </Root>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.gray4,
    paddingHorizontal: 35,
  },
  contentContainerStyle: { paddingBottom: 60 },
  header: {
    flexDirection: 'row',
  },
  pfp: {
    width: 100,
    height: 100,
    backgroundColor: '#696969',
    borderRadius: 20,
  },
  details: {
    marginLeft: 20,
    justifyContent: 'center',
  },
  name: {
    fontSize: 30,
    fontWeight: '900',
    color: Theme.colors.primary,
  },
  tag: {
    padding: 5,
    borderRadius: 25,
    width: '50%',
    backgroundColor: Theme.colors.gray5,
    marginTop: 5,
  },
  tagText: {
    textAlign: 'center',
    color: Theme.colors.gray1,
    fontWeight: '900',
  },
  labelText: {
    fontWeight: '800',
    fontSize: 18,
    marginVertical: 5,
    color: Theme.colors.gray1,
  },
  bio: {
    marginVertical: 25,
  },
  bioText: {
    color: Theme.colors.gray1,
    fontSize: 16,
  },
  tokens: {
    borderRadius: 25,
    padding: 10,
    maxWidth: '40%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    backgroundColor: Theme.colors.gray5,
  },
  tokenCount: {
    ...Theme.typography.bold,
    fontSize: 16,
    color: '#383838',
    marginTop: 4,
  },
  receiptButton: {
    borderRadius: 25,
    padding: 10,
    width: '45%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    backgroundColor: Theme.colors.primary,
  },
  receiptText: {
    ...Theme.typography.bold,
    fontSize: 14,
    color: Theme.colors.gray5,
  },
});
