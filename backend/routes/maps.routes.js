import { Router } from "express";
const router = Router();
import { authUser } from "../middlewares/auth.middleware.js";
import { getCoordinates, getDistanceTime } from "../controllers/map.controller.js";
import { query } from "express-validator";
import { getAutoCompleteSuggestions } from "../controllers/map.controller.js";

//don't leave in open since it uses google cloud 
router.get("/get-coordinates", query("address").isString().isLength({ min: 3 }), authUser, getCoordinates);
// Route to calculate distance between two addresses

router.get(
    "/get-distance-time",
    [
        query("origin").isString().isLength({ min: 3 }).withMessage("Origin address is required"),
        query("destination").isString().isLength({ min: 3 }).withMessage("Destination address is required")
    ],
    authUser,
    getDistanceTime
);

router.get('/get-suggestions',
    query('input').isString().isLength({ min: 3 }),
    authUser,
    getAutoCompleteSuggestions
)

export default router;
