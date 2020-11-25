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

// Technicians API Routes
app.use('/api/technicians',require('../caldar-G8/controllers/techniciansRoutes'));

// Starting server
app.listen(app.get('port'), () =>{
    console.log('Server on port 3000')
})
// Building API Routes
app.use('/buildings', require('./controllers/buildings'));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})
