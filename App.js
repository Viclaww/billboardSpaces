import React from "react";
import { useEffect } from "react";
import * as Updates from "expo-updates";
import { Alert, StatusBar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import { Navigation } from "./Screens/screenConfig";
import ErrorBoundary from "react-native-error-boundary";
import { store } from "./data/store";
const Stack = createStackNavigator();
function App() {
  StatusBar.setBarStyle("dark-content"); // Change status bar style (light or dark)
  StatusBar.setBackgroundColor("#0080FE"); // Change color as per your requirement
  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        // Show an alert when an update is available
        Alert.alert(
          "Update Available",
          "A new version of the app is available. Would you like to update now?",
          [
            {
              text: "Later",
              onPress: () => console.log("User wants to update later"),
            },
            { text: "Update", onPress: () => handleUpdate() },
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
    <ErrorBoundary>
      <Provider store={store}>
        <Navigation></Navigation>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
