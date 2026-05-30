import { api } from '../api';
import { TAG_TYPES } from '../tags';
import { parsePaginatedList } from '../../lib/paginated-list';

export const tenantApi = api.injectEndpoints({
  endpoints: (builder) => ({
    listTenants: builder.query({
      query: ({ page = 1, perPage = 10 } = {}) => ({
        url: 'tenants',
        params: { page, per_page: perPage },
      }),
      transformResponse: (response) => parsePaginatedList(response),
      providesTags: (result) =>
        result?.items?.length
          ? [
              ...result.items.map((tenant) => ({
                type: TAG_TYPES.TENANT,
                id: tenant.uuid ?? tenant.id,
              })),
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
