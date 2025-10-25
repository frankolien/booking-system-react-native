import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Flight Booking',
          headerShown: false 
        }} 
      />
      <Stack.Screen 
        name="flights" 
        options={{ 
          title: 'Available Flights',
          headerShown: false 
        }} 
      />
      <Stack.Screen 
        name="details" 
        options={{ 
          title: 'Flight Details',
          headerShown: false 
        }} 
      />
      <Stack.Screen 
        name="booking" 
        options={{ 
          title: 'Complete Booking',
          headerShown: false 
        }} 
      />
    </Stack>
  );
}
