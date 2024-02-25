import axios from 'axios';
import data from '../data.json'; // Importez le fichier data.json


const updateSitePluviom = async () => {
    // Récupération identifiants depuis .env
    const username = process.env.REACT_APP_METEOMATICS_USERNAME;
    const password = process.env.REACT_APP_METEOMATICS_PASSWORD;
    // Verrification que username et password existent 
    if (!username || !password) {
        throw new Error('Nom d\'utilisateur ou mot de passe non défini.');
    }
    // Appel à l'API
    for (const site of data) {
        try {
            const { lat, lng } = site;
            const response = await axios.get(`https://api.meteomatics.com/now/precip_24h:mm/${lat},${lng}/json`, {
                auth: {
                    username: username,
                    password: password
                }
            })
            console.log('Axios.get :', data);
            ;
            //Enregistrement de la réponse dans la valeure rainFallValue

            const rainfallValue = response.data.data[0].coordinates[0].dates[0].value;
            // MaJ de site.pluviométrie
            site.pluviometrie = rainfallValue;
        } catch (error) {
            console.error('Erreur lors de la récupération des données pluviométriques pour le site :', site.libelle_site, error);
        }
    }
}

export const fetchRainfallDataOnLoad = async () => {
    try {
        await updateSitePluviom(); // Mettre à jour la valeur pluviom pour chaque site dans data.json
    } catch (error) {
        console.error('Erreur lors de la récupération des données pluviométriques:', error);
        // Gérer les erreurs si nécessaire
    }
};
