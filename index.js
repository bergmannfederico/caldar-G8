//<<<<<<< HEAD
/*const express = require('express');

const app = express();

app.use('/boilers-data', require('./controllers/boilers-data'));

const path = require("path");
const customers = require("./data/boilers-data.json");

//BodyParser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Customers API Routes
app.use('/customers', require('./controllers/customers.js'));
//>>>>>>> 82677c21728738ab215ec912d9c52694b1a26bae
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));*/
const express = require('express');

const app = express();

app.use('/boilers-data', require('./controllers/boilers-data'));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));