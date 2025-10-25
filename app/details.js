import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Dimensions 
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const { width } = Dimensions.get('window');

// Mock flight details data
const mockFlightDetails = {
  id: '1',
  airline: 'AirFly',
  flightNumber: 'AF123',
  departure: { 
    city: 'New York', 
    code: 'NYC', 
    time: '08:30', 
    date: 'Dec 15, 2024',
    terminal: 'Terminal 1',
    gate: 'A12'
  },
  arrival: { 
    city: 'Los Angeles', 
    code: 'LAX', 
    time: '11:45', 
    date: 'Dec 15, 2024',
    terminal: 'Terminal 2',
    gate: 'B8'
  },
  duration: '5h 15m',
  price: '$299',
  stops: 'Non-stop',
  aircraft: 'Boeing 737',
  baggage: {
    carryOn: '1 bag included',
    checked: '1 bag included (up to 50 lbs)'
  },
  amenities: [
    'WiFi Available',
    'In-flight Entertainment',
    'Complimentary Snacks',
    'USB Power Outlets'
  ],
  seatMap: {
    totalSeats: 180,
    availableSeats: 45,
    seatPitch: '30 inches',
    seatWidth: '17 inches'
  }
};

// Seat Selection Component
const SeatSelection = () => {
  const [selectedSeat, setSelectedSeat] = useState(null);
  
  // Mock seat data - in a real app, this would come from an API
  const seats = [
    { id: '1A', type: 'window', price: 0, available: true },
    { id: '1B', type: 'middle', price: 0, available: true },
    { id: '1C', type: 'aisle', price: 0, available: false },
    { id: '2A', type: 'window', price: 25, available: true },
    { id: '2B', type: 'middle', price: 0, available: true },
    { id: '2C', type: 'aisle', price: 15, available: true },
  ];

  return (
    <View style={styles.seatSection}>
      <Text style={styles.sectionTitle}>Choose Your Seat</Text>
      <View style={styles.seatMap}>
        {seats.map((seat) => (
          <TouchableOpacity
            key={seat.id}
            style={[
              styles.seat,
              !seat.available && styles.seatUnavailable,
              selectedSeat === seat.id && styles.seatSelected
            ]}
            onPress={() => seat.available && setSelectedSeat(seat.id)}
            disabled={!seat.available}
          >
            <Text style={[
              styles.seatText,
              !seat.available && styles.seatTextUnavailable,
              selectedSeat === seat.id && styles.seatTextSelected
            ]}>
              {seat.id}
            </Text>
            {seat.price > 0 && (
              <Text style={styles.seatPrice}>+${seat.price}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.seatNote}>
        • Window seats offer better views{'\n'}
        • Aisle seats offer easier access{'\n'}
        • Premium seats include extra legroom
      </Text>
    </View>
  );
};

// Amenities Component
const AmenitiesList = ({ amenities }) => {
  return (
    <View style={styles.amenitiesSection}>
      <Text style={styles.sectionTitle}>In-flight Amenities</Text>
      {amenities.map((amenity, index) => (
        <View key={index} style={styles.amenityItem}>
          <Text style={styles.amenityIcon}>✓</Text>
          <Text style={styles.amenityText}>{amenity}</Text>
        </View>
      ))}
    </View>
  );
};

// Main Flight Details Screen Component
const FlightDetailsScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [showSeatSelection, setShowSeatSelection] = useState(false);
  const flight = mockFlightDetails;

  const handleBookFlight = () => {
    router.push('/booking');
  };

  const handleBackToFlights = () => {
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackToFlights}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Flight Details</Text>
        <Text style={styles.headerSubtitle}>{flight.airline} {flight.flightNumber}</Text>
      </View>

      {/* Flight Overview Card */}
      <View style={styles.overviewCard}>
        <View style={styles.flightHeader}>
          <View style={styles.airlineInfo}>
            <Text style={styles.airlineName}>{flight.airline}</Text>
            <Text style={styles.flightNumber}>{flight.flightNumber}</Text>
          </View>
          <Text style={styles.price}>{flight.price}</Text>
        </View>

        {/* Flight Route */}
        <View style={styles.routeContainer}>
          <View style={styles.departureInfo}>
            <Text style={styles.time}>{flight.departure.time}</Text>
            <Text style={styles.code}>{flight.departure.code}</Text>
            <Text style={styles.city}>{flight.departure.city}</Text>
            <Text style={styles.terminal}>Terminal {flight.departure.terminal}</Text>
          </View>

          <View style={styles.flightPath}>
            <View style={styles.durationContainer}>
              <Text style={styles.duration}>{flight.duration}</Text>
              <View style={styles.flightLine} />
              <Text style={styles.stops}>{flight.stops}</Text>
            </View>
          </View>

          <View style={styles.arrivalInfo}>
            <Text style={styles.time}>{flight.arrival.time}</Text>
            <Text style={styles.code}>{flight.arrival.code}</Text>
            <Text style={styles.city}>{flight.arrival.city}</Text>
            <Text style={styles.terminal}>Terminal {flight.arrival.terminal}</Text>
          </View>
        </View>

        {/* Flight Details */}
        <View style={styles.detailsGrid}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Aircraft</Text>
            <Text style={styles.detailValue}>{flight.aircraft}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Gate</Text>
            <Text style={styles.detailValue}>{flight.departure.gate}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Date</Text>
            <Text style={styles.detailValue}>{flight.departure.date}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Duration</Text>
            <Text style={styles.detailValue}>{flight.duration}</Text>
          </View>
        </View>
      </View>

      {/* Baggage Information */}
      <View style={styles.baggageSection}>
        <Text style={styles.sectionTitle}>Baggage Allowance</Text>
        <View style={styles.baggageItem}>
          <Text style={styles.baggageIcon}>🎒</Text>
          <View style={styles.baggageInfo}>
            <Text style={styles.baggageTitle}>Carry-on Baggage</Text>
            <Text style={styles.baggageDescription}>{flight.baggage.carryOn}</Text>
          </View>
        </View>
        <View style={styles.baggageItem}>
          <Text style={styles.baggageIcon}>🧳</Text>
          <View style={styles.baggageInfo}>
            <Text style={styles.baggageTitle}>Checked Baggage</Text>
            <Text style={styles.baggageDescription}>{flight.baggage.checked}</Text>
          </View>
        </View>
      </View>

      {/* Amenities */}
      <AmenitiesList amenities={flight.amenities} />

      {/* Seat Selection */}
      <View style={styles.seatToggleSection}>
        <TouchableOpacity 
          style={styles.seatToggleButton}
          onPress={() => setShowSeatSelection(!showSeatSelection)}
        >
          <Text style={styles.seatToggleText}>
            {showSeatSelection ? 'Hide' : 'Show'} Seat Selection
          </Text>
          <Text style={styles.seatToggleIcon}>
            {showSeatSelection ? '▲' : '▼'}
          </Text>
        </TouchableOpacity>
      </View>

      {showSeatSelection && <SeatSelection />}

      {/* Booking Button */}
      <View style={styles.bookingSection}>
        <TouchableOpacity style={styles.bookButton} onPress={handleBookFlight}>
          <Text style={styles.bookButtonText}>Book This Flight</Text>
        </TouchableOpacity>
        <Text style={styles.bookingNote}>
          Free cancellation up to 24 hours before departure
        </Text>
      </View>
    </ScrollView>
  );
};

// Styles for the Flight Details Screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#2563eb',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  backButton: {
    marginBottom: 10,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#e0e7ff',
  },
  overviewCard: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  flightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  airlineInfo: {
    flex: 1,
  },
  airlineName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  flightNumber: {
    fontSize: 16,
    color: '#6b7280',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  departureInfo: {
    flex: 1,
    alignItems: 'flex-start',
  },
  arrivalInfo: {
    flex: 1,
    alignItems: 'flex-end',
  },
  time: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  code: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2563eb',
    marginBottom: 2,
  },
  city: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 2,
  },
  terminal: {
    fontSize: 14,
    color: '#9ca3af',
  },
  flightPath: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  durationContainer: {
    alignItems: 'center',
  },
  duration: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  flightLine: {
    width: 80,
    height: 2,
    backgroundColor: '#d1d5db',
    marginBottom: 8,
  },
  stops: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '500',
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  detailItem: {
    width: '48%',
    padding: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  baggageSection: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 15,
  },
  baggageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  baggageIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  baggageInfo: {
    flex: 1,
  },
  baggageTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 2,
  },
  baggageDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  amenitiesSection: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  amenityIcon: {
    fontSize: 16,
    color: '#059669',
    marginRight: 12,
    fontWeight: 'bold',
  },
  amenityText: {
    fontSize: 16,
    color: '#374151',
  },
  seatToggleSection: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  seatToggleButton: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  seatToggleText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  seatToggleIcon: {
    fontSize: 16,
    color: '#6b7280',
  },
  seatSection: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  seatMap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  seat: {
    width: (width - 80) / 3,
    height: 50,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  seatUnavailable: {
    backgroundColor: '#e5e7eb',
    borderColor: '#9ca3af',
  },
  seatSelected: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  seatText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
  },
  seatTextUnavailable: {
    color: '#9ca3af',
  },
  seatTextSelected: {
    color: 'white',
  },
  seatPrice: {
    fontSize: 10,
    color: '#059669',
    marginTop: 2,
  },
  seatNote: {
    fontSize: 12,
    color: '#6b7280',
    lineHeight: 18,
  },
  bookingSection: {
    margin: 20,
    marginBottom: 40,
  },
  bookButton: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  bookButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  bookingNote: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default FlightDetailsScreen;
