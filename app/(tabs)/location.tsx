import React, { useRef, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";

const deliveryMen = [
    { id: "1", name: "Imran", phone: "01311183481", latitude: 23.8103, longitude: 90.4125 },
    { id: "2", name: "Samiul", phone: "01311183481", latitude: 24.8949, longitude: 91.8687 },
    { id: "3", name: "Rafi", phone: "01311183481", latitude: 22.3569, longitude: 91.7832 },
];

const LocationScreen: React.FC = () => {
    const mapRef = useRef<MapView>(null);

  // Function to fit all markers inside the map view
    useEffect(() => {
        if (mapRef.current && deliveryMen.length > 0) {
        const coordinates = deliveryMen.map((man) => ({
            latitude: man.latitude,
            longitude: man.longitude,
        }));

        mapRef.current.fitToCoordinates(coordinates, {
            edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
            animated: true,
        });
        }
    }, []);

  // Function to make a phone call
    const makeCall = (phoneNumber: string) => {
        Linking.openURL(`tel:${phoneNumber}`);
    };

    return (
        <View style={styles.container}>
        {/* Map View */}
        <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={{
            latitude: 23.8103, // Center of Bangladesh
            longitude: 90.4125,
            latitudeDelta: 4, // Increased to show all locations
            longitudeDelta: 4,
            }}
        >
            {deliveryMen.map((man) => (
            <Marker
                key={man.id}
                coordinate={{ latitude: man.latitude, longitude: man.longitude }}
                title={man.name}
                description={man.phone}
            />
            ))}
        </MapView>

        {/* List of Delivery Men */}
        <View style={styles.list}>
            {deliveryMen.map((man) => (
            <View key={man.id} style={styles.card}>
                <Text style={styles.name}>{man.name}</Text>
                <Text style={styles.phone}>{man.phone}</Text>
                <TouchableOpacity style={styles.callButton} onPress={() => makeCall(man.phone)}>
                <Ionicons name="call" size={20} color="#fff" />
                <Text style={styles.callText}>Call</Text>
                </TouchableOpacity>
            </View>
            ))}
        </View>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { flex: 1 },
    list: { padding: 10, backgroundColor: "#fff" },
    card: {
        padding: 15,
        marginBottom: 10,
        backgroundColor: "#f2f2f2",
        borderRadius: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    name: { fontSize: 18, fontWeight: "bold" },
    phone: { fontSize: 16, marginBottom: 5 },
    callButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#28a745",
        padding: 10,
        borderRadius: 5,
    },
    callText: { color: "#fff", marginLeft: 5, fontWeight: "bold" },
});

export default LocationScreen;
