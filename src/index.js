const path = require('path');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');


const app = express();
// const port = process.env.PORT || 5000;

const exphbs = require('express-handlebars');
const route = require('./routes/index.route');
const db = require('./config/db');
const cors = require('cors')
//Conect DB
db.connect();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use('/uploads',express.static('uploads'))
app.use(
    session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
  }));

app.engine('hbs', exphbs({
    extname: '.hbs'
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resourse', 'views'));

//config cors for the project
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin:*');
    res.header('Access-Control-Allow-Headers:Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods: GET,PUT,POST,DELETE,OPTIONS');
    next();
})

app.use(cors())

//Route
route(app);


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

