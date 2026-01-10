import KPIBlock from "../components/KPIBlock";
import AgentFlow from "../components/AgentFlow";

export default function Page() {
  return (
    <div className="p-8">
      <h1 className="text-3xl mb-6">Supply Chain Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <KPIBlock title="Active Orders" value="128" />
        <KPIBlock title="Avg Trust Score" value="86%" />
        <KPIBlock title="On-Time Delivery" value="92%" />
      </div>
      <AgentFlow />
    </div>
  );
}
