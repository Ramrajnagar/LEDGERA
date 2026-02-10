
"use client";

import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function MapWidget() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng] = useState(-74.5);
    const [lat] = useState(40);
    const [zoom] = useState(2);

    useEffect(() => {
        if (map.current) return;

        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: 'https://demotiles.maplibre.org/style.json', // We will replace with dark style
            center: [lng, lat],
            zoom: zoom,
            attributionControl: false
        });

        map.current.on('load', () => {
            // Darken the map
            const layers = map.current.getStyle().layers;
            layers.forEach((layer) => {
                if (layer.type === 'background') {
                    map.current.setPaintProperty(layer.id, 'background-color', '#050505');
                } else if (layer.type === 'fill') {
                    map.current.setPaintProperty(layer.id, 'fill-color', '#0a0a0a');
                    map.current.setPaintProperty(layer.id, 'fill-outline-color', '#1f1f1f');
                } else if (layer.type === 'line') {
                    map.current.setPaintProperty(layer.id, 'line-color', '#1f1f1f');
                } else if (layer.type === 'symbol') {
                    map.current.setLayoutProperty(layer.id, 'visibility', 'none');
                }
            });

            // Add dummy route
            map.current.addSource('route', {
                'type': 'geojson',
                'data': {
                    'type': 'Feature',
                    'properties': {},
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [
                            [-74.5, 40],
                            [-20, 30],
                            [10, 50],
                            [100, 20]
                        ]
                    }
                }
            });

            map.current.addLayer({
                'id': 'route',
                'type': 'line',
                'source': 'route',
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-color': '#22d3ee',
                    'line-width': 2,
                    'line-opacity': 0.6
                }
            });

            // Add animated pulsing dot for shipment
            const size = 100;
            const pulsingDot = {
                width: size,
                height: size,
                data: new Uint8Array(size * size * 4),
                onAdd: function () {
                    const canvas = document.createElement('canvas');
                    canvas.width = this.width;
                    canvas.height = this.height;
                    this.context = canvas.getContext('2d');
                },
                render: function () {
                    const duration = 1000;
                    const t = (performance.now() % duration) / duration;

                    const radius = (size / 2) * 0.3;
                    const outerRadius = (size / 2) * 0.7 * t + radius;
                    const context = this.context;

                    context.clearRect(0, 0, this.width, this.height);
                    context.beginPath();
                    context.arc(
                        this.width / 2,
                        this.height / 2,
                        outerRadius,
                        0,
                        Math.PI * 2
                    );
                    context.fillStyle = `rgba(34, 211, 238, ${1 - t})`;
                    context.fill();

                    context.beginPath();
                    context.arc(
                        this.width / 2,
                        this.height / 2,
                        radius,
                        0,
                        Math.PI * 2
                    );
                    context.fillStyle = 'rgba(34, 211, 238, 1)';
                    context.strokeStyle = 'white';
                    context.lineWidth = 2 + 4 * (1 - t);
                    context.fill();
                    context.stroke();

                    this.data = context.getImageData(
                        0,
                        0,
                        this.width,
                        this.height
                    ).data;
                    map.current.triggerRepaint();
                    return true;
                }
            };

            map.current.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });

            map.current.addSource('dot-point', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': [
                        {
                            'type': 'Feature',
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [-20, 30] // Midpoint of route
                            }
                        }
                    ]
                }
            });

            map.current.addLayer({
                'id': 'layer-with-pulsing-dot',
                'type': 'symbol',
                'source': 'dot-point',
                'layout': {
                    'icon-image': 'pulsing-dot'
                }
            });
        });

    }, [lng, lat, zoom]);

    return (
        <div className="w-full h-full relative group">
            <div ref={mapContainer} className="absolute inset-0 z-0 bg-control-dark" />
            <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-control-panel/80 border border-control-border backdrop-blur-md text-xs font-mono text-control-cyan">
                LIVE_SAT_FEED :: ORBITALEYE-1
            </div>
        </div>
    );
}
