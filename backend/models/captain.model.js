import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First name must be atleast 3 characters long']
        },
        lastname: {
            type: String,
            minlength: [3, 'Last name must be atleast 3 characters long']
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [3, 'Email must be atleast 3 characters long']
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, 'Color must be atleast 3 characters long']
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, 'Plate must be atleast 3 characters long']
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, "Capacity must be atleast 1"],
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'motorcycle', 'auto'],
        },
    },
    location: {
        //ltd - latitude and lng - longitude
        ltd: {
            type: Number,
        },
        lng: {
            type: Number,
        }
    }
});

captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id, username: this.username, email: this.email },
        process.env.JWT_SECRET, // Use a secure secret key from environment variables
        { expiresIn: "24h" } // Token expires in 24 hour
    );
    return token;
};

captainSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

captainSchema.statics.hashPassword = async function (plainPassword) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(plainPassword, salt);
};

const captainModel = mongoose.model('captain', captainSchema);

export default captainModel