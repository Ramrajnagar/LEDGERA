import TrustScore from "../../components/TrustScore";

export default function Page() {
  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Trust Analytics</h1>
      <TrustScore score={86} />
    </div>
  );
}
