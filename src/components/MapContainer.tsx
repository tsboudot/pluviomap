import React, { useCallback } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useDispatch } from 'react-redux';
import { setCoordinates } from '../redux/mapSlice';

const containerStyle = {
    width: '800px',
    height: '800px',
};

const center = {
    lat: 49.11,
    lng: 0.31,
};

const MapContainer: React.FC = () => {
    const dispatch = useDispatch();

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '', // Utilisation de la clé API depuis les variables d'environnement
    });

    const handleClick = useCallback(
        (event: google.maps.MapMouseEvent) => {
            if (event.latLng) {
                dispatch(setCoordinates({ lat: event.latLng.lat(), lng: event.latLng.lng() }));
            }
        },
        [dispatch]
    );

    return isLoaded ? (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12} onClick={handleClick}>

        </GoogleMap>
    ) : (
        <></>
    );
};

export default MapContainer;