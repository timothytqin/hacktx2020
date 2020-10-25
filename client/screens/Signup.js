import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Theme from '../Theme';
import { signup, createUser } from '../firebase/firebaseAuth';
import { AuthContext } from '../App';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(AuthContext);

  const submitHandler = () => {
    signup(email, password)
      .then((res) => {
        createUser(res.user.uid).then(() => {
          navigation.navigate('Setup', { uid: res.user.uid, tokens: 10 });
        });
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.loginText}>Sign Up</Text>
      <TextInput
        placeholder="email"
        style={styles.input}
        placeholderTextColor={Theme.colors.gray1}
        value={email}
        onChangeText={setEmail}
        autoCorrect={false}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="password"
        style={styles.input}
        placeholderTextColor={Theme.colors.gray1}
        value={password}
        onChangeText={setPassword}
        autoCorrect={false}
        secureTextEntry={true}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="confirm password"
        style={styles.input}
        placeholderTextColor={Theme.colors.gray1}
        autoCorrect={false}
        secureTextEntry={true}
        autoCapitalize="none"
      />
      <View style={{ alignItems: 'flex-end' }}>
        <TouchableOpacity style={styles.submit} onPress={submitHandler}>
          <Text style={{ color: Theme.colors.gray5, ...Theme.typography.bold }}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.signupText}>Already have an account?</Text>
      <TouchableOpacity
        style={styles.signupButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={{ color: Theme.colors.gray1, ...Theme.typography.bold }}>
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: Theme.colors.primary,
    padding: 40,
    justifyContent: 'center',
  },
  loginText: {
    fontSize: 36,
    color: Theme.colors.gray5,
    marginVertical: 50,
    ...Theme.typography.bold,
  },
  input: {
    backgroundColor: Theme.colors.gray5,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  submit: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: Theme.colors.gray1,
    width: '25%',
    alignItems: 'center',
    marginVertical: 30,
  },
  signupText: {
    fontSize: 18,
    color: Theme.colors.gray5,
    ...Theme.typography.bold,
  },
  signupButton: {
    padding: 10,
    backgroundColor: Theme.colors.gray5,
    borderRadius: 25,
    width: '25%',
    alignItems: 'center',
    marginVertical: 5,
  },
});
