export const FETCH_LEGENDS = "FETCH_LEGENDS"
export const FETCH_LEGEND_BY_ID = "FETCH_LEGEND_BY_ID"
export const FETCH_LEGEND_BY_ID_SUCCESS = "FETCH_LEGEND_BY_ID_SUCCESS"
export const FETCH_LEGENDS_SUCCESS = "FETCH_LEGENDS_SUCCESS"
export const FETCH_LEGENDS_FAILED = "FETCH_LEGENDS_FAILED"
export const FETCH_LEGENDS_OLD_DATA = "FETCH_LEGENDS_OLD_DATA"

export const getLegends = callback => ({
    type: FETCH_LEGENDS,
    callback
})

export const getLegendById = ( id, callback ) => ({
    type: FETCH_LEGEND_BY_ID,
    id,
    callback
})
