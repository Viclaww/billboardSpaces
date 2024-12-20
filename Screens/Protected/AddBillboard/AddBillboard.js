import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
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
  BackHandler,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import { refreshToken } from "../../utils/authUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../../apiConfig";
import { useCreateNewMutation } from "../../../data/api/billboardSlice";
import { cloudinaryUpload } from "../../../utils/cloudinaryUpload";
import { useSelector } from "react-redux";

export default function AddBillboard({ navigation }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [fieldModalVisible, setFieldModalVisible] = useState(false);
  const [stateModalVisible, setStateModalVisible] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [displayName, setDisplayName] = useState("");


  useEffect(() => {
  const backAction = () => {
    // Your custom back action
    navigation.goBack();
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    backAction
  );

  return () => backHandler.remove();
}, []);

  const openFieldModal = () => {
    setFieldModalVisible(true);
  };

  const closeFieldModal = () => {
    setFieldModalVisible(false);
  };
  const openStateModal = () => {
    setStateModalVisible(true);
  };
  const closeStateModal = () => {
    setStateModalVisible(false);
  };

  const handleTextSelection = (text) => {
    setSelectedText(text);
    closeFieldModal();
  };
  const handleStateSelection = (text) => {
    setSelectedState(text);
    closeStateModal();
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
      setSelectedImage({
        name: pickerResult.assets[0].fileName,
        type: pickerResult.assets[0].mimeType,
        uri: pickerResult.assets[0].uri,
      });
    }
  };

  const backgroundImage = selectedImage
    ? { uri: selectedImage.uri }
    : require("../../../assets/imageupload.png");
  const storedAccess = useSelector((state) => state.user.token);
  const [createNew] = useCreateNewMutation();

  const uploadData = async () => {
    try {
      setIsLoading(true);

      console.log("access", storedAccess);
      const uploader = await cloudinaryUpload(selectedImage);
      console.log(uploader);
      const formData = {
        image: uploader.image,
        size: selectedText.slice(0, 1).toUpperCase() + selectedText.slice(1),
        state: selectedState,
        target_audience: fullName,
        location: displayName,
        rentPerMonth: phoneNumber,
      };

      const responce = await createNew({ token: storedAccess, body: formData });
      console.log(responce);
      if (responce.data) {
        console.log(responce.data);
        navigation.navigate("Billboardclicked", {data: responce?.data.data});
        setSelectedImage(null);
      } else {
        console.log(responce.error);
      }

      // Optionally, handle success response
      console.log("Post uploaded successfully");
      // You can reset the modal caption and selected image here if needed
    } catch (error) {
      console.log("Error uploading post:", error);
      // Optionally, handle error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 16,
}}>
      <KeyboardAvoidingView style={styles.container} behavior="height" enabled>
        <ScrollView>
          <Text
            style={{
              fontWeight: "500",

              fontSize: 28,
            }}
          >
            Upload Billboard
          </Text>
          <Text
            style={{
              fontWeight: "400",

              top: 10,
              fontSize: 12,
            }}
          >
            Add Image
          </Text>
          <TouchableOpacity onPress={openImagePickerAsync}>
            <ImageBackground
              resizeMode="cover"
              source={backgroundImage}
              style={{
                width: 343,
                height: 199,
                alignItems: "center",
                justifyContent: "center",
                // marginLeft: 16,
                marginTop: 16,
              }}
            >
              {/* <Button title="Select Image from Gallery" onPress={openImagePickerAsync} /> */}
            </ImageBackground>
          </TouchableOpacity>

          <View
            style={{
              marginTop: 10,

            }}
          >
            <Text style={styles.Text}>Size</Text>
            <TouchableOpacity onPress={openFieldModal}>
              <View style={styles.rectangleView1}>
                <Text style={{ padding: 10 }}>
                  {selectedText !== "" ? selectedText : "E.g Potrait"}
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
                    onPress={() => handleTextSelection("potrait")}
                  >
                    <Text style={styles.billboardOwner}>Potrait</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleTextSelection("large-format")}
                  >
                    <Text style={styles.billboardOwner}>Large Format</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleTextSelection("48-sheet")}
                  >
                    <Text style={styles.billboardOwner}>48 Sheet</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleTextSelection("spectacular-billboard")}
                  >
                    <Text style={styles.billboardOwner}>
                      Spectacular Billboard
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleTextSelection("gantry")}
                  >
                    <Text style={styles.billboardOwner}>Gantry</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleTextSelection("unipole")}
                  >
                    <Text style={styles.billboardOwner}>Unipole</Text>
                  </TouchableOpacity>
                </View>
              </Pressable>
            </Modal>
          </View>

          <View
            style={{
              marginTop: 10,

            }}
          >
            <Text style={styles.Text}>State of residence</Text>
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

          {/* <View style={{
            marginTop: 10,

          }}>
            <Text style={styles.Text}>Target Audience in demographic</Text>
            <View>
              <TouchableOpacity>
                <View style={styles.rectangleView2}>
                  <TextInput
                    style={styles.fullName}
                    placeholder="Enter number"
                    value={fullName}
                    onChangeText={text => setFullName(text)}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View> */}

          <View
            style={{
              marginTop: 10,

            }}
          >
            <Text style={styles.Text}>Location Address</Text>
            <View>
              <TouchableOpacity>
                <View style={styles.rectangleView2}>
                  <TextInput
                    style={styles.fullName}
                    placeholder="Add Billbord location address"
                    value={displayName}
                    onChangeText={(text) => setDisplayName(text)}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              marginTop: 10,

            }}
          >
            <Text style={styles.Text}>Enter Rent Price for a Month</Text>
            <View>
              <TouchableOpacity>
                <View style={styles.rectangleView2}>
                  <TextInput
                    style={styles.fullName}
                    placeholder="Enter Price"
                    value={phoneNumber}
                    onChangeText={(text) => setPhoneNumber(text)}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity onPress={uploadData} style={styles.buttonParent}>
            {isLoading ? (
              <ActivityIndicator size="small" />
            ) : (
              <Text style={styles.button}>Next</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "white",
  },
  Text: {
    fontWeight: "400",
    top: 10,
    fontSize: 12,
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
    width: "100%",
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
    paddingLeft: "4%",
  },
  modalContent: {
    marginTop: "94%",
    borderRadius: 10,
    backgroundColor: "#f5faff",
    padding: 15,
    width: "100%",
    height: "30%",
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
    borderColor: "#f5faff",
    marginTop: "5%",
    borderWidth: 1,
    width: "100%",
    height: 50,
  },
  fullName: {
    padding: 10,
    fontWeight: "400",
    width: "100%",
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
    width: "100%",
    height: 50,
  },
  modalContainer2: {
    flex: 1,
    paddingLeft: "4%",
  },
  modalContent2: {
    marginTop: "118%",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: "#f5faff",
    padding: 15,
    width: "100%",
    height: "23%",
  },
  buttonParent: {
    borderRadius: 10,
    backgroundColor: "#0080fe",
    width: "100%",
    marginTop: "15%",
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    // alignSelf: 'center',
    marginBottom: 20,
    // marginLeft: 16,
  },
  button: {
    fontSize: 14,
    fontWeight: "500",
    color: "#fff",
  },
});
