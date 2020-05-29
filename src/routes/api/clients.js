const Client = require('../../models/Client');
const express = require('express');
const auth = require("../../middleware/auth");
const User = require('../../models/User');
const router = express.Router();

//Registration
router.post("/clients", auth, async (req, res) => {
    const clientData = req.body;
    const user = req.user
    try{
        const client = await Client.findOne({ nin: req.body.nin });
        if(client){
            return res.status(400).send({msg:"Client already exists"})
            } else {
        const newClient = new Client(clientData);
        await newClient.save();
        user.clients.push(newClient._id);
        await user.save();
        res
        .status(201)
        .send({message: "Client registered successfully", client: newClient});}
    } catch(error) {
        res.status(400).send({error});
    } 
});

//Fetch all clients
router.get("/clients", auth, (req, res)=>{
    const user = req.user;
    User.find({_id:user._id}).populate("clients")
        .then((clients)=>{
            res.status(200).send(clients);  
        }).catch((error)=>{
            res.status(400).send(error);
        })
    // Client.find({})
    //     .then((clients)=>{
    //         res.status(200).send(clients);
    //     }).catch((error)=>{
    //         res.status(400).send(error);
    //     })
})

//Fetching a single client
router.get("/clients/:id",auth, async (req,res)=>{
    const id = req.params.id;
    try{
        const client = await Client.findById(id);
        if(!client){
            return res.status(404).send({error: "Client not found!"});
        } 
            res.status(200).send(client);
    } catch(error){
        res.status(400).send(error);
}     
})

 //Deleting a client
 router.delete("/clients/:id",auth, async (req,res)=>{
    const {id} = req.params;
    try{
        const response = await Client.findByIdAndDelete(id);
        if(!response){
            return res.status(404).send({error: "Client not found!", msg: "Client doesn't exist"});
        } 
         res.status(200).send({message: "Client successully deleted", data: response});
        } catch(error){
         res.status(400).send(error);
        }
    })
/*Updating a client
router.patch("/clients/:id", auth, async (req,res)=>{
    let { status } = req.body;
    let {id} = req.params;
    try{
        const client = await Client.findById(id);
        if(!client){
            return res.status(404).send({error: "Client not found!"});
        } 
        client.status = status;
        await client.save();
        res.status(200).send(client);
    } catch(error){
         res.status(400).send(error);
 }     
 })
*/
module.exports = router;