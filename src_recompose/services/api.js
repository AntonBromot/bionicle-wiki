import { BionicleModel, CollectionsModel, UpdatesModel, LegendsModel } from "./collections"

const API = {
    getCollectionsUpdateDate: () => new Promise( ( resolve, reject ) => {
        setTimeout( () => resolve( UpdatesModel.collections ), 1000 )
    } ),
    getCollectionsData: () => new Promise( ( resolve, reject ) => {
        setTimeout( () => resolve( CollectionsModel ), 2000 )
    } ),
    getCollectUpdateDateByYear: (colYear, colType) => new Promise(( resolve, reject ) => {
        let updateDate = UpdatesModel.bionicles[colYear]?.[String(colType)]

        if ( !updateDate ) {
            const collectionDate = BionicleModel.filter( ({ year, type }) => ( year === colYear && type === String(colType) )).map(({ updateAt }) => +new Date(updateAt) ),
                  lastUpdate = Math.max( ...collectionDate );

            if ( !UpdatesModel.bionicles[colYear] ) UpdatesModel.bionicles[colYear] = {}

            updateDate = new Date(lastUpdate)
            UpdatesModel.bionicles[colYear].updateDate = updateDate
        }

        setTimeout( () => resolve( updateDate ), 1000 )
    } ),
    getCollectByYear: (colYear, colType) => new Promise( ( resolve, reject ) => {
        const dataByYear = BionicleModel.filter( ({ year, type  }) => ( year === colYear && type === String(colType) ) )
        setTimeout( () => resolve( dataByYear ), 2000 )
    } ),
    getLegendsUpdateDate: () => new Promise( ( resolve, reject ) => {
        setTimeout( () => resolve( UpdatesModel.legends ), 1000 )
    } ),
    getLegends: () => new Promise( ( resolve, reject ) => {
        const legendsPartial = LegendsModel.map(({ id, legendImg, legendTitle }) => ({ id, legendImg, legendTitle }) )
        setTimeout( () => resolve( legendsPartial ), 1000 )
    } ),
    getLegendByIdUpdateDate: id => new Promise( ( resolve, reject ) => {
        const [ { updateAt } ] = LegendsModel.filter( item => item.id === id );
        setTimeout( () => resolve( updateAt ), 1000 )
    } ),
    getLegendById: id => new Promise( ( resolve, reject ) => {
        const itemById = LegendsModel.find( item => item.id === id );
        setTimeout( () => resolve( itemById ), 1000 )
    } ),
}


export default API
