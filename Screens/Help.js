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
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Help({ navigation }) {
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
            Help and Support
          </Text>
        </View>
        <View style={{ gap: 32 }}>
          <Pressable
            onPress={() => {
              navigation.navigate("Contact Us");
            }}
            style={{
              flexDirection: "row",
              marginTop: 10,
              marginLeft: 16,
              gap: 24,
            }}
          >
            <Image
              resizeMode="contain"
              style={{ width: "6.5%", height: 24 }}
              source={require("../assets/Phone.png")}
            />
            <Text
              style={{ fontSize: 16, fontWeight: "500", alignSelf: "center" }}
            >
              Contact Us
            </Text>
          </Pressable>
          <Pressable style={{ flexDirection: "row", marginLeft: 16, gap: 24 }}>
            <Image
              resizeMode="contain"
              style={{ width: "6.5%", height: 24 }}
              source={require("../assets/About.png")}
            />
            <Text
              style={{ fontSize: 16, fontWeight: "500", alignSelf: "center" }}
            >
              Terms and Privacy Policy
            </Text>
          </Pressable>
          <Pressable style={{ flexDirection: "row", marginLeft: 16, gap: 24 }}>
            <Image
              resizeMode="contain"
              style={{ width: "6.5%", height: 24 }}
              source={require("../assets/About.png")}
            />
            <Text
              style={{ fontSize: 16, fontWeight: "500", alignSelf: "center" }}
            >
              About
            </Text>
          </Pressable>
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
