export const FETCH_COLLECT = "FETCH_COLLECT"
export const FETCH_COLLECT_SUCCESS = "FETCH_COLLECT_SUCCESS"
export const FETCH_COLLECT_FAILED = "FETCH_COLLECT_FAILED"
export const FETCH_COLLECT_OLD_DATA = "FETCH_COLLECT_OLD_DATA"


export const getCollectionByYear = ( year, colType, callback ) => ({
    type: FETCH_COLLECT,
    year,
    colType,
    callback
})

