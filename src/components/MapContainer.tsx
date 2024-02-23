import React, { useCallback } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useDispatch } from 'react-redux';
import { setCoordinates } from '../slices/mapSlice';
import { fetchRainfallData } from '../callApi/CallApi'; // Assurez-vous d'avoir le bon chemin d'importation

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
        async (event: google.maps.MapMouseEvent) => {
            if (event.latLng) {
                const { lat, lng } = event.latLng.toJSON(); // Récupérer les coordonnées du clic

                // Enregistrer les coordonnées dans le store Redux
                dispatch(setCoordinates({ lat, lng }));

                try {
                    // Appeler la fonction fetchRainfallData pour envoyer la requête avec les coordonnées
                    await fetchRainfallData({ lat, lng }, dispatch);
                } catch (error) {
                    console.error('Erreur lors de la récupération des données pluviométriques:', error);
                    // Gérer les erreurs si nécessaire
                }
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
