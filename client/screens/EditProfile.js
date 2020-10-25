/*
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
*/




import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Coin from '../assets/token.svg';
import ListingItem from '../components/ListingItem';
import Theme from '../Theme';
import Stars from '../components/Stars';
import BackButton from '../components/BackButton';

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { add } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapStyles from '../MapStyles.json';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import ToggleButton from '../components/ToggleButton';
const pfpHeight = Dimensions.get('screen').width - 80;

export default function CreateListing({ navigation }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [region, setRegion] = useState({
    latitude: 30.2880541,
    longitude: -97.7452074,
  });
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState();
  const [bed, setBed] = useState();
  const [bath, setBath] = useState();
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <BackButton navigation={navigation} />

        <TouchableOpacity onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.pfp} />
          ) : (
            <View
              style={{
                ...styles.pfp,
                borderWidth: 10,
                borderStyle: 'dashed',
                borderColor: Theme.colors.gray3,
              }}
            >
              <FontAwesome name="plus" size={69} color={Theme.colors.gray3} />
            </View>
          )}
        </TouchableOpacity>
        <View style={styles.details}>
          <TextInput
            style={styles.name}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          
          <View style={styles.pinPanel}>
          <ToggleButton/>
          </View>
        </View>
        <TextInput
          style={styles.description}
          placeholder="Bio"
          value={description}
          onChangeText={setDescription}
          height={120}
        />
        <TouchableOpacity
          style={{ ...styles.button, backgroundColor: Theme.colors.primary }}
        >
          <Text style={{ ...styles.pinInput, color: Theme.colors.gray5 }}>
            Save
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.gray4,
    paddingHorizontal: 40,
  },
  pfp: {
    width: '100%',
    height: pfpHeight,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 35,
    fontWeight: '900',
    color: Theme.colors.primary,
    marginVertical: 10,
    marginTop: 20,
  },
  map: {},
  fakeMarker: {
    left: '47%',
    position: 'absolute',
    top: '40%',
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
  pinInput: {
    ...Theme.typography.bold,
    color: Theme.colors.gray1,
    fontSize: 14,
    marginLeft: 5,
    width: '60%',
  },
});
