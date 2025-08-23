import AsyncStorage from "@react-native-async-storage/async-storage";

// Function to refresh the access token using the refresh token
export const refreshToken = async () => {
  try {
    // Retrieve the refresh token from AsyncStorage
    const refresh = await AsyncStorage.getItem("refresh");

    // Make a request to the server to refresh the access token
    const response = await fetch(
      "https://billboardspaces-api-production.up.railway.app/auth/token/refresh/",
      {
        // const response = await fetch('https://bb-spaces.onrender.com/auth/token/refresh/', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh: refresh,
        }),
      }
    );

    if (response.ok) {
      // If token refresh is successful, extract the new access token from response
      const data = await response.json();
      const access = data.access;

      // Update the stored access token in AsyncStorage
      await AsyncStorage.setItem("access", access);

      return access; // Return the new access token
    } else {
      // Handle token refresh error
      throw new Error("Failed to refresh token");
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};
