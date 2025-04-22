/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {AuthProvider} from './src/contexts/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';

const App: React.FC = () => (
  <AuthProvider>
    <AppNavigator />
  </AuthProvider>
);

export default App;
