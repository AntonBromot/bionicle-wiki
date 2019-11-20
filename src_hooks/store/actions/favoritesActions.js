export const FETCH_FAVORITES = "FETCH_FAVORITES"
export const FETCH_FAVORITES_SUCCESS = "FETCH_FAVORITES_SUCCESS"
export const FETCH_FAVORITES_ERROR = "FETCH_FAVORITES_ERROR"
export const SET_FAVORITE = "SET_FAVORITE"
export const REMOVE_FAVORITE = "REMOVE_FAVORITE"


export const getFavorites = ( callback ) => ({
    type: FETCH_FAVORITES,
    callback
})

export const setFavorite = ( id, callback ) => ({
    type: SET_FAVORITE,
    payload: { id, callback }
})

export const removeFavorite = ( id, callback ) => ({
    type: REMOVE_FAVORITE,
    payload: { id, callback }
})

