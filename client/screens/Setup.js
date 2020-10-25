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
import Theme from '../Theme';
import BackButton from '../components/BackButton';

import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import ToggleButton from '../components/ToggleButton';
import { updateUser } from '../firebase/firebaseAuth';
import { AuthContext } from '../App';

const pfpHeight = Dimensions.get('screen').width - 80;

export default function CreateListing({ navigation, route }) {
  const { user, setUser } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState(null);
  const [base64, setBase64] = useState('');
  const [selected, setSelected] = useState(-1);

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
      ...route.params.token,
      pfp: base64,
      name,
      bio,
      donor: selected === 0,
    };
    updateUser(route.params.uid, data);
    setUser({ ...user, uid: route.params.uid, ...data });
  };
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
            <ToggleButton selected={selected} setSelected={setSelected} />
          </View>
        </View>
        <TextInput
          style={styles.bio}
          placeholder="Bio"
          value={bio}
          onChangeText={setBio}
          height={120}
        />
        <TouchableOpacity
          style={{ ...styles.button, backgroundColor: Theme.colors.primary }}
          onPress={handleSave}
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
  bio: {
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
