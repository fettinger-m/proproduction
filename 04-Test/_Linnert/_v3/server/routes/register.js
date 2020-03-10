////////// vars //////////
var express = require('express');
var router = express.Router();

////////// link to user functions //////////
var user = require('../components/userFunctions')

////////// get and post //////////
router.post('/', async (req, res) => {
    user.register(req, res)
}) // post for register()

module.exports = router;