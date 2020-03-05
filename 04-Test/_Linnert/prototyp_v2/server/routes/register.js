////////// vars //////////
var express = require('express');
var router = express.Router();

////////// link to user functions //////////
var user = require('../components/userFunctions')

////////// get and post //////////
router.get('/', (req, res) => {
    res.send('it')
}) // get

router.post('/', async (req, res) => {
    try {
        user.register(req, res)
    } catch {
        
    }
}) // post for register()

module.exports = router;