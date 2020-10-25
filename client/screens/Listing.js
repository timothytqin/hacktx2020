import React from 'react';
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

const pfpHeight = Dimensions.get('screen').width - 140;

export default function Listing({ navigation }) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyle}
    >
      <View style={styles.pfp} />
      <View style={styles.details}>
        <Text style={styles.name}>26 West Apartments</Text>
        <View style={styles.soldBy}>
          <Text style={styles.subtitle}>sold by </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile', { uid: 69 })}
          >
            <Text style={{ ...styles.subtitle, ...styles.seller }}>
              Steve Han
            </Text>
          </TouchableOpacity>
          <Stars stars={4} style={{ marginBottom: 5 }} />
        </View>
        <View style={styles.pinPanel}>
          <TouchableOpacity style={{ ...styles.button, ...styles.pin }}>
            <Coin />
            <Text
              style={{
                ...styles.buttonText,
                color: Theme.colors.gray1,
                fontSize: 20,
              }}
            >
              {' '}
              2
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ ...styles.button, ...styles.pin }}>
            <FontAwesome name="bed" size={20} color={Theme.colors.gray1} />
            <Text style={{ ...styles.buttonText, fontSize: 20 }}> 3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ ...styles.button, ...styles.pin }}>
            <FontAwesome name="bath" size={20} color={Theme.colors.gray1} />
            <Text style={{ ...styles.buttonText, fontSize: 20 }}> 3</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.description}>
        This is a very nice apartment. You are welcome to use the food in the
        fridge and the cookware in the kitchen. Please don’t smoke in the
        apartment though, as it will trigger the smoke detector.
      </Text>
      <TouchableOpacity
        style={{ ...styles.button, backgroundColor: Theme.colors.gray5 }}
      >
        <Text style={styles.buttonText}>Message Owner</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ ...styles.button, backgroundColor: Theme.colors.primary }}
      >
        <Text style={{ ...styles.buttonText, color: Theme.colors.gray5 }}>
          Book This Place
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.gray4,
    padding: 70,
  },
  pfp: {
    width: '100%',
    height: pfpHeight,
    backgroundColor: '#696969',
    borderRadius: 50,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Theme.colors.primary,
    marginVertical: 10,
  },
  soldBy: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle: {
    color: Theme.colors.gray2,
    fontSize: 13,
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
    marginRight: 5,
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    marginVertical: 5,
  },
  button: {
    borderRadius: 25,
    padding: 10,
    width: '55%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    ...Theme.typography.bold,
    fontSize: 14,
  },
});
