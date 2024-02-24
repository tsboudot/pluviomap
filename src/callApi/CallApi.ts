import axios from 'axios';
import data from '../data.json'; // Importez le fichier data.json

// Fonction pour mettre à jour la valeur pluviom de chaque site dans data.json
const updateSiteRainfall = async () => {
    const username = process.env.REACT_APP_METEOMATICS_USERNAME;
    const password = process.env.REACT_APP_METEOMATICS_PASSWORD;

    if (!username || !password) {
        throw new Error('Nom d\'utilisateur ou mot de passe non défini.');
    }

    for (const site of data) {
        try {
            const { lat, lng } = site;
            const response = await axios.get(`https://api.meteomatics.com/now/precip_24h:mm/${lat},${lng}/json`, {
                auth: {
                    username: username,
                    password: password
                }
            })
            console.log('Requette :', data);
            ;

            const rainfallValue = response.data.data[0].coordinates[0].dates[0].value;
            site.pluviometrie = rainfallValue; // Mettre à jour la valeur pluviom du site dans data.json
        } catch (error) {
            console.error('Erreur lors de la récupération des données pluviométriques pour le site :', site.libelle_site, error);
            // Gérer les erreurs si nécessaire
        }
    }

    // Après la mise à jour des données, affichez les nouvelles données pluviométriques
    console.log('Données pluviométriques mises à jour :', data);
}

export const fetchRainfallDataOnLoad = async () => {
    try {
        await updateSiteRainfall(); // Mettre à jour la valeur pluviom pour chaque site dans data.json
    } catch (error) {
        console.error('Erreur lors de la récupération des données pluviométriques:', error);
        // Gérer les erreurs si nécessaire
    }
};
