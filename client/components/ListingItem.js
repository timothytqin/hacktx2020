import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Stars from './Stars';
import Theme from '../Theme';
import Coin from '../assets/token.svg';

export default function ListingItem({ listing }) {
  return (
    <View style={styles.container}>
      <View style={styles.imagePanel}>
        <View style={styles.image} />
      </View>
      <View style={styles.detailsPanel}>
        <Text style={styles.title}>{listing.name}</Text>
        <Text style={styles.subtitle}>
          sold by{' '}
          <Text style={Theme.typography.bold}>{listing.seller.name}</Text>{' '}
          <Stars stars={listing.seller.stars} />
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
          <Coin width={'100%'} height={'100%'} />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: Theme.colors.gray5,
    borderRadius: 20,
    flexDirection: 'row',
    padding: 10,
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
    marginHorizontal: 5,
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coinQuantity: {
    color: '#e3e3e3',
    fontSize: 24,
    fontWeight: '700',
  },
});
