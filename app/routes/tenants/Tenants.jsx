import { useOutletContext } from "react-router";
import { TenantOverviewContent, TenantListingContent } from "./components";

export default function Tenants() {
  const { activeSecondary } = useOutletContext();

  if (activeSecondary === "Overview") {
    return <TenantOverviewContent />;
  }

  return <TenantListingContent />;
}
