import AsyncStorage from '@react-native-community/async-storage';


const REDUX_PERSIST = {
  active: true,
  reducerVersion: '1.0',
  storeConfig: {
    key: 'primary',
    storage: AsyncStorage,
    blacklist: [],
    whitelist: [ 'collections', 'collect', 'favorites', 'legends' ]
  },
};

export default REDUX_PERSIST;
