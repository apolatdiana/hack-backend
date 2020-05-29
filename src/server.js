const express = require('express');
const cors = require('cors');
require('./config/db');
const users = require('./routes/api/users');
const clients = require('./routes/api/clients');

const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json()); 
//Use routes
app.use(users);
app.use(clients);

//Create an endpoint for get
app.get("/", (req, res)=>{
    res.status(200).send({message: "Welcome to our onboarding portal"});
});
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});