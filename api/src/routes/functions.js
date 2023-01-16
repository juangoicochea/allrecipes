const { API_KEY } = process.env;
const axios = require('axios');
const { Recipe, Diet } = require('../db');

const getApiRecipes = async () => {
    let recipesResults = [];
    let response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
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
                steps: recipe.steps
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
            attributes: ['name'],
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


module.exports = {
    getAllRecipes
}