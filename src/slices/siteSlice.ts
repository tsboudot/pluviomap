import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SiteState {
    hoveredSite: {
        num_site: number | null;
        libelle_site: string | null;
        ouverture_public: string | null;
        pluviometrie: number | null;
    };
}

const initialState: SiteState = {
    hoveredSite: {
        num_site: null,
        libelle_site: null,
        ouverture_public: null,
        pluviometrie: null,
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
