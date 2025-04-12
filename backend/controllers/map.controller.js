import * as mapService from "../services/map.service.js";
import { validationResult } from "express-validator";



export const getCoordinates = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { address } = req.query;
    try {
        const coordinates = await mapService.getCoordinatesFromAddress(address);
        res.status(200).json(coordinates);
    } catch (error) {
        res.status(400).json({ message: "Coordinates not found" });
    }

}

export const getDistanceTime = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { origin, destination } = req.query;
        
        const distanceTime = await mapService.getDistanceTimeFromOriginAndDestination(origin, destination);
        res.status(200).json(distanceTime);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: "Coordinates not found" });
    }
}


export const getAutoCompleteSuggestions = async (req, res, next) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { input } = req.query;

        const suggestions = await mapService.getAutoCompleteSuggestions(input);

        res.status(200).json(suggestions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

