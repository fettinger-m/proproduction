////////// vars //////////
var express = require('express');
var router = express.Router();

////////// link to user functions //////////
var user = require('./../components/userDetails')

////////// refs to path in db //////////
router.get('/', (req, res) => {
    user.logout(req, res)
}) // get

router.post('/', (req, res) => {
    user.logout(req, res)
}) // post for logout()


module.exports = router;