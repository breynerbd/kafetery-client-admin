import MapView, { Marker } from "react-native-maps";
import { StyleSheet } from "react-native";

export default function RestaurantMap({ restaurant }) {
    if (!restaurant?.location) return null;

    return (
        <MapView
            style={styles.map}
            initialRegion={{
                latitude: restaurant.location.latitude,
                longitude: restaurant.location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }}
        >
            <Marker
                coordinate={{
                    latitude: restaurant.location.latitude,
                    longitude: restaurant.location.longitude,
                }}
                title={restaurant.name}
            />
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        width: "100%",
        height: 200,
        borderRadius: 16,
    },
});