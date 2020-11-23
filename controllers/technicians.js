const express = require('express');
const app = express();
const cors = require('cors')



// Settings
app.set('port', process.env.PORT || 3000)
app.set('json spaces', 2)
app.use(cors())

//Middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Routes
app.use('/api/technicians',require('./techniciansRoutes'));


// getTechniciansAll
/* const getTechniciansAll = require('../data/technicians.json');
console.log(getTechniciansAll)
*/

// getTechnicianById

// getTechniciansByAttribute

// deleteTechnicianById



// Starting server
app.listen(app.get('port'), () =>{
    console.log('Server on port 3000')
})