var express = require('express');
var router = express.Router();

var user = require('../components/userDetails')


//use firebase instance of app-------------------START//
const firebase = require('firebase')
//-------------------------------------------------END//


//create ref to needed path in the db------------START//
//var user = 'testuser2'

//var contactRef = firebase.database().ref("/users/" + user + "/contacts")
//-------------------------------------------------END//


//get and post methods---------------------------START//
/*router.get('/', (req, res) => {
    //res.send('contacts-page')
    res.send(user.showContacts)
})*/

router.get('/', (req, res) => {
    //res.send('contacts-page')
    res.send(user.showContacts())
})

router.get('/contactDetails', (req, res) => {
    //res.send('contacts-page')
    console.log('get')
    res.send(user.showContact('Contact1'))
})


router.post('/', async (req, res) => {
    try {
        var name = req.body.name
  
        user.saveContact(name)
  
        console.log(name + " erfolgreich hinzugefügt")
        res.send(JSON.stringify(req.body))
    } catch {
      console.log("Fehler beim hinzufügen von " + name)
        res.status(500).send()
    }
    
})

/*router.get('/showContacts', (req, res) => {
    contactRef.on("value", function(snapshot) {
      //console.log(snapshot.val())
      res.send(snapshot.val())
    });
})

router.post('/addContacts', async (req, res) => {
    try {
        var name = req.body.kuerzel
        var vorname = "01_Vorname"
        var nachname = "02_Nachname"
        var telefonnummer = "03_Telefonnummer"
  
        contactRef.child(name).set({
            [vorname]: req.body.vorname,
            [nachname]: req.body.nachname,
            [telefonnummer]: req.body.telefonnummer
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