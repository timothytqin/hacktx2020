import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  Platform,
  SafeAreaView,
  Keyboard
} from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { FontAwesome } from '@expo/vector-icons';
import Coin from '../assets/token.svg';
import ListingItem from '../components/ListingItem';
import Theme from '../Theme';
import Stars from '../components/Stars';
import { FlatList } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import ToggleButton from '../components/ToggleButton';
import { TextInput } from 'react-native-gesture-handler';
export default function editProfile() {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('')
  const [name, setName] = useState('')
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'end' }}>
      <TouchableOpacity onPress={() =>{Keyboard.dismiss()}}>
      <View style = {{flex: 1, alignItems:'center',justifyContent:'center'}}>
      <Button title="Upload image" onPress={pickImage} style = {styles.image} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
      <View style = {{flex: 1, alignItems:'center',justifyContent:'center'}}>
            <TextInput
            placeholder="name"
            value={name}
            onChangeText={setName}
            height={20}
            fontSize = {10}
      />
      </View>
      <View style = {{flex: 1, alignItems:'center',justifyContent:'center'}}>
      <ToggleButton/>
      </View>
      <View style = {{flex: 1, alignItems:'center',justifyContent:'center'}}>
            <TextInput
            multiline = {true}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            height={120}
            fontSize = {10}
      />
      </View>
      </TouchableOpacity>
    </SafeAreaView>
  );

 
}
const styles = StyleSheet.create({
  image:{

  },
})
