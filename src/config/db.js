const mongoose = require('mongoose');

//Connect to the database url
mongoose.connect("mongodb://localhost:27017/users",{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db= mongoose.connection;
if(!db){console.log("Error connecting to database");
}else{console.log("Successfully connected to database");}