import React, { useState, useEffect, useContext } from 'react';
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
import { Root, Popup } from 'popup-ui';
import { add_listing} from '../firebase/firebaseListing';
import {AuthContext} from "../App"
const pfpHeight = Dimensions.get('screen').width - 80;

export default function CreateListing({ navigation }) {
  navigation.setOptions({
    drawerIcon: () => (
      <FontAwesome
        name="plus-circle"
        size={38}
        style={{ marginLeft: 2 }}
        color={Theme.colors.primary}
      />
    ),
  });
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
  const [base64, setBase64] = useState("");

  const {user} = useContext(AuthContext);

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
      setBase64(result.base64);
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
  const handleSave = () => {
    const data = {
      address,
      name,
      location: region,
      description,
      cost,
      bed,
      bath,
      pfp: base64,
      donor: {
        name: user.name,
        stars: 4,
        uid: user.uid
      }
    };
    add_listing(data);
  };

  return (
    <Root>
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
              placeholder="Property Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={{
                ...styles.name,
                fontSize: 20,
              }}
              placeholder="Address"
              value={address}
              onChangeText={setAddress}
            />
            <View style={styles.map}>
              <MapView
                provider={PROVIDER_GOOGLE}
                style={{ width: pfpHeight, height: pfpHeight }}
                initialRegion={{
                  ...region,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
                onRegionChangeComplete={(r) => {
                  setRegion({ latitude: r.latitude, longitude: r.longitude });
                }}
                customMapStyle={MapStyles}
              />
              <View style={styles.fakeMarker}>
                <FontAwesome name="map-pin" color={'#f00'} size={32} />
              </View>
            </View>
            <View style={styles.pinPanel}>
              <TouchableOpacity style={{ ...styles.button, ...styles.pin }}>
                <Coin />
                <TextInput
                  style={{
                    ...styles.pinInput,
                    fontSize: 20,
                  }}
                  placeholder="Cost"
                  value={cost}
                  onChangeText={setCost}
                />
              </TouchableOpacity>
              <TouchableOpacity style={{ ...styles.button, ...styles.pin }}>
                <FontAwesome name="bed" size={20} color={Theme.colors.gray1} />
                <TextInput
                  style={{
                    ...styles.pinInput,
                    fontSize: 20,
                  }}
                  placeholder="Bed"
                  value={bed}
                  onChangeText={setBed}
                />
              </TouchableOpacity>
              <TouchableOpacity style={{ ...styles.button, ...styles.pin }}>
                <FontAwesome name="bath" size={20} color={Theme.colors.gray1} />
                <TextInput
                  style={{
                    ...styles.pinInput,
                    fontSize: 20,
                  }}
                  placeholder="Bath"
                  value={bath}
                  onChangeText={setBath}
                />
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
            onPress={() => {
              Popup.show({
                type: 'Success',
                title: 'Successfully created listing',
                button: true,
                textBody: 'Thank you for your donation',
                buttonText: 'Ok',
                callback: () => {
                  Popup.hide();
                  navigation.navigate('Home');
                },
              });
              handleSave();
            }}
          >
            <Text style={{ ...styles.pinInput, color: Theme.colors.gray5 }}>
              Save
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </Root>
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
