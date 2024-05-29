import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Platform,
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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MaintenanceBooking({ navigation }) {
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
            Maintenance Booking
          </Text>
        </View>
        <Text
          style={{
            paddingTop: 10,
            fontWeight: "500",
            marginLeft: 16,
            fontSize: 18,
          }}
        >
          Additional Information
        </Text>
        <View
          style={{
            marginTop: 10,
            width: "85%",
            height: 76,
            marginLeft: 16,
            flexDirection: "row",
          }}
        >
          <Text style={{ fontWeight: "500", fontSize: 16 }}>
            Emergency Maintenance:
            <Text style={{ fontWeight: "400", fontSize: 16 }}>
              {" "}
              If you require emergency maintencance, please call our support
              team directly at (Customer Support Number)
            </Text>
          </Text>
        </View>

        <View
          style={{
            width: "90%",
            marginTop: 10,
            borderWidth: 1,
            borderColor: "#66B3FF",
            alignSelf: "center",
          }}
        ></View>

        <View
          style={{
            marginTop: 20,
            width: "85%",
            height: 76,
            marginLeft: 16,
            flexDirection: "row",
          }}
        >
          <Text style={{ fontWeight: "500", fontSize: 16 }}>
            Billing:
            <Text style={{ fontWeight: "400", fontSize: 16 }}>
              {" "}
              Maintenance fees may apply based on the type of maintenance
              needed. You will be notified of any charges before work begins
            </Text>
          </Text>
        </View>

        <View
          style={{
            width: "90%",
            marginTop: 10,
            borderWidth: 1,
            borderColor: "#66B3FF",
            alignSelf: "center",
          }}
        ></View>

        <View
          style={{
            marginTop: 20,
            width: "85%",
            height: 76,
            marginLeft: 16,
            flexDirection: "row",
          }}
        >
          <Text style={{ fontWeight: "500", fontSize: 16 }}>
            Cancel or Reschedule:
            <Text style={{ fontWeight: "400", fontSize: 16 }}>
              {" "}
              If you need to cancel or reschedule your maintenance appointment,
              please contact our support team at (Customer Support Email)
            </Text>
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Booking Form");
          }}
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
            Proceed to Booking
          </Text>
        </TouchableOpacity>
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
