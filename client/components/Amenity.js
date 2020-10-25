import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Coin from '../assets/token.svg';
import Stars from './Stars';
import Theme from '../Theme';

export default function Amenity({ listing, displayCost, onPress }) {
  return (
    <View style={styles.bedBath}>
      <FontAwesome name="bed" size={13} color={Theme.colors.gray3} />
      <Text style={styles.bedBathQuantity}> {listing.bed}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  bedBath: {
    backgroundColor: '#1d1d1d',
    padding: 7,
    borderRadius: 7,
    flexDirection: 'row',
    marginRight: 5,
  },
  bedBathQuantity: {
    color: Theme.colors.gray3,
    fontSize: 13,
    fontWeight: '500',
  },
});
