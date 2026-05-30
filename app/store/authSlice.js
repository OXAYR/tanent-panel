import { createSlice } from '@reduxjs/toolkit';
import { clearAccessToken, getAccessToken, setAccessToken } from '../lib/auth-token';

const initialToken = typeof window !== 'undefined' ? getAccessToken() : null;

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: initialToken,
  },
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload;
      setAccessToken(action.payload);
    },
    clearCredentials: (state) => {
      state.token = null;
      clearAccessToken();
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export const selectAuthToken = (state) => state.auth.token;
export default authSlice.reducer;
