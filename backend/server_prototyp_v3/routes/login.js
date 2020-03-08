////////// vars //////////
var express = require('express');
var router = express.Router();

////////// link to user functions //////////
var user = require('../components/userFunctions')

////////// get and post //////////
router.get('/', (req, res) => {
    res.send(req.session.user);
    /*if (req.session.user != undefined) {
        res.status(187).send()
    } else {
        res.status(188).send()
    }*/
}) // get for checking login

router.post('/', async (req, res) => {
    try {
        user.login(req, res)
    } catch {

    }
}) // post for login()

/*router.get('/1', (req, res) => {
    user.showUserdetails(req, res)
})*/

module.exports = router;