import { call, put, select } from 'redux-saga/effects';

import { getSelectedUpdatedDate } from '../selectors/collectionsSelectors'
import { FETCH_COLLECTIONS_YEARS_SUCCESS, FETCH_COLLECTIONS_YEARS_FAILED, FETCH_COLLECTIONS_YEARS_OLD_DATA } from "../actions/collectionsActions"

export function* getCollections( api, { callback } ) {
    try {
        const updatedDate = yield select(getSelectedUpdatedDate),
              newUpdateDate = yield call( api.getCollectionsUpdateDate ),
              shouldUpdate = !updatedDate || ( updatedDate < newUpdateDate );

        if ( shouldUpdate ) {
            const collectionsData = yield call( api.getCollectionsData )
            yield put({ type: FETCH_COLLECTIONS_YEARS_SUCCESS, payload: { collectionsData, newUpdateDate } });
            callback( true, collectionsData );
        } else {
            yield put({ type: FETCH_COLLECTIONS_YEARS_OLD_DATA })
            callback( true );
        }

    } catch (err) {
        //errorHandler({ err, selectedLanguage, withoutAlert: true });
        yield put({ type: FETCH_COLLECTIONS_YEARS_FAILED, err });
        callback( false );
    }
}
