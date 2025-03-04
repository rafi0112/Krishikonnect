// index updated weather

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Linking } from "react-native";
import * as Location from "expo-location";
import { useVegetableContext } from "../(tabs)/VegetableContext";
import { getWeather } from "../utils/weatherService"; // Weather API integration

const openGoogleMaps = (location: string) => {
  const url = `http://google.com/maps/place/${encodeURIComponent(location)}`;
  Linking.openURL(url);
};

const consultants = [ 
  { name: "Dr. John Doe", degree: "PhD in Agriculture", position: "Senior Consultant", image: require("../../assets/images/thumbsup.png"), contact: "mailto:johndoe@example.com" },
    { name: "Ms. Jane Smith", degree: "MSc in Horticulture", position: "Consultant", image: require("../../assets/images/thumbsup.png"), contact: "mailto:janesmith@example.com" },
    { name: "Dr. Robert Brown", degree: "PhD in Soil Science", position: "Lead Consultant", image: require("../../assets/images/thumbsup.png"), contact: "mailto:robertbrown@example.com" },
    { name: "Dr. Emily Davis", degree: "PhD in Organic Farming", position: "Agriculture Consultant", image: require("../../assets/images/thumbsup.png"), contact: "mailto:emilydavis@example.com" },
    { name: "Mr. Alex Wilson", degree: "MSc in Agribusiness", position: "Farm Management Expert", image: require("../../assets/images/thumbsup.png"), contact: "mailto:alexwilson@example.com" },
    { name: "Dr. Michael Lee", degree: "PhD in Plant Pathology", position: "Crop Specialist", image: require("../../assets/images/thumbsup.png"), contact: "mailto:michaellee@example.com" },
    { name: "Ms. Sarah Johnson", degree: "MSc in Agricultural Economics", position: "Market Analyst", image: require("../../assets/images/thumbsup.png"), contact: "mailto:sarahjohnson@example.com" },
];

const vans = [ { location: "Dhaka", image: { uri: "https://via.placeholder.com/150" } } ];

type WeatherDay = {
  date: string;
  icon: string;
  temp: number;
  condition: string;
};

export default function HomeScreen() {
  const { vegetables } = useVegetableContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState<string[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [previousPrices, setPreviousPrices] = useState<{ [key: string]: number }>({});
  const [weatherData, setWeatherData] = useState<WeatherDay[]>([]);
  const [hasNewNotification, setHasNewNotification] = useState(false);
  
  useEffect(() => {
    async function fetchWeather() {
      try {
        // Request location permissions
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.error("Permission to access location was denied");
          return;
        }

        // Get user location
        let location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        // Fetch weather data using latitude & longitude
        const data = await getWeather(latitude, longitude);
        setWeatherData(data);
      } catch (error) {
        console.error("Weather API Error:", error);
      }
    }

    fetchWeather();
  }, []);

  // Check for price updates
  useEffect(() => {
    const newNotifications: string[] = [];
  
    vegetables.forEach((veg) => {
      if (previousPrices[veg.id] !== undefined && previousPrices[veg.id] !== veg.price) {
        newNotifications.push(`🔔 ${veg.name} price updated to Tk ${veg.price}/kg`);
      }
    });
  
    if (newNotifications.length > 0) {
      setNotifications((prev) => [...newNotifications, ...prev]);
      setHasNewNotification(true); //  Ensure red dot appears when new notifications arrive
    }
  
    // Update previous prices
    const updatedPrices: { [key: string]: number } = {};
    vegetables.forEach((veg) => {
      updatedPrices[veg.id] = veg.price;
    });
    setPreviousPrices(updatedPrices);
  }, [vegetables]);
  
  
  // handle notifications red dot
  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    setHasNewNotification(false); // Remove red dot when notifications are viewed
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Admin</Text>
        <TouchableOpacity style={styles.iconButton} onPress={handleNotificationClick}>
          <Ionicons name="notifications-outline" size={28} color="black" />
          {hasNewNotification && <View style={styles.redDot} />}
        </TouchableOpacity>
      </View>

      {/* Notification Card */}
      {showNotifications && notifications.length > 0 && (
        <View style={styles.notificationCard}>
          <Text style={styles.notificationTitle}>🔔 Notifications</Text>
          {notifications.map((note, index) => (
            <View key={index} style={styles.notificationItem}>
              <Ionicons name="alert-circle-outline" size={18} color="red" />
              <Text style={styles.notificationText}>{note}</Text>
            </View>
          ))}
        </View>
      )}

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
      <View>
        <Image source={require('../../assets/images/home_banner.png')} style={styles.home_banner} />
      </View>
      {/* 7-Day Weather Forecast */}
      <Text style={styles.sectionTitle}>5-Day Weather Forecast</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.weatherScroll}>
            {weatherData?.map((day: WeatherDay, index: number) => (
              <View key={index} style={styles.weatherCard}>
                <Text style={styles.weatherDate}>
                  {new Date(day.date).toLocaleDateString()}
                </Text>
                <Image source={{ uri: day.icon }} style={styles.weatherIcon} />
                <Text style={styles.weatherTemp}>{day.temp}°C</Text>
                <Text style={styles.weatherCondition}>{day.condition}</Text>
              </View>
            ))}

      </ScrollView>

      {/* Today's Price Section */}
      <Text style={styles.sectionTitle}>Today's Price</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
        {vegetables.map((item) => (
          <View key={item.id} style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>tk {item.price}/kg</Text>
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

      {/* Service Locations Section */}
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
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20, marginTop: 50 },
  headerText: { fontSize: 28, fontWeight: "bold" },
  headerIcons: { flexDirection: "row" },
  iconButton: { padding: 5, marginLeft: 10 },
  home_banner: { width: "100%", height: 200, borderRadius: 10 },
  
  searchContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#f2f2f2", borderRadius: 10, padding: 8, marginBottom: 15 },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 16 },
  
  weatherScroll: { flexDirection: "row", marginBottom: 20 },
  weatherCard: { alignItems: "center", padding: 10, marginRight: 10, backgroundColor: "#e0f7fa", borderRadius: 10, width: 100 },
  weatherDate: { fontSize: 12, fontWeight: "bold" },
  weatherIcon: { width: 50, height: 50 },
  weatherTemp: { fontSize: 16, fontWeight: "bold", marginTop: 5 },
  weatherCondition: { fontSize: 12, textAlign: "center" },

  redDot: { width: 10, height: 10, backgroundColor: "red", borderRadius: 5, position: "absolute", top: 0, right: 0 },
  notificationCard: { backgroundColor: "#fff3e0", padding: 15, borderRadius: 10, marginBottom: 20, elevation: 5 },
  notificationTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  notificationItem: { flexDirection: "row", alignItems: "center", marginBottom: 5 },
  notificationText: { fontSize: 14, marginLeft: 5, color: "#333" },

  sectionTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 30, marginTop: 40 },
  scrollContainer: { flexDirection: "row", marginBottom: 20 },
  card: { alignItems: "center", padding: 10, marginRight: 10, backgroundColor: "#f9f9f9", borderRadius: 10 },
  image: { width: 80, height: 80, borderRadius: 10 },
  itemName: { fontSize: 16, fontWeight: "bold", marginTop: 5 },
  itemPrice: { fontSize: 14, color: "green" },
  
  consultantCard: { flexDirection: "row", alignItems: "center", padding: 10, marginBottom: 10, backgroundColor: "#f2f2f2", borderRadius: 10 },
  consultantImage: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  consultantName: { fontSize: 16, fontWeight: "bold" },
  
  vanCard: { alignItems: "center", marginBottom: 50 },
  vanImage: { width: "100%", height: 150, borderRadius: 10 },
  vanLocation: { fontSize: 16, fontWeight: "bold", marginTop: 5 },
});
