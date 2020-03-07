var express = require('express');
var router = express.Router();


//get and post methods---------------------------START//
router.get('/', (req, res) => {
    res.send('library-page')
})
//-------------------------------------------------END//


module.exports = router;