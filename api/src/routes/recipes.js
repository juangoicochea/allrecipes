require('dotenv').config();
const { Recipe } = require('../db');
const { getAllRecipes, postRecipe, getRecipeDetail, updateRecipe } = require('./functions');
const { Router } = require('express');
const router = Router();

router.get('/', async ( req, res) => {
    try {
        const title = req.query.title;
        let allRecipes = await getAllRecipes();
    if( title ) {
        let recipeTitle = await allRecipes.filter( recipe => recipe.title.toLowerCase().includes( title.toLowerCase() ) );
        if( recipeTitle.length ) {
            res.status( 200 ).send( recipeTitle );
        } else {
            res.status( 400 ).send( 'The recipe does not exists' );
        }
    } else {
        res.status( 200 ).send( allRecipes );
    } 
    } catch ( error ) {
        console.log( error )
    }
    
});

router.get('/:id', async ( req, res ) => {
    const id = req.params.id;
    let recipe = await getRecipeDetail( id );
    if( id ) {
        res.status( 200 ).json( recipe );
    } else {
        res.status( 400 ).send( "Can't find that recipe" );
    }
});

router.post('/', async ( req, res ) => { 
    try {
        postRecipe( req.body );
        res.status( 200 ).send( 'Recipe created succesfully!' );
    } catch ( error ) {
        res.status( 400 ).send( error ); 
    }
    
});

router.put('/:id', async ( req, res ) => {
    const id = req.params.id;
    const recipe = await Recipe.findByPk( id );
    if ( recipe ) {
        await updateRecipe( recipe, req.body );
        res.status( 200 ).send( 'Recipe udated!' );
    } else {
        res.status( 400 ).send( "Can't find that recipe" );
    }
});

router.delete('/:id', async ( req, res) => {
    const id = req.params.id;
    const recipe = await Recipe.findByPk( id );
    if( recipe ) {
        await recipe.destroy();
        res.status( 200 ).send( 'Recipe deleted!' );
    } else {
        res.status( 400 ).send( "Can't find that recipe" );
    }
});


module.exports = router;
