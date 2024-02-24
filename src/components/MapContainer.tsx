import React, { useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { fetchRainfallDataOnLoad } from '../callApi/CallApi'; // Importez la fonction d'appel à l'API
import data from '../data.json'; // Importez les données depuis le fichier data.json

const containerStyle = {
    width: '800px',
    height: '800px',
};

const center = {
    lat: 48.9,
    lng: -0.28,
};

const MapContainer: React.FC = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '', // Utilisation de la clé API depuis les variables d'environnement
    });

    // Utilisez useEffect pour appeler la fonction d'appel à l'API au chargement de la page
    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchRainfallDataOnLoad(); // Appeler la fonction pour mettre à jour les données pluviométriques
            } catch (error) {
                console.error('Erreur lors de la récupération des données pluviométriques au chargement de la page:', error);
                // Gérer les erreurs si nécessaire
            }
        };
        fetchData();
    }, []); // Le tableau de dépendances est vide pour s'assurer que cette fonction est appelée une seule fois au chargement de la page

    const handleClick = useCallback(
        (event: google.maps.MapMouseEvent) => {
            if (event.latLng) {
                const { lat, lng } = event.latLng.toJSON(); // Récupérer les coordonnées du clic

                console.log('Latitude:', lat, 'Longitude:', lng);
            }
        },
        []
    );

    return isLoaded ? (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={9} onClick={handleClick}>
            {/* Créer un marqueur pour chaque site */}
            {data.map((site: any) => (
                <Marker key={site.num_site} position={{ lat: site.lat, lng: site.lng }} />
            ))}
        </GoogleMap>
    ) : (
        <></>
    );
};

export default MapContainer;
