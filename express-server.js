const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;



// Settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);
app.use(cors());

//Middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Technicians API Routes
//app.use('/api/technicians',require('../caldar-G8/controllers/techniciansRoutes'));
app.use('/technicians',require('./controllers/technicians'));

// Building API Routes
app.use('/buildings', require('./controllers/buildings'));

//Customers API Routes
app.use('/customers', require('./controllers/customers'));

// Appointments API Routes
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/appointments', require('./controllers/appointments'));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})
