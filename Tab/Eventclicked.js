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
  Modal,
  Pressable,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const Eventclicked = ({ route, navigation }) => {
  const { data } = route.params;

  const handleLogin = () => {
    navigation.navigate("Set Advertising Duration");
  };

  const startTime = data.start_time;

  // Convert start time to a readable format
  let readableTime = "";
  if (startTime) {
    const [hours, minutes, seconds] = startTime.split(":");
    const totalHours = parseInt(hours, 10);
    const days = Math.floor(totalHours / 24);
    const remainingHours = totalHours % 24;

    // Convert hours to 12-hour format with AM/PM
    const formattedHours =
      remainingHours > 12 ? remainingHours - 12 : remainingHours;
    const amPm = remainingHours >= 12 ? "PM" : "AM";

    readableTime = `${formattedHours}:${minutes}:${seconds} ${amPm} on day ${
      days + 1
    }`;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ marginBottom: 5 }}
        horizontal={false}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flexDirection: "row",
            paddingLeft: 16,
            gap: 16,
            marginTop: 10,
          }}
        >
          <AntDesign
            style={{ alignSelf: "center" }}
            onPress={() => navigation.goBack()}
            name="arrowleft"
            size={30}
            color="#383838"
          />
          <Text
            style={{
              alignSelf: "center",
              fontWeight: "500",
              fontSize: 22,
              lineHeight: 26.63,
              color: "#1E1E1E",
            }}
          >
            Event
          </Text>
        </View>

        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Image
            borderRadius={20}
            resizeMode="contain"
            source={{ uri: data.image }}
            style={styles.billboardImage}
          />
        </View>

        <View
          style={{
            width: "90%",
            marginLeft: 20,
          }}
        >
          <Text
            style={{
              fontWeight: "500",
              fontSize: 16,
              marginTop: 10,
              lineHeight: 19.36,
              color: "#383838",
            }}
          >
            Description
          </Text>
          <Text
            style={{
              fontWeight: "400",
              fontSize: 14,
              marginTop: 10,
              lineHeight: 16.94,
              color: "#383838",
            }}
          >
            {data.description}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            width: "90%",
            marginLeft: 20,
            marginTop: 10,
            gap: 16,
          }}
        >
          <View
            style={{
              backgroundColor: "#0080FE",
              width: 7,
              height: 37,
            }}
          ></View>

          <View style={{ flexDirection: "column" }}>
            <View style={{ flexDirection: "row" }}>
              <MaterialCommunityIcons
                style={{}}
                name="map-marker"
                size={20}
                color="#383838"
              />
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "400",
                  lineHeight: 14.52,
                }}
              >
                {data.location}
              </Text>
            </View>
            <View style={{ flexDirection: "row", gap: 2 }}>
              {/* <Text>10th-20th September, 2023, 5PM CAT</Text> */}
              <Text>{readableTime}</Text>
              {/* <Text>{data.end_time}</Text> */}
              {/* <Text>{data.start_date}</Text> */}
              {/* <Text>{data.end_date}</Text> */}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  billboardImage: {
    width: "90%",
    height: 174,
    // borderRadius: 20
  },
  rectangle1: {
    width: "100%",
    height: 40,
    // backgroundColor: "blu/e",
    paddingLeft: 20,
    marginTop: "5%",
    flexDirection: "row",
    alignItems: "center",
  },
  tableContainer: {
    overflow: "hidden",
    paddingLeft: 20,
    marginTop: 10,
  },
  tableText: {
    margin: 10,
  },
  boldText: {
    fontWeight: "bold",
  },
  buttonParent: {
    borderRadius: 10,
    backgroundColor: "#0080fe",
    width: "90%",
    marginTop: "15%",
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  button: {
    fontSize: 14,
    fontWeight: "500",
    color: "#fff",
  },
  cellText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#0080FE",
  },
};

export default Eventclicked;
