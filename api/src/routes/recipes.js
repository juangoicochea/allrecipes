require('dotenv').config();
const { getAllRecipes } = require('./functions');
const { Router } = require('express');
const router = Router();

router.get('/', async ( req, res) => {
    const title = req.query.title;
    let allRecipes = await getAllRecipes();
    if( title ) {
        let recipeTitle = await allRecipes.filter( recipe = recipe.title.toLowerCase().includes( title.toLowerCase() ) );
        if( recipeTitle.length ) {
            res.status( 200 ).send( recipeTitle );
        } else {
            res.status( 400 ).send( 'The recipe does not exists' );
        }
    } else {
        res.status( 200 ).send( allRecipes );
    }
});


module.exports = router;
