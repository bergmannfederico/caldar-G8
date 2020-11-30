const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;
const router = require('./app/routes');
const bodyParser = require('body-parser');

// Settings
app.use(bodyParser.json());
app.use(express.urlencoded({extended:false}));
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);
app.use(cors());
app.use(router);

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
})