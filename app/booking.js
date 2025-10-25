import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Alert 
} from 'react-native';
import { useRouter } from 'expo-router';

// Mock booking data
const mockBookingData = {
  flight: {
    airline: 'AirFly',
    flightNumber: 'AF123',
    departure: { city: 'New York', code: 'NYC', time: '08:30', date: 'Dec 15, 2024' },
    arrival: { city: 'Los Angeles', code: 'LAX', time: '11:45', date: 'Dec 15, 2024' },
    duration: '5h 15m',
    price: '$299',
    seat: '2A'
  },
  passenger: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: ''
  },
  payment: {
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  }
};

// Passenger Information Form Component
const PassengerForm = ({ passenger, onUpdate }) => {
  return (
    <View style={styles.formSection}>
      <Text style={styles.sectionTitle}>Passenger Information</Text>
      
      <View style={styles.inputRow}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>First Name</Text>
          <TextInput
            style={styles.inputField}
            value={passenger.firstName}
            onChangeText={(text) => onUpdate('firstName', text)}
            placeholder="Enter first name"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Last Name</Text>
          <TextInput
            style={styles.inputField}
            value={passenger.lastName}
            onChangeText={(text) => onUpdate('lastName', text)}
            placeholder="Enter last name"
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email Address</Text>
        <TextInput
          style={styles.inputField}
          value={passenger.email}
          onChangeText={(text) => onUpdate('email', text)}
          placeholder="Enter email address"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputRow}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Phone Number</Text>
          <TextInput
            style={styles.inputField}
            value={passenger.phone}
            onChangeText={(text) => onUpdate('phone', text)}
            placeholder="Enter phone number"
            keyboardType="phone-pad"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Date of Birth</Text>
          <TextInput
            style={styles.inputField}
            value={passenger.dateOfBirth}
            onChangeText={(text) => onUpdate('dateOfBirth', text)}
            placeholder="MM/DD/YYYY"
          />
        </View>
      </View>
    </View>
  );
};

// Payment Information Form Component
const PaymentForm = ({ payment, onUpdate }) => {
  return (
    <View style={styles.formSection}>
      <Text style={styles.sectionTitle}>Payment Information</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Card Number</Text>
        <TextInput
          style={styles.inputField}
          value={payment.cardNumber}
          onChangeText={(text) => onUpdate('cardNumber', text)}
          placeholder="1234 5678 9012 3456"
          keyboardType="numeric"
          maxLength={19}
        />
      </View>

      <View style={styles.inputRow}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Expiry Date</Text>
          <TextInput
            style={styles.inputField}
            value={payment.expiryDate}
            onChangeText={(text) => onUpdate('expiryDate', text)}
            placeholder="MM/YY"
            keyboardType="numeric"
            maxLength={5}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>CVV</Text>
          <TextInput
            style={styles.inputField}
            value={payment.cvv}
            onChangeText={(text) => onUpdate('cvv', text)}
            placeholder="123"
            keyboardType="numeric"
            maxLength={4}
            secureTextEntry
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Cardholder Name</Text>
        <TextInput
          style={styles.inputField}
          value={payment.cardholderName}
          onChangeText={(text) => onUpdate('cardholderName', text)}
          placeholder="Enter cardholder name"
        />
      </View>
    </View>
  );
};

// Booking Summary Component
const BookingSummary = ({ flight, totalPrice }) => {
  return (
    <View style={styles.summarySection}>
      <Text style={styles.sectionTitle}>Booking Summary</Text>
      
      {/* Flight Details */}
      <View style={styles.flightSummary}>
        <View style={styles.flightHeader}>
          <Text style={styles.airlineName}>{flight.airline} {flight.flightNumber}</Text>
          <Text style={styles.flightDate}>{flight.departure.date}</Text>
        </View>
        
        <View style={styles.routeSummary}>
          <View style={styles.departureSummary}>
            <Text style={styles.time}>{flight.departure.time}</Text>
            <Text style={styles.code}>{flight.departure.code}</Text>
          </View>
          
          <View style={styles.flightPathSummary}>
            <Text style={styles.duration}>{flight.duration}</Text>
            <View style={styles.flightLine} />
          </View>
          
          <View style={styles.arrivalSummary}>
            <Text style={styles.time}>{flight.arrival.time}</Text>
            <Text style={styles.code}>{flight.arrival.code}</Text>
          </View>
        </View>
        
        <View style={styles.seatInfo}>
          <Text style={styles.seatLabel}>Seat:</Text>
          <Text style={styles.seatValue}>{flight.seat}</Text>
        </View>
      </View>

      {/* Price Breakdown */}
      <View style={styles.priceBreakdown}>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Base Fare</Text>
          <Text style={styles.priceValue}>$250</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Taxes & Fees</Text>
          <Text style={styles.priceValue}>$49</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Seat Selection</Text>
          <Text style={styles.priceValue}>$0</Text>
        </View>
        <View style={[styles.priceRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>{totalPrice}</Text>
        </View>
      </View>
    </View>
  );
};

// Main Booking Confirmation Screen Component
const BookingConfirmationScreen = () => {
  const router = useRouter();
  const [bookingData, setBookingData] = useState(mockBookingData);
  const [currentStep, setCurrentStep] = useState(1); // 1: Passenger, 2: Payment, 3: Confirmation

  const updatePassenger = (field, value) => {
    setBookingData(prev => ({
      ...prev,
      passenger: { ...prev.passenger, [field]: value }
    }));
  };

  const updatePayment = (field, value) => {
    setBookingData(prev => ({
      ...prev,
      payment: { ...prev.payment, [field]: value }
    }));
  };

  const validateForm = () => {
    const { passenger, payment } = bookingData;
    
    if (!passenger.firstName || !passenger.lastName || !passenger.email || !passenger.phone) {
      Alert.alert('Error', 'Please fill in all passenger information');
      return false;
    }
    
    if (!payment.cardNumber || !payment.expiryDate || !payment.cvv || !payment.cardholderName) {
      Alert.alert('Error', 'Please fill in all payment information');
      return false;
    }
    
    return true;
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (validateForm()) {
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      if (validateForm()) {
        setCurrentStep(3);
      }
    }
  };

  const handleConfirmBooking = () => {
    Alert.alert(
      'Booking Confirmed!',
      'Your flight has been successfully booked. You will receive a confirmation email shortly.',
      [{ text: 'OK', onPress: () => router.push('/') }]
    );
  };

  const handleBackToDetails = () => {
    router.back();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <PassengerForm 
            passenger={bookingData.passenger} 
            onUpdate={updatePassenger} 
          />
        );
      case 2:
        return (
          <PaymentForm 
            payment={bookingData.payment} 
            onUpdate={updatePayment} 
          />
        );
      case 3:
        return (
          <BookingSummary 
            flight={bookingData.flight} 
            totalPrice={bookingData.flight.price}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackToDetails}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Complete Booking</Text>
        <Text style={styles.headerSubtitle}>Step {currentStep} of 3</Text>
      </View>

      {/* Progress Indicator */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(currentStep / 3) * 100}%` }]} />
        </View>
        <View style={styles.stepIndicators}>
          <View style={[styles.stepIndicator, currentStep >= 1 && styles.stepActive]}>
            <Text style={[styles.stepText, currentStep >= 1 && styles.stepTextActive]}>1</Text>
          </View>
          <View style={[styles.stepIndicator, currentStep >= 2 && styles.stepActive]}>
            <Text style={[styles.stepText, currentStep >= 2 && styles.stepTextActive]}>2</Text>
          </View>
          <View style={[styles.stepIndicator, currentStep >= 3 && styles.stepActive]}>
            <Text style={[styles.stepText, currentStep >= 3 && styles.stepTextActive]}>3</Text>
          </View>
        </View>
        <View style={styles.stepLabels}>
          <Text style={styles.stepLabel}>Passenger</Text>
          <Text style={styles.stepLabel}>Payment</Text>
          <Text style={styles.stepLabel}>Confirm</Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {renderStepContent()}
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        {currentStep > 1 && (
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setCurrentStep(currentStep - 1)}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity 
          style={styles.nextButton}
          onPress={currentStep === 3 ? handleConfirmBooking : handleNextStep}
        >
          <Text style={styles.nextButtonText}>
            {currentStep === 3 ? 'Confirm Booking' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles for the Booking Confirmation Screen
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
  progressContainer: {
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
    marginBottom: 15,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2563eb',
    borderRadius: 2,
  },
  stepIndicators: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  stepIndicator: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepActive: {
    backgroundColor: '#2563eb',
  },
  stepText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9ca3af',
  },
  stepTextActive: {
    color: 'white',
  },
  stepLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stepLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  formSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
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
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    flex: 1,
    marginBottom: 15,
    marginRight: 10,
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
    fontSize: 16,
    color: '#374151',
  },
  summarySection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  flightSummary: {
    marginBottom: 20,
  },
  flightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  airlineName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  flightDate: {
    fontSize: 14,
    color: '#6b7280',
  },
  routeSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  departureSummary: {
    flex: 1,
    alignItems: 'flex-start',
  },
  arrivalSummary: {
    flex: 1,
    alignItems: 'flex-end',
  },
  time: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  code: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2563eb',
  },
  flightPathSummary: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  duration: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  flightLine: {
    width: 60,
    height: 2,
    backgroundColor: '#d1d5db',
  },
  seatInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seatLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginRight: 8,
  },
  seatValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  priceBreakdown: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 15,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  priceLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  priceValue: {
    fontSize: 14,
    color: '#374151',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 10,
    marginTop: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  actionContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  backButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    alignItems: 'center',
    marginRight: 10,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  nextButton: {
    flex: 2,
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 10,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default BookingConfirmationScreen;
