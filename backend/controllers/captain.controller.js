import captainModel from "../models/captain.model.js";
import { validationResult } from "express-validator";
import { createCaptain } from "../services/captain.service.js";
import BlacklistToken from "../models/blacklistToken.model.js";

export const registerCaptain = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { fullname, email, password, vehicle } = req.body;
    console.log(fullname,email,password,vehicle)
    const isCaptainAlreadyExist=await captainModel.findOne({email});

    if(isCaptainAlreadyExist){
        return res.status(400).json({message:"Captain already exists"})
    }

    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await createCaptain({ firstname: fullname.firstname, lastname: fullname.lastname, email, password: hashedPassword, color: vehicle.color, plate: vehicle.plate, capacity: vehicle.capacity, vehicleType: vehicle.vehicleType });

    const token = captain.generateAuthToken();

    res.status(201).json({ token, captain });
}


export const loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const captain = await captainModel.findOne({ email }).select('+password');

    if (!captain) {
        return res.status(401).json("Invalid Email or Password");
    }

    const isMatch = await captain.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json("Invalid Email or Password");
    }

    const token = captain.generateAuthToken();

    res.cookie("token", token);

    return res.status(200).json({ token, captain });
}

export const getCaptainProfile = async (req, res, next) => {
    return res.status(200).json({ captain: req.captain })
}

export const logOutCaptain = async (req, res, next) => {
    res.clearCookie("token");

    const token = req.cookies.token || req.headers.authorization.split(' ')[1];

    await BlacklistToken.create({ token });
    return res.status(400).json({ message: "Logged Out" });
}
