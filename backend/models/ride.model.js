import mongoose from "mongoose"

const rideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "captain"
    },
    pickup: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true,
    },
    fare: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "ongoing", "completed"],
        default: "pending",
    },
    duration: {
        type: Number,
    },
    distance: {
        type: Number,
    },
    paymentID: {
        type: String,
    },
    orderID: {
        type: String,
    },
    signature: {
        type: String,
    },
    otp:{
        type:String,
        required:true,
        select:false,
    }
})

const RideModel=mongoose.model("ride",rideSchema);

export default  RideModel;