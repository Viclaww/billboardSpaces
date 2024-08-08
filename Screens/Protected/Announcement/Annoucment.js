import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Platform,
  Text,
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
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { refreshToken } from "../../utils/authUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../../apiConfig";

export default function Annoucment({ navigation }) {
  const [showBillboardDetails, setShowBillboardDetails] = useState(false);
  const [showAdDetails, setShowAdDetails] = useState(true);
  const [showForumDetails, setShowForumDetails] = useState(false);
  const [activeButton, setActiveButton] = useState("ad");
  const [activeText, setActiveText] = useState("ad");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalCaption, setModalCaption] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const [notifyModalVisible, setNotifyModalVisible] = useState(false);

  const openNotifyModal = () => {
    setNotifyModalVisible(true);
  };

  const closeNotifyModal = () => {
    setNotifyModalVisible(false);
  };

  const toggleAdDetails = () => {
    setShowAdDetails(true);
    setShowBillboardDetails(false); // Hide Billboard details when Ad details are shown
    setShowForumDetails(false); // Hide Forum details when Ad details are shown
    setActiveButton("ad"); // Set active button state to 'ad' when Ad button is pressed
    setActiveText("ad");
  };

  const toggleBillboardDetails = () => {
    setShowBillboardDetails(true);
    setShowAdDetails(false); // Hide Ad details when Billboard details are shown
    setShowForumDetails(false); // Hide Forum details when Billboard details are shown
    setActiveButton("billboard"); // Set active button state to 'billboard' when Billboard button is pressed
    setActiveText("billboard");
  };

  const toggleForumDetails = () => {
    setShowForumDetails(true);
    setShowAdDetails(false); // Hide Ad details when Forum details are shown
    setShowBillboardDetails(false); // Hide Billboard details when Forum details are shown
    setActiveButton("forum"); // Set active button state to 'forum' when Forum button is pressed
    setActiveText("forum");
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const openCameraPickerAsync = async (isCamera) => {
    let permissionResult;
    if (isCamera) {
      permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    } else {
      permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
    }

    if (!permissionResult.granted) {
      Alert.alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult;
    if (isCamera) {
      pickerResult = await ImagePicker.launchCameraAsync();
    } else {
      pickerResult = await ImagePicker.launchImageLibraryAsync();
    }

    if (!pickerResult.cancelled && pickerResult.assets.length > 0) {
      const selectedUri = pickerResult.assets[0].uri;
      setSelectedImage(selectedUri);
    }
  };

  const openImagePickerAsync = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission to access camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log("Picker Result:", pickerResult); // Log picker result for debugging
    if (!pickerResult.cancelled && pickerResult.assets.length > 0) {
      const selectedUri = pickerResult.assets[0].uri;
      console.log("Selected Image URI:", selectedUri); // Log selected image URI for debugging
      setSelectedImage(selectedUri);
    }
  };

  console.log("Selected image:", selectedImage); // Log selected image state for debugging

  const [post, setPost] = useState([]);
  const [error, setError] = useState(null);

  const Post = ({ post }) => {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.rectangle1}>
          <TouchableOpacity>
            <Image
              style={{ width: 40, height: 40, borderRadius: 100 }}
              source={require("../../../assets/profilePicture.jpeg")}
            />
          </TouchableOpacity>
          <Text style={{ fontSize: 16, marginLeft: 5, fontWeight: "500" }}>
            {post.user.business_name}
          </Text>
        </View>
        <Text
          style={{
            fontWeight: "400",
            fontSize: 16,
            paddingLeft: 16,
            marginTop: 5,
          }}
        >
          {post.caption}
        </Text>
        <Image
          resizeMode="cover"
          style={{
            marginLeft: 16,
            marginTop: 20,
            width: "90%",
            height: 228,
            borderRadius: 20,
          }}
          source={{ uri: post.image }}
        />
      </View>
    );
  };
  const BillboardRequ = () => {
    navigation.navigate("BillboardRequ");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ marginBottom: 5 }}
        horizontal={false}
        showsVerticalScrollIndicator={false}
      >
        <Text style={{ fontSize: 28, fontWeight: "500", marginLeft: 16 }}>
          Community
        </Text>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ paddingTop: 10 }}
        >
          <TouchableOpacity
            onPress={toggleAdDetails}
            style={[
              styles.buttonParent,
              activeButton === "ad" ? styles.activeButton : null,
            ]}
          >
            <Text
              style={[
                styles.button,
                activeText === "ad" ? styles.activeText : null,
              ]}
            >
              Advertisements
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggleBillboardDetails}
            style={[
              styles.buttonParent2,
              activeButton === "billboard" ? styles.activeButton : null,
            ]}
          >
            <Text
              style={[
                styles.button,
                activeText === "billboard" ? styles.activeText : null,
              ]}
            >
              Billboard Requirements
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={toggleForumDetails} style={[styles.buttonParent3, activeButton === 'forum' ? styles.activeButton : null]}>
            <Text style={[styles.button, activeText === 'forum' ? styles.activeText : null]}>Forums</Text>
          </TouchableOpacity> */}
        </ScrollView>

        {showAdDetails && (
          <View>
            <View style={styles.rectangle1}>
              <TouchableOpacity>
                <Image
                  style={{ width: 40, height: 40, borderRadius: 100 }}
                  source={require("../../../assets/profilePicture.jpeg")}
                />
              </TouchableOpacity>
              <View
                style={{ flex: 1, alignItems: "flex-end", paddingRight: 10 }}
              >
                <TouchableOpacity
                  onPress={openModal}
                  style={{
                    justifyContent: "center",
                    width: "91.5%",
                    height: 40,
                  }}
                >
                  <Image
                    style={{}}
                    source={require("../../../assets/announcement.png")}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Text
              style={{
                paddingTop: 10,
                fontSize: 22,
                fontWeight: "400",
                marginLeft: 16,
              }}
            >
              Popular Advert
            </Text>

            <View style={{}}>
              <View style={{}}>
                {post &&
                  post.map((post, index) => <Post key={index} post={post} />)}
              </View>
            </View>

            <Modal
              visible={modalVisible}
              transparent={true}
              animationType="fade"
            >
              <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
              >
                <Pressable style={styles.modalContainer} onPress={closeModal}>
                  <TouchableWithoutFeedback
                    onPress={() => console.log("Tapped inside modal")}
                  >
                    <View style={styles.modalContent}>
                      <ScrollView showsVerticalScrollIndicator={false}>
                        <Text
                          style={{
                            marginLeft: 16,
                            fontSize: 22,
                            fontWeight: "500",
                          }}
                        >
                          Post Advertisement
                        </Text>
                        <View style={styles.rectangleView2}>
                          <TextInput
                            style={styles.Caption}
                            placeholder="Write Caption"
                            value={modalCaption}
                            onChangeText={(text) => setModalCaption(text)}
                          />
                        </View>

                        <View style={{ flexDirection: "row", marginTop: "5%" }}>
                          <TouchableOpacity
                            onPress={openImagePickerAsync}
                            style={{ marginLeft: 16, width: "32%" }}
                          >
                            <Image source={require("../../../assets/addImage.png")} />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => openCameraPickerAsync(true)}
                            style={{ marginLeft: 16, width: "32%" }}
                          >
                            <Image source={require("../../../assets/takePic.png")} />
                          </TouchableOpacity>
                        </View>

                        <Pressable>
                          {selectedImage && (
                            <Image
                              source={{ uri: selectedImage }}
                              style={{
                                width: "90%",
                                height: 250,
                                borderRadius: 17.72,
                                marginTop: 10,
                                marginLeft: 16,
                              }}
                            />
                          )}
                        </Pressable>

                        <TouchableOpacity
                         
                          style={{
                            marginTop: 20,
                            backgroundColor: "#0080FE",
                            width: "60%",
                            height: 48,
                            borderRadius: 10,
                            alignSelf: "center",
                            justifyContent: "center",
                            marginBottom: 10,
                          }}
                        >
                          <Text style={{ color: "#ffff", alignSelf: "center" }}>
                            Post Advertisement
                          </Text>
                        </TouchableOpacity>
                      </ScrollView>
                    </View>
                  </TouchableWithoutFeedback>
                </Pressable>
              </KeyboardAvoidingView>
            </Modal>
          </View>
        )}

        {showBillboardDetails && (
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={styles.searchContainer}>
                <TextInput
                  style={styles.searchText}
                  placeholder="Search State"
                  // value={password}
                  // onChangeText={text => setPassword(text)}
                />
                <TouchableOpacity style={styles.passwordToggle}>
                  <AntDesign name="search1" size={24} color="#CCCCCC" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={{ paddingRight: 10, marginTop: 12 }}>
                <MaterialCommunityIcons
                  onPress={openNotifyModal}
                  name="dots-vertical"
                  size={24}
                  color="#383838"
                />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "500",
                marginLeft: 16,
                marginTop: "20%",
              }}
            >
              Available States
            </Text>
            <Text onPress={BillboardRequ} style={styles.state}>
              Abia
            </Text>
            <Text style={styles.state}>Adamawa</Text>
            <Text style={styles.state}>Akwa Ibom</Text>
            <Text style={styles.state}>Anambra</Text>
            <Text style={styles.state}>Bauchi</Text>
            <Text style={styles.state}>Bayelsa</Text>
            <Text style={styles.state}>Benue</Text>
            <Text style={styles.state}>Borno</Text>
            <Text style={styles.state}>Cross River</Text>
            <Text style={styles.state}>Delta</Text>
            <Text style={styles.state}>Ebonyi</Text>
            <Text style={styles.state}>Edo</Text>
            <Text style={styles.state}>Ekiti</Text>
            <Text style={styles.state}>Enugu</Text>
            <Text style={styles.state}>Gombe</Text>
            <Text style={styles.state}>Imo</Text>
            <Text style={styles.state}>Jigawa</Text>
            <Text style={styles.state}>Kaduna</Text>
            <Text style={styles.state}>Kano</Text>
            <Text style={styles.state}>Katsina</Text>
            <Text style={styles.state}>Kebbi</Text>
            <Text style={styles.state}>Kogi</Text>
            <Text style={styles.state}>Kwara</Text>
            <Text style={styles.state}>Lagos</Text>
            <Text style={styles.state}>Nasarawa</Text>
            <Text style={styles.state}>Niger</Text>
            <Text style={styles.state}>Ogun</Text>
            <Text style={styles.state}>Ondo</Text>
            <Text style={styles.state}>Osun</Text>
            <Text style={styles.state}>Oyo</Text>
            <Text style={styles.state}>Plateau</Text>
            <Text style={styles.state}>Rivers</Text>
            <Text style={styles.state}>Sokoto</Text>
            <Text style={styles.state}>Taraba</Text>
            <Text style={styles.state}>Yobe</Text>
            <Text style={styles.state}>Zamfara</Text>

            <Modal
              visible={notifyModalVisible}
              transparent={true}
              animationType="fade"
            >
              <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
              >
                <Pressable
                  style={styles.notifyModalContainer}
                  onPress={closeNotifyModal}
                >
                  <TouchableWithoutFeedback
                    onPress={() => console.log("Tapped inside modal")}
                  >
                    <View style={styles.notifyModalContent}>
                      <TouchableOpacity
                        style={{ flexDirection: "row", gap: 16 }}
                        onPress={() => {
                          navigation.navigate("AddDocument");
                        }}
                      >
                        <Text
                          style={{
                            fontWeight: "400",
                            fontSize: 16,
                            alignSelf: "center",
                          }}
                        >
                          Add Document
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableWithoutFeedback>
                </Pressable>
              </KeyboardAvoidingView>
            </Modal>
          </View>
        )}

        {showForumDetails && (
          <View>
            <View style={styles.searchContainer2}>
              <TextInput
                style={styles.searchText}
                placeholder="Search State"
                // value={password}
                // onChangeText={text => setPassword(text)}
              />
              <TouchableOpacity style={styles.passwordToggle}>
                <AntDesign name="search1" size={24} color="#CCCCCC" />
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginRight: 10,
                marginLeft: 16,
                marginTop: 10,
              }}
            >
              <Text
                style={{ fontWeight: "500", fontSize: 22, color: "#1E1E1E" }}
              >
                Popular Groups
              </Text>
              <Text
                style={{ color: "#0080FE", fontWeight: "500", fontSize: 14 }}
              >
                Create New Group
              </Text>
            </View>

            <View style={{ marginTop: 10 }}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <View
                  style={{
                    flex: 1,
                    marginLeft: 16,
                    width: 122,
                  }}
                >
                  <TouchableOpacity>
                    <Image
                      resizeMode="cover"
                      source={require("../../../assets/profilePicture.jpeg")}
                      style={styles.rectangleIcon2}
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "400",
                        color: "#383838",
                      }}
                    >
                      Advertisement Agency Of Naija
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>

            <Text
              style={{
                fontWeight: "500",
                fontSize: 22,
                color: "#1E1E1E",
                marginLeft: 16,
                marginTop: 20,
              }}
            >
              Around you
            </Text>
            <TouchableOpacity
              style={{
                marginLeft: 16,
                flexDirection: "row",
                marginTop: 20,
                width: "90%",
              }}
            >
              <Image
                resizeMode="cover"
                source={require("../../../assets/profilePicture.jpeg")}
                style={styles.rectangleIcon}
              />
              <View style={{ flexDirection: "column", padding: 5 }}>
                <Text>Akwaibom Secreteriat Advertising Agency</Text>
                <View style={{ flexDirection: "row" }}>
                  <FontAwesome5 name="user-friends" size={20} color="#383838" />
                  <Text>120k members</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  buttonParent: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#999999",
    width: 161,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 16,
  },
  buttonParent2: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#999999",
    width: 192,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 16,
    borderStyle: "solid",
  },
  buttonParent3: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#999999",
    width: 117,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 16,
    marginRight: 10,
  },
  button: {
    fontSize: 16,
    fontWeight: "400",
    color: "#999999",
  },
  rectangle1: {
    width: "100%",
    height: 40,
    paddingLeft: 20,
    marginTop: "5%",
    flexDirection: "row",
    alignItems: "center",
  },
  activeButton: {
    borderColor: "#0080FE", // Border color when button is active
    borderWidth: 1,
  },
  activeText: {
    color: "#0080FE",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: "#fff",
    padding: 20,
    width: "100%",
    height: 430,
  },
  rectangleView2: {
    borderRadius: 10,
    backgroundColor: "#f5faff",
    shadowColor: "rgba(204, 204, 204, 0.25)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    marginTop: "6%",
    elevation: 2,
    shadowOpacity: 1,
    width: "90%",
    height: 104,
    marginLeft: 16,
  },
  Caption: {
    fontSize: 12,
    textAlign: "left",
    left: 10,
    fontWeight: "400",
    width: "100%",
    height: "100%",
  },
  searchContainer: {
    borderRadius: 10,
    backgroundColor: "#F5FAFF",
    justifyContent: "center",
    shadowColor: "rgba(204, 204, 204, 0.25)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    // marginTop: '5%',
    elevation: 2,
    shadowOpacity: 1,
    width: "80%",
    height: 40,
    marginLeft: 16,
    marginTop: 16,
  },
  searchContainer2: {
    borderRadius: 10,
    backgroundColor: "#F5FAFF",
    justifyContent: "center",
    shadowColor: "rgba(204, 204, 204, 0.25)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    // marginTop: '5%',
    elevation: 2,
    shadowOpacity: 1,
    width: "90%",
    height: 40,
    marginLeft: 16,
    marginTop: 16,
  },
  searchText: {
    fontSize: 16,
    textAlign: "left",
    left: 10,
    fontWeight: "400",
    width: "100%",
  },
  passwordToggle: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
  state: {
    marginTop: 15,
    fontSize: 22,
    fontWeight: "400",
    marginLeft: 16,
    color: "#383838",
  },
  rectangleIcon2: {
    borderRadius: 298.18,
    height: 82,
    width: 87.96,
  },
  rectangleIcon: {
    borderRadius: 203.39,
    height: 55.93,
    width: 60,
  },
  notifyModalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  notifyModalContent: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "#fff",
    padding: 20,
    width: "100%",
    height: 100,
    justifyContent: "center",
    // alignItems: 'center'
  },
});
