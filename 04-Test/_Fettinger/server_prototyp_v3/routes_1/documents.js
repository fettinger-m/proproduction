var express = require('express');
var router = express.Router();

var user = require('../components/userDetails')

//get and post methods---------------------------START//
router.get('/', (req, res) => {
    //res.send('contacts-page')
    res.send(user.showDocuments())
})
//-------------------------------------------------END//


module.exports = router;