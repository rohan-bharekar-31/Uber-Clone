import userModel from "../models/user.model.js";
import { validationResult } from "express-validator";
import { createUser } from "../services/user.service.js";
import BlacklistToken from "../models/blacklistToken.model.js";

export const registerUser = async (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    const isUserAlreadyExist = await userModel.findOne({ email });

    if (isUserAlreadyExist) {
        return res.status(400).json({ message: "User already exists" })
    }

    const hashedPassword = await userModel.hashPassword(password);
    const user = await createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
    })

    const token = user.generateAuthToken();

    res.status(201).json({ token, user });
}

export const loginUser = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select('+password');

    if (!user) {
        return res.status(401).json("Invalid Email or Password");
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json("Invalid Email or Password");
    }

    const token = user.generateAuthToken();

    res.cookie("token", token);

    return res.status(200).json({ token, user });
}

export const getUserProfile = async (req, res, next) => {
    return res.status(200).json({ user: req.user })
}

export const logOutUser = async (req, res, next) => {
    res.clearCookie("token");

    const token = req.cookies.token || req.headers.authorization.split(' ')[1];

    await BlacklistToken.create({ token });
    return res.status(400).json({ message: "Logged Out" });
}
