import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './../store';
import { fetchRainfallDataOnLoad } from '../callApi/CallApi';
import data from '../data.json'; // Importez la fonction fetchRainfallDataOnLoad

const Aside: React.FC = () => {
    const [sites, setSites] = useState<any[]>([]); // Tableau des sites avec leurs données
    const hoveredSite = useSelector((state: RootState) => state.site.hoveredSite);

    useEffect(() => {
        // Effectuez ici votre appel à l'API pour récupérer les données de pluviométrie
        // Mettez à jour les données des sites une fois les données récupérées
        const updateSitesData = async () => {
            try {
                // Appel de la fonction fetchRainfallDataOnLoad pour récupérer les données de pluviométrie
                await fetchRainfallDataOnLoad();

                // Mise à jour des données des sites une fois les données récupérées
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
            {sites.map((site) => (
                <div key={site.num_site}>
                    <p>Numéro du site : {site.num_site}</p>
                    <p>Pluviométrie : {site.pluviom}</p>
                </div>
            ))}
        </div>
    );
};

export default Aside;
