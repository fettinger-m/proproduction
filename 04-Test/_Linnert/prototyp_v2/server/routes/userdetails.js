////////// vars //////////
var express = require('express');
var router = express.Router();

////////// link to user functions //////////
var user = require('../components/userFunctions')

////////// get and post //////////
router.get('/', (req, res) => {
    user.showUserdetails(req, res)
}) // get for showUserdetails()

router.post('/update', async (req, res) => {
    user.updateUserdetails(req, res)
}) // post for updateUserdetails()

module.exports = router;