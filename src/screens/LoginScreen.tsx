import React, {useCallback, useState} from 'react';
import {View, Text, TextInput, StyleSheet, Button} from 'react-native';
import {login} from '../service/LoginService';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = useCallback(async () => {
    try {
      await login({username, password});
    } catch (error) {
      console.error(error);
    }
  }, [username, password]);

  return (
    <View style={style.container}>
      <View style={style.loginCard}>
        <Text>Login</Text>
        <TextInput
          style={style.input}
          placeholder="Email"
          onChangeText={setUsername}
        />
        <TextInput
          style={style.input}
          placeholder="Password"
          onChangeText={setPassword}
        />
        <Button title="Login" onPress={handleLogin} />
      </View>
    </View>
  );
};

export default LoginScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  loginCard: {
    gap: 8,
    padding: 16,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
  },

  input: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },

  button: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
  },

  error: {
    color: 'red',
    marginBottom: 10,
  },
});
