import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RainFallState {
    value: number;
}

const initialState: RainFallState = {
    value: 0,
};

const rainFallSlice = createSlice({
    name: 'rainfall',
    initialState,
    reducers: {
        setRainFallValue(state, action: PayloadAction<number>) {
            state.value = action.payload;
        },
    },
});

export const { setRainFallValue } = rainFallSlice.actions;
export default rainFallSlice.reducer;
