var express = require('express');
var router = express.Router();

var user = require('./../components/userDetails')


//get and post methods---------------------------START//
router.get('/', (req, res) => {
    user.logout(req, res)
})
//-------------------------------------------------END//


module.exports = router;