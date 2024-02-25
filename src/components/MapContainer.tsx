import React, { useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useDispatch } from 'react-redux';
import { setHoveredSite } from '../slices/siteSlice';
import data from '../data.json';

const containerStyle = {
    width: '400px',
    height: '400px',
};
// Centre de la carte par defaut 

const defaultMapPosition = {
    lat: 49.2,
    lng: -0.28,
};

const MapContainer: React.FC = () => {
    const dispatch = useDispatch();  //Hook pour modifier le site hovered

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '',
    });

    const handleMarkerHover = useCallback(
        (site: any) => {
            dispatch(setHoveredSite(site));
        },
        [dispatch]
    );

    return isLoaded ? (
        <GoogleMap mapContainerStyle={containerStyle} center={defaultMapPosition} zoom={9.7}>
            {data.map((site: any) => (
                <Marker
                    key={site.num_site} //Map pour marquer les différents sites
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
