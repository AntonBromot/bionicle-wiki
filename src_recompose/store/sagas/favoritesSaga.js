import { put, select } from 'redux-saga/effects';

import { getFavoritesIdsSelector } from "../selectors/favoritesSelectors"
import { getAllCollectionsSelector } from "../selectors/collectSelectors"
import { FETCH_FAVORITES_SUCCESS, FETCH_FAVORITES_ERROR } from '../actions/favoritesActions';


export function* getFavorites( api, { callback } ) {
    try {
        const allCollections = yield select( getAllCollectionsSelector ),
              favoritesIds = yield select( getFavoritesIdsSelector );

        let bionicleModels = []

        Object.values( allCollections ).forEach( itemsByYear => Object.values( itemsByYear ).forEach( itemByType => { bionicleModels = [ ...bionicleModels, ...itemByType.data ] } ) )

        const favorites = bionicleModels.filter( ({ id }) => favoritesIds.includes( id ) )

        yield put({ type: FETCH_FAVORITES_SUCCESS, payload: { favorites } });
        callback( favorites );

    } catch (err) {
        //errorHandler({ err, selectedLanguage, withoutAlert: true });
        yield put({ type: FETCH_FAVORITES_ERROR, err });
        callback( false );
    }
}
