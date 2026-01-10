export default function AgentFlow() {
  return (
    <div className="flex justify-between mt-10 bg-slate-800 p-6 rounded-xl">
      {["Supplier", "Warehouse", "Transport", "Retailer"].map((a) => (
        <div key={a} className="text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full mx-auto"></div>
          <p>{a}</p>
        </div>
      ))}
    </div>
  );
}
