const initialState = {
    recipes: [],
    recipesBackup: [],
    diets: [],
    detail: [],
    filtered: []
}

export const rootReducer = ( state=initialState, action ) => {
    switch ( action.type ) {
        case 'GET_RECIPES':
            return {
                ...state,
                recipes: action.payload,
                recipesBackup: action.payload
            }
        case 'GET_DIETS':
            return {
                ...state,
                diets: action.payload
            }
        case 'FILTER_BY_DIET':
            const allRecipes = state.recipesBackup;
            const recipesFiltered = action.payload === 'All' ? allRecipes : 
                allRecipes?.filter( recipe => typeof recipe.diets[0] === 'object' ? 
                recipe.diets.find( e => e.name === action.payload ) :
                recipe.diets.includes( action.payload ) );
            return {
                ...state,
                recipes: recipesFiltered,
                filtered: recipesFiltered
            }
        case 'FILTER_BY_CREATOR':
            const recipesAll = state.recipesBackup;

            const filteredRecipes = action.payload === 'All' ? recipesAll :
                action.payload === 'API_Created' ? 
                recipesAll?.filter( recipe => !recipe.created_db ) :
                recipesAll?.filter( recipe => recipe.created_db );
            return {
                ...state,
                recipes: filteredRecipes,
                filtered: filteredRecipes
            }
        case 'ORDER_BY':
            let loadedRecipes = state.filtered;
            if( loadedRecipes.length === 0 ) {
                loadedRecipes = state.recipes;
            }
            let orderBy = '';
            if( action.payload === 'All' ) {
                orderBy = state.recipesBackup;
            }

            if( action.payload === 'Asc_name' ) {
                orderBy = loadedRecipes.sort( ( a, b ) => {
                    if( a.title > b.title ) {
                        return 1;
                    }
                    if( b.title > a.title ) {
                        return -1;
                    }
                    return 0;
                });
            }

            if( action.payload === 'Desc_name' ) {
                orderBy = loadedRecipes.sort( ( a, b ) => {
                    if( a.title > b.title ) {
                        return -1;
                    }
                    if( b.title > a.title ) {
                        return 1;
                    }
                    return 0;
                });
            }

            if( action.payload === 'Asc_name' ) {
                orderBy = loadedRecipes.sort( ( a, b ) => {
                    if( a.title > b.title ) {
                        return 1;
                    }
                    if( b.title > a.title ) {
                        return -1;
                    }
                    return 0;
                });
            }

            if( action.payload === 'Desc_name' ) {
                orderBy = loadedRecipes.sort( ( a, b ) => {
                    if( a.title > b.title ) {
                        return -1;
                    }
                    if( b.title > a.title ) {
                        return 1;
                    }
                    return 0;
                });
            }

            if( action.payload === 'Asc_healthScore' ) {
                orderBy = loadedRecipes.sort( ( a, b ) => {
                    if( a.healthScore > b.healthScore ) {
                        return 1;
                    }
                    if( b.healthScore > a.healthScore ) {
                        return -1;
                    }
                    return 0;
                });
            }

            if( action.payload === 'Desc_healthScore' ) {
                orderBy = loadedRecipes.sort( ( a, b ) => {
                    if( a.healthScore > b.healthScore ) {
                        return -1;
                    }
                    if( b.healthScore > a.healthScore ) {
                        return 1;
                    }
                    return 0;
                });
            }

            return {
                ...state,
                recipes: orderBy
            }
        
        case 'SEARCH_BY_NAME':
            return {
                ...state,
                recipes: action.payload
            }
        case 'GET_DETAIL':
            return {
                ...state,
                detail: action.payload
            }
    
        default:
            return state;
    }
}  