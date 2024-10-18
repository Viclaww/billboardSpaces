import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  TextInput,
  SafeAreaView,
  Image,
  StatusBar,
  Pressable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  KeyboardAvoidingView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { refreshToken } from "../utils/authUtils";
import { BASE_URL } from "../../apiConfig";
import { Ionicons } from "@expo/vector-icons";

export default function BookingForm({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [describtion, setDescribtion] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("");
  const [preTime, setPreTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleBooking = async ({ route }) => {
    const endpointUrl = `${BASE_URL}/maintenance/`;
    try {
      const storedAccess = await AsyncStorage.getItem("access");
      setIsLoading(true);
      const response = await fetch(endpointUrl, {
        method: "POST", // Changed method to POST
        headers: {
          Authorization: `Bearer ${storedAccess}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone_number: phoneNumber,
          preferred_date: date,
          description: describtion,
          location: fullName,
          preferred_time: preTime,
          email: email,
        }),
      });

      if (response.ok) {
        navigation.navigate("Home");
      } else {
        console.error("POST request failed:", response.status);
        alert("Failed to create booking");
      }
    } catch (error) {
      console.error("An error occurred during POST request:", error.message);
      alert("Failed to create booking");

      // Log response if available
      if (error.response) {
        try {
          const errorResponseData = await error.response.json();
          console.log("Error response data:", errorResponseData);
        } catch (jsonError) {
          console.error(
            "Failed to parse error response as JSON:",
            jsonError.message
          );
        }
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={styles.container} behavior="height" enabled>
        <ScrollView>
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
              Booking Form
            </Text>
          </View>

          <View
            style={{
              paddingLeft: 16,
            }}
          >
            <Text style={styles.Text}>Billboard Location</Text>
            <View>
              <TouchableOpacity>
                <View style={styles.rectangleView2}>
                  <TextInput
                    style={styles.fullName}
                    placeholder="Enter location of Billboard"
                    value={fullName}
                    onChangeText={(text) => setFullName(text)}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              marginTop: 10,
              paddingLeft: 16,
            }}
          >
            <Text style={styles.Text}>Description of Maintenance Request</Text>
            <View style={styles.rectangleView}>
              <TextInput
                style={styles.Caption}
                placeholder="Describe the type of Maintenance you want"
                value={describtion}
                onChangeText={(text) => setDescribtion(text)}
              />
            </View>
          </View>

          <View
            style={{
              marginTop: 10,
              paddingLeft: 16,
            }}
          >
            <Text style={styles.Text}>Preferred Date</Text>
            <View>
              <TouchableOpacity>
                <View style={styles.rectangleView2}>
                  <TextInput
                    style={styles.fullName}
                    placeholder="DD/MM/YY"
                    value={date}
                    onChangeText={(text) => setDate(text)}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              marginTop: 10,
              paddingLeft: 16,
            }}
          >
            <Text style={styles.Text}>Preferred Time</Text>
            <View>
              <TouchableOpacity>
                <View style={styles.rectangleView2}>
                  <TextInput
                    style={styles.fullName}
                    placeholder="DD/MM/YY"
                    value={preTime}
                    onChangeText={(text) => setPreTime(text)}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              marginTop: 10,
              paddingLeft: 16,
            }}
          >
            <Text style={styles.Text}>Email</Text>
            <View>
              <TouchableOpacity>
                <View style={styles.rectangleView2}>
                  <TextInput
                    style={styles.fullName}
                    placeholder="Enter Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              marginTop: 10,
              paddingLeft: 16,
            }}
          >
            <Text style={styles.Text}>Phone Number</Text>
            <View>
              <TouchableOpacity>
                <View style={styles.rectangleView2}>
                  <TextInput
                    style={styles.fullName}
                    placeholder="Enter Phone Number"
                    value={phoneNumber}
                    onChangeText={(text) => setPhoneNumber(text)}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            onPress={handleBooking}
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
              Book Maintenance
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  Text: {
    fontWeight: "400",
    top: 10,
    fontSize: 12,
  },
  rectangleView2: {
    borderRadius: 10,
    backgroundColor: "#f5faff",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "rgba(204, 204, 204, 0.25)",
    flexDirection: "row",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    elevation: 2,
    shadowOpacity: 1,
    borderStyle: "solid",
    borderColor: "#f5faff",
    marginTop: "5%",
    borderWidth: 1,
    width: "90%",
    height: 50,
  },
  fullName: {
    padding: 10,
    fontWeight: "400",
    width: "100%",
  },
  Caption: {
    fontSize: 12,
    left: 10,
    fontWeight: "400",
    width: "100%",
    height: "100%",
  },
  rectangleView: {
    borderRadius: 10,
    backgroundColor: "#f5faff",
    shadowColor: "rgba(204, 204, 204, 0.25)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    marginTop: "5%",
    elevation: 2,
    shadowOpacity: 1,
    width: "90%",
    height: 104,
    borderStyle: "solid",
    borderColor: "#f5faff",
    borderWidth: 1,
  },
});
