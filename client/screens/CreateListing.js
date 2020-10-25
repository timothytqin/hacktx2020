import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Coin from '../assets/token.svg';
import ListingItem from '../components/ListingItem';
import Theme from '../Theme';
import Stars from '../components/Stars';
import BackButton from '../components/BackButton';
import { TextInput } from 'react-native-gesture-handler';

const pfpHeight = Dimensions.get('screen').width - 140;

export default function CreateListing({ navigation }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState();
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyle}
    >
      <BackButton navigation={navigation} />
      <View style={styles.pfp} />
      <View style={styles.details}>
        <TextInput
          style={styles.name}
          placeholder="Property Name"
          value={name}
          onChangeText={setName}
        />
        <View style={styles.pinPanel}>
          <TouchableOpacity style={{ ...styles.button, ...styles.pin }}>
            <Coin />
            <TextInput
              style={{
                ...styles.buttonText,
                fontSize: 20,
              }}
              placeholder="Cost"
              value={cost}
              onChangeText={setCost}
            />
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
      <TextInput
        style={styles.description}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        height={120}
      />
      <TouchableOpacity
        style={{ ...styles.button, backgroundColor: Theme.colors.primary }}
      >
        <Text style={{ ...styles.buttonText, color: Theme.colors.gray5 }}>
          Save
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.gray4,
    padding: 40,
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
    marginRight: 10,
    width: '30%',
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
    width: '25%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 8,
    marginLeft: 'auto',
    ...Theme.shadow,
  },
  buttonText: {
    ...Theme.typography.bold,
    color: Theme.colors.gray1,
    fontSize: 14,
  },
});
