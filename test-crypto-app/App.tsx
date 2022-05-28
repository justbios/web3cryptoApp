import './global';
import React, { Suspense } from 'react';
//libs
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './src/navigation/AppNavigation';
import { RecoilRoot } from 'recoil';
import { ActivityIndicator, View } from 'react-native';

const App: React.VFC = () => (
  <Suspense
    fallback={
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    }
  >
    <RecoilRoot>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </RecoilRoot>
  </Suspense>
);

export default App;
