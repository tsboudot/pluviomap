import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './../store';
import { fetchRainfallDataOnLoad } from '../callApi/CallApi';
import data from '../data.json'; // Importez la fonction fetchRainfallDataOnLoad

const Aside: React.FC = () => {
    const [sites, setSites] = useState<any[]>([]);
    const hoveredSite = useSelector((state: RootState) => state.site.hoveredSite);

    useEffect(() => {
        const updateSitesData = async () => {
            try {
                await fetchRainfallDataOnLoad();
                setSites(data); // Supposons que les données mises à jour sont disponibles dans data.json
            } catch (error) {
                console.error('Erreur lors de la récupération des données de pluviométrie :', error);
            }
        };

        updateSitesData();
    }, []);

    return (
        <div>
            <h2>Informations sur le site :</h2>
            {hoveredSite && (
                <div>
                    <p>Numéro du site : {hoveredSite.num_site}</p>
                    <p>Pluviométrie : {hoveredSite.pluviometrie}</p>
                </div>
            )}
        </div>
    );
};

export default Aside;
