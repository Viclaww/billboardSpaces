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
  Linking,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export default function ContactUs({ navigation }) {
  const phoneNumber = "+2348950382728"; // Replace this with your desired phone number
  const emailAddress = "billboardspacesng@gmail.com"; // Replace this with your desired email address

  const openPhoneBook = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const openMailApp = () => {
    Linking.openURL(`mailto:${emailAddress}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ marginBottom: 5 }}
        horizontal={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flexDirection: "row", gap: 16, marginTop: 10,marginLeft:10 }}>
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
            Contact Us
          </Text>
        </View>
        <View
          style={{
            alignSelf: "center",
            // width: "80%",
            justifyContent:"center",
            // height: 57,
            marginTop: 10,
            padding:15
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "400",
              textAlign: "justify",
              lineHeight: 19,
            }}
          >
            You can reach out to us via any of our Platforms. our Team will
            respond to you as soon as Possible
          </Text>
        </View>

        <Text
          style={{
            fontWeight: "400",
            fontSize: 22,
            textAlign: "justify",
            lineHeight: 26.63,
            alignSelf: "center",
            marginTop: 30,
          }}
        >
          Customer Support
        </Text>

        <Feather
          onPress={openPhoneBook}
          style={{ alignSelf: "center", marginTop: 16 }}
          name="phone"
          size={29}
          color="#0080FE"
        />

        <Text
          style={{
            fontWeight: "400",
            fontSize: 16,
            textAlign: "justify",
            lineHeight: 19,
            alignSelf: "center",
            marginTop: 16,
          }}
        >
          08950382728
        </Text>

        <Fontisto
          onPress={openMailApp}
          style={{ alignSelf: "center", marginTop: 16 }}
          name="email"
          size={29}
          color="#0080FE"
        />
        <Text
          style={{
            fontWeight: "400",
            fontSize: 16,
            textAlign: "justify",
            lineHeight: 19,
            alignSelf: "center",
            marginTop: 16,
          }}
        >
          billboardspacesng@gmail.com
        </Text>
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
