import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AuthState = {
  authenticated: boolean;
  user: object | null;
};

const initialState: AuthState = {
  authenticated: false,
  user: null,
};

export const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<object>) => {
      state.authenticated = true;
      state.user = action.payload;
    },
    logOut: (state) => {
      state.authenticated = false;
      state.user = null;
    },
  },
});

export const { logIn, logOut } = AuthSlice.actions;

export default AuthSlice.reducer;
