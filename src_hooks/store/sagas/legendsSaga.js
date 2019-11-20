import { call, put, select } from 'redux-saga/effects';

import { getLegendsUpdateDateSelector, getLegendByIdUpdateDateSelector, getLegendByIdSelector, getLegendsSelector } from '../selectors/legendsSelectors'
import { FETCH_LEGENDS_SUCCESS, FETCH_LEGENDS_FAILED, FETCH_LEGEND_BY_ID_SUCCESS, FETCH_LEGENDS_OLD_DATA } from "../actions/legendsAction"

export function* getLegends( api, { callback } ) {
    try {
        const updatedDate = yield select(getLegendsUpdateDateSelector),
            newUpdateDate = yield call( api.getLegendsUpdateDate ),
            shouldUpdate = !updatedDate || ( updatedDate < newUpdateDate );

        if ( shouldUpdate ) {
            const newLegends = yield call( api.getLegends ),
                  oldLegends = yield select( getLegendsSelector );

            oldLegends.forEach( ({ legendsData, id }) => {
                if ( !legendsData?.length ) return

                const index = newLegends.findIndex( item => item.id === id );
                newLegends[index].legendsData = legendsData
            })

            yield put({ type: FETCH_LEGENDS_SUCCESS, payload: { legends: newLegends, updatedDate: newUpdateDate } });
            callback( true, newLegends );
        } else {
            yield put({ type: FETCH_LEGENDS_OLD_DATA })
            callback( true );
        }

    } catch (err) {
        //errorHandler({ err, selectedLanguage, withoutAlert: true });
        yield put({ type: FETCH_LEGENDS_FAILED, err });
        callback( false );
    }
}

export function* getLegendById( api, { id, callback } ) {
    try {
        const updatedDate = yield select(getLegendByIdUpdateDateSelector, id),
              newUpdateDate = yield call( api.getLegendByIdUpdateDate, id ),
              shouldUpdate = !updatedDate || ( updatedDate < newUpdateDate ),
              legend = shouldUpdate ? yield call( api.getLegendById, id ) : yield select( getLegendByIdSelector, id )

        yield put({ type: FETCH_LEGEND_BY_ID_SUCCESS, payload: { legend, legendId: id } });
        callback( true );
    } catch (err) {
        //errorHandler({ err, selectedLanguage, withoutAlert: true });
        yield put({ type: FETCH_LEGENDS_FAILED, err });
        callback( false );
    }
}

