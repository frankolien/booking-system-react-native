import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Alert,
  Modal,
  Dimensions
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

// Calendar Component
const CalendarModal = ({ visible, onClose, onDateSelect, selectedDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const handleDateSelect = (day) => {
    if (day) {
      const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      onDateSelect(selectedDate);
      onClose();
    }
  };
  
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };
  
  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };
  
  const formatDate = (date) => {
    if (!date) return '';
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };
  
  const days = getDaysInMonth(currentMonth);
  
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.calendarContainer}>
          <View style={styles.calendarHeader}>
            <TouchableOpacity onPress={goToPreviousMonth} style={styles.monthButton}>
              <Text style={styles.monthButtonText}>‹</Text>
            </TouchableOpacity>
            <Text style={styles.monthTitle}>
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </Text>
            <TouchableOpacity onPress={goToNextMonth} style={styles.monthButton}>
              <Text style={styles.monthButtonText}>›</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.dayNamesRow}>
            {dayNames.map(day => (
              <Text key={day} style={styles.dayName}>{day}</Text>
            ))}
          </View>
          
          <View style={styles.calendarGrid}>
            {days.map((day, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.calendarDay,
                  day && selectedDate && 
                  day === selectedDate.getDate() && 
                  currentMonth.getMonth() === selectedDate.getMonth() && 
                  currentMonth.getFullYear() === selectedDate.getFullYear() && 
                  styles.selectedDay
                ]}
                onPress={() => handleDateSelect(day)}
                disabled={!day}
              >
                <Text style={[
                  styles.dayText,
                  day && selectedDate && 
                  day === selectedDate.getDate() && 
                  currentMonth.getMonth() === selectedDate.getMonth() && 
                  currentMonth.getFullYear() === selectedDate.getFullYear() && 
                  styles.selectedDayText
                ]}>
                  {day}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <View style={styles.calendarFooter}>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Passenger Information Form Component
const PassengerForm = ({ passenger, onUpdate }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    const formattedDate = `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}/${date.getFullYear()}`;
    onUpdate('dateOfBirth', formattedDate);
  };
  
  const openCalendar = () => {
    setShowCalendar(true);
  };
  
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
          <TouchableOpacity style={styles.dateInputField} onPress={openCalendar}>
            <Text style={[styles.dateInputText, !passenger.dateOfBirth && styles.placeholderText]}>
              {passenger.dateOfBirth || 'MM/DD/YYYY'}
            </Text>
            <Text style={styles.calendarIcon}>📅</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <CalendarModal
        visible={showCalendar}
        onClose={() => setShowCalendar(false)}
        onDateSelect={handleDateSelect}
        selectedDate={selectedDate}
      />
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
    let formattedValue = value;
    
    // Format date of birth
    if (field === 'dateOfBirth') {
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length >= 2) {
        if (cleaned.length >= 4) {
          formattedValue = cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4) + '/' + cleaned.substring(4, 8);
        } else {
          formattedValue = cleaned.substring(0, 2) + '/' + cleaned.substring(2);
        }
      } else {
        formattedValue = cleaned;
      }
    }
    
    setBookingData(prev => ({
      ...prev,
      passenger: { ...prev.passenger, [field]: formattedValue }
    }));
  };

  const updatePayment = (field, value) => {
    let formattedValue = value;
    
    // Format card number with spaces
    if (field === 'cardNumber') {
      const cleaned = value.replace(/\s/g, '');
      const groups = cleaned.match(/.{1,4}/g);
      formattedValue = groups ? groups.join(' ') : cleaned;
    }
    
    // Format expiry date
    if (field === 'expiryDate') {
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length >= 2) {
        formattedValue = cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
      } else {
        formattedValue = cleaned;
      }
    }
    
    setBookingData(prev => ({
      ...prev,
      payment: { ...prev.payment, [field]: formattedValue }
    }));
  };

  const validatePassengerInfo = () => {
    const { passenger } = bookingData;
    const missingFields = [];
    
    if (!passenger.firstName?.trim()) missingFields.push('First Name');
    if (!passenger.lastName?.trim()) missingFields.push('Last Name');
    if (!passenger.email?.trim()) missingFields.push('Email Address');
    if (!passenger.phone?.trim()) missingFields.push('Phone Number');
    if (!passenger.dateOfBirth?.trim()) missingFields.push('Date of Birth');
    
    if (missingFields.length > 0) {
      Alert.alert('Missing Information', `Please fill in the following fields:\n• ${missingFields.join('\n• ')}`);
      return false;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(passenger.email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return false;
    }
    
    // Validate date format (MM/DD/YYYY)
    const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    if (!dateRegex.test(passenger.dateOfBirth)) {
      Alert.alert('Invalid Date', 'Please enter date of birth in MM/DD/YYYY format');
      return false;
    }
    
    return true;
  };

  const validatePaymentInfo = () => {
    const { payment } = bookingData;
    const missingFields = [];
    
    if (!payment.cardNumber?.trim()) missingFields.push('Card Number');
    if (!payment.expiryDate?.trim()) missingFields.push('Expiry Date');
    if (!payment.cvv?.trim()) missingFields.push('CVV');
    if (!payment.cardholderName?.trim()) missingFields.push('Cardholder Name');
    
    if (missingFields.length > 0) {
      Alert.alert('Missing Information', `Please fill in the following fields:\n• ${missingFields.join('\n• ')}`);
      return false;
    }
    
    // Validate card number (basic check for 16 digits)
    const cardNumber = payment.cardNumber.replace(/\s/g, '');
    if (!/^\d{16}$/.test(cardNumber)) {
      Alert.alert('Invalid Card Number', 'Please enter a valid 16-digit card number');
      return false;
    }
    
    // Validate expiry date format (MM/YY)
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryRegex.test(payment.expiryDate)) {
      Alert.alert('Invalid Expiry Date', 'Please enter expiry date in MM/YY format');
      return false;
    }
    
    // Validate CVV (3-4 digits)
    if (!/^\d{3,4}$/.test(payment.cvv)) {
      Alert.alert('Invalid CVV', 'Please enter a valid CVV (3-4 digits)');
      return false;
    }
    
    return true;
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (validatePassengerInfo()) {
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      if (validatePaymentInfo()) {
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
  // Calendar Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    width: Dimensions.get('window').width - 40,
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  monthButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  dayNamesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  dayName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
    width: 40,
    textAlign: 'center',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  calendarDay: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderRadius: 20,
  },
  selectedDay: {
    backgroundColor: '#2563eb',
  },
  dayText: {
    fontSize: 16,
    color: '#374151',
  },
  selectedDayText: {
    color: 'white',
    fontWeight: '600',
  },
  calendarFooter: {
    marginTop: 20,
    alignItems: 'center',
  },
  cancelButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  // Date Input Styles
  dateInputField: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#f9fafb',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateInputText: {
    fontSize: 16,
    color: '#374151',
  },
  placeholderText: {
    color: '#9ca3af',
  },
  calendarIcon: {
    fontSize: 18,
  },
});

export default BookingConfirmationScreen;
