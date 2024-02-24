import React, { useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useDispatch } from 'react-redux';
import { setHoveredSite } from '../slices/siteSlice';
import data from '../data.json';
import { fetchRainfallDataOnLoad } from '../callApi/CallApi';

const containerStyle = {
    width: '800px',
    height: '800px',
};

const center = {
    lat: 48.9,
    lng: -0.28,
};

const MapContainer: React.FC = () => {
    const dispatch = useDispatch();

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchRainfallDataOnLoad();
            } catch (error) {
                console.error('Erreur lors du chargement des données pluviométriques:', error);
            }
        };
        fetchData();
    }, []);

    const handleMarkerHover = useCallback(
        (site: any) => {
            dispatch(setHoveredSite(site));
        },
        [dispatch]
    );

    return isLoaded ? (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={9}>
            {data.map((site: any) => (
                <Marker
                    key={site.num_site}
                    position={{ lat: site.lat, lng: site.lng }}
                    onMouseOver={() => handleMarkerHover(site)}
                />
            ))}
        </GoogleMap>
    ) : (
        <></>
    );
};

export default MapContainer;
