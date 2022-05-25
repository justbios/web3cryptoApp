import { View, Text } from 'react-native';
import React, { memo } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// screen
import Welcome from '../screens/Welcome';
import { Routes } from './Routes';

type RootStackParamList = {
  Welcome: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={Routes.Welcome} component={Welcome} />
    </Stack.Navigator>
  );
};

export default memo(AppNavigation);
