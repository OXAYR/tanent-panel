import { api } from '../api';
import { TAG_TYPES } from '../tags';

export const tenantApi = api.injectEndpoints({
  endpoints: (builder) => ({
    listTenants: builder.query({
      query: () => 'tenants',
      providesTags: (result) =>
        result && Array.isArray(result) // Fallback checking for result array
          ? [
              ...result.map(({ id }) => ({ type: TAG_TYPES.TENANT, id })),
              { type: TAG_TYPES.TENANT, id: 'LIST' },
            ]
          : [{ type: TAG_TYPES.TENANT, id: 'LIST' }],
    }),
    createTenant: builder.mutation({
      query: (formData) => ({
        url: 'tenants',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: [{ type: TAG_TYPES.TENANT, id: 'LIST' }],
    }),
    getTenant: builder.query({
      query: (tenantId) => `tenants/${tenantId}`,
      providesTags: (result, error, tenantId) => [{ type: TAG_TYPES.TENANT, id: tenantId }],
    }),
    updateTenant: builder.mutation({
      query: ({ tenantId, formData }) => ({
        url: `tenants/${tenantId}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: (result, error, { tenantId }) => [{ type: TAG_TYPES.TENANT, id: tenantId }],
    }),
    updateTenantStatus: builder.mutation({
      query: ({ tenantId, statusData }) => ({
        url: `tenants/${tenantId}/status`,
        method: 'PATCH',
        body: statusData,
      }),
      invalidatesTags: (result, error, { tenantId }) => [{ type: TAG_TYPES.TENANT, id: tenantId }],
    }),
  }),
  overrideExisting: false,
});

export const { 
  useListTenantsQuery, 
  useCreateTenantMutation, 
  useGetTenantQuery, 
  useUpdateTenantMutation, 
  useUpdateTenantStatusMutation 
} = tenantApi;
