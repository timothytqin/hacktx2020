import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Theme from '../Theme';

export default function Login({ navigation }) {
  navigation.setOptions({ header: () => null });
  return (
    <View style={styles.container}>
      <Text style={styles.loginText}>Login</Text>
      <TextInput
        placeholder="email"
        style={styles.input}
        placeholderTextColor={Theme.colors.gray1}
      />
      <TextInput
        placeholder="password"
        style={styles.input}
        placeholderTextColor={Theme.colors.gray1}
      />
      <View style={{ alignItems: 'flex-end' }}>
        <TouchableOpacity style={styles.submit}>
          <Text style={{ color: Theme.colors.gray5, ...Theme.typography.bold }}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.signupText}>Don't have an account?</Text>
      <TouchableOpacity style={styles.signupButton}>
        <Text style={{ color: Theme.colors.gray1, ...Theme.typography.bold }}>
          Submit
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
