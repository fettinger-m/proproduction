var express = require('express');
var router = express.Router();

var user = require('./../components/userDetails')

//use firebase instance of app-------------------START//
const firebase = require('firebase')
//-------------------------------------------------END//


//create ref to needed path in the db------------START//

//-------------------------------------------------END//

//get and post methods---------------------------START//
router.get('/', (req, res) => {
})



router.post('/', async (req, res) => {
    try {
        user.register(req, res)
    } catch {

    }
})
//-------------------------------------------------END//

module.exports = router;