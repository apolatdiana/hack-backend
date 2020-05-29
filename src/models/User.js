const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: String
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        default: "SafeBoda"
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "staff"],
        default: "staff"
    },
    phonenumber: {
        type: String,
        required: true
    },
    nin: {
        type: String,
        required: true,
        unique: true
    },
    nextofkin: {
        type: String,
        required: true
    },
    nextofkincontact: {
        type: String
    },
    clients: [{
        type: Schema.Types.ObjectId,
        ref: "Client"
    }]
});

UserSchema.pre('save', async function (next) {
    const user = this
    if(user.isModified("password")) {
       user.password = await bcrypt.hash(user.password, 8);
    }
     next();
});

 
UserSchema.statics.findByCredentials = async (email, password) => {
     const user = await User.findOne({email});
     if (!user){
         return {error: "User not found!"};
     }
     const isPasswordMatch = await bcrypt.compare(password, user.password);
     if (!isPasswordMatch){
         return {error: "Invalid password"};
             }
     return user;        
};
 
UserSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign(
        {id: user._id, email: user.email},
        "WeAreTheGreatest"
        );     
return token;
}
            
const User = mongoose.model('User', UserSchema);

module.exports = User;