////////// vars //////////
var express = require('express');
var router = express.Router();

////////// link to user functions //////////
var user = require('../components/userFunctions')

////////// get and post //////////
router.get('/', (req, res) => {
    user.login(req, res)
})  //for testing

router.post('/', async (req, res) => {
    user.login(req, res)
}) // post for login()

module.exports = router;