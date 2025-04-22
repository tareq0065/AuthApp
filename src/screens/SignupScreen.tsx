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

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

export default function SignupScreen({navigation}: Props) {
  const {signup} = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>('');
  const [secure, setSecure] = useState<boolean>(true);
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  const handleSignup = async () => {
    setError('');
    if (!name.trim() || !email.trim() || !password) {
      setError('All fields are required');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email format');
      return;
    }
    if (password.length < 6) {
      setError('Password must be greater than or equal to 6 characters');
      return;
    }
    const res = await signup(name, email, password);
    if (!res.success) {
      setError(res.message || 'Signup failed');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Animated.View
        style={{...styles.inner, transform: [{translateY: slideAnim}]}}>
        <Text style={styles.title}>Create Account</Text>
        {error.length > 0 && (
          <Text style={styles.error} testID="signupError">
            {error}
          </Text>
        )}
        <TextInput
          placeholder="Name"
          testID="signupName"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder="Email"
          testID="signupEmail"
          keyboardType="email-address"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <View style={styles.pwContainer}>
          <TextInput
            placeholder="Password"
            testID="signupPassword"
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
          onPress={handleSignup}
          testID="signupButton">
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          testID="gotoLogin">
          <Text style={styles.link}>Go to Login</Text>
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
    backgroundColor: '#28A745',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 12,
  },
  buttonText: {color: '#fff', fontWeight: '600'},
  link: {color: '#28A745', textAlign: 'center', marginTop: 8},
  error: {color: 'red', textAlign: 'center'},
});
