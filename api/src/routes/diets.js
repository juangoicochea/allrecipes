const { Router } = require('express');
const { getApiDiets } = require('./functions');
const router = Router();

router.get('/', async (req, res) => {
    try {
        let allDiets = await getApiDiets();
        res.send( allDiets );
    } catch ( error ) {
        res.status( 400 ).send( error );
    }
    
});

module.exports = router;