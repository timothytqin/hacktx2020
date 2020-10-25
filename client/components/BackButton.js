import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons';
import Theme from '../Theme';

export default ({ navigation }) => {
  return (
    <TouchableOpacity
      style={{ marginVertical: 20 }}
      onPress={() => navigation.goBack()}
    >
      <FontAwesome5 name="chevron-left" size={24} color={Theme.colors.gray1} />
    </TouchableOpacity>
  );
};
