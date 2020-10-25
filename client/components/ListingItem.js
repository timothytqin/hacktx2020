import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Stars from './Stars';
import Theme from '../Theme';
import Coin from '../assets/token.svg';

export default function ListingItem({ listing, displayCost, onPress }) {
  return listing ? (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imagePanel}>
        <View style={styles.image} />
      </View>
      <View style={styles.detailsPanel}>
        <Text style={styles.title}>{listing.name}</Text>
        <Text style={styles.subtitle}>
          sold by{' '}
          <Text style={Theme.typography.bold}>{listing.donor.name}</Text>{' '}
          <Stars stars={listing.donor.stars} />
        </Text>
        <Text style={styles.subtitle}>
          <Text style={Theme.typography.bold}>{listing.distance}</Text> miles
          away
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.bedBath}>
            <FontAwesome name="bed" size={15} color={Theme.colors.gray5} />
            <Text style={styles.bedBathQuantity}> {listing.bed}</Text>
          </View>
          <View style={styles.bedBath}>
            <FontAwesome name="bath" size={15} color={Theme.colors.gray5} />
            <Text style={styles.bedBathQuantity}> {listing.bath}</Text>
          </View>
          {displayCost && (
            <View style={styles.coinPanel}>
              <Text style={styles.coinQuantity}>{listing.cost}</Text>
              <Coin />
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  ) : null;
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.gray5,
    borderRadius: 20,
    flexDirection: 'row',
    padding: 15,
    ...Theme.shadow,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  imagePanel: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 20,
    backgroundColor: '#696969',
  },
  detailsPanel: {
    flex: 5,
    marginLeft: 10,
  },
  title: { fontWeight: '700', fontSize: 20, color: Theme.colors.gray1 },
  subtitle: { color: Theme.colors.gray2, fontSize: 14, marginVertical: 1 },
  bedBath: {
    backgroundColor: Theme.colors.gray1,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 7,
    flexDirection: 'row',
    marginRight: 10,
    marginTop: 7,
  },
  bedBathQuantity: {
    color: Theme.colors.gray5,
    fontSize: 15,
    fontWeight: '600',
  },
  coinPanel: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginLeft: 'auto',
  },
  coinQuantity: {
    color: Theme.colors.gray2,
    fontSize: 24,
    fontWeight: '700',
    marginRight: 5,
  },
});
