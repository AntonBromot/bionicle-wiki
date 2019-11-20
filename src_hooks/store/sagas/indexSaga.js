import { takeEvery } from 'redux-saga/effects';
import API from '../../services/api';

import { FETCH_COLLECTIONS_YEARS } from '../actions/collectionsActions'
import { FETCH_COLLECT } from '../actions/collectActions'
import { FETCH_FAVORITES } from '../actions/favoritesActions'
import { FETCH_LEGENDS, FETCH_LEGEND_BY_ID, FETCH_LEGEND_BY_ID_PARTIAL } from "../actions/legendsAction"

import { getCollections } from './collectionsSaga'
import { getCollect } from './collectSaga'
import { getFavorites } from './favoritesSaga'
import { getLegends, getLegendById } from "./legendsSaga"


function* rootSaga() {
  yield takeEvery( FETCH_COLLECTIONS_YEARS, getCollections, API )
  yield takeEvery( FETCH_COLLECT, getCollect, API )
  yield takeEvery( FETCH_FAVORITES, getFavorites, API )
  yield takeEvery( FETCH_LEGENDS, getLegends, API )
  yield takeEvery( FETCH_LEGEND_BY_ID, getLegendById, API )
}

export default rootSaga;
