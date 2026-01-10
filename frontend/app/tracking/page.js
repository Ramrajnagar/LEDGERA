import MapView from "../../components/MapView";
import ThreeTruck from "../../components/ThreeTruck";

export default function Page() {
  return (
    <div className="p-8 grid grid-cols-2 gap-4">
      <MapView />
      <ThreeTruck />
    </div>
  );
}
