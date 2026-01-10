export default function TrustScore({ score }) {
  return (
    <div className="bg-slate-800 p-6 rounded-xl w-48 text-center">
      <p className="text-4xl">{score}%</p>
      <p>Trust Score</p>
    </div>
  );
}
