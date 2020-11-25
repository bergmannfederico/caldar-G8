const express = require('express');

const app = express();

app.use('/boilers-data', require('./controllers/boilers-data'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));