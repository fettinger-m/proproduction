var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

/*
const admin = require('firebase-admin')
const serviceAccount = require("./config/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://probase-26052.firebaseio.com"
});
*/
const app = express()
app.use(express.json())

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/*
//let authorized = true

function checkAuth(req, res, next) {
  if (authorized) {
    next()
  } else {
    res.status(403).send('Unauthorized!')
    return
  }
}

function checkAuth(req, res, next) {
  if (req.headers.authtoken) {
    admin.auth().verifyIdToken(req.headers.authtoken)
      .then(() => {
        next()
      }).catch(() => {
        res.status(403).send('Unauthorized')
      });
  } else {
    res.status(403).send('Unauthorized')
  }
}

app.use('/', checkAuth)

app.get('/', (req, res) => {
  res.json({
    message: 'Berechtigt'
  })
})

admin.database().ref('users/' + '1').set({
  username: 'test',
  email: 'test@email.com'
});
*/

/*const FIREBASE_API_KEY = 'AIzaSyDiiHokKTQElX-KK5WNLfh_gA_DNw2Hodw'

const FirebaseAuth = require('firebaseauth')
const firebase = new FirebaseAuth(FIREBASE_API_KEY)

const email = 'test@login.com'
const password = 'testlogin'

firebase.signInWithEmail(email, password, function(err, result){
  if (err)
      console.log(err);
  else
      console.log(result);
});

function signIn(req, res) {

  var email = req.body.email
  var email = req.body.password

  firebase.signInWithEmail(email, password, function(err, result){
    if (err) {
        console.log(err);
        res.send('Benutzername oder Passwort falsch')
    }
    else {
        console.log(result);
        res.send('Erfolgreich eingeloggt')
    }
  });

}*/

/*app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});*/

const firebase = require('firebase')

var firebaseConfig = {
  apiKey: "AIzaSyDiiHokKTQElX-KK5WNLfh_gA_DNw2Hodw",
  authDomain: "probase-26052.firebaseapp.com",
  databaseURL: "https://probase-26052.firebaseio.com",
  projectId: "probase-26052",
  storageBucket: "probase-26052.appspot.com",
  messagingSenderId: "584544514654",
  appId: "1:584544514654:web:5dd43f90fbed0d73ddbacf",
  measurementId: "G-GD6DWNGSEY"
};

firebase.initializeApp(firebaseConfig);

var contactRef = firebase.database().ref("/users/testuser2/contacts")
var locationRef = firebase.database().ref("/users/testuser2/locations")

/*app.get('/', function (req, res) {
  console.log("test")
});

app.post('/contacts', function (req, res) {
  contactRef.set({
    seas: {
      number: req.body.
    }
  })
  console.log(JSON.stringify(req.data))
  res.send('done');
});*/


/*app.get('/contacts', (req, res) => {
  res.json('Contact-Page')
})*/

app.get('/allContacts', (req, res) => {
  contactRef.on("value", function(snapshot) {
    console.log(snapshot.val())
    res.send(snapshot.val())
  });
})

app.get('/allLocations', (req, res) => {
  locationRef.on("value", function(snapshot) {
    console.log(snapshot.val())
    res.send(snapshot.val())
  });
})

app.post('/contacts', async (req, res) => {
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
  
})

app.post('/locations', async (req, res) => {
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
  
  /*try {
    saveLocation(req.body.kuerzel, req.body.strasse, req.body.hausnummer, req.body.plz, req.body.ort, req.body.land)
    console.log(name + " erfolgreich hinzugefügt")
    res.send(JSON.stringify(req.body))
  } catch {
    console.log("Fehler beim hinzufügen von " + name)
    res.status(500).send()
  }*/
  
})

/*function saveLocation(nameReq, strasseReq, hausnummerReq, plzReq, ortReq, landReq) {
  var name = nameReq
  var strasse = "01_Straße"
  var hausnummer = "02_Hausnummer"
  var plz = "03_Postleitzahl"
  var ort = "04_Ort"
  var land = "05_Land"

  locationRef.child(name).set({
      [strasse]: strasseReq,
      [hausnummer]: hausnummerReq,
      [plz]: plzReq,
      [ort]: ortReq,
      [land]: landReq
  })
}*/

module.exports = app;