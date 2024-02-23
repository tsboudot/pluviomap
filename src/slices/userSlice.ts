import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    name: string;
    email: string;
    // Autres champs utilisateur
}

const initialState: UserState = {
    name: '',
    email: '',
    // Initialisation des autres champs utilisateur
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            return action.payload;
        },
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
