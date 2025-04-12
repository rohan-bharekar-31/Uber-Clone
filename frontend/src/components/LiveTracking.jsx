import React, { useCallback, useEffect, useRef, useState } from "react";
import { GoogleMap, Marker,useLoadScript} from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "500px",
    borderRadius: "1rem",
};

const initialCenter = { lat: 0, lng: 0 };

const LiveTracking = () => {
    const [position, setPosition] = useState(null);
    const mapRef = useRef(null);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, // 🔑 Replace this
    });

    useEffect(() => {
        if (!navigator.geolocation) {
            console.error("Geolocation not supported");
            return;
        }

        const watchId = navigator.geolocation.watchPosition(
            (pos) => {
                const { latitude, longitude, accuracy } = pos.coords;

                console.log("Live Pos:", latitude, longitude, "Accuracy:", accuracy, "m");

                const coords = { lat: latitude, lng: longitude };
                setPosition(coords);

                // Pan only on first load or significant change
                if (mapRef.current) {
                    mapRef.current.panTo(coords);
                }
            },
            (err) => {
                console.error("Location error:", err);
            },
            {
                enableHighAccuracy: true,
                maximumAge: 0,
                timeout: 10000,
            }
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    if (!isLoaded) return <div>Loading Map...</div>;

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            zoom={17}
            center={position || { lat: 0, lng: 0 }}
            onLoad={(map) => (mapRef.current = map)}
        >
            {position && <Marker position={position} />}
        </GoogleMap>
    );
};

export default LiveTracking;



