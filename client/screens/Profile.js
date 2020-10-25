import React, { useContext } from 'react';
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
import { AuthContext } from '../App';

export default function Profile({ navigation, route }) {
  const { users, user } = useContext(AuthContext);
  var currUser = user;
  if (route.param) {
    currUser = users[route.param.uid];
  }
  return (
    <Root>
      <SafeAreaView>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainerStyle}
        >
          <BackButton navigation={navigation} />
          <View style={styles.header}>
            <Image
              style={{
                ...styles.pfp,
                resizeMode: 'cover',
              }}
              source={{
                uri: `data:image/png;base64,${currUser.pfp}`,
              }}
            />
            <View style={styles.details}>
              <Text style={styles.name}>{currUser.name}</Text>
              <Stars stars={4} style={{ marginBottom: 5 }} />
              <View style={styles.tag}>
                <Text style={styles.tagText}>
                  {currUser.donor ? 'Donor' : 'Receiver'}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.bio}>
            <Text style={styles.labelText}>Bio</Text>
            <Text style={styles.bioText}>{currUser.bio}</Text>
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
    flex: 1,
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
