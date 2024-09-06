import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './../store';
import { fetchRainfallDataOnLoad } from '../callApi/CallApi';

const Aside: React.FC = () => {

    const hoveredSite = useSelector((state: RootState) => state.site.hoveredSite);

    useEffect(() => {
        // Appel à l'API
        const updateSitesData = async () => {
            try {
                await fetchRainfallDataOnLoad();
            } catch (error) {
                console.error('Erreur lors de la récupération des données de pluviométrie :', error);
            }
        };

        updateSitesData();
    }, []);

    // Render des informations souhaitées
    return (
        <div className='aside'>
            <h2>Informations sur le site :</h2>
            {hoveredSite && (
                <div>
                    <p>Nom du site : {hoveredSite.libelle_site}</p>
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
