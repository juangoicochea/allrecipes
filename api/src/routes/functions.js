const { API_KEY } = process.env;
const axios = require('axios');
const { Recipe, Diet } = require('../db');

const getApiRecipes = async () => {
    let recipesResults = [];
    let response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${ API_KEY }&addRecipeInformation=true&number=100`);
    const { results } = response.data;
    
    if( results.length > 0 ) {
        const recipesReady = results.map( recipe => {
            return {
                id: recipe.id,
                title: recipe.title,
                image: recipe.image,
                dishTypes: recipe.dishTypes.map( type => type ),
                summary: recipe.summary,
                healthScore: recipe.healthScore,
                weightWatcherSmartPoints: recipe.weightWatcherSmartPoints,
                steps: recipe.analyzedInstructions[0]?.steps,
                diets: recipe.diets
            }
        });
        recipesResults = recipesResults.concat( recipesReady );
    }
    return recipesResults;
}

const getDbRecipes = async () => {
    return await Recipe.findAll({
        include: {
            model: Diet,
            attributes: [ 'name' ],
            through: {
                attributes: []
            }
        }
    });
}

const getAllRecipes = async () => {
    const apiRecipes = await getApiRecipes();
    const dbRecipes = await getDbRecipes();
    const allRecipes = apiRecipes.concat( dbRecipes );
    return allRecipes;
}

const getApiDiets = async () => {
    let response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${ API_KEY }&addRecipeInformation=true&number=10`);
    const { results } = response.data;
    let apiAllDiets = results.map( recipe => recipe.diets );
    apiAllDiets = apiAllDiets.flat( 1 );
    const uniqueApiDiets = [...new Set(apiAllDiets)];

    uniqueApiDiets.forEach( ( recipe, id ) => {
        Diet.findOrCreate({
            where: { name: recipe, id: id+1 }
        });
    });
    
    const allDiets =  await Diet.findAll();
    return allDiets;
}

const getRecipeDetail = async ( id ) => {
    if( id.length > 7 && typeof id === 'string' ) {
        const recipesDB = await Recipe.findAll({
            include: {
                model: Diet,
                attributes: [ 'name' ],
                through: {
                    attributes: []
                }
            }
        });
        let recipeDb = await recipesDB.filter( recipe => recipe.dataValues.id === id );
        return recipeDb[0].dataValues;
    }
    let response = await axios.get(`https://api.spoonacular.com/recipes/${ id }/information?apiKey=${ API_KEY }`);
    const recipeApi = {
        id: response.data.id,
        title: response.data.title,
        image: response.data.image,
        dishTypes: response.data.dishTypes.map( type => type ),
        summary: response.data.summary,
        healthScore: response.data.healthScore,
        weightWatcherSmartPoints: response.data.weightWatcherSmartPoints,
        steps: response.data.analyzedInstructions[0].steps,
        diets: response.data.diets
    }
    return recipeApi;
}

const postRecipe = async ( data ) => { 
    try {
        let {
            title,
            image,
            dishTypes,
            summary,
            healthScore,
            weightWatcherSmartPoints,
            steps,
            diets,
            created_db
        } = data;

       let recipeCreated = await Recipe.create({
            title,
            image,
            dishTypes,
            summary,
            healthScore,
            weightWatcherSmartPoints,
            steps,
            created_db
        }); 

        let recipeDietsDb = await Diet.findAll({
            where: { name: diets }
        });
        recipeCreated.addDiet( recipeDietsDb );

    } catch (error) {
        console.log( error );
    }
}

const updateRecipe = async ( recipe, data ) => { 
    try {
        let {
            title,
            image,
            dishTypes,
            summary,
            healthScore,
            weightWatcherSmartPoints,
            steps,
            diets,
            created_db
        } = data;

       let recipeUpdated = await recipe.update({
            title,
            image,
            dishTypes,
            summary,
            healthScore,
            weightWatcherSmartPoints,
            steps,
            created_db
        }); 

        let recipeDietsDb = await Diet.findAll({
            where: { name: diets }
        });
        await recipeUpdated.setDiets( recipeDietsDb );

    } catch (error) {
        console.log( error );
    }
}

module.exports = {
    getAllRecipes,
    getApiDiets,
    postRecipe,
    getRecipeDetail,
    updateRecipe
}