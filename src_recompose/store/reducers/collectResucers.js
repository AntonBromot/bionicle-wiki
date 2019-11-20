import { FETCH_COLLECT, FETCH_COLLECT_SUCCESS, FETCH_COLLECT_FAILED, FETCH_COLLECT_OLD_DATA } from "../actions/collectActions"

const initialState = {
    collections: {},
    fetching: false
}

export default function collectReducer(state = initialState, { type, payload } ) {
    switch ( type ) {
        case FETCH_COLLECT:
            return { ...state, fetching: true };
        case FETCH_COLLECT_OLD_DATA:
            return { ...state, fetching: false };
        case FETCH_COLLECT_SUCCESS:
            const { newUpdateDate: updatedDate, collection, year, colType } = payload,
                  updatedCollection = { ...state.collections[year], [colType]: { data: collection, updatedDate } },
                  collections = { ...state.collections, [year]: updatedCollection }

            return { ...state, collections, fetching: false };
        case FETCH_COLLECT_FAILED:
            return { ...state, fetching: false };
        default:
            return state;
    }
}
