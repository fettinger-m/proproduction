var express = require('express');
var router = express.Router();

var user = require('../components/userDetails')
var projectDetails = require('./projects')
var project = ''


//use firebase instance of app-------------------START//
const firebase = require('firebase')
//-------------------------------------------------END//


//create ref to needed path in the db------------START//
//var user = 'testuser2'

//var locationRef = firebase.database().ref("/users/" + user + "/locations")
//-------------------------------------------------END//


//get and post methods---------------------------START//
/*router.get('/', (req, res) => {
    res.send('locations-page')
})*/
router.get('/:id', (req, res) => {
    //res.send('locations-page')
    //res.send(req)
    console.log(req.params.id)
    res.send(user.showLocationsByID(req.params.id))
})

router.get('/locationDetails', (req, res) => {
    //res.send('contacts-page')
    console.log('get')
    res.send(user.showLocation('Location1'))
})

router.get('/', (req, res) => {
    //res.send('contacts-page')
    console.log("locations")
    project = projectDetails.getPID
    console.log(project)
    res.send(user.showLocations())
})

router.post('/', async (req, res) => {
    try {
        var name = req.body.name
  
        user.saveLocation(name)
  
        console.log(name + " erfolgreich hinzugefügt")
        res.send(JSON.stringify(req.body))
    } catch {
      console.log("Fehler beim hinzufügen von " + name)
        res.status(500).send()
    }
    
})

/*router.get('/showLocations', (req, res) => {
    locationRef.on("value", function(snapshot) {
      //console.log(snapshot.val())
      res.send(snapshot.val())
    });
})

router.post('/addLocations', async (req, res) => {
    try {
        var name = req.body.kuerzel
        var strasse = "01_Straße"
        var hausnummer = "02_Hausnummer"
        var plz = "03_Postleitzahl"
        var ort = "04_Ort"
        var land = "05_Land"
  
        locationRef.child(name).set({
            [strasse]: req.body.strasse,
            [hausnummer]: req.body.hausnummer,
            [plz]: req.body.plz,
            [ort]: req.body.ort,
            [land]: req.body.land
        })
  
        console.log(name + " erfolgreich hinzugefügt")
        res.send(JSON.stringify(req.body))
    } catch {
      console.log("Fehler beim hinzufügen von " + name)
        res.status(500).send()
    }
})*/
//-------------------------------------------------END//


module.exports = router;