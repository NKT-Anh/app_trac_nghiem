import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RootNavigator from './src/Navigator/RootNavigator';
export default function App() {
  return (
    <View style={{flex:1}}>
      <RootNavigator/>
      <StatusBar style="auto" />
    </View>
  );
}