import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Linking } from "react-native";

const openGoogleMaps = (location: string) => {
  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    location
  )}`;
  Linking.openURL(url);
};


// Importing local images correctly
const vegetables = [
  { name: "Tomato", price: "tk 2/kg", image: require("../../assets/images/Tomato_je.jpg") },
  { name: "Potato", price: "tk 1.5/kg", image: require("../../assets/images/potato.jpg") },
  { name: "Carrot", price: "tk 3/kg", image: require("../../assets/images/carrot.jpg") },
  { name: "Cabbage", price: "tk 1.8/kg", image: require("../../assets/images/cabage.jpg") },
  { name: "Onion", price: "tk 2.2/kg", image: require("../../assets/images/onion.jpg") },
  { name: "Broccoli", price: "tk 3.5/kg", image: require("../../assets/images/Broccoli_and_cross_section_edit.jpg") },
  { name: "Spinach", price: "tk 2/kg", image: require("../../assets/images/spinach.jpg") },
  { name: "Cucumber", price: "tk 1.6/kg", image: require("../../assets/images/cucumber.jpg") },
  { name: "Peppers", price: "tk 4/kg", image: require("../../assets/images/pepper.jpg") },
  { name: "Lettuce", price: "tk 2.5/kg", image: require("../../assets/images//lettuce.jpg") },
];

const consultants = [
  { name: "Dr. John Doe", degree: "PhD in Agriculture", position: "Senior Consultant", image: require("../../assets/images/thumbsup.png"), contact: "mailto:johndoe@example.com" },
  { name: "Ms. Jane Smith", degree: "MSc in Horticulture", position: "Consultant", image: require("../../assets/images/thumbsup.png"), contact: "mailto:janesmith@example.com" },
  { name: "Dr. Robert Brown", degree: "PhD in Soil Science", position: "Lead Consultant", image: require("../../assets/images/thumbsup.png"), contact: "mailto:robertbrown@example.com" },
  { name: "Dr. Emily Davis", degree: "PhD in Organic Farming", position: "Agriculture Consultant", image: require("../../assets/images/thumbsup.png"), contact: "mailto:emilydavis@example.com" },
  { name: "Mr. Alex Wilson", degree: "MSc in Agribusiness", position: "Farm Management Expert", image: require("../../assets/images/thumbsup.png"), contact: "mailto:alexwilson@example.com" },
  { name: "Dr. Michael Lee", degree: "PhD in Plant Pathology", position: "Crop Specialist", image: require("../../assets/images/thumbsup.png"), contact: "mailto:michaellee@example.com" },
  { name: "Ms. Sarah Johnson", degree: "MSc in Agricultural Economics", position: "Market Analyst", image: require("../../assets/images/thumbsup.png"), contact: "mailto:sarahjohnson@example.com" },
];

const vans = [
  { location: "Dhaka", image: { uri: "https://via.placeholder.com/150" } },
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <ScrollView style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Admin</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="gray" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Today's Price Section */}
      <Text style={styles.sectionTitle}>Today's Price</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
        {vegetables.map((item, index) => (
          <View key={index} style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>{item.price}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Consultants Section */}
      <Text style={styles.sectionTitle}>Consultants</Text>
      {consultants.map((consultant, index) => (
        <View key={index} style={styles.consultantCard}>
          <Image source={consultant.image} style={styles.consultantImage} />
          <View>
            <Text style={styles.consultantName}>{consultant.name}</Text>
            <Text>{consultant.degree}</Text>
            <Text>{consultant.position}</Text>
          </View>
        </View>
      ))}

      {/* Van Locations Section */}
      <Text style={styles.sectionTitle}>Service Locations</Text>
{vans.map((van, index) => (
  <TouchableOpacity key={index} onPress={() => openGoogleMaps(van.location)}>
    <View style={styles.vanCard}>
      <Image source={require("../../assets/images/map-placeholder.jpg.png")} style={styles.vanImage} />
      <Text style={styles.vanLocation}>{van.location}</Text>
    </View>
  </TouchableOpacity>
))}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  
  // Header
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20,marginTop: 50 },
  headerText: { fontSize: 28, fontWeight: "bold" },
  headerIcons: { flexDirection: "row" },
  iconButton: { padding: 5, marginLeft: 10 },

  // Search Bar
  searchContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#f2f2f2", borderRadius: 10, padding: 8, marginBottom: 15 },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 16 },

  // Sections
  sectionTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  
  // Scrollable Cards (Vegetables)
  scrollContainer: { flexDirection: "row", marginBottom: 20 },
  card: { alignItems: "center", padding: 10, marginRight: 10, backgroundColor: "#f9f9f9", borderRadius: 10 },
  image: { width: 80, height: 80, borderRadius: 10 },
  itemName: { fontSize: 16, fontWeight: "bold", marginTop: 5 },
  itemPrice: { fontSize: 14, color: "green" },

  // Consultant Card
  consultantCard: { flexDirection: "row", alignItems: "center", padding: 10, marginBottom: 10, backgroundColor: "#f2f2f2", borderRadius: 10 },
  consultantImage: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  consultantName: { fontSize: 16, fontWeight: "bold" },

  // Van Locations
  vanCard: { alignItems: "center", marginBottom: 50 },
  vanImage: { width: "100%", height: 150, borderRadius: 10 },
  vanLocation: { fontSize: 16, fontWeight: "bold", marginTop: 5 },
});
