////////// vars //////////
var email = 'max.fettinger@gmail.com'
var password = '12345678'

////////// refs to path in db //////////
var userRef = ''
var tableviewRef = ''
var calendareventRef = ''
var projectsRef = ''
var documentsRef = ''
var shotlistsRef = ''
var shotsRef = ''
var contactsRef = ''
var locationsRef = ''
var storageRef = ''

////////// firebase instance of app //////////
const firebase = require('firebase')

////////// functions //////////
function register(req, res) {
    firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password).then(function() {
        req.session.user = firebase.auth().currentUser.uid

        userRef = firebase.database().ref("/users/" + req.session.user + "/userdetails/")
        userRef.set({
            //TODO: details
            first_name: req.body.first_name,
            last_name: req.body.last_name
        })

        tableviewRef = firebase.database().ref("/users/" + req.session.user + "/tableview/")
        tableviewRef.set({
            thema_c: true,
            status_c: true,
            priority_c: true,
            custom1_c: true,
            custom2_c: true,
            customFieldName1: "Custom 1",
            customFieldName2: "Custom 2"
        })

        res.send('registration successful')
    }).catch(function(error) {
        if (error.code == 'auth/weak-password') {
            res.send('weak password')
        } else if (error.code == 'auth/email-already-in-use') {
            res.send('email already in use')
        } else if (error.code == 'auth/invalid-email') {
            res.send('wrong email format')
        }
    });
} // register with email and password and submit personal data

//TODO: req einbinden bei finaler funktion
function login(req, res) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
        req.session.user = firebase.auth().currentUser.uid
        res.send('login successful')
    }).catch(function(error) {
        console.log(error)
        if (error.code == 'auth/user-not-found') {
            res.send('user not found')
        } else if (error.code == 'auth/wrong-password') {
            res.send('wrong password')
        } else if (error.code == 'auth/invalid-email') {
            res.send('wrong email format')
        }
    });
} // login with email and password

function logout(req, res) {
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.send('logout successful');
    });
} // logout


function showUserdetails(req, res) {
    if (req.session.user != undefined) {
        userRef = firebase.database().ref("/users/" + req.session.user + "/userdetails")
        userRef.once("value", function(snapshot) {
            res.send(snapshot.val())
        })
    } else {
        res.send('got to /login or /register')
    }
} // show personal user data

function updateUserdetails(req, res) {
    if (req.session.user != undefined) {
        userRef = firebase.database().ref("/users/" + req.session.user + "/userdetails")
        userRef.update(req.body)
        res.send('success')
    } else {
        res.send('got to /login or /register')
    }
} // update personal user data


function showTableview(req, res) {
    if (req.session.user != undefined) {
        tableviewRef = firebase.database().ref("/users/" + req.session.user + "/tableview")
        tableviewRef.once("value", function(snapshot) {
            res.send(snapshot.val())
        })
    } else {
        res.send('got to /login or /register')
    }
} // show personal tableview

function updateTableview(req, res) {
    if (req.session.user != undefined) {
        tableviewRef = firebase.database().ref("/users/" + req.session.user + "/tableview")
        tableviewRef.update(req.body)
        res.send('success')
    } else {
        res.send('got to /login or /register')
    }
} // update personal tableview


function showCalendarevents(req, res) {
    if (req.session.user != undefined) {
        calendareventRef = firebase.database().ref("/users/" + req.session.user + "/calendarevents")
        calendareventRef.once("value", function(snapshot) {
            res.send(calendareventsFormatter(snapshot))
        })
    } else {
        res.send('got to /login or /register')
    }
} // show all user calendarevents

function addCalendarevent(req, res) {
    if (req.session.user != undefined) {
        calendareventRef = firebase.database().ref("/users/" + req.session.user + "/calendarevents")
        calendareventRef.push(req.body)
        calendareventRef.endAt().limitToLast(1).once('child_added', function(snapshot) {

            res.send(snapshot.key)

        });
    } else {
        res.send('got to /login or /register')
    }
} // create new calendarevent

function updateCalendarevent(req, res) {
    if (req.session.user != undefined) {
        calendareventRef = firebase.database().ref("/users/" + req.session.user + "/calendarevents")
        calendareventRef.child(req.params.calendareventID).update(req.body)
        res.send('success')
    } else {
        res.send('got to /login or /register')
    }
} // update calendarevent by id with given data

function deleteCalendarevent(req, res) {
    if (req.session.user != undefined) {
        calendareventRef = firebase.database().ref("/users/" + req.session.user + "/calendarevents")
        calendareventRef.child(req.params.calendareventID).remove()
        res.send('success')
    } else {
        res.send('got to /login or /register')
    }
} // delete calendarevent by id


function showProjects(req, res) {
    if (req.session.user != undefined) {
        projectsRef = firebase.database().ref("/users/" + req.session.user + "/projects")
        projectsRef.once("value", function(snapshot) {
            res.send(projectsFormatter(snapshot))
        })
    } else {
        res.send('got to /login or /register')
    }
} // show all user projects

function showProject(req, res) {
    if (req.session.user != undefined) {
        projectsRef = firebase.database().ref("/users/" + req.session.user + "/projects/" + req.params.projectID)
        projectsRef.once("value", function(snapshot) {
            res.send(singleProjectFormatter(snapshot))
        })
    } else {
        res.send('got to /login or /register')
    }
} // show selected project

function addProject(req, res) {
    if (req.session.user != undefined) {
        projectsRef = firebase.database().ref("/users/" + req.session.user + "/projects")
        projectsRef.push(req.body)
        projectsRef.endAt().limitToLast(1).once('child_added', function(snapshot) {

            res.send(snapshot.key)

        });
    } else {
        res.send('got to /login or /register')
    }
} // create new project

function updateProject(req, res) {
    if (req.session.user != undefined) {
        projectsRef = firebase.database().ref("/users/" + req.session.user + "/projects")
        projectsRef.child(req.params.projectID).update(req.body)
        res.send('success')
    } else {
        res.send('got to /login or /register')
    }
} // update project by id with given data

function deleteProject(req, res) {
    if (req.session.user != undefined) {
        projectsRef = firebase.database().ref("/users/" + req.session.user + "/projects")
        projectsRef.child(req.params.projectID).remove()
        res.send('success')
    } else {
        res.send('got to /login or /register')
    }
} // delete project by id


function showDocuments(req, res) {
    if (req.session.user != undefined) {
        documentsRef = firebase.database().ref("/users/" + req.session.user + "/projects/" + req.params.projectID + "/documents")
        documentsRef.once("value", function(snapshot) {
            res.send(documentsFormatter(snapshot))
        })
    } else {
        res.send('got to /login or /register')
    }
} // show all user documents

function showDocument(req, res) {
    if (req.session.user != undefined) {
        documentsRef = firebase.database().ref("/users/" + req.session.user + "/projects/" + req.params.projectID + "/documents/" + req.params.documentID)
        documentsRef.once("value", function(snapshot) {
            res.send(singleDocumentFormatter(snapshot))
        })
    } else {
        res.send('got to /login or /register')
    }
} // show selected document

function addDocument(req, res) {
    if (req.session.user != undefined) {
        documentsRef = firebase.database().ref("/users/" + req.session.user + "/projects/" + req.params.projectID + "/documents")
        documentsRef.push(req.body)
        documentsRef.endAt().limitToLast(1).once('child_added', function(snapshot) {

            res.send(snapshot.key)

        });
    } else {
        res.send('got to /login or /register')
    }
} // create new document

function updateDocument(req, res) {
    if (req.session.user != undefined) {
        documentsRef = firebase.database().ref("/users/" + req.session.user + "/projects/" + req.params.projectID + "/documents")
        documentsRef.child(req.params.documentID).update(req.body)
        res.send('success')
    } else {
        res.send('got to /login or /register')
    }
} // update shotlist by id with given data

function deleteDocument(req, res) {
    if (req.session.user != undefined) {
        documentsRef = firebase.database().ref("/users/" + req.session.user + "/projects/" + req.params.projectID + "/documents")
        documentsRef.child(req.params.documentID).remove()
        res.send('success')
    } else {
        res.send('got to /login or /register')
    }
} // delete document by id


function showLocations(req, res) {
    if (req.session.user != undefined) {
        locationsRef = firebase.database().ref("/users/" + req.session.user + "/projects/" + req.params.projectID + "/locations")
        locationsRef.once("value", function(snapshot) {
            res.send(locationsFormatter(snapshot))
        })
    } else {
        res.send('got to /login or /register')
    }
} // show all user locations

function showLocation(req, res) {
    if (req.session.user != undefined) {
        locationsRef = firebase.database().ref("/users/" + req.session.user + "/projects/" + req.params.projectID + "/locations/" + req.params.locationID)
        locationsRef.once("value", function(snapshot) {
            res.send(singleLocationFormatter(snapshot))
        })
    } else {
        res.send('got to /login or /register')
    }
} // show selected location

function addLocation(req, res) {
    if (req.session.user != undefined) {
        locationsRef = firebase.database().ref("/users/" + req.session.user + "/projects/" + req.params.projectID + "/locations")
        locationsRef.push(req.body)
        locationsRef.endAt().limitToLast(1).once('child_added', function(snapshot) {

            res.send(snapshot.key)

        });
    } else {
        res.send('got to /login or /register')
    }
} // create new location

function updateLocation(req, res) {
    if (req.session.user != undefined) {
        locationsRef = firebase.database().ref("/users/" + req.session.user + "/projects/" + req.params.projectID + "/locations")
        locationsRef.child(req.params.locationID).update(req.body)
        res.send('success')
    } else {
        res.send('got to /login or /register')
    }
} // update location by id with given data

function deleteLocation(req, res) {
    if (req.session.user != undefined) {
        locationsRef = firebase.database().ref("/users/" + req.session.user + "/projects/" + req.params.projectID + "/locations")
        locationsRef.child(req.params.locationID).remove()
        res.send('success')
    } else {
        res.send('got to /login or /register')
    }
} // delete location by id


function showShotlists(req, res) {
    if (req.session.user != undefined) {
        shotlistsRef = firebase.database().ref("/users/" + req.session.user + "/projects/" + req.params.projectID + "/shotlists")
        shotlistsRef.once("value", function(snapshot) {
            res.send(shotlistsFormatter(snapshot))
        })
    } else {
        res.send('got to /login or /register')
    }
} // show all user shotlists

function showShotlist(req, res) {
    if (req.session.user != undefined) {
        shotlistsRef = firebase.database().ref("/users/" + req.session.user + "/projects/" + req.params.projectID + "/shotlists/" + req.params.shotlistID)
        shotlistsRef.once("value", function(snapshot) {
            res.send(singleShotlistFormatter(snapshot))
        })
    } else {
        res.send('got to /login or /register')
    }
} // show selected shotlist

function addShotlist(req, res) {
    if (req.session.user != undefined) {
        shotlistsRef = firebase.database().ref("/users/" + req.session.user + "/projects/" + req.params.projectID + "/shotlists")
        shotlistsRef.push(req.body)
        shotlistsRef.endAt().limitToLast(1).once('child_added', function(snapshot) {

            res.send(snapshot.key)

        });
    } else {
        res.send('got to /login or /register')
    }
} // create new shotlist

function updateShotlist(req, res) {
    if (req.session.user != undefined) {
        shotlistsRef = firebase.database().ref("/users/" + req.session.user + "/projects/" + req.params.projectID + "/shotlists")
        shotlistsRef.child(req.params.shotlistID).update(req.body)
        res.send('success')
    } else {
        res.send('got to /login or /register')
    }
} // update shotlist by id with given data

function deleteShotlist(req, res) {
    if (req.session.user != undefined) {
        shotlistsRef = firebase.database().ref("/users/" + req.session.user + "/projects/" + req.params.projectID + "/shotlists")
        shotlistsRef.child(req.params.shotlistID).remove()
        res.send('success')
    } else {
        res.send('got to /login or /register')
    }
} // delete shotlist by id


function showShots(req, res) {
    if (req.session.user != undefined) {
        shotsRef = firebase.database().ref("/users/" + req.session.user + "/projects/" + req.params.projectID + "/shotlists/" + req.params.shotlistID + "/shots")
        shotsRef.once("value", function(snapshot) {
            res.send(shotsFormatter(snapshot))
        })
    } else {
        res.send('got to /login or /register')
    }
} // show all user shots

function showShot(req, res) {
    if (req.session.user != undefined) {
        shotsRef = firebase.database().ref("/users/" + req.session.user + "/projects/" + req.params.projectID + "/shotlists/" + req.params.shotlistID + "/shots/" + req.params.shotID)
        shotsRef.once("value", function(snapshot) {
            res.send(singleShotFormatter(snapshot))
        })
    } else {
        res.send('got to /login or /register')
    }
} // show selected shot

function addShot(req, res) {
    if (req.session.user != undefined) {
        shotsRef = firebase.database().ref("/users/" + req.session.user + "/projects/" + req.params.projectID + "/shotlists/" + req.params.shotlistID + "/shots")
        shotsRef.push(req.body)
        shotsRef.endAt().limitToLast(1).once('child_added', function(snapshot) {

            res.send(snapshot.key)

        });
    } else {
        res.send('got to /login or /register')
    }
} // create new shots

function updateShot(req, res) {
    if (req.session.user != undefined) {
        shotsRef = firebase.database().ref("/users/" + req.session.user + "/projects/" + req.params.projectID + "/shotlists/" + req.params.shotlistID + "/shots")
        shotsRef.child(req.params.shotID).update(req.body)
        res.send('success')
    } else {
        res.send('got to /login or /register')
    }
} // create new shots

function deleteShot(req, res) {
    if (req.session.user != undefined) {
        shotsRef = firebase.database().ref("/users/" + req.session.user + "/projects/" + req.params.projectID + "/shotlists/" + req.params.shotlistID + "/shots")
        shotsRef.child(req.params.shotID).remove()
        res.send('success')
    } else {
        res.send('got to /login or /register')
    }
} // create new shots


function showContacts(req, res) {
    if (req.session.user != undefined) {
        contactsRef = firebase.database().ref("/users/" + req.session.user + "/projects/" + req.params.projectID + "/contacts")
        contactsRef.once("value", function(snapshot) {
            res.send(contactsFormatter(snapshot))
        })
    } else {
        res.send('got to /login or /register')
    }
} // show all user shotlists

function showContact(req, res) {
    if (req.session.user != undefined) {
        contactsRef = firebase.database().ref("/users/" + req.session.user + "/projects/" + req.params.projectID + "/contacts/" + req.params.contactID)
        contactsRef.once("value", function(snapshot) {
            res.send(singleContactFormatter(snapshot))
        })
    } else {
        res.send('got to /login or /register')
    }
} // show selected shotlist

function addContact(req, res) {
    if (req.session.user != undefined) {
        contactsRef = firebase.database().ref("/users/" + req.session.user + "/projects/" + req.params.projectID + "/contacts")
        contactsRef.push(req.body)
        contactsRef.endAt().limitToLast(1).once('child_added', function(snapshot) {

            res.send(snapshot.key)

        });
    } else {
        res.send('got to /login or /register')
    }
} // create new shotlist

function updateContact(req, res) {
    if (req.session.user != undefined) {
        contactsRef = firebase.database().ref("/users/" + req.session.user + "/projects/" + req.params.projectID + "/contacts")
        contactsRef.child(req.params.contactID).update(req.body)
        res.send('success')
    } else {
        res.send('got to /login or /register')
    }
} // update shotlist by id with given data

function deleteContact(req, res) {
    if (req.session.user != undefined) {
        contactsRef = firebase.database().ref("/users/" + req.session.user + "/projects/" + req.params.projectID + "/contacts")
        contactsRef.child(req.params.contactID).remove()
        res.send('success')
    } else {
        res.send('got to /login or /register')
    }
} // delete shotlist by id


function projectsFormatter(snapshot) {
    var returnArr = []

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val()
        item.id = childSnapshot.key

        returnArr.push(item)
    })

    returnArr.forEach(item => {
        var contactsArray = []
        var locationsArray = []
        var documentsArray = []
        var shotlistsArray = []
        var shotsArray = []

        for (contact in item.contacts) {
            item.contacts[contact].id = contact
            contactsArray.push(item.contacts[contact])
        }
        item.contacts = contactsArray

        for (location in item.locations) {
            item.locations[location].id = location
            locationsArray.push(item.locations[location])
        }
        item.locations = locationsArray

        for (document in item.documents) {
            item.documents[document].id = document
            documentsArray.push(item.documents[document])
        }
        item.documents = documentsArray

        for (shotlist in item.shotlists) {
            item.shotlists[shotlist].id = shotlist
            shotlistsArray.push(item.shotlists[shotlist])

            for (shot in item.shotlists[shotlist].shots) {
                item.shotlists[shotlist].shots[shot].id = shot
                shotsArray.push(item.shotlists[shotlist].shots[shot])
            }
            item.shotlists[shotlist].shots = shotsArray
        }
        item.shotlists = shotlistsArray

    })

    return returnArr;
} // changes format of snapshot value

function singleProjectFormatter(snapshot) {
    var returnObj = null

    var item = snapshot.val()
    item.id = snapshot.key

    var contactsArray = []
    var locationsArray = []
    var documentsArray = []
    var shotlistsArray = []
    var shotsArray = []

    for (contact in item.contacts) {
        item.contacts[contact].id = contact
        contactsArray.push(item.contacts[contact])
    }
    item.contacts = contactsArray

    for (location in item.locations) {
        item.locations[location].id = location
        locationsArray.push(item.locations[location])
    }
    item.locations = locationsArray

    for (document in item.documents) {
        item.documents[document].id = document
        documentsArray.push(item.documents[document])
    }
    item.documents = documentsArray

    for (shotlist in item.shotlists) {
        item.shotlists[shotlist].id = shotlist
        shotlistsArray.push(item.shotlists[shotlist])

        for (shot in item.shotlists[shotlist].shots) {
            item.shotlists[shotlist].shots[shot].id = shot
            shotsArray.push(item.shotlists[shotlist].shots[shot])
        }
        item.shotlists[shotlist].shots = shotsArray
    }
    item.shotlists = shotlistsArray

    returnObj = item

    return returnObj;
} // changes format of snapshot value

function documentsFormatter(snapshot) {
    var returnArr = []

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val()
        item.id = childSnapshot.key

        returnArr.push(item)
    })

    return returnArr;
} // changes format of snapshot value

function singleDocumentFormatter(snapshot) {
    var returnObj = null

    var item = snapshot.val()
    item.id = snapshot.key

    returnObj = item

    return returnObj;
} // changes format of snapshot value

function locationsFormatter(snapshot) {
    var returnArr = []

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val()
        item.id = childSnapshot.key

        returnArr.push(item)
    })

    return returnArr;
} // changes format of snapshot value

function singleLocationFormatter(snapshot) {
    var returnObj = null

    var item = snapshot.val()
    item.id = snapshot.key

    returnObj = item

    return returnObj;
} // changes format of snapshot value

function shotlistsFormatter(snapshot) {
    var returnArr = []

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val()
        item.id = childSnapshot.key

        returnArr.push(item)
    })

    returnArr.forEach(item => {
        var shotsArray = []

        for (shot in item.shots) {
            item.shots[shot].id = shot
            shotsArray.push(item.shots[shot])
        }
        item.shots = shotsArray

    })

    return returnArr;
} // changes format of snapshot value

function singleShotlistFormatter(snapshot) {
    var returnObj = null
    var shotsArray = []

    var item = snapshot.val()
    item.id = snapshot.key

    for (shot in item.shots) {
        item.shots[shot].id = shot
        shotsArray.push(item.shots[shot])
    }
    item.shots = shotsArray

    returnObj = item

    return returnObj;
} // changes format of snapshot value

function shotsFormatter(snapshot) {
    var returnArr = []

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val()
        item.id = childSnapshot.key

        returnArr.push(item)
    })

    return returnArr;
} // changes format of snapshot value

function singleShotFormatter(snapshot) {
    var returnObj = null

    var item = snapshot.val()
    item.id = snapshot.key

    returnObj = item

    return returnObj;
} // changes format of snapshot value

function contactsFormatter(snapshot) {
    var returnArr = []

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val()
        item.id = childSnapshot.key

        returnArr.push(item)
    })

    return returnArr;
} // changes format of snapshot value

function singleContactFormatter(snapshot) {
    var returnObj = null

    var item = snapshot.val()
    item.id = snapshot.key

    returnObj = item

    return returnObj;
} // changes format of snapshot value

function calendareventsFormatter(snapshot) {
    var returnArr = []

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val()
        item.id = childSnapshot.key

        returnArr.push(item)
    })

    return returnArr;
} // changes format of snapshot value


module.exports = {
    register,
    login,
    logout,
    showUserdetails,
    updateUserdetails,
    showTableview,
    updateTableview,
    showCalendarevents,
    addCalendarevent,
    updateCalendarevent,
    deleteCalendarevent,
    showProjects,
    showProject,
    addProject,
    updateProject,
    deleteProject,
    showDocuments,
    showDocument,
    addDocument,
    updateDocument,
    deleteDocument,
    showLocations,
    showLocation,
    addLocation,
    updateLocation,
    deleteLocation,
    showShotlists,
    showShotlist,
    addShotlist,
    updateShotlist,
    deleteShotlist,
    showShots,
    showShot,
    addShot,
    updateShot,
    deleteShot,
    showContacts,
    showContact,
    addContact,
    updateContact,
    deleteContact
}