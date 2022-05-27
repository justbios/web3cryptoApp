import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// screen
import Welcome from '../screens/Welcome';
import Profile from '../screens/Profile';
import { Routes } from './Routes';

type RootStackParamList = {
  [Routes.Welcome]: undefined;
  [Routes.Profile]: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      // initialRouteName={Routes.Profile}
    >
      <Stack.Screen name={Routes.Welcome} component={Welcome} />
      <Stack.Screen name={Routes.Profile} component={Profile} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
