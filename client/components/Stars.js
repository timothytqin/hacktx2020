import React from 'react';
// import { Text, View } from "react-native"
import { FontAwesome } from '@expo/vector-icons';
import Theme from '../Theme';

export default function Stars({ stars }) {
  const getStars = () => {
    const res = [];
    for (let i = 0; i < stars; i++) {
      res.push(
        <FontAwesome
          key={i}
          name="star"
          color={Theme.colors.primary}
          size={13}
        />
      );
    }
    return res;
  };
  return getStars();
}
