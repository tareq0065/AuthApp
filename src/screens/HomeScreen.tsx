import React, {useContext, useRef, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Animated} from 'react-native';
import {AuthContext} from '../contexts/AuthContext';

export default function HomeScreen() {
  const {user, logout} = useContext(AuthContext);
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, [fade]);

  return (
    <Animated.View style={[styles.container, {opacity: fade}]}>
      <Text style={styles.welcome} testID="welcomeText">
        Hello, {user?.name}!
      </Text>
      <Text style={styles.email}>{user?.email}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={logout}
        testID="logoutButton">
        <Text style={styles.btnText}>Logout</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcome: {fontSize: 24, fontWeight: '600'},
  email: {fontSize: 16, color: '#666', marginVertical: 8},
  button: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#DC3545',
    borderRadius: 8,
    width: '60%',
    alignItems: 'center',
  },
  btnText: {color: '#fff', fontWeight: '600'},
});
