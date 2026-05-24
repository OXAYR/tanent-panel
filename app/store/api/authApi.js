import { api } from '../api';
import { TAG_TYPES } from '../tags';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
      }),
    }),
    refresh: builder.mutation({
      query: () => ({
        url: 'auth/refresh',
        method: 'POST',
      }),
    }),
    me: builder.query({
      query: () => 'auth/me',
      providesTags: [TAG_TYPES.AUTH],
    }),
  }),
  overrideExisting: false,
});

export const { 
  useLoginMutation, 
  useLogoutMutation, 
  useRefreshMutation, 
  useMeQuery 
} = authApi;
