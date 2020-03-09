////////// vars //////////
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
//var cookieSession = require('cookie-session')
var sess  = require('express-session');


////////// firebase instance //////////
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


////////// express //////////
const app = express()
app.use(express.json())

////////// session cookie //////////
/*app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']//,
  //user: undefined
}))*/

app.use(sess({
	name: 'JSESSION',
	secret: 'MYSECRETISVERYSECRET',
	resave: true,
	saveUninitialized: true,
}));

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


////////// routers linked to files //////////
var loginRouter = require('./routes/login')
var logoutRouter = require('./routes/logout')
var registerRouter = require('./routes/register')
var projectsRouter = require('./routes/projects')
var userdetailsRouter = require('./routes/userdetails')
var tableviewRouter = require('./routes/tableview')
var calendareventsRouter = require('./routes/calendarevents')

////////// routers assigned to routes //////////
app.use('/login', loginRouter)
app.use('/logout', logoutRouter)
app.use('/register', registerRouter)
app.use('/projects', projectsRouter)
app.use('/userdetails', userdetailsRouter)
app.use('/tableview', tableviewRouter)
app.use('/calendarevents', calendareventsRouter)

module.exports = app;