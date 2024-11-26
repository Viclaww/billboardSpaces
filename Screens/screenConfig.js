// this page includes code to render a navigation for protected and unprotected screens
// and then uses a conditional based on users logged in state to determine the app mode.

import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import BottomTabNavigator from "./Protected/Landing";
import { useSelector } from "react-redux";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { BackHandler, Alert } from "react-native";
import Onboarding from "./UnProtected/Onboarding";
import CreatAccount from "./UnProtected/CreatAccount";
import SignIn from "./UnProtected/SignIn";
import About from "./UnProtected/About";
import About1 from "./UnProtected/About1";
import Tabs from "./utils/Tabs";
import HomeScreen from "./Protected/Home/HomeScreen";
import Billboardclicked from "./Protected/Billboardclicked";
import SetAdvertisingDuration from "./Protected/SetAdvertisingDuration";
import AddBillboard from "./Protected/AddBillboard/AddBillboard";
import ExploreMore from "./Protected/ExploreMore";
import Billboardclicked2 from "./Protected/Billboardclicked2";
import Subscription from "./Protected/Subscription";
import Advertisement from "./Protected/Advertisement";
import MaintenanceBooking from "./Protected/MaintenanceBooking";
import BookingForm from "./Protected/BookingForm";
import Refferrals from "./Protected/Refferrals";
import Help from "./Protected/Help";
import ContactUs from "./Protected/ContactUs";
import MyBillboard from "./Protected/MyBillboard";
import MyProfile from "./Protected/MyProfile";
import EventCalender from "./Protected/EventCalender";
import BillboardRequ from "./Protected/BillboardRequ";
import AddDocument from "./Protected/AddDocument";
import { useEffect } from "react";
import Notification from "./Protected/Notification";
import Earnings from "./Protected/Earnings";
import { persistor } from "../data/store";


const Stack = createNativeStackNavigator();

export function Navigation() {
  // show sign in and sign up (protected unprotected screens) when user is not signed
  // in.
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    function checkUserState() {
      console.log(user, token);
    }

    checkUserState();

    // const backAction = () => {
    //   Alert.alert("Hold on!", "Are you sure you want to go back?", [
    //     {
    //       text: "Cancel",
    //       onPress: () => null,
    //       style: "cancel"
    //     },
    //     { text: "YES", onPress: () => BackHandler.exitApp() }
    //   ]);
    //   return true;
    // };

    // const backHandler = BackHandler.addEventListener(
    //   "hardwareBackPress",
    //   backAction
    // );

    // return () => backHandler.remove();
  }, [user, token]);

    
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={user && token ? "Home" : user ? "SignIn": "Onboarding"}
      >
        <Stack.Screen
          name="Landing"
          component={Tabs}
          options={{ headerShown: false }}
        ></Stack.Screen>
        {/* <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen
          options={{ headerShown: false }}
          name="Billboardclicked"
          component={Billboardclicked}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="Earning"
          component={Earnings}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ExploreMore"
          component={ExploreMore}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Billboardclicked2"
          component={Billboardclicked2}
        />
        <Stack.Screen
          options={{}}
          name="Set Advertising Duration"
          component={SetAdvertisingDuration}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Subscription"
          component={Subscription}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Advertisement"
          component={Advertisement}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Maintenance Booking"
          component={MaintenanceBooking}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Booking Form"
          component={BookingForm}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Refferrals"
          component={Refferrals}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Help and Support"
          component={Help}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Contact Us"
          component={ContactUs}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="My Billboards"
          component={MyBillboard}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="My Profile"
          component={MyProfile}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Notification"
          component={Notification}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="EventCalender"
          component={EventCalender}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="BillboardRequ"
          component={BillboardRequ}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="AddDocument"
          component={AddDocument}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Onboarding"
          component={Onboarding}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="CreatAccount"
          component={CreatAccount}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="SignIn"
          component={SignIn}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="About"
          component={About}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="About1"
          component={About1}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
