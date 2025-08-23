// import { authorize } from "react-native-app-auth";
// apiConfig.js
// export const BASE_URL = "https://bb-spaces.onrender.com";
export const BASE_URL = "https://billboardspaces-api-production.up.railway.app";

export const config = {
  issuer: "https://accounts.google.com",
  clientId: "YOUR_GOOGLE_CLIENT_ID",
  redirectUrl: "com.yourapp:/oauth2redirect/google", // Your app's redirect URI
  scopes: ["openid", "profile", "email"],
};
