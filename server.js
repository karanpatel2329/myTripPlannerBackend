const express = require('express');
const bodyParser = require('body-parser');
const cors=require("cors");
require("./dbConnection");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const userRoute=require("./routes/userRoute");
const destinationRoute = require('./routes/destinationRoute');
const bookmarkRoute = require('./routes/bookmarkRoute');
app.use('/user',userRoute);
app.use('/destination',destinationRoute);
app.use('/bookmark',bookmarkRoute);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});