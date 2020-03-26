////////// vars //////////
var express = require('express');
var router = express.Router();

////////// link to user functions //////////
var user = require('../components/userFunctions')

////////// get and post //////////
router.get('/', (req, res) => {
    user.showProjects(req, res)
}) // get for showProjects()

router.get('/:projectID', (req, res) => {
    user.showProject(req, res)
}) // get for showProject()

router.post('/add', async (req, res) => {
       user.addProject(req, res)
}) // post for addProject()

router.post('/:projectID/update', async (req, res) => {
    user.updateProject(req, res)
}) // post for updateProject()

router.post('/:projectID/delete', async (req, res) => {
    user.deleteProject(req, res)
}) // post for deleteProject()


router.get('/:projectID/documents', (req, res) => {
    user.showDocuments(req, res)
}) // get for showDocuments()

router.get('/:projectID/documents/:documentID', (req, res) => {
    user.showDocument(req, res)
}) // get for showDocument()

router.post('/:projectID/documents/add', async (req, res) => {
    user.addDocument(req, res)
}) // post for addDocument()

router.post('/:projectID/documents/:documentID/update', async (req, res) => {
    user.updateDocument(req, res)
}) // post for updateDocument()

router.post('/:projectID/documents/:documentID/delete', async (req, res) => {
    user.deleteDocument(req, res)
}) // post for deleteDocument()


router.get('/:projectID/locations', (req, res) => {
    user.showLocations(req, res)
}) // get for showLocations()

router.get('/:projectID/locations/:locationID', (req, res) => {
    user.showLocation(req, res)
}) // get for showLocation()

router.post('/:projectID/locations/add', async (req, res) => {
    user.addLocation(req, res)
}) // post for addLocation()

router.post('/:projectID/locations/:locationID/update', async (req, res) => {
    user.updateLocation(req, res)
}) // post for updateLocation()

router.post('/:projectID/locations/:locationID/delete', async (req, res) => {
    user.deleteLocation(req, res)
}) // post for deleteLocation()


router.get('/:projectID/shotlists', (req, res) => {
    user.showShotlists(req, res)
}) // get for showShotlists()

router.get('/:projectID/shotlists/:shotlistID', (req, res) => {
    user.showShotlist(req, res)
}) // get for showShotlist()

router.post('/:projectID/shotlists/add', async (req, res) => {
    user.addShotlist(req, res)
}) // post for addShotlist()

router.post('/:projectID/shotlists/:shotlistID/update', async (req, res) => {
    user.updateShotlist(req, res)
}) // post for updateShotlist()

router.post('/:projectID/shotlists/:shotlistID/delete', async (req, res) => {
    user.deleteShotlist(req, res)
}) // post for deleteShotlist()


router.get('/:projectID/shotlists/:shotlistID/shots', (req, res) => {
    user.showShots(req, res)
}) // get for showShots()

router.get('/:projectID/shotlists/:shotlistID/shots/:shotID', (req, res) => {
    user.showShot(req, res)
}) // get for showShot()

router.post('/:projectID/shotlists/:shotlistID/shots/add', (req, res) => {
    user.addShot(req, res)
}) // post for addShot()

router.post('/:projectID/shotlists/:shotlistID/shots/:shotID/update', (req, res) => {
    user.updateShot(req, res)
}) // post for updateShot()

router.post('/:projectID/shotlists/:shotlistID/shots/:shotID/delete', (req, res) => {
    user.deleteShot(req, res)
}) // post for deleteShot()


router.get('/:projectID/contacts', (req, res) => {
    user.showContacts(req, res)
}) // get for showContacts()

router.get('/:projectID/contacts/:contactID', (req, res) => {
    user.showContact(req, res)
}) // get for showContact()

router.post('/:projectID/contacts/add', async (req, res) => {
    user.addContact(req, res)
}) // post for addContact()

router.post('/:projectID/contacts/:contactID/update', async (req, res) => {
    user.updateContact(req, res)
}) // post for updateContact()

router.post('/:projectID/contacts/:contactID/delete', async (req, res) => {
    user.deleteContact(req, res)
}) // post for deleteContact()


//TODO: images
module.exports = router;