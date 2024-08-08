// this page includes code to render a navigation for protected and unprotected screens
// and then uses a conditional based on users logged in state to determine the app mode.

import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import BottomTabNavigator from "./Protected/Landing";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import Onboarding from "./UnProtected/Onboarding";
import CreatAccount from "./UnProtected/CreatAccount";
import SignIn from "./UnProtected/SignIn";
import About from "./UnProtected/About";
import About1 from "./UnProtected/About1";
import Tabs from "./utils/Tabs";
import HomeScreen from "./Protected/Home/HomeScreen";
const Stack = createNativeStackNavigator();
export function Protected() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Landing"
        component={Tabs}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
export function Unprotected() {
  return (
    <Stack.Navigator>
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
  );
}
export function Navigation() {
  // show sign in and sign up (protected unprotected screens) when user is not signed
  // in.
  const user = useSelector((state) => state.user.user);

  return (
    <NavigationContainer>
      {user ? <Protected></Protected> : <Unprotected></Unprotected>}
    </NavigationContainer>
  );
}
