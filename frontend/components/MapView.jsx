import maplibregl from "maplibre-gl";
import { useEffect, useRef } from "react";

export default function Map() {
  const mapContainer = useRef(null);

  useEffect(() => {
    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://demotiles.maplibre.org/style.json",
      center: [77.2090, 28.6139], // Delhi
      zoom: 12
    });

    map.addControl(new maplibregl.NavigationControl());

    return () => map.remove();
  }, []);

  return <div ref={mapContainer} style={{ height: "100vh" }} />;
}
