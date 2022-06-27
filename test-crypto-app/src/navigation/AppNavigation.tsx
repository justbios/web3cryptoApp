import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// screen
import Profile from '../screens/Profile';
import { Routes } from './Routes';
import ScanQR from '../screens/ScanQR';

type RootStackParamList = {
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
    >
      <Stack.Screen name={Routes.ScanQR} component={ScanQR} />
      <Stack.Screen name={Routes.Profile} component={Profile} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
