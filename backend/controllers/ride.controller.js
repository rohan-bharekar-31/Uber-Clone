import * as rideService from "../services/ride.service.js";
import { validationResult } from "express-validator";
import * as mapService from "../services/map.service.js"
import { sendMessage } from "../socket.js";
import RideModel from "../models/ride.model.js";


export const createRide = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { pickup, destination, vehicleType } = req.body;

        // Create the ride
        console.log(req.user);
        const ride = await rideService.createRide({
            user: req.user._id,
            pickup,
            destination,
            vehicleType
        });

        //  send the  response
        res.status(201).json({
            ride,

        });

        // Get pickup coordinates
        const pickupCoordinates = await mapService.getCoordinatesFromAddress(pickup);



        // Find nearby captains
        const captainsInRadius = await mapService.getCaptainsInTheRadius(
            pickupCoordinates.ltd,
            pickupCoordinates.lng,
            50
        );

        // console.log( " Captains : "+captainsInRadius);
        ride.otp="";
        const rideWithUser = await RideModel.findOne({ _id: ride._id }).populate('user');

        captainsInRadius.map((captain)=>{
            const messageObject={
                event:"new-ride",
                data:rideWithUser
            }
            
            sendMessage(captain.socketId,messageObject);
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Error creating ride",
            error: error.message
        });
    }
};


export const getFare = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { pickup, destination } = req.query;
        console.log(pickup, destination)
        const fare = await rideService.getFare(pickup, destination);

        res.status(201).json({
            fare
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating ride",
            error: error.message
        });
    }
}

export const confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.confirmRide({ rideId, captain: req.captain });

        sendMessage(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {

        console.log(err);
        return res.status(500).json({ message: err.message });
    }
}

export const startRide=async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;
    
    try {
        const ride = await rideService.startRide({ rideId, otp, captain: req.captain });

        console.log(ride);

        sendMessage(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

export const endRide=async (req,res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    
    const { rideId } = req.body;

    try {
        const ride = await rideService.endRide({ rideId, captain: req.captain });

        sendMessage(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}