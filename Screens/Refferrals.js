import React, { useState, useEffect } from "react";
import {
  Share,
  StyleSheet,
  Platform,
  Text,
  View,
  ScrollView,
  TextInput,
  SafeAreaView,
  Image,
  StatusBar,
  Pressable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  KeyboardAvoidingView,
  Linking,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const shareOnFacebook = () => {
  // Replace 'your-app-link' with the actual link to your app
  const appLink = "your-app-link";

  let facebookAppURL;

  if (Platform.OS === "ios") {
    facebookAppURL = `fb://share/?link=${encodeURIComponent(appLink)}`;
  } else {
    facebookAppURL = `fb://facewebmodal/f?href=${encodeURIComponent(appLink)}`;
  }

  const fallbackURL = `https://www.facebook.com/sharer/sharer.php?${encodeURIComponent(
    appLink
  )}`;

  Linking.canOpenURL(facebookAppURL)
    .then((supported) => {
      if (supported) {
        Linking.openURL(facebookAppURL);
      } else {
        Linking.openURL(fallbackURL);
      }
    })
    .catch((err) => console.error("An error occurred", err));
};

const shareOnTwitter = () => {
  // Replace 'your-app-link' with the actual link to your app
  const appLink = "your-app-link";

  let twitterAppURL;

  if (Platform.OS === "ios") {
    twitterAppURL = `twitter://post?message=${encodeURIComponent(appLink)}`;
  } else {
    twitterAppURL = `twitter://post?message=${encodeURIComponent(appLink)}`;
  }

  const fallbackURL = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    appLink
  )}`;

  Linking.canOpenURL(twitterAppURL)
    .then((supported) => {
      if (supported) {
        Linking.openURL(twitterAppURL);
      } else {
        Linking.openURL(fallbackURL);
      }
    })
    .catch((err) => console.error("An error occurred", err));
};

const shareOnLinkedIn = () => {
  // Replace 'your-app-link' with the actual link to your app
  const appLink = "your-app-link";

  let linkedInAppURL;

  if (Platform.OS === "ios") {
    linkedInAppURL = `linkedin://shareArticle?mini=true&url=${encodeURIComponent(
      appLink
    )}`;
  } else {
    linkedInAppURL = `linkedin://add?url=${encodeURIComponent(appLink)}`;
  }

  const fallbackURL = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    appLink
  )}`;

  Linking.canOpenURL(linkedInAppURL)
    .then((supported) => {
      if (supported) {
        Linking.openURL(linkedInAppURL);
      } else {
        Linking.openURL(fallbackURL);
      }
    })
    .catch((err) => console.error("An error occurred", err));
};

const shareApp = async () => {
  try {
    await Share.share({
      message: "Check out this cool app!", // Message to be shared
      url: "your-app-link", // Link to your app
      title: "App Name", // Title of the shared message
    });
  } catch (error) {
    console.error("Error sharing:", error.message);
  }
};

export default function Refferrals({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: "row", gap: 16, marginTop: 10 }}>
          <Ionicons
            onPress={() => {
              navigation.goBack();
            }}
            name="arrow-back-outline"
            size={35}
            color="black"
          />
          <Text
            style={{
              fontWeight: "500",
              fontSize: 22,
              lineHeight: 26.63,
              alignSelf: "center",
            }}
          >
            Refferrals
          </Text>
        </View>

        <Image
          resizeMode="contain"
          style={{
            marginTop: 10,
            alignSelf: "center",
            width: "80%",
            height: 261,
          }}
          source={require("../assets/refferrals.png")}
        />

        <TouchableOpacity
          onPress={shareApp}
          style={{
            marginTop: 50,
            width: "90%",
            alignSelf: "center",
            height: 40,
            backgroundColor: "#0080FE",
            justifyContent: "center",
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontWeight: "500",
              fontSize: 14,
              alignSelf: "center",
            }}
          >
            Invite Friends
          </Text>
        </TouchableOpacity>

        <View style={{ paddingTop: "80%" }}>
          <Text
            style={{ fontWeight: "500", fontSize: 14, alignSelf: "center" }}
          >
            Share Via:
          </Text>
          <View style={{ flexDirection: "row", alignSelf: "center", gap: 24 }}>
            <FontAwesome5
              name="facebook"
              size={24}
              color="#0080FE"
              onPress={shareOnFacebook}
            />
            <Pressable onPress={shareOnTwitter} style={{ alignSelf: "center" }}>
              <Image
                style={{ width: 15.2, height: 16, alignSelf: "center" }}
                resizeMode="contain"
                source={require("../assets/X.png")}
              />
            </Pressable>
            <AntDesign
              onPress={shareOnLinkedIn}
              name="linkedin-square"
              size={24}
              color="#0080FE"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
