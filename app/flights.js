import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  FlatList,
  TextInput 
} from 'react-native';
import { useRouter } from 'expo-router';

// Extended mock data with more flights for the list screen
const mockFlights = [
  {
    id: '1',
    airline: 'AirFly',
    flightNumber: 'AF123',
    departure: { city: 'New York', code: 'NYC', time: '08:30', date: 'Dec 15' },
    arrival: { city: 'Los Angeles', code: 'LAX', time: '11:45', date: 'Dec 15' },
    duration: '5h 15m',
    price: '$299',
    stops: 'Non-stop',
    aircraft: 'Boeing 737',
    gate: 'A12',
    terminal: 'Terminal 1'
  },
  {
    id: '2',
    airline: 'SkyJet',
    flightNumber: 'SJ456',
    departure: { city: 'New York', code: 'NYC', time: '14:20', date: 'Dec 15' },
    arrival: { city: 'Los Angeles', code: 'LAX', time: '17:35', date: 'Dec 15' },
    duration: '5h 15m',
    price: '$349',
    stops: 'Non-stop',
    aircraft: 'Airbus A320',
    gate: 'B8',
    terminal: 'Terminal 2'
  },
  {
    id: '3',
    airline: 'CloudAir',
    flightNumber: 'CA789',
    departure: { city: 'New York', code: 'NYC', time: '19:15', date: 'Dec 15' },
    arrival: { city: 'Los Angeles', code: 'LAX', time: '22:30', date: 'Dec 15' },
    duration: '5h 15m',
    price: '$279',
    stops: 'Non-stop',
    aircraft: 'Boeing 737',
    gate: 'C15',
    terminal: 'Terminal 1'
  },
  {
    id: '4',
    airline: 'JetBlue',
    flightNumber: 'JB234',
    departure: { city: 'New York', code: 'NYC', time: '06:45', date: 'Dec 15' },
    arrival: { city: 'Los Angeles', code: 'LAX', time: '10:00', date: 'Dec 15' },
    duration: '5h 15m',
    price: '$325',
    stops: 'Non-stop',
    aircraft: 'Airbus A321',
    gate: 'D22',
    terminal: 'Terminal 3'
  },
  {
    id: '5',
    airline: 'Delta',
    flightNumber: 'DL567',
    departure: { city: 'New York', code: 'NYC', time: '12:30', date: 'Dec 15' },
    arrival: { city: 'Los Angeles', code: 'LAX', time: '15:45', date: 'Dec 15' },
    duration: '5h 15m',
    price: '$399',
    stops: 'Non-stop',
    aircraft: 'Boeing 757',
    gate: 'E5',
    terminal: 'Terminal 2'
  }
];

// Individual Flight Card Component
const FlightCard = ({ flight, onPress }) => {
  return (
    <TouchableOpacity style={styles.flightCard} onPress={() => onPress(flight)}>
      {/* Flight Header */}
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
        </View>
      </View>

      {/* Flight Details */}
      <View style={styles.flightDetails}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Aircraft</Text>
          <Text style={styles.detailValue}>{flight.aircraft}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Gate</Text>
          <Text style={styles.detailValue}>{flight.gate}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Terminal</Text>
          <Text style={styles.detailValue}>{flight.terminal}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Filter Component
const FilterSection = ({ onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { key: 'all', label: 'All Flights' },
    { key: 'nonstop', label: 'Non-stop' },
    { key: 'morning', label: 'Morning' },
    { key: 'afternoon', label: 'Afternoon' },
    { key: 'evening', label: 'Evening' }
  ];

  const handleFilterPress = (filterKey) => {
    setSelectedFilter(filterKey);
    onFilterChange(filterKey);
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
      {filters.map((filter) => (
        <TouchableOpacity
          key={filter.key}
          style={[
            styles.filterButton,
            selectedFilter === filter.key && styles.filterButtonActive
          ]}
          onPress={() => handleFilterPress(filter.key)}
        >
          <Text style={[
            styles.filterButtonText,
            selectedFilter === filter.key && styles.filterButtonTextActive
          ]}>
            {filter.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

// Main Flight List Screen Component
const FlightListScreen = () => {
  const router = useRouter();
  const [flights, setFlights] = useState(mockFlights);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter flights based on search query and selected filter
  const filterFlights = (filterKey) => {
    let filteredFlights = mockFlights;

    // Apply search filter
    if (searchQuery) {
      filteredFlights = filteredFlights.filter(flight =>
        flight.airline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        flight.flightNumber.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    switch (filterKey) {
      case 'nonstop':
        filteredFlights = filteredFlights.filter(flight => flight.stops === 'Non-stop');
        break;
      case 'morning':
        filteredFlights = filteredFlights.filter(flight => 
          parseInt(flight.departure.time.split(':')[0]) >= 6 && 
          parseInt(flight.departure.time.split(':')[0]) < 12
        );
        break;
      case 'afternoon':
        filteredFlights = filteredFlights.filter(flight => 
          parseInt(flight.departure.time.split(':')[0]) >= 12 && 
          parseInt(flight.departure.time.split(':')[0]) < 18
        );
        break;
      case 'evening':
        filteredFlights = filteredFlights.filter(flight => 
          parseInt(flight.departure.time.split(':')[0]) >= 18
        );
        break;
      default:
        break;
    }

    setFlights(filteredFlights);
  };

  const handleFlightPress = (flight) => {
    router.push(`/details?id=${flight.id}`);
  };

  const handleBackToHome = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackToHome}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Available Flights</Text>
        <Text style={styles.headerSubtitle}>NYC → LAX • Dec 15, 2024</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search flights..."
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            filterFlights('all');
          }}
        />
      </View>

      {/* Filter Section */}
      <FilterSection onFilterChange={filterFlights} />

      {/* Results Count */}
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsText}>{flights.length} flights found</Text>
        <TouchableOpacity style={styles.sortButton}>
          <Text style={styles.sortButtonText}>Sort by Price</Text>
        </TouchableOpacity>
      </View>

      {/* Flight List */}
      <FlatList
        data={flights}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FlightCard flight={item} onPress={handleFlightPress} />
        )}
        contentContainerStyle={styles.flightList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

// Styles for the Flight List Screen
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
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#f9fafb',
    fontSize: 16,
  },
  filterContainer: {
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: 'white',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    marginRight: 10,
  },
  filterButtonActive: {
    backgroundColor: '#2563eb',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: 'white',
  },
  resultsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  resultsText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#f3f4f6',
  },
  sortButtonText: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '500',
  },
  flightList: {
    padding: 20,
  },
  flightCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
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
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  flightNumber: {
    fontSize: 14,
    color: '#6b7280',
  },
  price: {
    fontSize: 20,
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
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  code: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2563eb',
    marginBottom: 2,
  },
  city: {
    fontSize: 14,
    color: '#6b7280',
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
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 8,
  },
  flightLine: {
    width: 60,
    height: 2,
    backgroundColor: '#d1d5db',
    marginBottom: 8,
  },
  stops: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '500',
  },
  flightDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  detailItem: {
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
});

export default FlightListScreen;
