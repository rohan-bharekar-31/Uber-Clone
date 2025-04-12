import * as mapService from "./map.service.js";
import RideModel from "../models/ride.model.js";
import crypto from "crypto"

function generateOTP(num) {
    return crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
}

export const getFare = async (pickup, destination) => {
    if (!pickup || !destination) {
        throw new Error("Pickup and destination are required");
    }

    const distanceTime = await mapService.getDistanceTimeFromOriginAndDestination(pickup, destination);

    const RATE = {
        car: { base: 50, perKm: 15, perMin: 2 },
        auto: { base: 30, perKm: 12, perMin: 1.5 },
        bike: { base: 20, perKm: 10, perMin: 1 }
    };
    console.log(distanceTime)
    const fares = {};
    for (const vehicle of ['car', 'auto', 'bike']) {
        const rate = RATE[vehicle];
        const fare = rate.base +
            (distanceTime.distance.value * rate.perKm) / 1000 +
            (distanceTime.duration.value * rate.perMin) / 60;
        fares[vehicle] = Math.round(fare);
    }

    return fares;
}

export const createRide = async ({ user, pickup, destination, vehicleType }) => {

    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error("All fields are required");
    }

    const fare = await getFare(pickup, destination);
    const ride = await RideModel.create({
        user,
        pickup,
        destination,
        vehicleType: vehicleType,
        fare: fare[vehicleType],
        otp: generateOTP(6)
    });
    return ride;
}

export const confirmRide = async ({
    rideId, captain
}) => {
    console.log(captain);
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    await RideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'accepted',
        captain: captain._id
    })

    const ride = await RideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    return ride;

}

export const startRide = async ({ rideId, otp, captain }) => {
    if (!rideId || !otp) {
        throw new Error('Ride id and OTP are required');
    }

    const ride = await RideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'accepted') {
        throw new Error('Ride not accepted');
    }

    if (ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }

    await RideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'ongoing'
    })

    return ride;
}

export const endRide=async ({ rideId, captain }) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    const ride = await RideModel.findOne({
        _id: rideId,
        captain: captain._id
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'ongoing') {
        throw new Error('Ride not ongoing');
    }

    await RideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'completed'
    })

    return ride;
}