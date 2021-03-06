import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { FontAwesome } from '@expo/vector-icons';
import Coin from '../assets/token.svg';
import ListingItem from '../components/ListingItem';
import Theme from '../Theme';
import Stars from '../components/Stars';
import BackButton from '../components/BackButton';
import { Root, Popup } from 'popup-ui';
import NumericInput from 'react-native-numeric-input';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db } from '../firebase/firebase';
import { AuthContext } from '../App';

const pfpHeight = Dimensions.get('screen').width - 140;

export default function Listing({ navigation, route }) {
  const { listing, listingId } = route.params;
  const [days, setDays] = useState(1);
  const { user, users } = useContext(AuthContext);
  return (
    <Root>
      <SafeAreaView>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainerStyle}
        >
          <BackButton navigation={navigation} />
          <Image
            style={{
              ...styles.pfp,
              resizeMode: 'cover',
            }}
            source={{
              uri: `data:image/png;base64,${listing.pfp}`,
            }}
          />
          <View style={styles.details}>
            <Text style={styles.name}>{listing.name}</Text>
            <View style={styles.soldBy}>
              <Text style={styles.subtitle}>listed by </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Profile', { uid: 69 })}
              >
                <Text style={{ ...styles.subtitle, ...styles.seller }}>
                  {listing.donor.name}
                </Text>
              </TouchableOpacity>
              <Stars stars={4} style={{ marginBottom: 0, marginLeft: 10 }} />
            </View>
            {listing.booker && (
              <View style={styles.soldBy}>
                <Text style={styles.subtitle}>booked by </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Profile', { uid: 69 })}
                >
                  <Text style={{ ...styles.subtitle, ...styles.seller }}>
                    {listing.booker.name}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            <View style={styles.pinPanel}>
              <TouchableOpacity style={{ ...styles.button, ...styles.pin }}>
                <Coin />
                <Text
                  style={{
                    ...styles.buttonText,
                    fontSize: 20,
                  }}
                >
                  {' '}
                  {listing.cost}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ ...styles.button, ...styles.pin }}>
                <FontAwesome name="bed" size={20} color={Theme.colors.gray1} />
                <Text style={{ ...styles.buttonText, fontSize: 20 }}>
                  {listing.bed}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ ...styles.button, ...styles.pin }}>
                <FontAwesome name="bath" size={20} color={Theme.colors.gray1} />
                <Text style={{ ...styles.buttonText, fontSize: 20 }}>
                  {listing.bath}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.description}>{listing.description}</Text>
          <TouchableOpacity
            style={{ ...styles.button, backgroundColor: Theme.colors.gray5 }}
          >
            <Text style={styles.buttonText}>Message Owner</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...styles.button, backgroundColor: Theme.colors.primary }}
            onPress={async () => {
              const cost = listing.cost * days;
              await db
                .doc('users/' + user.uid)
                .update({ tokens: user.tokens - cost });
              await db
                .doc('users/' + listing.donor.uid)
                .update({ tokens: users[listing.donor.uid].tokens + cost });
              await db.doc('listings/' + listingId).update({
                booker: { uid: user.uid, name: user.name },
              });
              Popup.show({
                type: 'Success',
                title: 'Successfully Booked Place',
                button: true,
                textBody: 'Reach out to the donor to arrange move-in time.',
                buttonText: 'Ok',
                callback: () => {
                  Popup.hide();
                  navigation.navigate('Profile');
                },
              });
            }}
          >
            <Text style={{ ...styles.buttonText, color: Theme.colors.gray5 }}>
              Book This Place
            </Text>
          </TouchableOpacity>
          <View style={styles.number_picker}>
            <Text style={styles.number_text}>for</Text>
            <NumericInput
              type="up-down"
              rounded
              containerStyle={{
                borderWidth: 0,
                backgroundColor: Theme.colors.gray5,
                height: 40,
              }}
              onChange={setDays}
              borderColor="transparent"
              textColor={Theme.colors.gray2}
              minValue={1}
            />
            <Text style={styles.number_text}>days</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Root>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.gray4,
    padding: 40,
    paddingTop: 10,
  },
  pfp: {
    width: '100%',
    height: pfpHeight,
    backgroundColor: '#696969',
    borderRadius: 50,
  },
  name: {
    fontSize: 35,
    fontWeight: '900',
    color: Theme.colors.primary,
    marginVertical: 10,
    marginTop: 20,
  },
  soldBy: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle: {
    color: Theme.colors.gray2,
    fontSize: 15,
    marginVertical: 1,
  },
  seller: {
    fontWeight: 'bold',
  },
  pinPanel: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  pin: {
    backgroundColor: Theme.colors.gray5,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    ...Theme.shadow,
  },
  description: {
    marginVertical: 5,
    color: Theme.colors.gray2,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    borderRadius: 25,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 8,
    ...Theme.shadow,
    maxWidth: '60%',
  },
  buttonText: {
    ...Theme.typography.bold,
    color: Theme.colors.gray1,
    fontSize: 16,
    marginHorizontal: 5,
  },
  number_picker: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  number_text: {
    fontSize: 17,
    fontWeight: '700',
    color: Theme.colors.gray2,
    marginHorizontal: 10,
  },
});
