////////// vars //////////
var express = require('express');
var router = express.Router();

////////// link to user functions //////////
var user = require('../components/userFunctions')

////////// get and post //////////
router.get('/', (req, res) => {
    user.showCalendarevents(req, res)
}) // get for showCalendarevents()

router.post('/add', async (req, res) => {
        user.addCalendarevent(req, res)
}) // post for addCalendarevent()

router.post('/:calendareventID/update', async (req, res) => {
        user.updateCalendarevent(req, res)
}) // post for updateCalendarevent()

router.post('/:calendareventID/delete', async (req, res) => {
        user.deleteCalendarevent(req, res)
}) // post for deleteCalendarevent()

module.exports = router;