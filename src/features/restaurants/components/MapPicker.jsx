import { TileLayer, Marker, useMapEvents, MapContainer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const customIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

export default function MapPicker({ value, onChange }) {
    const defaultCoords = { latitude: 14.6349, longitude: -90.5069 };

    const location = value || defaultCoords;

    return (
        <MapContainer
            center={[location.latitude, location.longitude]}
            zoom={15}
            style={{ height: "300px", width: "100%", borderRadius: "16px" }}
        >
            <TileLayer
                url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
            />

            <LocationMarker value={location} onChange={onChange} />
        </MapContainer>
    );
}

function LocationMarker({ value, onChange }) {
    useMapEvents({
        click(e) {
            onChange({ latitude: e.latlng.lat, longitude: e.latlng.lng });
        },
    });

    return (
        <Marker
            position={[value.latitude, value.longitude]}
            icon={customIcon}
            draggable={true}
            eventHandlers={{
                dragend: (e) => {
                    const position = e.target.getLatLng();
                    onChange({ latitude: position.lat, longitude: position.lng });
                },
            }}
        />
    );
}