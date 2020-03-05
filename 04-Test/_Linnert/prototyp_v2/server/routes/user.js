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
    try {
        user.updateUserdetails(req, res)
    } catch {

    }
}) // post for updateUserdetails()

module.exports = router;