var express = require('express');
var router = express.Router();

var user = require('../components/userDetails')

//get and post methods---------------------------START//
router.get('/', (req, res) => {
    //res.send('contacts-page')
    res.send(user.showShotlists())
})

router.get('/shotlistDetails', (req, res) => {
    //res.send('contacts-page')
    console.log('get')
    res.send(user.showShotlist('Shotlist1'))
})
//-------------------------------------------------END//


module.exports = router;