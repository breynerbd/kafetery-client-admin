import * as Linking from "expo-linking";

export const openMaps = (restaurant) => {

    if (!restaurant?.location) return;

    const url =
        `https://www.google.com/maps/search/?api=1&query=${restaurant.location.latitude},${restaurant.location.longitude}`;

    Linking.openURL(url);

};