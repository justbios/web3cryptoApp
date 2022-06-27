import './global';
import React, {Suspense, useEffect, useState} from 'react';
//libs
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './src/navigation/AppNavigation';
import { RecoilRoot } from 'recoil';
import { ActivityIndicator, Platform, View } from 'react-native';
import {initDI} from "./src/di";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { withWalletConnect } from "@walletconnect/react-native-dapp";
const {  scheme } = require("expo");

const App: React.VFC = () => {
    const [appSetUp, setAppSetUp] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            await initDI();
            setAppSetUp(true);
        })();
    }, [])

    if (!appSetUp) {
        return null;
    }

    return (
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
}

export default withWalletConnect(App, {
    redirectUrl:
      Platform.OS === "web" ? window.location.origin : `${scheme}://`,
    storageOptions: {
      asyncStorage: AsyncStorage as any,
    },
  });
