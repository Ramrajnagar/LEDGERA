import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './MapView.css';

export default function MapView({ markers = [], route = null }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (map.current) return; // Initialize map only once

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://demotiles.maplibre.org/style.json',
      center: [77.2090, 28.6139], // Delhi, India
      zoom: 5
    });

    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

    map.current.on('load', () => {
      setMapLoaded(true);
    });

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (!mapLoaded || !map.current) return;

    // Clear existing markers
    const existingMarkers = document.querySelectorAll('.maplibregl-marker');
    existingMarkers.forEach(marker => marker.remove());

    // Add new markers
    markers.forEach((marker, index) => {
      const el = document.createElement('div');
      el.className = 'custom-marker';
      el.innerHTML = `<div class="marker-pulse"></div><div class="marker-dot"></div>`;

      new maplibregl.Marker({ element: el })
        .setLngLat([marker.lng, marker.lat])
        .setPopup(
          new maplibregl.Popup({ offset: 25 })
            .setHTML(`<strong>${marker.name}</strong><br/>${marker.description || ''}`)
        )
        .addTo(map.current);
    });

    // Fit bounds to show all markers
    if (markers.length > 0) {
      const bounds = new maplibregl.LngLatBounds();
      markers.forEach(marker => {
        bounds.extend([marker.lng, marker.lat]);
      });
      map.current.fitBounds(bounds, { padding: 50 });
    }
  }, [markers, mapLoaded]);

  return <div ref={mapContainer} className="map-container" />;
}
