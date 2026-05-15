import React from 'react';
import { View } from 'react-native';
import AppEntry from './src/App';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <AppEntry />
      <StatusBar style="auto" />
    </View>
  );
}