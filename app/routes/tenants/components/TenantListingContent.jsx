import { useMemo, useState } from "react";
import { Link } from "react-router";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Card, Button, DataTable, PageHeader } from "@/components/ui";
import { useListTenantsQuery } from "@/store/api/tenantApi";
import { getApiErrorMessage } from "@/shared";
import { TENANT_COLUMNS } from "../constants";
import { mapTenantToListRow } from "../utils/map-tenant-list";

export function TenantListingContent() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, isError, error } = useListTenantsQuery({
    page,
    perPage: 10,
  });

  const rows = useMemo(
    () => (data?.items ?? []).map(mapTenantToListRow),
    [data?.items]
  );

  const pagination = data?.pagination;
  const errorMessage = isError
    ? getApiErrorMessage(error, {
        fallbackMessage: "Could not load tenants. Please try again.",
      })
    : null;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader
        title="Tenant Listing"
        subtitle="Manage and monitor all your registered tenants."
        action={
          <Button asChild>
            <Link to="/create-tenant">
              <Plus size={16} className="mr-2" />
              Add Tenant
            </Link>
          </Button>
        }
      />

      {errorMessage ? (
        <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      ) : null}

      <Card className="rounded-xl border border-slate-100 overflow-hidden">
        {isLoading ? (
          <div className="flex h-48 items-center justify-center text-sm text-slate-400">
            Loading tenants…
          </div>
        ) : (
          <>
            <DataTable columns={TENANT_COLUMNS} data={rows} />
            {pagination && pagination.total > 0 ? (
              <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 text-sm text-slate-500">
                <span>
                  Showing {pagination.from}–{pagination.to} of {pagination.total}
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page <= 1 || isFetching}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    <ChevronLeft size={16} />
                    Previous
                  </Button>
                  <span className="text-xs text-slate-400">
                    Page {pagination.currentPage} of {pagination.lastPage}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page >= pagination.lastPage || isFetching}
                    onClick={() => setPage((p) => p + 1)}
                  >
                    Next
                    <ChevronRight size={16} />
                  </Button>
                </div>
              </div>
            ) : null}
          </>
        )}
      </Card>
    </div>
  );
}
