import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Aside: React.FC = () => {
    const coordinates = useSelector((state: RootState) => state.map.coordinates);

    return (
        <aside>
            <h2>Coordonnées</h2>
            {coordinates && (
                <div>
                    <p>Latitude: {coordinates.lat}</p>
                    <p>Longitude: {coordinates.lng}</p>
                </div>
            )}
        </aside>
    );
};

export default Aside;