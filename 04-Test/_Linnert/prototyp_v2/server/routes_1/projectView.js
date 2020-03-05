var express = require('express');
var router = express.Router();


var user = require('./../components/userDetails')
var userID = ''
var userContacts = ''
var userLocations = user.showLocations(userID)


//get and post methods---------------------------START//
router.get('/', (req, res) => {
    //res.send('projectview-page' + ' ' + userID)
    userID = user.getCurrentUser()
    userContacts = user.showContacts(userID)
    res.send(userContacts)
})
//-------------------------------------------------END//


module.exports = router;