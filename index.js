const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const router = require("./router");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000
require('./db');


app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
app.use(bodyParser.json());

app.use(router);

app.listen(PORT, () => {
    console.log(`server started at port ${process.env.BASE_URL || 'localhost:3000'}`);
});
