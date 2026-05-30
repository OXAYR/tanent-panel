import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { tagTypesList } from './tags';
import { getAccessToken } from '../lib/auth-token';
import { clearCredentials, setCredentials } from './authSlice';

function applyJsonContentType(args) {
  if (typeof args === 'string') return args;

  const { body, headers, ...rest } = args;
  const isJsonBody =
    body != null &&
    typeof body === 'object' &&
    !(body instanceof FormData) &&
    !(body instanceof URLSearchParams) &&
    !(body instanceof Blob);

  if (!isJsonBody) return args;

  return {
    ...rest,
    body,
    headers: {
      ...(headers ?? {}),
      'Content-Type': 'application/json',
    },
  };
}

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth?.token ?? getAccessToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    headers.set('Accept', 'application/json');
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const request = applyJsonContentType(args);
  let result = await baseQuery(request, api, extraOptions);

  if (result.error?.status === 401) {
    const refreshResult = await baseQuery(
      applyJsonContentType({ url: 'auth/refresh', method: 'POST', body: {} }),
      api,
      extraOptions
    );

    if (refreshResult.data?.access_token) {
      api.dispatch(setCredentials(refreshResult.data.access_token));
      result = await baseQuery(request, api, extraOptions);
    } else {
      api.dispatch(clearCredentials());
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: tagTypesList,
  endpoints: () => ({}),
});
