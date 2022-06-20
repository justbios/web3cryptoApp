import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// screen
import Welcome from '../screens/Welcome';
import Profile from '../screens/Profile';
import { Routes } from './Routes';
import ScanQR from '../screens/ScanQR';

type RootStackParamList = {
  [Routes.Welcome]: undefined;
  [Routes.Profile]: undefined;
  [Routes.ScanQR]: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation: React.VFC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={Routes.Welcome}
    >
      <Stack.Screen name={Routes.Welcome} component={Welcome} />
      <Stack.Screen name={Routes.ScanQR} component={ScanQR} />
      <Stack.Screen name={Routes.Profile} component={Profile} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
