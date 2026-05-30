import { api } from '../api';
import { TAG_TYPES } from '../tags';
import { clearCredentials, setCredentials } from '../authSlice';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.access_token) {
            dispatch(setCredentials(data.access_token));
          }
        } catch {
          // handled by caller
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
        body: {},
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } finally {
          dispatch(clearCredentials());
          dispatch(api.util.resetApiState());
        }
      },
    }),
    refresh: builder.mutation({
      query: () => ({
        url: 'auth/refresh',
        method: 'POST',
        body: {},
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.access_token) {
            dispatch(setCredentials(data.access_token));
          }
        } catch {
          dispatch(clearCredentials());
        }
      },
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
  useMeQuery,
} = authApi;
