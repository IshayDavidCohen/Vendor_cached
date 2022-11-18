import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView} from 'react-native';
import React, { Component } from 'react';

import Navigation from './src/navigation'
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <SafeAreaView style={styles.root}>
      <NavigationContainer>
        <Navigation/>
      </NavigationContainer>
    </SafeAreaView>
  );
}

// App.js styles, covers style across the main page
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC',
  },
  Image: {
    flex: 1,
    resizeMode: 'center'
  }
});
