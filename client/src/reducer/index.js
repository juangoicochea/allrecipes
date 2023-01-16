const initialState = {
    recipes: [],
    recipesBackup: []
}

export const rootReducer = ( state=initialState, action ) => {
    switch ( action.type ) {
        case 'GET_RECIPES':
            return {
                ...state,
                recipes: action.payload,
                recipesBackup: action.payload
            }
    
        default:
            return state;
    }
}  