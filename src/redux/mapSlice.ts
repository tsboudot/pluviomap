import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Coordinates {
    lat: number;
    lng: number;
}

interface MapState {
    coordinates: Coordinates | null;
}

const initialState: MapState = {
    coordinates: null,
};

const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setCoordinates(state, action: PayloadAction<Coordinates>) {
            state.coordinates = action.payload;
        },
    },
});

export const { setCoordinates } = mapSlice.actions;
export default mapSlice.reducer;
