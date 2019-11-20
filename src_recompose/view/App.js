import React from 'react';
import { StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { compose, lifecycle } from 'recompose'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import MainNavigation from '../navigation'
import configureStore from '../store/reducers/indexStore';

const { store, persistor } = configureStore();

const App = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
              <StatusBar barStyle="dark-content"/>
              <MainNavigation />
        </PersistGate>
    </Provider>
)

const enhange = compose(
    lifecycle({
       componentDidMount: () => SplashScreen.hide()
    })
)

export default enhange( App )


