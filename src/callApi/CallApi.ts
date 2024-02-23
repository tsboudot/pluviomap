import axios from 'axios';

interface Coordinates {
    lat: number;
    lng: number;
}

export const fetchRainfallData = async (coordinates: Coordinates) => {
    const { lat, lng } = coordinates;
    const username = process.env.REACT_APP_METEOMATIC_USERNAME;
    const password = process.env.REACT_APP_METEOMATIC_PASSWORD;

    if (!username || !password) {
        throw new Error('Nom d\'utilisateur ou mot de passe non défini.');
    }

    try {
        const response = await axios.get(`https://api.meteomatics.com/now/precip_24h:mm/${lat},${lng}/json`, {
            auth: {
                username: username,
                password: password
            }
        });

        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des données pluviométriques:', error);
        throw error;
    }
};