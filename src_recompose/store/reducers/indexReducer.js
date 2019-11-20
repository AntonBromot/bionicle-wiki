import { combineReducers } from 'redux';
import collectionsReducer from './collectionsReducers';
import collectReducer from "./collectResucers"
import favoritesReducer from './favoritesReducers';
import legendsReducer from './legendsReducers'

const reducers = {
  collections: collectionsReducer,
  collect: collectReducer,
  favorites: favoritesReducer,
  legends: legendsReducer
};

const appReducer = combineReducers(reducers),
      rootReducer = (state, action) => appReducer(state, action);

export default rootReducer;
