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
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export default function BillboardRequ({ navigation }) {
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
            Abia State
          </Text>
        </View>

        <Text style={styles.document}>Document</Text>

        <View style={styles.documentcontainer}>
          <TouchableOpacity style={{ flexDirection: "row", gap: 19 }}>
            <Ionicons name="document-text-sharp" size={55} color="#90CAF9" />
            <Text style={styles.documentItem}>Billboard Docs for State</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ flexDirection: "row", gap: 19 }}>
            <Ionicons name="document-text-sharp" size={55} color="#90CAF9" />
            <Text style={styles.documentItem}>
              Understanding Sizes Of Billboards
            </Text>
          </TouchableOpacity>
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
  document: {
    fontWeight: "400",
    fontSize: 22,
    left: 16,
    lineHeight: 26.63,
    color: "#383838",
    marginTop: 20,
  },
  documentcontainer: {
    left: 16,
    marginTop: 30,
    gap: 20,
  },
  documentItem: {
    color: "#1E1E1E",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19.36,
    alignSelf: "center",
  },
});
