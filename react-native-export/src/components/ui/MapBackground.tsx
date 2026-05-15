import { View, Text, TouchableOpacity, Image } from 'react-native';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from 'react-leaflet';
import { useAppContext } from '../../contexts/AppContext';
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// A component to center the map based on trip state
function MapController() {
  const { tripState } = useAppContext();
  const map = useMap();
  
  useEffect(() => {
    // In a real app we would use GPS coords. For this prototype we will fake movement.
    if (tripState === 'idle') {
      map.setView([51.505, -0.09], 14, { animate: true });
    } else if (tripState === 'requesting' || tripState === 'on_way') {
      map.setView([51.51, -0.1], 15, { animate: true });
    } else if (tripState === 'on_trip') {
      map.setView([51.515, -0.08], 15, { animate: true });
    }
  }, [tripState, map]);

  return null;
}

export function MapBackground() {
  const { theme } = useAppContext();
  
  const isDark = theme === 'dark' || (theme === 'system' && (() => ({ matches: false }))('(prefers-color-scheme: dark)').matches);
  
  // Use a dark map tile layer if in dark mode
  const tileUrl = isDark 
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

  return (
    <View className="absolute inset-0 z-0">
      <MapContainer 
        center={[51.505, -0.09]} 
        zoom={14} 
        zoomControl={false}
        className="w-full h-full"
      >
        <TileLayer
          key={tileUrl}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url={tileUrl}
        />
        <MapController />
      </MapContainer>
    </View>
  );
}
