var userID = '1eClWNvjjibrB5U1EIemFzOYFbx2'
//var userProjectSelected = 'Project1'
var userProjectSelected = 'Project1'
var userProjectSelected = ''
var userLocationSelected = ''
var userContactSelected = ''
//TODO
//var userProjects = []
var userContacts = []
var contactDetails = []
var userLocations = []
var userLocationsByID = []
var locationDetails = []
var userProjects = []
var userProjectsByID = []
var userScripts = []
var scriptDetails = []
var userShotlists = []
var shotlistDetails = []
var userDocuments = []
//var allUsers = []

var pid = ''


//use firebase instance of app-------------------START//
const firebase = require('firebase')
//-------------------------------------------------END//


//create ref to needed path in the db------------START//
//var userRef = firebase.database().ref("/users")
//TODO
var projectRef = ''
var contactRef = ''
var locationRef = ''
var scriptRef = ''
var shotlistRef = ''
var documentRef = ''
//-------------------------------------------------END//

var project1Ref = firebase.database().ref("/users/" + userID + "/projects")
project1Ref.on("value", function(snapshot) {
    //console.log(snapshot.val())
    userProjects.push((snapshot.val()))
  });
//-------------------------------------------------END//


//get and post methods---------------------------START//
//create functions for the users-----------------START//

function register(req, res) {
    firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password).then(function() {
        req.session.user = firebase.auth().currentUser.uid
        var userRef = firebase.database().ref("/users/" + req.session.user + "/userdetails/")
        userRef.set({
            first_name: req.body.first_name,
            last_name: req.body.last_name
        })
        res.send('success')
    }).catch(function(error) {
        if (error.code == 'auth/weak-password') {
            res.send('weak password - use at least 6 character')
        }
    });
}

function login(req, res) {
    firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password).then(function() {
        req.session.user = firebase.auth().currentUser.uid
        res.send('success')
    }).catch(function(error) {
        console.log(error)
        if (error.code == 'auth/user-not-found') {
            res.send('user not found')
        } else if (error.code == 'auth/wrong-password') {
            res.send('wrong password')
        }
    });
}

/*function setCurrentUser(username) {
    userID = username
}

function getCurrentUser() {
    return userID
}*/

function showUserdetails(req, res) {
    var userdetails = ''
    var userRef = firebase.database().ref("/users/" + req.session.user + "/userdetails")
    userRef.on("value", function(snapshot) {
        //userdetails.push(snapshot.val())
        userdetails = snapshot.val()
    })
    console.log(userdetails.first_name)
}

function logout(req, res) {
    if (req.session.user != undefined) {
        req.session.user = undefined
    }
    res.send('logout')
}

function showContacts(username) {
    contactRef = firebase.database().ref("/users" + "/" + userID + "/projects/" + userProjectSelected + "/contacts")

    contactRef.on("value", function(snapshot) {
        userContacts = []
        userContacts.push(snapshot.val())
    })
    return userContacts
}

function showContact(user) {
    console.log('func')
    var contactDetailsRef = firebase.database().ref("/users" + "/" + userID + "/projects/" + userProjectSelected + "/contacts/" + user)

    contactDetailsRef.on("value", function(snapshot) {
        contactDetails = []
        contactDetails.push(snapshot.val())
        console.log(snapshot.val())
    })
    return contactDetails
}

function showLocation(location) {
    console.log('func')
    var locationDetailsRef = firebase.database().ref("/users" + "/" + userID + "/projects/" + userProjectSelected + "/locations/" + location)

    locationDetailsRef.on("value", function(snapshot) {
        locationDetails = []
        locationDetails.push(snapshot.val())
        console.log(snapshot.val())
    })
    return locationDetails
}

function showLocationsByID(id) {

    if (userProjects[this.getPID()-1] === undefined) {
        this.showProjects()
        console.log('if')
    } else {
        console.log('else')
        console.log(userProjects[this.getPID()-1].key)

        locationRef = firebase.database().ref("/users" + "/" + userID + "/projects/" + userProjects[this.getPID()-1].key + "/locations")

    
        locationRef.on("value", function(snapshot) {
            userLocations = snapshotToArray(snapshot)
        })

        console.log(locationRef)

        console.log(userLocations)
        return userLocations[id-1]
    }

    
}

function showLocations() {
    /*locationRef = firebase.database().ref("/users" + "/" + userID + "/projects/" + userProjects[this.getPID()].key + "/locations")

    
    locationRef.on("value", function(snapshot) {
        userLocations = snapshotToArray(snapshot)
    })*/

    
    if (userProjects[this.getPID()-1] === undefined) {
        this.showProjects()
        console.log('if')
    } else {
        console.log('else')
        console.log(userProjects[this.getPID()-1].key)

        locationRef = firebase.database().ref("/users" + "/" + userID + "/projects/" + userProjects[this.getPID()-1].key + "/locations")

    
        locationRef.on("value", function(snapshot) {
            userLocations = snapshotToArray(snapshot)
        })

        console.log(locationRef)

        console.log(userLocations)
        return userLocations
    }

    
    

    
}

function snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });

    return returnArr;
};

function showProjectsByID(id) {
     var projectByIDRef = firebase.database().ref("/users" + "/" + userID + "/projects")
     userProjectSelected = id

    projectByIDRef.on("value", function(snapshot) {
        userProjectsByID = snapshotToArray(snapshot)
        //userLocations.push(snapshot.val())
    })

    
    return userProjectsByID[id-1]

    
}

function showProjects() {
    projectRef = firebase.database().ref("/users" + "/" + userID + "/projects")
    userProjects.slice(0, userProjects.length)

    projectRef.on("value", function(snapshot) {
        userProjects = snapshotToArray(snapshot)
    })

    
    return userProjects

    
}

/*function showProjects() {
    var projectRef = firebase.database().ref("/users" + "/" + userID + "/projects")

    projectRef.on("value", function(snapshot) {
        userProjects = []
        userProjects.push(snapshot.val())
        console.log(userProjects)
    })
    return userProjects
    
}*/

function showScripts() {
    scriptRef = firebase.database().ref("/users" + "/" + userID + "/projects/" + userProjectSelected + "/scripts")

    scriptRef.on("value", function(snapshot) {
        userScripts = []
        userScripts.push(snapshot.val())
    })
    return userScripts
    
}

function showScript(script) {
    var scriptDetailsRef = firebase.database().ref("/users" + "/" + userID + "/projects/" + userProjectSelected + "/scripts/" + script)

    scriptDetailsRef.on("value", function(snapshot) {
        scriptDetails = []
        scriptDetails.push(snapshot.val())
    })
    return scriptDetails
    
}

function showShotlists() {
    shotlistRef = firebase.database().ref("/users" + "/" + userID + "/projects/" + userProjectSelected + "/shotlists")

    shotlistRef.on("value", function(snapshot) {
        userShotlists = []
        userShotlists.push(snapshot.val())
    })
    return userShotlists
    
}

function showShotlist(shotlist) {
    var shotlistDetailsRef = firebase.database().ref("/users" + "/" + userID + "/projects/" + userProjectSelected + "/shotlists/" + shotlist)

    shotlistDetailsRef.on("value", function(snapshot) {
        shotlistDetails = []
        shotlistDetails.push(snapshot.val())
    })
    return shotlistDetails
    
}

function showDocuments() {
    documentRef = firebase.database().ref("/users" + "/" + userID + "/projects/" + userProjectSelected + "/documents")

    documentRef.on("value", function(snapshot) {
        userDocuments = []
        userDocuments.push(snapshot.val())
    })
    return userDocuments
    
}

function saveDetails(vorname, nachname, telefonnummer, anschrift, plz, ort) {
    var userRef = firebase.database().ref("/users" + "/" + userID + "/details")
        console.log(userID)

    userRef.set({
        vorname: vorname,
        nachname: nachname,
        telefonnummer: telefonnummer,
        anschrift: anschrift,
        plz: plz,
        ort: ort
    })
}

function saveContact(name) {
    var contactSaveRef = firebase.database().ref("/users" + "/" + userID + "/projects/" + userProjectSelected + "/contacts")
        console.log(userID)

    contactSaveRef.child(name).set({
        Contactname: 'Test',
    })
}

function saveLocation(name) {
    var locationSaveRef = firebase.database().ref("/users" + "/" + userID + "/projects/" + userProjectSelected + "/locations")
        console.log(userID)

    locationSaveRef.child(name).set({
        Locationname: 'ATest',
    })
}

/*function saveProject(name) {
    var projectSaveRef = firebase.database().ref("/users" + "/" + userID + "/projects")
        console.log(userID)

        projectSaveRef.child(name).set({
        Projectname: 'Test',
    })
}*/

function saveProject(req, res) {
    var projectSaveRef = firebase.database().ref("/users/" + req.session.user + "/projects")
    projectSaveRef.push(req.body)
    res.send('success')
}

function updateProject(req, res) {
    var projectSaveRef = firebase.database().ref("/users/" + req.session.user + "/projects")
    projectSaveRef.child('-M10q_fIBosxN-n8sWEV').update(req.body)
    res.send('success')
}


//TODO
/*
function showProjects(username) {
}
*/

/*function listAllUsers() {
    userRef.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            allUsers.push(childSnapshot.key)
        })
    })
    return allUsers
}*/


//-------------------------------------------------END//



function setPID(newPID) {
    pid = newPID
}

function getPID() {
    return pid
}



module.exports = {
    //getCurrentUser,
    userID,
    register,
    login,
    logout,
    showProjects,
    showProjectsByID,
    showContacts,
    showContact,
    showLocations,
    showLocationsByID,
    showLocation,
    showScripts,
    showScript,
    showShotlists,
    showShotlist,
    showDocuments,
    saveDetails,
    saveContact,
    saveLocation,
    saveProject,
    userProjectSelected,
    userLocationSelected,
    userContactSelected,
    setPID,
    getPID,
    showUserdetails,
    updateProject
}