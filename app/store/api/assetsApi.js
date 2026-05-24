import { api } from '../api';
import { TAG_TYPES } from '../tags';

export const assetsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTenantAssets: builder.query({
      query: (tenantId) => `tenants/${tenantId}/assets`,
      providesTags: (result, error, tenantId) => [{ type: TAG_TYPES.ASSET, id: tenantId }],
    }),
    uploadTenantAssets: builder.mutation({
      query: ({ tenantId, formData }) => ({
        url: `tenants/${tenantId}/assets`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: (result, error, { tenantId }) => [{ type: TAG_TYPES.ASSET, id: tenantId }],
    }),
  }),
  overrideExisting: false,
});

export const { 
  useGetTenantAssetsQuery, 
  useUploadTenantAssetsMutation 
} = assetsApi;
