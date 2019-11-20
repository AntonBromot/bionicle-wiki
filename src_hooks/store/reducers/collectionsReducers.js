import { FETCH_COLLECTIONS_YEARS, FETCH_COLLECTIONS_YEARS_FAILED, FETCH_COLLECTIONS_YEARS_SUCCESS, FETCH_COLLECTIONS_YEARS_OLD_DATA } from "../actions/collectionsActions"

const initialState = {
    collectionsByYear: [],
    fetching: false,
    updatedDate: null
}

export default function collectionsReducer(state = initialState, { type, payload } ) {
    switch ( type ) {
        case FETCH_COLLECTIONS_YEARS:
            return { ...state, fetching: true };
        case FETCH_COLLECTIONS_YEARS_OLD_DATA:
            return { ...state, fetching: false };
        case FETCH_COLLECTIONS_YEARS_SUCCESS:
            const { collectionsData: collectionsByYear, newUpdateDate: updatedDate } = payload
            return { ...state, collectionsByYear, updatedDate, fetching: false };
        case FETCH_COLLECTIONS_YEARS_FAILED:
            return {  ...state, fetching: false };
        default:
            return state;
    }
}
