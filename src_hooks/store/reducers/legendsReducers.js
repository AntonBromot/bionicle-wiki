import { FETCH_LEGENDS, FETCH_LEGENDS_OLD_DATA, FETCH_LEGEND_BY_ID, FETCH_LEGENDS_FAILED, FETCH_LEGEND_BY_ID_SUCCESS, FETCH_LEGENDS_SUCCESS} from "../actions/legendsAction"

const initialState = {
    legends: [],
    fetching: false,
    updatedDate: null
}

export default function legendsReducer(state = initialState, { type, payload } ) {
    switch ( type ) {
        case FETCH_LEGENDS || FETCH_LEGEND_BY_ID || FETCH_LEGEND_BY_ID_PARTIAL:
            return { ...state, fetching: true };
        case FETCH_LEGENDS_OLD_DATA:
            return { ...state, fetching: false };
        case FETCH_LEGENDS_SUCCESS:
            const { legends, updatedDate } = payload;
            return { ...state, legends, updatedDate, fetching: false };
        case FETCH_LEGEND_BY_ID_SUCCESS:
            const { legend, legendId } = payload,
                  legendIndex = state.legends.findIndex( ({id}) => id === legendId ),
                  updLegends = [ ...state.legends ];

            updLegends[legendIndex] = legend
            return { ...state, legends: updLegends, fetching: false  }
        case FETCH_LEGENDS_FAILED:
            return {  ...state, fetching: false };
        default:
            return state;
    }
}
