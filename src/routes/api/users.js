const express = require('express');
const User = require('../../models/User');
const auth = require("../../middleware/auth");
const router = express.Router();

//Registration
router.post("/users/register", auth, async (req, res) => {
    const userData = req.body;
    try{
        const user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).send({msg:"Email already exists"})
            } else {
        const newUser = new User(userData);
        await newUser.save();
        res
        .status(201)
        .send({message: "User created successfully", user: newUser});}
    } catch(error) {
        res.status(400).send({error});
    } 
});

// Login
router.post('/users/login', async (req,res)=>{
    const {email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    if (user.error) {
        return res.status(400).send({error: user.error})
    }
    const token = await user.generateAuthToken();
    res.status(201).send({message: "Logged in successfully", user, token})
});


// View user profile
router.get("/users/profile", auth, (req, res) => {
    res.status(200).send(req.user);
})

//Fetch all users
router.get("/users", auth,(req, res)=>{
    User.find({})
        .then((users)=>{
            res.status(200).send(users);
        }).catch((error)=>{
            res.status(400).send(error);
        })
})

//Fetching a single user
router.get("/users/:id",auth, async (req,res)=>{
    const id = req.params.id;
    try{
        const user = await User.findById(id);
        if(!user){
            return res.status(404).send({error: "User not found!"});
        } 
            res.status(200).send(user);
    } catch(error){
        res.status(400).send(error);
}     
})

//Deleting a user
router.delete("/users/:id",auth, async (req,res)=>{
    const {id} = req.params;
    try{
        const response = await User.findByIdAndDelete(id);
        if(!response){
            return res.status(404).send({error: "User not found!", msg: "User doesn't exist"});
        } 
         res.status(200).send({message: "User successully deleted", data: response});
        } catch(error){
         res.status(400).send(error);
        }
    })
 
        
module.exports = router;