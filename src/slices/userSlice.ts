import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    FirstName: string;
    LastName: string;
    email: string;
    // Autres champs utilisateur
}

const initialState: UserState = {
    FirstName: 'Thomas',
    LastName: 'Boudot',
    email: 'tsboudot@gmail.com',
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
