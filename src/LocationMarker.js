import { Marker, Popup,useMapEvents} from 'react-leaflet';
import { useState } from 'react';
export default function LocationMarker() {
    const [selectedPosition, setSelectedPosition] = useState(null);
        useMapEvents({
          click(event) {
            setSelectedPosition(event.latlng);
          },
        });
    
        return selectedPosition ? (
          <Marker position={selectedPosition}>
            <Popup>You clicked here: {selectedPosition.lat}, {selectedPosition.lng}</Popup>
          </Marker>
        ) : null;
}