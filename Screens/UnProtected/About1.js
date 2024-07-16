import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  Modal,
  StyleSheet,
  Pressable,
  TextInput,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { refreshToken } from "../authUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../apiConfig";

export default function About1({ navigation, route }) {
  const { userId } = route.params;

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [fieldModalVisible, setFieldModalVisible] = useState(false);
  const [stateModalVisible, setStateModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Additional state variables for form data
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [displayName, setDisplayName] = useState("");

  // State variables to track focus
  const [fullNameFocused, setFullNameFocused] = useState(false);
  const [phoneNumberFocused, setPhoneNumberFocused] = useState(false);
  const [displayNameFocused, setDisplayNameFocused] = useState(false);

  const handleDone = async () => {
    const endpointUrl = `${BASE_URL}/auth/update-profile/`;
    try {
      const storedAccess = await AsyncStorage.getItem("access");
      setIsLoading(true);
      const response = await fetch(endpointUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${storedAccess}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_field: selectedText,
          full_name: fullName,
          phone_number: phoneNumber,
          state: selectedState,
          display_name: displayName,
        }),
      });

      if (response.ok) {
        navigation.navigate("Home");
      } else {
        console.error("PUT request failed:", response);
        alert("Failed to update user data");
      }
    } catch (error) {
      console.error("An error occurred during PUT request:", error.message);
      alert("Failed to update user data");

      // Log response if available
      if (error.response) {
        try {
          const errorResponseData = await error.response.json();
          console.log("Error response data:", errorResponseData);
        } catch (jsonError) {
          console.error(
            "Failed to parse error response as JSON:",
            jsonError.message
          );
        }
      }
    }
  };

  const openFieldModal = () => {
    setFieldModalVisible(true);
  };

  const openStateModal = () => {
    setStateModalVisible(true);
  };

  const closeFieldModal = () => {
    setFieldModalVisible(false);
  };

  const closeStateModal = () => {
    setStateModalVisible(false);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleTextSelection = (text) => {
    setSelectedText(text);
    closeFieldModal();
  };
  const handleStateSelection = (text) => {
    setSelectedState(text);
    closeStateModal();
  };

  // Functions to handle input field focus
  const handleFullNameFocus = () => {
    setFullNameFocused(true);
    setPhoneNumberFocused(false);
    setDisplayNameFocused(false);
  };

  const handlePhoneNumberFocus = () => {
    setFullNameFocused(false);
    setPhoneNumberFocused(true);
    setDisplayNameFocused(false);
  };

  const handleDisplayNameFocus = () => {
    setFullNameFocused(false);
    setPhoneNumberFocused(false);
    setDisplayNameFocused(true);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height" enabled>
      <ScrollView>
        <View style={styles.container2}>
          <Text style={styles.tellUsAbout1}> Tell Us About Yourself</Text>
          <Text style={styles.letsMakeYour1}>
            Let's Make Your Experience Better
          </Text>
          <Text style={styles.PickYourField}>Pick your Field</Text>
          <View style={{ top: 5 }}>
            <TouchableOpacity onPress={openFieldModal}>
              <View style={styles.rectangleView1}>
                <Text style={{ padding: 10 }}>
                  {selectedText !== "" ? selectedText : "Select an option"}
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
              visible={fieldModalVisible}
              transparent={true}
              animationType="slide"
            >
              <Pressable
                style={styles.modalContainer}
                onPress={closeFieldModal}
              >
                <View style={styles.modalContent}>
                  <TouchableOpacity
                    onPress={() => handleTextSelection("billboard-owner")}
                  >
                    <Text style={styles.billboardOwner}>Billboard Owner</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleTextSelection("advertising-agent")}
                  >
                    <Text style={styles.billboardOwner}>Advertising Agent</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleTextSelection("state-agent")}
                  >
                    <Text style={styles.billboardOwner}>State Agent</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleTextSelection("business-owner")}
                  >
                    <Text style={styles.billboardOwner}>Business Owner</Text>
                  </TouchableOpacity>
                </View>
              </Pressable>
            </Modal>
          </View>
          <View style={styles.container3}>
            <Text style={styles.PickYourField}>Fullname</Text>
            <View style={{ top: 5 }}>
              <TouchableOpacity>
                <View
                  style={[
                    styles.rectangleView2,
                    fullNameFocused && styles.focusedInput,
                  ]}
                >
                  <TextInput
                    style={styles.fullName}
                    placeholder="Enter Full name"
                    value={fullName}
                    onChangeText={(text) => setFullName(text)}
                    onFocus={handleFullNameFocus}
                    onBlur={() => setFullNameFocused(false)}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.container3}>
            <Text style={styles.PickYourField}>Phone Number</Text>
            <View style={{ top: 5 }}>
              <TouchableOpacity>
                <View
                  style={[
                    styles.rectangleView2,
                    phoneNumberFocused && styles.focusedInput,
                  ]}
                >
                  <TextInput
                    style={styles.fullName}
                    placeholder="Enter Phone number"
                    value={phoneNumber}
                    onChangeText={(text) => setPhoneNumber(text)}
                    onFocus={handlePhoneNumberFocus}
                    onBlur={() => setPhoneNumberFocused(false)}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.PickYourField}>State of residence</Text>
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
          <View style={styles.container3}>
            <Text style={styles.PickYourField}>
              Display name (Business name)
            </Text>
            <View style={{ top: 5 }}>
              <TouchableOpacity>
                <View
                  style={[
                    styles.rectangleView2,
                    displayNameFocused && styles.focusedInput,
                  ]}
                >
                  <TextInput
                    style={styles.fullName}
                    placeholder="Enter display name"
                    value={displayName}
                    onChangeText={(text) => setDisplayName(text)}
                    onFocus={handleDisplayNameFocus}
                    onBlur={() => setDisplayNameFocused(false)}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity onPress={handleDone} style={styles.rectangleView3}>
            {isLoading ? (
              <ActivityIndicator size="small" />
            ) : (
              <Text style={{ color: "white" }}>Done</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container2: {
    marginTop: "10%",
    left: "5%",
  },
  tellUsAbout1: {
    fontSize: 28,
    fontWeight: "500",
    color: "#000",
  },
  letsMakeYour1: {
    fontSize: 16,
    marginTop: 8,
    textAlign: "left",
    color: "#000",
  },
  PickYourField: {
    top: 20,
  },
  rectangleView1: {
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
    // borderColor: "#0080fe",
    marginTop: "5%",
    // borderWidth: 1,
    width: "90%",
    height: 50,
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
    borderColor: "#f5faff",
    marginTop: "5%",
    borderWidth: 1,
    width: "90%",
    height: 50,
  },
  rectangleView3: {
    borderRadius: 10,
    backgroundColor: "#0080fe",
    alignItems: "center",
    justifyContent: "center",
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
    borderColor: "#0080fe",
    marginTop: "30%",
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
  modalContainer: {
    flex: 1,
    alignItems: "center",
  },
  modalContent: {
    marginTop: "49%",
    // marginLeft:'15%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: "#f5faff",
    padding: 15,
    width: "90%",
    height: "23%",
  },
  modalContainer2: {
    flex: 1,
    alignItems: "center",
  },
  modalContent2: {
    marginTop: "117%",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: "#f5faff",
    padding: 15,
    width: "90%",
    height: "23%",
  },
  billboardOwner: {
    fontSize: 14,
    fontWeight: "500",
    color: "#383838",
    // paddingTop: 5,
    padding: 10,
  },
  fullName: {
    padding: 10,
    fontWeight: "400",
    width: "100%",
  },
  focusedInput: {
    borderColor: "#0080fe", // Change border color when focused
    borderWidth: 1,
  },
});
