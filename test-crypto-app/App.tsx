import './global';
import React from "react";
//libs
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './src/navigation/AppNavigation';
import { RecoilRoot } from 'recoil';

const App: React.VFC = () => (
    <RecoilRoot>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </RecoilRoot>
  );

export default App;
