import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

// Mock data for flights - this simulates what you'd get from an API
const mockFlights = [
  {
    id: '1',
    airline: 'AirFly',
    flightNumber: 'AF123',
    departure: { city: 'New York', code: 'NYC', time: '08:30' },
    arrival: { city: 'Los Angeles', code: 'LAX', time: '11:45' },
    duration: '5h 15m',
    price: '$299',
    stops: 'Non-stop',
    aircraft: 'Boeing 737',
    gate: 'A12'
  },
  {
    id: '2',
    airline: 'SkyJet',
    flightNumber: 'SJ456',
    departure: { city: 'New York', code: 'NYC', time: '14:20' },
    arrival: { city: 'Los Angeles', code: 'LAX', time: '17:35' },
    duration: '5h 15m',
    price: '$349',
    stops: 'Non-stop',
    aircraft: 'Airbus A320',
    gate: 'B8'
  },
  {
    id: '3',
    airline: 'CloudAir',
    flightNumber: 'CA789',
    departure: { city: 'New York', code: 'NYC', time: '19:15' },
    arrival: { city: 'Los Angeles', code: 'LAX', time: '22:30' },
    duration: '5h 15m',
    price: '$279',
    stops: 'Non-stop',
    aircraft: 'Boeing 737',
    gate: 'C15'
  }
];

// Main Home Screen Component
const Home = () => {
  const router = useRouter();

  const handleSearchFlights = () => {
    router.push('/flights');
  };

  const handleViewDetails = (flightId) => {
    router.push(`/details?id=${flightId}`);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Flight Booking</Text>
        <Text style={styles.headerSubtitle}>Find your perfect flight</Text>
      </View>

      {/* Search Section */}
      <View style={styles.searchSection}>
        <Text style={styles.sectionTitle}>Search Flights</Text>
        
        {/* From/To Input Fields */}
        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>From</Text>
            <TouchableOpacity style={styles.inputField}>
              <Text style={styles.inputText}>New York (NYC)</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.swapButton}>
            <Text style={styles.swapIcon}>⇄</Text>
          </TouchableOpacity>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>To</Text>
            <TouchableOpacity style={styles.inputField}>
              <Text style={styles.inputText}>Los Angeles (LAX)</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Date Selection */}
        <View style={styles.dateRow}>
          <View style={styles.dateContainer}>
            <Text style={styles.inputLabel}>Departure</Text>
            <TouchableOpacity style={styles.inputField}>
              <Text style={styles.inputText}>Dec 15, 2024</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.dateContainer}>
            <Text style={styles.inputLabel}>Return</Text>
            <TouchableOpacity style={styles.inputField}>
              <Text style={styles.inputText}>Dec 22, 2024</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Passengers */}
        <View style={styles.passengerContainer}>
          <Text style={styles.inputLabel}>Passengers</Text>
          <TouchableOpacity style={styles.inputField}>
            <Text style={styles.inputText}>1 Adult</Text>
          </TouchableOpacity>
        </View>

        {/* Search Button */}
        <TouchableOpacity style={styles.searchButton} onPress={handleSearchFlights}>
          <Text style={styles.searchButtonText}>Search Flights</Text>
        </TouchableOpacity>
      </View>

      {/* Popular Destinations */}
      <View style={styles.destinationsSection}>
        <Text style={styles.sectionTitle}>Popular Destinations</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.destinationCard}>
            <Text style={styles.destinationCity}>Paris</Text>
            <Text style={styles.destinationPrice}>from $450</Text>
          </View>
          <View style={styles.destinationCard}>
            <Text style={styles.destinationCity}>Tokyo</Text>
            <Text style={styles.destinationPrice}>from $650</Text>
          </View>
          <View style={styles.destinationCard}>
            <Text style={styles.destinationCity}>London</Text>
            <Text style={styles.destinationPrice}>from $420</Text>
          </View>
        </ScrollView>
      </View>

      {/* Recent Searches */}
      <View style={styles.recentSection}>
        <Text style={styles.sectionTitle}>Recent Searches</Text>
        {mockFlights.slice(0, 2).map((flight) => (
          <TouchableOpacity 
            key={flight.id} 
            style={styles.recentFlightCard}
            onPress={() => handleViewDetails(flight.id)}
          >
            <View style={styles.recentFlightInfo}>
              <Text style={styles.recentRoute}>
                {flight.departure.code} → {flight.arrival.code}
              </Text>
              <Text style={styles.recentDate}>Dec 15, 2024</Text>
            </View>
            <Text style={styles.recentPrice}>{flight.price}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

// Styles for the Home component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#2563eb',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#e0e7ff',
  },
  searchSection: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    color: '#1f2937',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  inputContainer: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
    marginBottom: 8,
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#f9fafb',
  },
  inputText: {
    fontSize: 16,
    color: '#374151',
  },
  swapButton: {
    marginHorizontal: 10,
    marginBottom: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  swapIcon: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  dateContainer: {
    flex: 1,
    marginRight: 10,
  },
  passengerContainer: {
    marginBottom: 20,
  },
  searchButton: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  destinationsSection: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  destinationCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginRight: 15,
    minWidth: 120,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  destinationCity: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 5,
  },
  destinationPrice: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '500',
  },
  recentSection: {
    marginHorizontal: 20,
    marginBottom: 30,
  },
  recentFlightCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  recentFlightInfo: {
    flex: 1,
  },
  recentRoute: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 4,
  },
  recentDate: {
    fontSize: 14,
    color: '#6b7280',
  },
  recentPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563eb',
  },
});

export default Home; 
