export const getLegendsUpdateDateSelector = store => store.legends.updatedDate
export const getLegendsSelector = store => store.legends.legends
export const getLegendByIdUpdateDateSelector = ( store, searchId ) => store.legends.legends.find( ({id}) => id === searchId)?.updateAt
export const getLegendByIdSelector = ( store, searchId ) => store.legends.legends.find( ({id}) => id === searchId)
