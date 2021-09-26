const path = require('path');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const exphbs = require('express-handlebars');

const route = require('./routes/index.route');
const db = require('./config/db');

//Conect DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.engine('hbs', exphbs({
    extname: '.hbs'
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resourse', 'views'));

//Route
route(app);



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
