import {
  StyleSheet,
  Text,
  Platform,
  View,
  StatusBar,
  Keyboard,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  Image,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Datepicker from "react-native-modern-datepicker";
import { BASE_URL } from "../apiConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function EventCalender({ navigation }) {
  const [date, setDate] = useState(true);
  const [error, setError] = useState(null);
  const [events, setEvents] = useState([]);

  function handleChange(propDate) {
    setDate(propDate);
  }

  // events
  useEffect(() => {
    const fetchEvents = async () => {
      const endpointUrl = `${BASE_URL}/events/`;
      try {
        // Retrieve the access token from AsyncStorage
        const storedAccess = await AsyncStorage.getItem("access");

        const response = await fetch(endpointUrl, {
          headers: {
            Authorization: `Bearer ${storedAccess}`, // Use the retrieved token in the request headers
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            const newAccessToken = await refreshToken();
            // Use the new access token to make the request
            const newResponse = await fetch(endpointUrl, {
              headers: {
                Authorization: `Bearer ${newAccessToken}`,
              },
            });

            if (!newResponse.ok) {
              throw new Error("Failed to fetch products after token refresh");
            }

            const newData = await newResponse.json();
            setProducts(newData);
          } else {
            // If the response status is not 401, handle other errors
            throw new Error("Failed to fetch products");
          }
        } else {
          // If the response is ok, set the products
          const data = await response.json();
          setEvents(data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error.message);
      }
    };
    fetchEvents();
  }, []);

  if (error) {
    return <Text>{error}</Text>;
  }

  const EventComponent = ({ events }) => {
    return (
      <Pressable
        onPress={() => navigation.navigate("Eventclicked", { data: events })}
      >
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Image
            borderRadius={20}
            resizeMode="contain"
            source={{ uri: events.image }}
            style={styles.billboardImage}
          />
        </View>

        {/* <View style={{
                    width: '90%',
                    marginLeft: 20,
                }}>
                    <Text style={{ fontWeight: '500', fontSize: 16, marginTop: 10, lineHeight: 19.36, color: '#383838' }}>Description</Text>
                    <Text style={{ fontWeight: '400', fontSize: 14, marginTop: 10, lineHeight: 16.94, color: '#383838' }}>{events.description}</Text>
                </View> */}

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

          <View style={{ flexDirection: "column", width: "90%" }}>
            <Text style={styles.Text1}>{events.name}</Text>
            <View style={{ flexDirection: "row" }}>
              <MaterialCommunityIcons
                style={{}}
                name="map-marker"
                size={20}
                color="#383838"
              />
              <Text style={styles.Text2}>{events.location}</Text>
            </View>
            <View style={{ flexDirection: "row", gap: 2 }}>
              {/* <Text>10th-20th September, 2023, 5PM CAT</Text> */}
              {/* <Text>{readableTime}</Text> */}
              <Text style={styles.Text2}>{events.end_time}</Text>
              {/* <Text>{data.start_date}</Text> */}
              {/* <Text>{data.end_date}</Text> */}
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ marginBottom: 5 }}
        horizontal={false}
        showsVerticalScrollIndicator={false}
      >
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
            Event Calender
          </Text>
        </View>

        <View>
          <View style={styles.CalenderView}>
            <Datepicker
              mode="calendar"
              selected={date}
              onDateChange={handleChange}
            />
          </View>
        </View>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "400",
            lineHeight: 19.36,
            paddingLeft: 16,
            paddingTop: 10,
          }}
        >
          Upcoming Events in December
        </Text>

        <View>
          {events &&
            events.map((events, index) => (
              <EventComponent key={index} events={events} />
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#FFFFFF",
  },
  CalenderView: {
    width: "90%",
    borderRadius: 20,
    margin: 20,
    backgroundColor: "white",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 8.25,
    shadowRadius: 4,
    elevation: 5,
  },
  billboardImage: {
    width: "90%",
    height: 174,
    // borderRadius: 20
  },
  Text1: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 19.36,
  },
  Text2: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 14.52,
  },
});
