const express = require('express');
const app = express();

const cors = require('cors');

const port = 5000;



// Settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);
app.use(cors());

//Middlewares
//app.use(express.urlencoded({extended: false}));
//app.use(express.json());

// Technicians API Routes
//app.use('/api/technicians',require('../caldar-G8/controllers/techniciansRoutes'));
app.use('/technicians',require('./controllers/technicians'));

// Building API Routes
app.use('/buildings', require('./controllers/buildings'));

// Customers API Routes
app.use('/customers', require('./controllers/customers'));

// Appointments API Routes
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/appointments', require('./controllers/appointments'));

// Boilers-data API routes
app.use('/boilers-data', require('./controllers/boilers-data'));

// Boilers API routes 
app.use('/boilers', require('./controllers/boilers'));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})

//const PORT = process.env.PORT || 4000;

//app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
