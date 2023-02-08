import axios from 'axios';

export const getRecipes = () => {
    return async ( dispatch ) => {
        const json = await axios( '/recipes' );
        dispatch({
            type: 'GET_RECIPES',
            payload: json.data
        });
    }
}

export const getDiets = () => {
    return async ( dispatch ) => {
        const json = await axios( '/diets' );
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
    return async ( dispatch ) => {
        try {
            const json = await axios(`/recipes?title=${ payload }`);
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

export const getRecipeDetail = ( id ) => {
    return async ( dispatch ) => {
        const json = await axios(`/recipes/${ id }`);
        dispatch({
            type: 'GET_DETAIL',
            payload: json.data
        });
    }
}

export const postRecipe = ( payload ) => {
    return async () => {
        const json = await axios.post( '/recipes', payload );
        return json;
    }
}

export const updateRecipe = ( id, data ) => {
    return async () => {
        const json = await axios.put( `/recipes/${ id }`, data );
        return json;
    }
}

export const deleteRecipe = ( id ) => {
    return async () => {
        const json = await axios.delete( `/recipes/${ id }` );
        return json;
    }
}