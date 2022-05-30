import './global';
import React, {Suspense, useEffect, useState} from 'react';
//libs
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './src/navigation/AppNavigation';
import { RecoilRoot } from 'recoil';
import { ActivityIndicator, View } from 'react-native';
import {initDI} from "./src/di";

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

export default App;
