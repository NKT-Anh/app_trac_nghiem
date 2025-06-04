import React, { useContext } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import { UserProvider,UserContext } from '../Context/Usercontext';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const RootNavigation = () => {
  // Tạm thời bỏ qua logic user và loading để debug
  // const { user, loading } = useContext(UserContext);

  // if (loading) {
  //   return (
  //     <View style={styles.container}>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //     </View>
  //   );
  // }

  return (
    <NavigationContainer>
      {/* Tạm thời luôn hiển thị AuthNavigator */}
      <AuthNavigator />
      {/* {user ? <MainNavigator /> : <AuthNavigator />} */}
    </NavigationContainer>
  );
};

const RootNavigator = () => {
  // Vẫn giữ UserProvider để tránh các lỗi context khác có thể xảy ra
  return (
    <UserProvider>
        <NavigationContainer>
          <AuthNavigator/>
        </NavigationContainer>
    </UserProvider>
  );
};

export default RootNavigator

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});