import React from 'react';
import { Text, View } from 'react-native';
import Theme from '../Theme';
import Coin from '../assets/token.svg';

const MapMarker = ({ listing }) => {
  return (
    <View style={{ padding: 20 }}>
      <View
        style={{
          backgroundColor: Theme.colors.gray5,
          padding: 7,
          flexDirection: 'row',
          alignItems: 'center',
          ...Theme.shadow,
          borderRadius: 20,
        }}
      >
        <Coin />
        <Text
          style={{
            fontSize: 20,
            fontWeight: '700',
            color: Theme.colors.gray1,
            marginHorizontal: 5,
          }}
        >
          {listing.cost}
        </Text>
      </View>
    </View>
  );
};

export default MapMarker;
