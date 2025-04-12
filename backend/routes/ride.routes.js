import {Router} from "express";
import {body,query} from "express-validator";
import * as rideController from "../controllers/ride.controller.js"
import { authCaptain, authUser } from "../middlewares/auth.middleware.js";
const router =Router();

router.post("/create",authUser,
    body("pickup").isString().isLength({min:3}).withMessage("Invalid pickup addresss"),
    body("destination").isString().isLength({min:3}).withMessage("Invalid destination addresss"),
    body("vehicleType").isString().isIn(["auto","car","bike"]).withMessage("Invalid Vehicle Type"),
    rideController.createRide
)

router.get("/get-fare",authUser,
    query("pickup").isString().isLength({min:3}).withMessage("Invalid pickup addresss"),
    query("destination").isString().isLength({min:3}).withMessage("Invalid destination addresss"),
    rideController.getFare
)

router.post("/confirm",authCaptain, 
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    rideController.confirmRide
)

router.get("/start-ride",authCaptain,
    query('rideId').isMongoId().withMessage('Invalid ride id'),
    query("otp").isString().isLength({min:6}).withMessage("Invalid Otp"),
    rideController.startRide
)

router.post("/end-ride",authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    rideController.endRide
)
export default router; 