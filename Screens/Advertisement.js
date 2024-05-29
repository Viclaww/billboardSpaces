import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
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

export default function Advertisement({ navigation }) {
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
            Advertisement
          </Text>
        </View>
        <TouchableOpacity
          style={{
            width: "90%",
            height: 76,
            borderWidth: 1,
            alignSelf: "center",
            flexDirection: "row",
            borderColor: "#0080FE",
            borderRadius: 10,
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <Image
            style={{ alignSelf: "center" }}
            source={require("../assets/Advert1.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "90%",
            height: 76,
            borderWidth: 1,
            alignSelf: "center",
            flexDirection: "row",
            borderColor: "#0080FE",
            borderRadius: 10,
            justifyContent: "center",
            marginTop: 30,
          }}
        >
          <Image
            style={{ alignSelf: "center" }}
            source={require("../assets/advert2.png")}
          />
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
