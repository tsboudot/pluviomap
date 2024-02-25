import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './../store';
import { fetchRainfallDataOnLoad } from '../callApi/CallApi';
import data from '../data.json';
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
        <div className='aside'>
            <h2>Informations sur le site :</h2>
            {hoveredSite && (
                <div>
                    <p>Libellé du site : {hoveredSite.libelle_site}</p>
                    <p>Surface du site : {hoveredSite.surf_site}</p>
                    <p>Ouverture au public : {hoveredSite.ouverture_public}</p>
                    <p>Pluviométrie : {hoveredSite.pluviometrie}</p>
                    {hoveredSite.site_classe === "Oui" && <p>Site classé</p>}
                    {hoveredSite.site_inscrit === "Oui" && <p>Site inscrit</p>}
                </div>
            )}
        </div>
    );
};

export default Aside;
