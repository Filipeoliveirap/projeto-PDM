import React from 'react';
import { StatusBar } from 'react-native';
import JobScreen from './src/screens/JobScreen';
import ThemedView from './src/components/ThemedView';

export default function App() {
  return (
    <ThemedView lightColor="#fff" darkColor="#000" style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <JobScreen />
    </ThemedView>
  );
}
