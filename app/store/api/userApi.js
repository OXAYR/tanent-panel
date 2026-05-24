import { api } from '../api';
import { TAG_TYPES } from '../tags';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMasterAdmin: builder.query({
      query: (tenantId) => `tenants/${tenantId}/users/ma`,
      providesTags: (result, error, tenantId) => [{ type: TAG_TYPES.USER, id: `ma-${tenantId}` }],
    }),
    getHeadAdmin: builder.query({
      query: (tenantId) => `tenants/${tenantId}/users/ha`,
      providesTags: (result, error, tenantId) => [{ type: TAG_TYPES.USER, id: `ha-${tenantId}` }],
    }),
    createMasterAdmin: builder.mutation({
      query: ({ tenantId, userData }) => ({
        url: `tenants/${tenantId}/users/ma`,
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: (result, error, { tenantId }) => [{ type: TAG_TYPES.USER, id: `ma-${tenantId}` }],
    }),
    createHeadAdmin: builder.mutation({
      query: ({ tenantId, userData }) => ({
        url: `tenants/${tenantId}/users/ha`,
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: (result, error, { tenantId }) => [{ type: TAG_TYPES.USER, id: `ha-${tenantId}` }],
    }),
  }),
  overrideExisting: false,
});

export const { 
  useGetMasterAdminQuery, 
  useGetHeadAdminQuery, 
  useCreateMasterAdminMutation, 
  useCreateHeadAdminMutation 
} = userApi;
