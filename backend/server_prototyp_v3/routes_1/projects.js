var express = require('express');
var router = express.Router();

var projectViewRouter = require('./projectView')
var documentRouter = require('./documents')
var contactRouter = require('./contacts')
var scriptRouter = require('./scripts')
var locationRouter = require('./locations')
var shotlistRouter = require('./shotlists')
var libraryRouter = require('./library')


var user = require('../components/userDetails')
var project = ''//user.getPID()

//router.use('/' + project, projectViewRouter)
//router.use('/' + project + '/documents', documentRouter)
//router.use('/' + project + '/contacts', contactRouter)
//router.use('/' + project + '/scripts', scriptRouter)
//router.use('/' + project + '/locations', locationRouter)
//router.use('/' + project + '/shotlists', shotlistRouter)
//router.use('/' + project + '/library', libraryRouter)

//var project = ''//user.getPID()

//var project = 'Project1' //user.userProjectSelected


//get and post methods---------------------------START//
router.get('/', (req, res) => {
    /*if (user.userID != null) {
        res.send(user.showProjects)
    } else {
        console.log('nicht angemeldet')
    }*/
    res.send(user.showProjects())
    console.log('Ps---------------')
    console.log(user.showProjects())

})

router.get('/:pid', (req, res) => {
    //res.send('locations-page')
    //res.send(req)
    //console.log(req.params.id)
    user.setPID(req.params.pid)
    project = user.getPID()
    console.log(project)
    res.send(user.showProjectsByID(req.params.pid))
})

router.get('/:pid/locations', (req, res) => {
    //res.send('locations-page')
    //res.send(req)
    console.log(req.params.pid + ' project')
    user.setPID(req.params.pid)
    res.send(user.showLocations())
})

router.get('/:pid/locations/:lid', (req, res) => {
    //res.send('locations-page')
    //res.send(req)
    console.log(req.params.pid + ' project')
    console.log(req.params.lid + ' location')
    user.setPID(req.params.pid)
    res.send(user.showLocationsByID(req.params.lid))
})

/*router.post('/', async (req, res) => {
    try {
        var name = req.body.name
  
        user.saveProject(name)
  
        console.log(name + " erfolgreich hinzugefügt")
        res.send(JSON.stringify(req.body))
    } catch {
      console.log("Fehler beim hinzufügen von " + name)
        res.status(500).send()
    }
    
})*/
router.post('/', async (req, res) => {
    try {
        //user.saveProject(req, res)
        user.updateProject(req, res)
    } catch {
    }
    
})

router.use('/' + project + '/locations', locationRouter)


/*router.get('/Project1/contacts', (req, res) => {
    //res.send('contacts-page')
    res.send(user.showContacts())
})*/

/*router.get('/Project1/locations', (req, res) => {
    //res.send('locations-page')
    res.send(user.showLocations())
})*/
//-------------------------------------------------END//



module.exports = router;