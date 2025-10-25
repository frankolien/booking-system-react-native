# Navigation Guide - Flight Booking App

## 🧭 Navigation Setup Complete!

Your flight booking app now has full navigation between all screens using Expo Router!

## 📱 Navigation Flow

### **1. Home Screen** (`/`)
- **Search Flights Button** → Goes to Flight List (`/flights`)
- **Recent Flight Cards** → Goes to Flight Details (`/details?id=1`)

### **2. Flight List Screen** (`/flights`)
- **Back Button** → Returns to Home (`/`)
- **Flight Cards** → Goes to Flight Details (`/details?id=2`)

### **3. Flight Details Screen** (`/details`)
- **Back Button** → Returns to Flight List (`/flights`)
- **Book This Flight Button** → Goes to Booking (`/booking`)

### **4. Booking Screen** (`/booking`)
- **Back Button** → Returns to Flight Details (`/details`)
- **Confirm Booking** → Returns to Home (`/`) after confirmation

## 🔧 How Navigation Works

### **Expo Router Setup**
```javascript
// app/_layout.js - Defines all routes
<Stack>
  <Stack.Screen name="index" options={{ title: 'Flight Booking' }} />
  <Stack.Screen name="flights" options={{ title: 'Available Flights' }} />
  <Stack.Screen name="details" options={{ title: 'Flight Details' }} />
  <Stack.Screen name="booking" options={{ title: 'Complete Booking' }} />
</Stack>
```

### **Navigation Hooks**
```javascript
import { useRouter, useLocalSearchParams } from 'expo-router';

const router = useRouter();
const { id } = useLocalSearchParams(); // Get URL parameters

// Navigate to different screens
router.push('/flights');           // Go to flights
router.push(`/details?id=${id}`);  // Go to details with ID
router.back();                     // Go back
router.push('/');                  // Go to home
```

### **Passing Data Between Screens**
```javascript
// Pass flight ID as URL parameter
router.push(`/details?id=${flight.id}`);

// Receive the ID in the details screen
const { id } = useLocalSearchParams();
```

## 🎯 Navigation Features Added

### **Back Buttons**
- All screens now have back buttons in the header
- Consistent styling across all screens
- Proper navigation flow

### **Parameter Passing**
- Flight IDs passed between screens via URL parameters
- Easy to extend for more complex data

### **Screen Transitions**
- Smooth transitions between screens
- Proper header management
- Stack-based navigation

## 🚀 How to Test Navigation

1. **Start the app**: `npm start`
2. **Home Screen**: Tap "Search Flights" → Goes to Flight List
3. **Flight List**: Tap any flight card → Goes to Flight Details
4. **Flight Details**: Tap "Book This Flight" → Goes to Booking
5. **Booking**: Complete the form → Returns to Home
6. **Back Buttons**: Use back buttons to navigate backwards

## 🔄 Navigation Patterns Used

### **Stack Navigation**
- Each screen is pushed onto a stack
- Back button pops the current screen
- Maintains navigation history

### **Parameter Passing**
- Flight IDs passed via URL parameters
- Easy to access with `useLocalSearchParams()`
- Clean URL structure

### **Conditional Navigation**
- Different navigation based on user actions
- Form validation before navigation
- Success/error handling

## 🎨 UI Navigation Elements

### **Header Back Buttons**
```javascript
<TouchableOpacity style={styles.backButton} onPress={handleBack}>
  <Text style={styles.backButtonText}>← Back</Text>
</TouchableOpacity>
```

### **Action Buttons**
```javascript
<TouchableOpacity style={styles.searchButton} onPress={handleSearchFlights}>
  <Text style={styles.searchButtonText}>Search Flights</Text>
</TouchableOpacity>
```

### **Card Navigation**
```javascript
<TouchableOpacity onPress={() => handleViewDetails(flight.id)}>
  <FlightCard flight={flight} />
</TouchableOpacity>
```

## 📚 Learning Points

### **Expo Router Concepts**
- File-based routing
- Stack navigation
- Parameter passing
- Navigation hooks

### **React Native Patterns**
- TouchableOpacity for navigation
- Conditional rendering
- State management across screens
- Event handling

### **User Experience**
- Consistent navigation patterns
- Clear visual feedback
- Intuitive back buttons
- Smooth transitions

Your app now has a complete navigation system! Users can seamlessly move between all screens, and the navigation follows standard mobile app patterns.
