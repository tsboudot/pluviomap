import axios from 'axios';
import { setRainFallValue } from '../slices/rainSlice'; // Importez l'action du slice approprié

interface Coordinates {
    lat: number;
    lng: number;
}

export const fetchRainfallData = async (coordinates: Coordinates, dispatch: any) => { // Passer dispatch comme argument
    const { lat, lng } = coordinates;
    const username = process.env.REACT_APP_METEOMATICS_USERNAME;
    const password = process.env.REACT_APP_METEOMATICS_PASSWORD;

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
        console.log(response.data);
        const rainfallValue = response.data.data[0].coordinates[0].dates[0].value;

        // Appel de l'action setRainFallValue pour stocker la valeur dans le store Redux
        dispatch(setRainFallValue(rainfallValue)); // Utilisation de dispatch pour appeler l'action

        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des données pluviométriques:', error);
        throw error;
    }
};
