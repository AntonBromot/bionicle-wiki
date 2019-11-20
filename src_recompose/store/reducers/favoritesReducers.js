import { FETCH_FAVORITES, FETCH_FAVORITES_ERROR, FETCH_FAVORITES_SUCCESS, SET_FAVORITE, REMOVE_FAVORITE } from "../actions/favoritesActions"
import { BionicleModel } from '../../services/collections';

const initialState = {
    favorites: [],
    favoritesIds: [],
    fetching: false
}


export default function favoritesReducer(state = initialState, { type, payload } ) {
    switch ( type ) {
        case FETCH_FAVORITES:
            return { ...state, fetching: true };
        case FETCH_FAVORITES_SUCCESS:
            const { favorites } = payload
            return { ...state, favorites, fetching: false };
        case FETCH_FAVORITES_ERROR:
            return { ...state, fetching: false };
        case SET_FAVORITE:
            return { ...state, favoritesIds: [ ...state.favoritesIds, payload.id ] };
        case REMOVE_FAVORITE:
            return { ...state, favoritesIds: state.favoritesIds.filter( id => id !== payload.id  ) }
        default:
            return state;
    }
}
