import React from 'react';
import { Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Coin from '../components/Coin';
import Stars from './Stars';

export default function ListingItem() {
  return (
    <View
      style={{
        width: '90%',
        height: 100,
        backgroundColor: '#373737',
        borderRadius: 10,
        flexDirection: 'row',
        padding: 10,
      }}
    >
      <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
        <View
          style={{
            width: 75,
            height: 75,
            borderRadius: 15,
            backgroundColor: '#696969',
          }}
        />
      </View>
      <View style={{ flex: 5, marginHorizontal: 5 }}>
        <Text style={{ fontWeight: '700', fontSize: 16, color: '#e3e3e3' }}>
          26 West Apartment
        </Text>
        <Text style={{ color: '#c4c4c4', fontSize: 10, marginVertical: 1 }}>
          sold by <Text style={{ fontWeight: '700' }}>Steve Han</Text>{' '}
          <Stars stars={4} />
        </Text>
        <Text style={{ color: '#c4c4c4', fontSize: 10, marginVertical: 1 }}>
          <Text style={{ fontWeight: '700' }}>2</Text> miles away
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              backgroundColor: '#1d1d1d',
              padding: 7,
              borderRadius: 7,
              flexDirection: 'row',
              marginRight: 5,
            }}
          >
            <FontAwesome name="bed" size={13} color={'#c4c4c4'} />
            <Text style={{ color: '#c4c4c4', fontSize: 13, fontWeight: '500' }}>
              {' '}
              3
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#1d1d1d',
              padding: 7,
              borderRadius: 7,
              flexDirection: 'row',
            }}
          >
            <FontAwesome name="bath" size={13} color={'#c4c4c4'} />
            <Text style={{ color: '#c4c4c4', fontSize: 13, fontWeight: '500' }}>
              {' '}
              3
            </Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Coin />
        <Text style={{ color: '#e3e3e3', fontSize: 24, fontWeight: '700' }}>
          2
        </Text>
      </View>
    </View>
  );
}
