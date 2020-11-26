const express = require("express");
const path = require("path");
const customers = require("./data/customers.json");

const app = express();

//BodyParser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//HomePage Route
app.get("/", (req, res) => {
    res.render("index", { title: "Customer App", customers });
});

//Set static folder
app.use(express.static(path.join(__dirname, "public")));

app.use('/customers', require('./controllers/customers.js'));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));