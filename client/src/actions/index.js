import axios from 'axios';

export const getRecipes = () => {
    return async ( dispatch ) => {
        const json = await axios( 'http://localhost:3001/recipes' );
        dispatch({
            type: 'GET_RECIPES',
            payload: json.data
        });
    }
}

export const getDiets = () => {
    return async ( dispatch ) => {
        const json = await axios( 'http://localhost:3001/diets' );
        dispatch({
            type: 'GET_DIETS',
            payload: json.data
        });
    }
}

export const filterRecipesByDiet = ( payload ) => {
    return {
        type: 'FILTER_BY_DIET',
        payload
    }
}

export const filterRecipesByCreator = ( payload ) => {
    return {
        type: 'FILTER_BY_CREATOR',
        payload
    }
}

export const orderBy = ( payload ) => {
    return {
        type: 'ORDER_BY',
        payload
    }
}

export const searchByName = ( payload ) => {
    return async function( dispatch ) {
        try {
            const json = await axios(`http://localhost:3001/recipes?title=${ payload }`);
            dispatch({
                type: 'SEARCH_BY_NAME',
                payload: json.data
            });
        } catch ( error ) {
            dispatch({
                type: 'SEARCH_BY_NAME',
                payload: []
            });
        }
    }
}

export const postRecipe = ( payload ) => {
    return async function() {
        const json = await axios.post( 'http://localhost:3001/recipes', payload );
        return json;
    }
}