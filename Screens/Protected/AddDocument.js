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
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

export default function AddDocument({ navigation }) {
  const [stateModalVisible, setStateModalVisible] = useState(false);
  const [selectedState, setSelectedState] = useState("");

  const openStateModal = () => {
    setStateModalVisible(true);
  };

  const closeStateModal = () => {
    setStateModalVisible(false);
  };

  const handleStateSelection = (text) => {
    setSelectedState(text);
    closeStateModal();
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
            Add Document
          </Text>
        </View>
        <View style={{ left: 16 }}>
          <Text style={styles.PickYourField}>State</Text>
          <View style={{ top: 5 }}>
            <TouchableOpacity onPress={openStateModal}>
              <View style={styles.rectangleView2}>
                <Text style={{ padding: 10 }}>
                  {selectedState !== "" ? selectedState : "Enter state"}
                </Text>
                <View style={styles.arrowContainer}>
                  <AntDesign
                    style={styles.arrow}
                    name="down"
                    size={20}
                    color="black"
                  />
                </View>
              </View>
            </TouchableOpacity>
            <Modal
              visible={stateModalVisible}
              transparent={true}
              animationType="slide"
            >
              <Pressable
                style={styles.modalContainer2}
                onPress={closeStateModal}
              >
                <View style={styles.modalContent2}>
                  <ScrollView>
                    <TouchableOpacity
                      onPress={() => handleStateSelection("abia")}
                    >
                      <Text style={styles.billboardOwner}>Abia</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleStateSelection("adamawa")}
                    >
                      <Text style={styles.billboardOwner}>Adamawa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleStateSelection("akwaibom")}
                    >
                      <Text style={styles.billboardOwner}>Akwaibom</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleStateSelection("anambra")}
                    >
                      <Text style={styles.billboardOwner}>Anambra</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleStateSelection("bauchi")}
                    >
                      <Text style={styles.billboardOwner}>Bauchi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleStateSelection("benue")}
                    >
                      <Text style={styles.billboardOwner}>Benue</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleStateSelection("borno")}
                    >
                      <Text style={styles.billboardOwner}>Borno</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleStateSelection("cross River")}
                    >
                      <Text style={styles.billboardOwner}>Cross River</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleStateSelection("delta")}
                    >
                      <Text style={styles.billboardOwner}>Delta</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleStateSelection("ebonyi")}
                    >
                      <Text style={styles.billboardOwner}>Ebonyi</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleStateSelection("edo")}
                    >
                      <Text style={styles.billboardOwner}>Edo</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleStateSelection("ekiti")}
                    >
                      <Text style={styles.billboardOwner}>Ekiti</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleStateSelection("enugu")}
                    >
                      <Text style={styles.billboardOwner}>Enugu</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleStateSelection("gombe")}
                    >
                      <Text style={styles.billboardOwner}>Gombe</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleStateSelection("imo")}
                    >
                      <Text style={styles.billboardOwner}>Imo</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleStateSelection("jigawa")}
                    >
                      <Text style={styles.billboardOwner}>Jigawa</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleStateSelection("kaduna")}
                    >
                      <Text style={styles.billboardOwner}>Kaduna</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleStateSelection("kano")}
                    >
                      <Text style={styles.billboardOwner}>Kano</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleStateSelection("katsina")}
                    >
                      <Text style={styles.billboardOwner}>Katsina</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleStateSelection("kebbi")}
                    >
                      <Text style={styles.billboardOwner}>Kebbi</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleStateSelection("kogi")}
                    >
                      <Text style={styles.billboardOwner}>Kogi</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleStateSelection("kwara")}
                    >
                      <Text style={styles.billboardOwner}>Kwara</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleStateSelection("lagos")}
                    >
                      <Text style={styles.billboardOwner}>Lagos</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleStateSelection("nasarawa")}
                    >
                      <Text style={styles.billboardOwner}>Nasarawa</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleStateSelection("niger")}
                    >
                      <Text style={styles.billboardOwner}>Niger</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleStateSelection("ogun")}
                    >
                      <Text style={styles.billboardOwner}>Ogun</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleStateSelection("ondo")}
                    >
                      <Text style={styles.billboardOwner}>Ondo</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleStateSelection("osun")}
                    >
                      <Text style={styles.billboardOwner}>Osun</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleStateSelection("oyo")}
                    >
                      <Text style={styles.billboardOwner}>Oyo</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleStateSelection("plateau")}
                    >
                      <Text style={styles.billboardOwner}>Plateau</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleStateSelection("rivers")}
                    >
                      <Text style={styles.billboardOwner}>Rivers</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleStateSelection("sokoto")}
                    >
                      <Text style={styles.billboardOwner}>Sokoto</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleStateSelection("taraba")}
                    >
                      <Text style={styles.billboardOwner}>Taraba</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleStateSelection("yobe")}
                    >
                      <Text style={styles.billboardOwner}>Yobe</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleStateSelection("zamfara")}
                    >
                      <Text style={styles.billboardOwner}>Zamfara</Text>
                    </TouchableOpacity>
                  </ScrollView>
                </View>
              </Pressable>
            </Modal>
          </View>
          <Text style={styles.Regu}>
            Enter Billboard Requirement Information
          </Text>
          <View style={{ flexDirection: "row", marginTop: 20, gap: 18 }}>
            <TouchableOpacity
              style={{ gap: 8, flexDirection: "row", alignSelf: "center" }}
            >
              <FontAwesome name="file-pdf-o" size={20} color="#0080FE" />
              <Text style={styles.text}>Add Document</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ gap: 8, flexDirection: "row", alignSelf: "center" }}
            >
              <FontAwesome5 name="link" size={20} color="#0080FE" />
              <Text style={styles.text}>Add Link</Text>
            </TouchableOpacity>
          </View>
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
  PickYourField: {
    marginTop: 20,
    fontWeight: "400",
    lineHeight: 14.52,
    fontSize: 12,
  },
  Regu: {
    marginTop: 20,
    fontWeight: "400",
    lineHeight: 14.52,
    fontSize: 12,
  },
  billboardOwner: {
    fontSize: 14,
    fontWeight: "500",
    color: "#383838",
    // paddingTop: 5,
    padding: 10,
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
    borderColor: "#0080FE",
    marginTop: "2%",
    borderWidth: 1,
    width: "90%",
    height: 50,
  },
  arrowContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  arrow: {
    marginRight: 5,
  },
  modalContainer2: {
    flex: 1,
    alignItems: "center",
  },
  modalContent2: {
    marginTop: "35%",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: "#f5faff",
    padding: 15,
    width: "90%",
    height: "23%",
    marginRight: 5,
  },
  text: {
    color: "#0080FE",
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 14.52,
    alignSelf: "center",
  },
});
