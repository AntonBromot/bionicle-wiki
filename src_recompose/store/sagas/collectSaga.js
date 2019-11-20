import { call, put, select } from 'redux-saga/effects';

import { getCollectUpdateDate } from "../selectors/collectSelectors"
import { FETCH_COLLECT_OLD_DATA, FETCH_COLLECT_FAILED, FETCH_COLLECT_SUCCESS } from "../actions/collectActions"

export function* getCollect( api, { year, colType, callback } ) {
    try {
        const updatedDate = yield select(getCollectUpdateDate, year, colType ),
              newUpdateDate = yield call( api.getCollectUpdateDateByYear, year, colType ),
              shouldUpdate = !updatedDate || ( updatedDate < newUpdateDate );

        if ( shouldUpdate ) {
            const collection = yield call( api.getCollectByYear, year, colType )
            yield put({ type: FETCH_COLLECT_SUCCESS, payload: { newUpdateDate, collection, year, colType } });
            callback( true, collection );
        } else {
            yield put({ type: FETCH_COLLECT_OLD_DATA })
            callback( true );
        }

    } catch (err) {
        //errorHandler({ err, selectedLanguage, withoutAlert: true });
        yield put({ type: FETCH_COLLECT_FAILED, err });
        callback( false );
    }
}
