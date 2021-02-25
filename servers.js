"use strict";

//require the Express module
const express = require("express");
//require the router object (and all the defined routes) to be used in this file
const routes = require("./routes");

//require the cors module
const cors = require("cors");

//creates an instance of an Express server
const app = express();

//Enable Cross Origin Resource Sharing so this API can be used from web-apps on other domains
app.use(cors());

//allow POST and PUT requests to use JSON bodies
app.use(express.json());
//use the router object (and all the defined routes)
app.use("/", routes);

//define a port
const port = 3000;

//run the server
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
