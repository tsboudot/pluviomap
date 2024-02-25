import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SiteState {
    hoveredSite: {
        num_site: number | null;
        libelle_site: string | null;
        ouverture_public: string | null;
        pluviometrie: number | null;
        surf_site: string | null; // Ajout de la surface du site
        site_classe: string | null; // Ajout de l'indicateur de site classé
        site_inscrit: string | null; // Ajout de l'indicateur de site inscrit
    };
}

const initialState: SiteState = {
    hoveredSite: {
        num_site: null,
        libelle_site: null,
        ouverture_public: null,
        pluviometrie: null,
        surf_site: null,
        site_classe: null,
        site_inscrit: null,
    },
};

const siteSlice = createSlice({
    name: 'site',
    initialState,
    reducers: {
        setHoveredSite(state, action: PayloadAction<SiteState['hoveredSite']>) {
            state.hoveredSite = action.payload;
        },
    },
});

export const { setHoveredSite } = siteSlice.actions;
export default siteSlice.reducer;
