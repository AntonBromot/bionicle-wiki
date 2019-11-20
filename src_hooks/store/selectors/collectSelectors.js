export const getCollectUpdateDate = ( store, year, type  ) => store.collect.collections[year]?.[type]?.updatedDate
export const getAllCollectionsSelector = ( store ) => store.collect.collections
