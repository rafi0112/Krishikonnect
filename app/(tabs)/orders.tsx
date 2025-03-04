//order today

import React, { useState } from "react";
import {
View,
Text,
TextInput,
TouchableOpacity,
Image,
ScrollView,
StyleSheet,
} from "react-native";
import { useVegetableContext } from "../(tabs)/VegetableContext";
import { Ionicons } from "@expo/vector-icons"; // Icon library

const OrderScreen = () => {
const { vegetables, updateVegetablePrice } = useVegetableContext();
const [prices, setPrices] = useState<{ [key: number]: string }>({});
const [customers, setCustomers] = useState([
    { id: 1, name: "John", email: "john@example.com" },
    { id: 2, name: "Smith", email: "jane@example.com" },
    { id: 3, name: "Doe", email: "john@example.com" },
    { id: 4, name: "Jane", email: "jane@example.com" },
]);
const [orders, setOrders] = useState([
    { id: 1, customer: "Samiul", item: "Tomato", quantity: "2/kg", status: "Pending" },
    { id: 2, customer: "Imran", item: "Potato", quantity: "1.5/kg", status: "Pending" },
]);

const toggleOrderStatus = (id: number) => {
    setOrders((prevOrders) =>
    prevOrders.map((order) =>
        order.id === id
        ? { ...order, status: order.status === "Pending" ? "Paid" : "Pending" }
        : order
    )
    );
};

const removeCustomer = (id: number) => {
    setCustomers(customers.filter((customer) => customer.id !== id));
};

return (
    <ScrollView contentContainerStyle={styles.container}>
    {/* Vegetables Section */}
    <Text style={styles.header}>Vegetables</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
        {vegetables.map((veg) =>
        veg ? (
            <View key={veg.id} style={styles.card}>
            <Image source={veg.image} style={styles.image} />
            <Text style={styles.name}>{veg.name}</Text>
            <TextInput
                keyboardType="numeric"
                style={styles.input}
                value={prices[veg.id] !== undefined ? prices[veg.id] : String(veg.price)}
                onChangeText={(text) =>
                setPrices((prev) => ({
                    ...prev,
                    [veg.id]: text,
                }))
                }
            />
            <TouchableOpacity
                style={styles.updateButton}
                onPress={() => {
                const newPrice = parseFloat(prices[veg.id]) || veg.price;
                updateVegetablePrice(veg.id, newPrice);
                }}
            >
                <Text style={styles.updateText}>Update</Text>
            </TouchableOpacity>
            </View>
        ) : null
        )}
    </ScrollView>

    {/* Customers Section */}
    <Text style={styles.header}>Customers</Text>
    {customers.map((customer) => (
        <View key={customer.id} style={styles.customerRow}>
        <Text style={styles.customerText}>{customer.name}</Text>
        <Text style={styles.customerEmail}>{customer.email}</Text>
        <TouchableOpacity onPress={() => removeCustomer(customer.id)}>
            <Ionicons name="trash" size={24} color="red" />
        </TouchableOpacity>
        </View>
    ))}

    {/* Orders Section */}
    <Text style={styles.header}>Orders</Text>
    {orders.map((order) => (
        <View key={order.id} style={styles.orderRow}>
        <Text style={styles.orderText}>
            {order.customer} - {order.item} ({order.quantity})
        </Text>
        <TouchableOpacity onPress={() => toggleOrderStatus(order.id)}>
            <Text style={[styles.statusText, order.status === "Paid" && styles.paidStatus]}>
            Status: {order.status}
            </Text>
        </TouchableOpacity>
        {order.status === "Paid" && <Ionicons name="checkmark-circle" size={24} color="green" />}
        </View>
    ))}
    </ScrollView>
);
};

const styles = StyleSheet.create({
container: { padding: 15, backgroundColor: "#fff" },
header: { fontSize: 25, fontWeight: "bold", marginBottom: 10,marginTop:60 },
horizontalScroll: { flexDirection: "row", paddingVertical: 10 },
card: {
    alignItems: "center",
    marginRight: 15,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    width: 120,
},
image: { width: 80, height: 80, borderRadius: 10 },
name: { fontSize: 16, fontWeight: "bold", marginTop: 5 },
input: {
    borderBottomWidth: 1,
    width: 80,
    textAlign: "center",
    marginTop: 5,
    fontSize: 16,
    paddingVertical: 5,
},
updateButton: {
    marginTop: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: "#007bff",
    borderRadius: 5,
},
updateText: { color: "#fff", fontWeight: "bold" },

// Customers Section
customerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
},
customerText: { fontSize: 16, fontWeight: "bold" },
customerEmail: { color: "gray" },

// Orders Section
orderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#d4edda",
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
},
orderText: { fontSize: 16 },
statusText: { marginLeft: 10, color: "green", fontWeight: "bold" },
paidStatus: { color: "blue" },
});

export default OrderScreen;
