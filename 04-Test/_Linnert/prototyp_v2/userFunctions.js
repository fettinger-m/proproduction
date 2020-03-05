////////// vars //////////
var email = 'testing@gmx.at'
var password = 'testing'

////////// refs to path in db //////////
var userRef = ''
var projectsRef = ''
var documentsRef = ''
var shotlistsRef = ''
var shotsRef = ''
var moodboardsRef = ''
var contactsRef = ''
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
        res.send('registration successful')
    }).catch(function(error) {
        if (error.code == 'auth/weak-password') {
            res.send('weak password - use at least 6 character')
        }
    });
} // register with email and password and submit personal data

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
        }
    });
} // login with email and password

function logout(req, res) {
    if (req.session.user != undefined) {
        req.session.user = undefined
    }
    res.send('logout successful')
} // logout


function showUserdetails(req, res) {
    if (req.session.user != undefined) {
        userRef = firebase.database().ref("/users/" + req.session.user + "/userdetails")
        userRef.on("value", function(snapshot) {
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


function showProjects(req, res) {
    if (req.session.user != undefined) {
        projectsRef = firebase.database().ref("/users/" + req.session.user + "/projects")
        projectsRef.on("value", function(snapshot) {
            return res.send(projectSnapshotToArray(snapshot))
        })
    } else {
        res.send('got to /login or /register')
    }
} // show all user projects

function showProject(req, res) {
    if (req.session.user != undefined) {
        projectsRef = firebase.database().ref("/users/" + req.session.user + "/projects/" + req.param.projectID)
        projectsRef.on("value", function(snapshot) {
            res.send(projectSnapshotToArray(snapshot))
        })
    } else {
        res.send('got to /login or /register')
    }
} // show selected project

function addProject(req, res) {
    if (req.session.user != undefined) {
        projectsRef = firebase.database().ref("/users/" + req.session.user + "/projects")
        projectsRef.push(req.body)
        res.send('success')
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
        documentsRef.on("value", function(snapshot) {
            res.send(snapshotToArray(snapshot))
        })
    } else {
        res.send('got to /login or /register')
    }
} // show all user documents

function showDocument(req, res) {
    if (req.session.user != undefined) {
        documentsRef = firebase.database().ref("/users/" + req.session.user + "/projects/" + req.params.projectID + "/documents/" + req.params.documentID)
        documentsRef.on("value", function(snapshot) {
            res.send(snapshotToArray(snapshot))
        })
    } else {
        res.send('got to /login or /register')
    }
} // show selected document

function addDocument(req, res) {
    if (req.session.user != undefined) {
        documentsRef = firebase.database().ref("/users/" + req.session.user + "/projects/" + req.params.projectID + "/documents")
        documentsRef.push(req.body)
        res.send('success')
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
        shotlistsRef = firebase.database().ref("/users/" + req.session.user + "/projects/" + req.params.projectID + "/locations")
        shotlistsRef.on("value", function(snapshot) {
            res.send(snapshotToArray(snapshot))
        })
    } else {
        res.send('got to /login or /register')
    }
} // show all user locations

function showLocation(req, res) {
    if (req.session.user != undefined) {
        shotlistsRef = firebase.database().ref("/users/" + req.session.user + "/projects/" + req.params.projectID + "/locations/" + req.param.locationID)
        shotlistsRef.on("value", function(snapshot) {
            res.send(snapshotToArray(snapshot))
        })
    } else {
        res.send('got to /login or /register')
    }
} // show selected location

function addLocation(req, res) {
    if (req.session.user != undefined) {
        shotlistsRef = firebase.database().ref("/users/" + req.session.user + "/projects/" + req.params.projectID + "/locations")
        shotlistsRef.push(req.body)
        res.send('success')
    } else {
        res.send('got to /login or /register')
    }
} // create new location

function updateLocation(req, res) {
    if (req.session.user != undefined) {
        shotlistsRef = firebase.database().ref("/users/" + req.session.user + "/projects/" + req.params.projectID + "/locations")
        shotlistsRef.child(req.params.locationID).update(req.body)
        res.send('success')
    } else {
        res.send('got to /login or /register')
    }
} // update location by id with given data

function deleteLocation(req, res) {
    if (req.session.user != undefined) {
        shotlistsRef = firebase.database().ref("/users/" + req.session.user + "/projects/" + req.params.projectID + "/locations")
        shotlistsRef.child(req.params.locationID).remove()
        res.send('success')
    } else {
        res.send('got to /login or /register')
    }
} // delete location by id


function showShotlists(req, res) {
    if (req.session.user != undefined) {
        shotlistsRef = firebase.database().ref("/users/" + req.session.user + "/projects/" + req.params.projectID + "/shotlists")
        shotlistsRef.on("value", function(snapshot) {
            res.send(snapshotToArray(snapshot))
        })
    } else {
        res.send('got to /login or /register')
    }
} // show all user shotlists

function showShotlist(req, res) {
    if (req.session.user != undefined) {
        shotlistsRef = firebase.database().ref("/users/" + req.session.user + "/projects/" + req.params.projectID + "/shotlists/" + req.param.shotlistID)
        shotlistsRef.on("value", function(snapshot) {
            res.send(snapshotToArray(snapshot))
        })
    } else {
        res.send('got to /login or /register')
    }
} // show selected shotlist

function addShotlist(req, res) {
    if (req.session.user != undefined) {
        shotlistsRef = firebase.database().ref("/users/" + req.session.user + "/projects/" + req.params.projectID + "/shotlists")
        shotlistsRef.push(req.body)
        res.send('success')
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
        shotsRef.on("value", function(snapshot) {
            res.send(snapshotToArray(snapshot))
        })
    } else {
        res.send('got to /login or /register')
    }
} // show all user shots

function showShot(req, res) {
    if (req.session.user != undefined) {
        shotsRef = firebase.database().ref("/users/" + req.session.user + "/projects/" + req.params.projectID + "/shotlists/" + req.params.shotlistID + "/shots/" + req.params.shotID)
        shotsRef.on("value", function(snapshot) {
            res.send(snapshotToArray(snapshot))
        })
    } else {
        res.send('got to /login or /register')
    }
} // show selected shot

function addShot(req, res) {
    if (req.session.user != undefined) {
        shotsRef = firebase.database().ref("/users/" + req.session.user + "/projects/" + req.params.projectID + "/shotlists/" + req.params.shotlistID + "/shots")
        shotsRef.push(req.body)
        res.send('success')
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


function showMoodboards(req, res) {
    if (req.session.user != undefined) {
        moodboardsRef = firebase.database().ref("/users/" + req.session.user + "/projects/" + req.params.projectID + "/moodboards")
        moodboardsRef.on("value", function(snapshot) {
            res.send(snapshotToArray(snapshot))
        })
    } else {
        res.send('got to /login or /register')
    }
} // show all user moodboards

function showMoodboard(req, res) {
    if (req.session.user != undefined) {
        moodboardsRef = firebase.database().ref("/users/" + req.session.user + "/projects/" + req.params.projectID + "/moodboards/" + req.params.moodboardID)
        moodboardsRef.on("value", function(snapshot) {
            res.send(snapshotToArray(snapshot))
        })
    } else {
        res.send('got to /login or /register')
    }
} // show selected moodboard

function addMoodboard(req, res) {
    if (req.session.user != undefined) {
        moodboardsRef = firebase.database().ref("/users/" + req.session.user + "/projects/" + req.params.projectID + "/moodboards")
        moodboardsRef.push(req.body)
        res.send('success')
    } else {
        res.send('got to /login or /register')
    }
} // create new moodboard

function updateMoodboard(req, res) {
    if (req.session.user != undefined) {
        moodboardsRef = firebase.database().ref("/users/" + req.session.user + "/projects/" + req.params.projectID + "/moodboards")
        moodboardsRef.child(req.params.moodboardID).update(req.body)
        res.send('success')
    } else {
        res.send('got to /login or /register')
    }
} // update moodboard by id with given data

function deleteMoodboard(req, res) {
    if (req.session.user != undefined) {
        moodboardsRef = firebase.database().ref("/users/" + req.session.user + "/projects/" + req.params.projectID + "/moodboards")
        moodboardsRef.child(req.params.moodboardID).remove()
        res.send('success')
    } else {
        res.send('got to /login or /register')
    }
} // delete moodboard by id


function showContacts(req, res) {
    if (req.session.user != undefined) {
        contactsRef = firebase.database().ref("/users/" + req.session.user + "/projects/" + req.params.projectID + "/contacts")
        contactsRef.on("value", function(snapshot) {
            res.send(snapshotToArray(snapshot))
        })
    } else {
        res.send('got to /login or /register')
    }
} // show all user shotlists

function showContact(req, res) {
    if (req.session.user != undefined) {
        contactsRef = firebase.database().ref("/users/" + req.session.user + "/projects/" + req.params.projectID + "/contacts/" + req.params.contactID)
        contactsRef.on("value", function(snapshot) {
            res.send(snapshotToArray(snapshot))
        })
    } else {
        res.send('got to /login or /register')
    }
} // show selected shotlist

function addContact(req, res) {
    if (req.session.user != undefined) {
        contactsRef = firebase.database().ref("/users/" + req.session.user + "/projects/" + req.params.projectID + "/contacts")
        contactsRef.push(req.body)
        res.send('success')
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


function projectSnapshotToArray(snapshot) {
    var returnArr = []

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val()
        item.id = childSnapshot.key

        console.log('seas')

        returnArr.push(item)
    })

    returnArr.forEach(item => {
        var contactsArray = []
        var locationsArray = []
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
} // stores name as id in array

module.exports = {
    register,
    login,
    logout,
    showUserdetails,
    updateUserdetails,
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
    showMoodboards,
    showMoodboard,
    addMoodboard,
    updateMoodboard,
    deleteMoodboard,
    showContacts,
    showContact,
    addContact,
    updateContact,
    deleteContact
}