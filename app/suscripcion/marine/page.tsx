import { fetchDashboardData } from "@/lib/dashboard/fetch-dashboard";
import { ProductWorkbench } from "@/components/dashboard/ProductWorkbench";

export const dynamic = "force-dynamic";

export default async function Page() {
  const result = await fetchDashboardData();
  if (!result.ok) {
    return (
      <div className="dashboard-theme mx-auto max-w-lg px-6 py-24 text-center text-secondary">
        No se pudieron cargar los datos.
      </div>
    );
  }
  return <ProductWorkbench title="Marine" data={result.data} />;
}
