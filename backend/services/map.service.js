import axios from 'axios';
import captainModel from '../models/captain.model.js';

export const getCoordinatesFromAddress = async (address) => {
    try {
        const apiKey = process.env.GOOGLE_MAPS_KEY;
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
            params: {
                address,
                key: apiKey
            }
        });

        if (response.data.status === "OK") {
            const location = response.data.results[0].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error(`Geocoding API error: ${response.data.status}`);
        }
    } catch (error) {
        console.error("Error fetching coordinates:", error.message);
        throw new Error("Unable to fetch coordinates. Please try again.");
    }
};


export const getDistanceTimeFromOriginAndDestination = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error("Origin and destination are required");
    }

    try {
        const apiKey = process.env.GOOGLE_MAPS_KEY;

        const response = await axios.get("https://maps.googleapis.com/maps/api/distancematrix/json", {
            params: {
                origins: origin,
                destinations: destination,
                key: apiKey
            }
        });

        if (response.data.status === "OK") {
            const element = response.data.rows[0].elements[0]; // ✅ Correct way to access data

            if (element.status === "OK") {
                return {
                    distance: element.distance,
                    duration: element.duration
                };
            } else {
                throw new Error(`Google Maps API error: ${element.status}`);
            }
        } else {
            throw new Error(`Google Maps API error: ${response.data.status}`);
        }
    } catch (error) {
        console.error("Error fetching distance and time:", error.message);
        throw new Error("Unable to fetch distance and time. Please try again.");
    }
};


export const getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('query is required');
    }

    const apiKey = process.env.GOOGLE_MAPS_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.predictions.map(prediction => prediction.description).filter(value => value);
        } else {
            throw new Error('Unable to fetch suggestions');
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const getCaptainsInTheRadius = async (ltd, lng, radius) => {

    // radius in km

    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[ltd, lng], radius / 6371]
            }
        }
    });


    return captains;


}