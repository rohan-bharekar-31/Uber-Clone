import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; 

const userSchema=new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlenght:[3,'First name must be atleast 3 characters long']

        },
        lastname:{
            type:String,
            minlenght:[3,'Last name must be atleast 3 characters long']
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlenght:[3,'Email must be atleast 3 characters long']
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    socketId:{
        type:String,
    }
})

// **Method to generate authentication token (JWT)**
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id, username: this.username, email: this.email },
        process.env.JWT_SECRET, // Use a secure secret key from environment variables
        { expiresIn: "1h" } // Token expires in 1 hour
    );
    return token;
};

// **Method to compare passwords during login**
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// **Static method to hash password before saving**
userSchema.statics.hashPassword = async function (plainPassword) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(plainPassword, salt);
};

const userModel=mongoose.model('user',userSchema);

export default userModel