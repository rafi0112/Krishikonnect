import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const OrderScreen = ({ updateVegetablePrices = (p0?: number, p1?: number) => {} }) => {
    const [vegetables, setVegetables] = useState([
        { id: 1, name: "Tomato", price: 2, image: require("../../assets/images/Tomato_je.jpg") },
        { id: 2, name: "Potato", price: 1.5, image: require("../../assets/images/potato.jpg") },
        { id: 3, name: "Carrot", price: 3, image: require("../../assets/images/carrot.jpg") },
        { id: 4, name: "Cabbage", price: 1.8, image: require("../../assets/images/cabage.jpg") },
        { id: 5, name: "Onion", price: 2.2, image: require("../../assets/images/onion.jpg") },
        { id: 6, name: "Broccoli", price: 3.5, image: require("../../assets/images/Broccoli_and_cross_section_edit.jpg") },
        { id: 7, name: "Spinach", price: 2, image: require("../../assets/images/spinach.jpg") },
        { id: 8, name: "Cucumber", price: 1.6, image: require("../../assets/images/cucumber.jpg") },
        { id: 9, name: "Peppers", price: 4, image: require("../../assets/images/pepper.jpg") },
        { id: 10, name: "Lettuce", price: 2.5, image: require("../../assets/images/lettuce.jpg") },
    ]);

    const [users, setUsers] = useState([
        { id: 1, name: "John Doe", email: "john@example.com" },
        { id: 2, name: "Jane Smith", email: "jane@example.com" },
        { id: 1, name: "John Doe", email: "john@example.com" },
        { id: 2, name: "Jane Smith", email: "jane@example.com" },
    ]);

    const [orders, setOrders] = useState([
        { id: 1, user: "John Doe", item: "Tomato", price: "$2/kg", status: "Pending" },
        { id: 2, user: "Jane Smith", item: "Potato", price: "$1.5/kg", status: "Pending" },
        { id: 1, user: "John Doe", item: "Tomato", price: "$2/kg", status: "Pending" },
        { id: 2, user: "Jane Smith", item: "Potato", price: "$1.5/kg", status: "Pending" },
        { id: 1, user: "John Doe", item: "Tomato", price: "$2/kg", status: "Pending" },
        { id: 2, user: "Jane Smith", item: "Potato", price: "$1.5/kg", status: "Pending" },
    ]);

    const updatePrice = (id=0, newPrice = 0) => {
        setVegetables((prev) => prev.map((veg) => (veg.id === id ? { ...veg, price: newPrice } : veg)));
        if (typeof updateVegetablePrices === "function") {
        updateVegetablePrices(id=0, newPrice=0);
        }
    };

        const deleteUser = (id = 0) => {
        Alert.alert("Confirm", "Are you sure you want to delete this user?", [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => setUsers(users.filter((user) => user.id !== id)) },
        ]);
    };

    const markAsPaid = (id = 0) => {
        setOrders((prev) => prev.map((order) => (order.id === id ? { ...order, status: "Paid" } : order)));
    };

    return (
        <ScrollView style={styles.container}>
        <Text style={styles.sectionTitle}>Price Updates</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
            {vegetables.map((veg) => (
            <View key={veg.id} style={styles.card}>
                <Image source={veg.image} style={styles.image} />
                <Text style={styles.itemName}>{veg.name}</Text>
                <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={String(veg.price)}
                onChangeText={(text) => {
                    const newPrice = parseFloat(text) || 0;
                    setVegetables((prev) => prev.map((v) => (v.id === veg.id ? { ...v, price: newPrice } : v)));
                }}
                />
                <TouchableOpacity style={styles.updateButton} onPress={() => updatePrice(veg.id, veg.price)}>
                <Text style={styles.updateButtonText}>Update</Text>
                </TouchableOpacity>
            </View>
            ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Customers</Text>
        {users.map((user) => (
            <View key={user.id} style={styles.userCard}>
            <Text>{user.name}</Text>
            <Text>{user.email}</Text>
            <TouchableOpacity onPress={() => deleteUser(user.id)}>
                <Ionicons name="trash" size={24} color="red" />
            </TouchableOpacity>
            </View>
        ))}

        <Text style={styles.sectionTitle}>Orders</Text>
        {orders.map((order) => (
            <View key={order.id} style={styles.orderCard}>
            <Text>{order.user} - {order.item} ({order.price})</Text>
            <Text>Status: {order.status}</Text>
            {order.status !== "Paid" && (
                <TouchableOpacity onPress={() => markAsPaid(order.id)}>
                <Ionicons name="checkmark-circle" size={24} color="green" />
                </TouchableOpacity>
            )}
            </View>
        ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    sectionTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 10, marginTop: 80 },
    scrollContainer: { flexDirection: "row", marginBottom: 20 },
    card: { alignItems: "center", padding: 10, marginRight: 10, backgroundColor: "#f9f9f9", borderRadius: 10 },
    image: { width: 80, height: 80, borderRadius: 10 },
    itemName: { fontSize: 16, fontWeight: "bold", marginTop: 5 },
    input: { borderBottomWidth: 1, width: 80, textAlign: "center", marginTop: 5 },
    updateButton: { marginTop: 5, padding: 8, backgroundColor: "#007bff", borderRadius: 5 },
    updateButtonText: { color: "#fff", fontWeight: "bold" },
    userCard: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 10, backgroundColor: "#f2f2f2", borderRadius: 10, marginBottom: 10 },
    orderCard: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 10, backgroundColor: "#e6f7e6", borderRadius: 10, marginBottom: 10 },
});

export default OrderScreen;
