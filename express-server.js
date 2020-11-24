const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
})

// Appointments API Routes
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/appointments', require('./controllers/appointments'));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})