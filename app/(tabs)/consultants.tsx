import React from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Linking } from "react-native";

const consultants = [
    { name: "Dr. John Doe", degree: "PhD in Agriculture", position: "Senior Consultant", image: require("../../assets/images/thumbsup.png"), contact: "mailto:johndoe@example.com" },
    { name: "Ms. Jane Smith", degree: "MSc in Horticulture", position: "Consultant", image: require("../../assets/images/thumbsup.png"), contact: "mailto:janesmith@example.com" },
    { name: "Dr. Robert Brown", degree: "PhD in Soil Science", position: "Lead Consultant", image: require("../../assets/images/thumbsup.png"), contact: "mailto:robertbrown@example.com" },
    { name: "Dr. Emily Davis", degree: "PhD in Organic Farming", position: "Agriculture Consultant", image: require("../../assets/images/thumbsup.png"), contact: "mailto:emilydavis@example.com" },
    { name: "Mr. Alex Wilson", degree: "MSc in Agribusiness", position: "Farm Management Expert", image: require("../../assets/images/thumbsup.png"), contact: "mailto:alexwilson@example.com" },
    { name: "Dr. Michael Lee", degree: "PhD in Plant Pathology", position: "Crop Specialist", image: require("../../assets/images/thumbsup.png"), contact: "mailto:michaellee@example.com" },
    { name: "Ms. Sarah Johnson", degree: "MSc in Agricultural Economics", position: "Market Analyst", image: require("../../assets/images/thumbsup.png"), contact: "mailto:sarahjohnson@example.com" },
    ];

const ConsultantScreen = () => {
    const renderHeader = () => (
        <View>
        <Text style={styles.header}>Consultants</Text>
        <Image source={require("../../assets/images/consultant_poster.png")} style={styles.poster} />
        </View>
    );

    return (
        <FlatList
        style={styles.container}
        data={consultants}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
            <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.degree}>{item.degree}</Text>
                <Text style={styles.position}>{item.position}</Text>
                <TouchableOpacity style={styles.contactButton} onPress={() => Linking.openURL(item.contact)}>
                <Text style={styles.contactText}>Contact</Text>
                </TouchableOpacity>
            </View>
            </View>
        )}
        ListHeaderComponent={renderHeader}
        />
    );
};

const styles = StyleSheet.create({

    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    
    poster:{ height: 250, width:"100%"},
    
    header: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20, marginTop:40 },
    
    card: { flexDirection: "row", alignItems: "center", backgroundColor: "#f9f9f9", padding: 15, borderRadius: 10, marginBottom: 15 },
    
    image: { width: 70, height: 70, borderRadius: 35, marginRight: 15, marginLeft: 15 },
    
    infoContainer: { flex: 1, padding: 20},
    
    name: { fontSize: 18, fontWeight: "bold" },
    
    degree: { fontSize: 14, color: "gray" },
    
    position: { fontSize: 14, fontWeight: "500" },
    
    contactButton: { marginTop: 10,width:200, padding: 8, backgroundColor: "#007bff", borderRadius: 5, alignItems: "center" },
    
    contactText: { color: "#fff", fontWeight: "bold" },
    
    });
    
    
    
    export default ConsultantScreen;