import React from 'react';
import { useEffect } from 'react';
import * as Updates from 'expo-updates';
import { Alert, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './Screens/authContext';
import CreatAccount from './Screens/CreatAccount';
import SignIn from './Screens/SignIn';
import About from './Screens/About';
import About1 from './Screens/About1';
import HomeScreen from './Screens/HomeScreen';
import Billboardclicked from './Screens/Billboardclicked';
import Tabs from './Tab/Tabs';
import SetAdvertisingDuration from './Screens/SetAdvertisingDuration';
import Subscription from './Screens/Subscription';
import Advertisement from './Screens/Advertisement';
import MaintenanceBooking from './Screens/MaintenanceBooking';
import BookingForm from './Screens/BookingForm';
import Refferrals from './Screens/Refferrals';
import Help from './Screens/Help';
import ContactUs from './Screens/ContactUs';
import MyBillboard from './Screens/MyBillboard';
import Billboardclicked2 from './Screens/Billboardclicked2';
import Notification from './Screens/Notification';
import Eventclicked from './Tab/Eventclicked'
import MyProfile from './Screens/MyProfile';
import EventCalender from './Screens/EventCalender';
import Onboarding from './Screens/Onboarding';
import ExploreMore from './Screens/ExploreMore';
import BillboardRequ from './Screens/BillboardRequ';
import AddDocument from './Screens/AddDocument';

const Stack = createStackNavigator();

function App() {
  StatusBar.setBarStyle('dark-content'); // Change status bar style (light or dark)
    StatusBar.setBackgroundColor('#0080FE'); // Change color as per your requirement


  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        // Show an alert when an update is available
        Alert.alert(
          'Update Available',
          'A new version of the app is available. Would you like to update now?',
          [
            { text: 'Later', onPress: () => console.log('User wants to update later') },
            { text: 'Update', onPress: () => handleUpdate() },
          ]
        );
      }
    } catch (error) {
      alert(`Error fetching latest Expo update: ${error}`);
      console.log(`Error fetching latest Expo update: ${error}`);
    }
  }

  const handleUpdate = async () => {
    try {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    } catch (error) {
      alert(`Error updating the app: ${error}`);
      console.log(`Error updating the app: ${error}`);
    }
  };

  useEffect(() => {
    onFetchUpdateAsync();
  }, []);

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Onboarding">
          <Stack.Screen options={{ headerShown: false }} name="Home" component={Tabs} />
          <Stack.Screen options={{ headerShown: false }} name="Onboarding" component={Onboarding} />
          <Stack.Screen options={{ headerShown: false }} name="CreatAccount" component={CreatAccount} />
          <Stack.Screen options={{ headerShown: false }} name="SignIn" component={SignIn} />
          <Stack.Screen options={{ headerShown: false }} name="About" component={About} />
          <Stack.Screen options={{ headerShown: false }} name="About1" component={About1} />
          <Stack.Screen options={{ headerShown: false }} name="Billboardclicked" component={Billboardclicked} />
          <Stack.Screen options={{ headerShown: false }} name="ExploreMore" component={ExploreMore} />
          <Stack.Screen options={{ headerShown: false }} name="Billboardclicked2" component={Billboardclicked2} />
          <Stack.Screen options={{ headerShown: false }} name="Notification" component={Notification} />
          <Stack.Screen options={{ headerShown: false }} name="Eventclicked" component={Eventclicked} />
          <Stack.Screen options={{}} name="Set Advertising Duration" component={SetAdvertisingDuration} />
          <Stack.Screen options={{ headerShown: false }} name="Subscription" component={Subscription} />
          <Stack.Screen options={{ headerShown: false }} name="Advertisement" component={Advertisement} />
          <Stack.Screen options={{ headerShown: false }} name="Maintenance Booking" component={MaintenanceBooking} />
          <Stack.Screen options={{ headerShown: false }} name="Booking Form" component={BookingForm} />
          <Stack.Screen options={{ headerShown: false }} name="Refferrals" component={Refferrals} />
          <Stack.Screen options={{ headerShown: false }} name="Help and Support" component={Help} />
          <Stack.Screen options={{ headerShown: false }} name="Contact Us" component={ContactUs} />
          <Stack.Screen options={{ headerShown: false }} name="My Billboards" component={MyBillboard} />
          <Stack.Screen options={{ headerShown: false }} name="My Profile" component={MyProfile} />
          <Stack.Screen options={{ headerShown: false }} name="EventCalender" component={EventCalender} />
          <Stack.Screen options={{ headerShown: false }} name="BillboardRequ" component={BillboardRequ} />
          <Stack.Screen options={{ headerShown: false }} name="AddDocument" component={AddDocument} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}


export default App;
