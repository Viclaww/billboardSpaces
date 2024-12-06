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
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../../../data/dataSlices/user.slice";
import { avatarImage } from "../../../data/util";

export default function More({ navigation }) {
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();
  const handleSubscription = () => {
    navigation.navigate("Subscription");
  };

  const handleEarnings = () => {
    navigation.navigate("Earning");
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
            paddingHorizontal:16
          }}
        >
          <Text
            style={{
              fontWeight: "500",
              fontSize: 28,
              color: "#ffffff",

              marginTop: 40,
            }}
          >
            More Options
          </Text>
          <View
            style={{

              flexDirection: "row",
              marginTop: 30,
              width: "90%",
            }}
          >
            <Image
              resizeMode="cover"
              source={{ uri: user?.image || avatarImage }}
              style={styles.rectangleIcon}
            />
            <View style={{ flexDirection: "column", padding: 5,marginLeft:8 }}>
              <View
                style={{
                  width: "auto",
                  // height: 22,
                  borderRadius: 100,
                  backgroundColor: "#F5B800",
                  paddingVertical:4,
                  paddingHorizontal:15,
                  justifyContent: "center",
                  alignItems:"center"
                }}
              >
                <Text style={{ alignSelf: "center", color: "#ffffff",fontSize:12 }}>
                  {user?.field}
                </Text>
              </View>
              <Text style={{color:"white",fontSize:18,fontWeight:"500",marginTop:5}}>{user?.["display-name"]}</Text>

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
<View style={{paddingHorizontal:16}}>
        <Pressable
          onPress={handleMyBillboard}
          resizeMode="contain"
          style={{ flexDirection: "row", marginTop: 30,  }}
        >
          <Image
            style={{ width: "7%", height: 24 }}
            source={
              user.image ? user.image : require("../../../assets/pin.png")
            }
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
          style={{ flexDirection: "row", marginTop: 30,  }}
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
            width: "100%",
            marginTop: 40,
            borderWidth: 1,
            borderColor: "#0080FE",
            alignSelf: "center",
            opacity:0.7
          }}
        ></View>

        <Pressable
          onPress={handleSubscription}
          style={{ flexDirection: "row", marginTop: 30,    }}
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
          onPress={handleEarnings}
          style={{ flexDirection: "row", marginTop: 30,    }}
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
            Earning
          </Text>
        </Pressable>
        <Pressable
          onPress={handleAdvertisement}
          style={{ flexDirection: "row", marginTop: 30,    }}
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
          style={{ flexDirection: "row", marginTop: 30,    }}
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
          style={{ flexDirection: "row", marginTop: 30,    }}
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
          style={{ flexDirection: "row", marginTop: 30,    }}
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
          style={{ flexDirection: "row", marginTop: 30,    }}
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
            width: "100%",
            marginTop: 40,
            borderWidth: 1,
            borderColor: "#0080FE",
            alignSelf: "center",
            opacity:0.7
          }}
        ></View>

        <Pressable
          onPress={async () => {
            navigation.navigate("SignIn");
            dispatch(setUser(null));
            dispatch(setToken(null));
          }}
          style={{
            flexDirection: "row",
            marginTop: 30,

            marginBottom: 20,
          }}
        >
          <Image
            resizeMode="contain"
            style={{ width: "6%", height: 24 }}
            source={require("../../../assets/logout.png")}
          />
          <Text
            style={{
              paddingLeft: 20,
              fontSize: 16,
              fontWeight: "500",
              alignSelf: "center",
            }}
          >
            Log Out
          </Text>
        </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  rectangleIcon: {
    borderRadius: 203.39,
    height: 87,
    width: 87,
  },
});
