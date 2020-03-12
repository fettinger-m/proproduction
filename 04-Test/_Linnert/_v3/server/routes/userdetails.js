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

router.post('/email/update', async (req, res) => {
    user.updateUseremail(req, res)
}) // post for updateUseremail()

router.post('/password/update', async (req, res) => {
    user.updateUserpassword(req, res)
}) // post for updateUserpassword()

module.exports = router;