var express = require('express');
var router = express.Router();

var user = require('./../components/userDetails')
var userID = 'testuser2'
//var oldUser = user.getCurrentUser()

var email = ''


//get and post methods---------------------------START//
router.get('/', (req, res) => {
    //user.login('test@login.com', 'testlogin')
    //res.send('login-page' + " " + oldUser + " " + user.getCurrentUser())
    if (req.session.user != '') {
        res.status(187).send()
    } else {
        res.status(2).send()
    }
})
router.get('/1', (req, res) => {
    user.showUserdetails(req, res)
})

router.post('/', async (req, res) => {
    try {
        user.login(req, res)
    } catch {

    }
})

router.post('/2', async (req, res) => {
    try {
        user.register(req, res)
    } catch {

    }
})
//-------------------------------------------------END//


module.exports = router;