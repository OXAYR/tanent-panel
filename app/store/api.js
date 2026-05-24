import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { tagTypesList } from './tags';

// Create an empty base API that we will inject endpoints into later
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }), 
  tagTypes: tagTypesList,
  endpoints: () => ({}), // Initialize with empty endpoints
});
