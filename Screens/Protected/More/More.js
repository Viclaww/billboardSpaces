import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  SafeAreaView,
  Image,
  StatusBar,
  Platform,
  Pressable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  KeyboardAvoidingView,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect from React Navigation
import { useDispatch } from "react-redux";
import { setUser } from "../../../data/dataSlices/user.slice";

export default function More({ navigation }) {
  const dispatch = useDispatch();
  const handleSubscription = () => {
    navigation.navigate("Subscription");
  };

  const handleAdvertisement = () => {
    navigation.navigate("Advertisement");
  };
  const handleMaintenanceBooking = () => {
    navigation.navigate("Maintenance Booking");
  };
  const handleHelp = () => {
    navigation.navigate("Help and Support");
  };
  const handleRefferrals = () => {
    navigation.navigate("Refferrals");
  };
  const handleMyBillboard = () => {
    navigation.navigate("My Billboards");
  };
  const handleEventCalender = () => {
    navigation.navigate("EventCalender");
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            width: "100%",
            height: 267,
            backgroundColor: "#0080FE",
            borderBottomRightRadius: 40,
            borderBottomLeftRadius: 40,
          }}
        >
          <Text
            style={{
              fontWeight: "500",
              fontSize: 28,
              color: "#ffffff",
              marginLeft: 16,
              marginTop: 40,
            }}
          >
            More Options
          </Text>
          <View
            style={{
              marginLeft: 16,
              flexDirection: "row",
              marginTop: 30,
              width: "90%",
            }}
          >
            <Image
              resizeMode="cover"
              source={require("../../../assets/profilePicture.jpeg")}
              style={styles.rectangleIcon}
            />
            <View style={{ flexDirection: "column", padding: 5 }}>
              <View
                style={{
                  width: 105,
                  height: 22,
                  borderRadius: 10,
                  backgroundColor: "#F5B800",
                  justifyContent: "center",
                }}
              >
                <Text style={{ alignSelf: "center", color: "#ffffff" }}>
                  Advertising Agent
                </Text>
              </View>
              <Text
                style={{
                  fontWeight: "500",
                  fontSize: 14,
                  color: "#ffffff",
                  alignSelf: "center",
                  marginTop: 10,
                }}
              >
                Apple Advertisers
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("My Profile");
                }}
                style={{
                  width: 100,
                  height: 40,
                  borderRadius: 10,
                  borderWidth: 1,
                  justifyContent: "center",
                  marginTop: 10,
                  borderColor: "#ffffff",
                }}
              >
                <Text
                  style={{
                    fontWeight: "500",
                    fontSize: 14,
                    color: "#ffffff",
                    alignSelf: "center",
                  }}
                >
                  Edit Profile
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Pressable
          onPress={handleMyBillboard}
          resizeMode="contain"
          style={{ flexDirection: "row", marginTop: 30, marginLeft: 16 }}
        >
          <Image
            style={{ width: "7%", height: 24 }}
            source={require("../../../assets/pin.png")}
          />
          <Text
            style={{
              paddingLeft: 20,
              fontSize: 16,
              fontWeight: "500",
              alignSelf: "center",
            }}
          >
            My Billboards
          </Text>
        </Pressable>
        <Pressable
          onPress={handleEventCalender}
          style={{ flexDirection: "row", marginTop: 30, marginLeft: 16 }}
        >
          <Image
            resizeMode="contain"
            style={{ width: "6.5%", height: 24 }}
            source={require("../../../assets/event.png")}
          />
          <Text
            style={{
              paddingLeft: 20,
              fontSize: 16,
              fontWeight: "500",
              alignSelf: "center",
            }}
          >
            Event Calender
          </Text>
        </Pressable>

        <View
          style={{
            width: "90%",
            marginTop: 40,
            borderWidth: 1,
            borderColor: "#0080FE",
            alignSelf: "center",
          }}
        ></View>

        <Pressable
          onPress={handleSubscription}
          style={{ flexDirection: "row", marginTop: 30, marginLeft: 16 }}
        >
          <Image
            resizeMode="contain"
            style={{ width: "7.9%", height: 24 }}
            source={require("../../../assets/subscribtion.png")}
          />
          <Text
            style={{
              paddingLeft: 20,
              fontSize: 16,
              fontWeight: "500",
              alignSelf: "center",
            }}
          >
            Subscription
          </Text>
        </Pressable>
        <Pressable
          onPress={handleAdvertisement}
          style={{ flexDirection: "row", marginTop: 30, marginLeft: 16 }}
        >
          <Image
            resizeMode="contain"
            style={{ width: "8.5%", height: 24 }}
            source={require("../../../assets/advert.png")}
          />
          <Text
            style={{
              paddingLeft: 20,
              fontSize: 16,
              fontWeight: "500",
              alignSelf: "center",
            }}
          >
            Advertisement
          </Text>
        </Pressable>
        <Pressable
          onPress={handleMaintenanceBooking}
          style={{ flexDirection: "row", marginTop: 30, marginLeft: 16 }}
        >
          <Image
            resizeMode="contain"
            style={{ width: "6.5%", height: 24 }}
            source={require("../../../assets/maintanance.png")}
          />
          <Text
            style={{
              paddingLeft: 20,
              fontSize: 16,
              fontWeight: "500",
              alignSelf: "center",
            }}
          >
            Maintenance Booking
          </Text>
        </Pressable>
        <Pressable
          style={{ flexDirection: "row", marginTop: 30, marginLeft: 16 }}
        >
          <Image
            resizeMode="contain"
            style={{ width: "6.5%", height: 24 }}
            source={require("../../../assets/analys.png")}
          />
          <Text
            style={{
              paddingLeft: 20,
              fontSize: 16,
              fontWeight: "500",
              alignSelf: "center",
            }}
          >
            Analytics and Reporting
          </Text>
        </Pressable>
        <Pressable
          onPress={handleRefferrals}
          style={{ flexDirection: "row", marginTop: 30, marginLeft: 16 }}
        >
          <Image
            resizeMode="contain"
            style={{ width: "6.5%", height: 24 }}
            source={require("../../../assets/referal.png")}
          />
          <Text
            style={{
              paddingLeft: 20,
              fontSize: 16,
              fontWeight: "500",
              alignSelf: "center",
            }}
          >
            Referrals
          </Text>
        </Pressable>
        <Pressable
          onPress={handleHelp}
          style={{ flexDirection: "row", marginTop: 30, marginLeft: 16 }}
        >
          <Image
            resizeMode="contain"
            style={{ width: "6.5%", height: 24 }}
            source={require("../../../assets/help.png")}
          />
          <Text
            style={{
              paddingLeft: 20,
              fontSize: 16,
              fontWeight: "500",
              alignSelf: "center",
            }}
          >
            Help and Support
          </Text>
        </Pressable>

        <View
          style={{
            width: "90%",
            marginTop: 40,
            borderWidth: 1,
            borderColor: "#0080FE",
            alignSelf: "center",
          }}
        ></View>

        <View
          style={{
            flexDirection: "row",
            marginTop: 30,
            marginLeft: 16,
            marginBottom: 20,
          }}
        >
          <Image
            resizeMode="contain"
            style={{ width: "6%", height: 24 }}
            source={require("../../../assets/logout.png")}
          />
          <Text
            onPress={() => {
              dispatch(setUser(null));
              // navigation.navigate("Login");
            }}
            style={{
              paddingLeft: 20,
              fontSize: 16,
              fontWeight: "500",
              alignSelf: "center",
            }}
          >
            Log Out
          </Text>
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
  rectangleIcon: {
    borderRadius: 203.39,
    height: 87,
    width: "25%",
  },
});
