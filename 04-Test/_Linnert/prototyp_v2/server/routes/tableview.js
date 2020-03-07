////////// vars //////////
var express = require('express');
var router = express.Router();

////////// link to user functions //////////
var user = require('../components/userFunctions')

////////// get and post //////////
router.get('/', (req, res) => {
    user.showTableview(req, res)
}) // get for showTableview()

router.post('/update', async (req, res) => {
    try {
        user.updateTableview(req, res)
    } catch {

    }
}) // post for updateTableview()

module.exports = router;