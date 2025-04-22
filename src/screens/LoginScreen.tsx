import React, {useState, useContext, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AppNavigator';
import {AuthContext} from '../contexts/AuthContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({navigation}: Props) {
  const {login} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>('');
  const [secure, setSecure] = useState<boolean>(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleLogin = async () => {
    setError('');
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email format');
      return;
    }
    if (!password) {
      setError('Password required');
      return;
    }
    const res = await login(email, password);
    if (!res.success) {
      setError(res.message || 'Login failed');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Animated.View style={{...styles.inner, opacity: fadeAnim}}>
        <Text style={styles.title}>Welcome Back</Text>
        {error.length > 0 && (
          <Text style={styles.error} testID="loginError">
            {error}
          </Text>
        )}
        <TextInput
          placeholder="Email"
          testID="loginEmail"
          keyboardType="email-address"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <View style={styles.pwContainer}>
          <TextInput
            placeholder="Password"
            testID="loginPassword"
            secureTextEntry={secure}
            autoComplete="off"
            textContentType="none"
            importantForAutofill="no"
            style={[styles.input, {flex: 1}]}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setSecure(s => !s)}>
            <Text style={styles.toggle}>{secure ? '👁️' : '🚫'}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          testID="loginButton">
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Signup')}
          testID="gotoSignup">
          <Text style={styles.link}>Go to Signup</Text>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', padding: 20},
  inner: {width: '100%', alignSelf: 'center'},
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
  },
  pwContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginVertical: 8,
  },
  toggle: {fontSize: 18, marginLeft: 8},
  button: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 12,
  },
  buttonText: {color: '#fff', fontWeight: '600'},
  link: {color: '#4A90E2', textAlign: 'center', marginTop: 8},
  error: {color: 'red', textAlign: 'center'},
});
