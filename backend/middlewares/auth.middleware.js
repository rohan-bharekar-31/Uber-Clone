import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import captainModel from "../models/captain.model.js";
import BlacklistToken from "../models/blacklistToken.model.js";

export const authUser = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token" });
        }

        const isBlacklisted = await BlacklistToken.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({ message: "Unauthorized: Token blacklisted" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        if (!user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }

        req.user = user;
        return next();

    } catch (error) {
        console.error("Auth error:", error.message);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};


export const authCaptain = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token" });
        }

        const isBlacklisted = await BlacklistToken.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({ message: "Unauthorized: Token blacklisted" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);

        if (!captain) {
            return res.status(401).json({ message: "Unauthorized: Captain not found" });
        }

        req.captain = captain;
        return next();

    } catch (error) {
        console.error("AuthCaptain error:", error.message);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2Y5MjBiZjAwNGI3N2ZkY2MxMTY3NTciLCJlbWFpbCI6InJvaGFuYmhhcmVrYXI1QGdtYWlsLmNvbSIsImlhdCI6MTc0NDM4MDA5NSwiZXhwIjoxNzQ0NDY2NDk1fQ.8Ab8K9oTplYP7oCnOszLKe8tI4n_fNr_LuUyz-7ZH_8
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2U3YjBmNGM3MGNiOTQzMTA3MGZkMjEiLCJlbWFpbCI6InJhbmRvbUBnbWFpbC5jb20iLCJpYXQiOjE3NDQzNzk5NzYsImV4cCI6MTc0NDQ2NjM3Nn0.PPmd3RojUtVwN8P7YaZnuZ14CbKtlBunDYRjOI1X3xw