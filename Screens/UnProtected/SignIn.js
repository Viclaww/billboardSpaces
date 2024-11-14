import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  Image,
  Platform,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Linking,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../apiConfig";
import {
  useLoginMutation,
  useVerifyOTPMutation,
  useChangePasswordMutation,
  useResetPasswordMutation,
} from "../../data/api/authSlice";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../data/dataSlices/user.slice";

export default function CreatAccount({ navigation }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [modalPasswordVisible, setModalPasswordVisible] = useState(false);
  const [modalConfirmPasswordVisible, setModalConfirmPasswordVisible] =
    useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mordalEmail, setMordalEmail] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false); // Track if email input is focused
  const [modalEmailFocused, setModalEmailFocused] = useState(false); // Track if email input is focused
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const [newPasswordModalVisible, setNewPasswordModalVisible] = useState(false);
  const [otp1Focused, setOtp1Focused] = useState(false);
  const [otp2Focused, setOtp2Focused] = useState(false);
  const [otp3Focused, setOtp3Focused] = useState(false);
  const [otp4Focused, setOtp4Focused] = useState(false);
  const [otp5Focused, setOtp5Focused] = useState(false);
  const [otp6Focused, setOtp6Focused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false); // Track if confirm password input is focused
  const [ModalPasswordFocused, setModalPasswordFocused] = useState(false); // Track if confirm password input is focused
  const [otp, setOtp] = useState({ 1: "", 2: "", 3: "", 4: "", 5: "", 6: "" });
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const dispatch = useDispatch();

  const handleEmailFocus = () => {
    setEmailFocused(true);
    setPasswordFocused(false);
    setModalEmailFocused(false);
  };
  const handleModalEmailFocus = () => {
    setEmailFocused(false);
    setPasswordFocused(false);
    setModalEmailFocused(true);
  };

  const handlePasswordFocus = () => {
    setEmailFocused(false);
    setPasswordFocused(true);
    setModalEmailFocused(false);
  };
  const handleConfirmPasswordFocus = () => {
    setEmailFocused(false);
    setPasswordFocused(false);
    setConfirmPasswordFocused(true);
  };
  const handleOtp1Focus = () => {
    setEmailFocused(false);
    setPasswordFocused(false);
    setModalEmailFocused(false);
    setOtp1Focused(true);
  };
  const handleOtp2Focus = () => {
    setEmailFocused(false);
    setPasswordFocused(false);
    setModalEmailFocused(false);
    setOtp2Focused(true);
  };
  const handleOtp3Focus = () => {
    setEmailFocused(false);
    setPasswordFocused(false);
    setModalEmailFocused(false);
    setOtp3Focused(true);
  };
  const handleOtp4Focus = () => {
    setEmailFocused(false);
    setPasswordFocused(false);
    setModalEmailFocused(false);
    setOtp4Focused(true);
  };
  const handleOtp5Focus = () => {
    setEmailFocused(false);
    setPasswordFocused(false);
    setModalEmailFocused(false);
    setOtp5Focused(true);
  };
  const handleOtp6Focus = () => {
    setEmailFocused(false);
    setPasswordFocused(false);
    setModalEmailFocused(false);
    setOtp6Focused(true);
  };

  const handleModalPasswordFocus = () => {
    setEmailFocused(false);
    setPasswordFocused(false);
    setModalEmailFocused(false);
    setModalPasswordFocused(true);
  };

  const handleInputBlur = () => {
    setEmailFocused(false);
    setPasswordFocused(false);
    setModalEmailFocused(false);
    setOtp1Focused(false);
    setOtp2Focused(false);
    setOtp3Focused(false);
    setOtp4Focused(false);
    setOtp5Focused(false);
    setOtp6Focused(false);
    setConfirmPasswordFocused(false);
    setModalPasswordFocused(false);
  };

  const openOtpModal = () => {
    setOtpModalVisible(true);
  };

  const closeOtpModal = () => {
    setOtpModalVisible(false);
  };
  const openNewPasswordModalVisible = () => {
    setNewPasswordModalVisible(true);
  };

  const CloseNewPasswordModalVisible = () => {
    setNewPasswordModalVisible(false);
  };

  const handleOtpInput = (text) => {
    setOtpInput(text);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const toggleModalPasswordVisibility = () => {
    setModalPasswordVisible(!modalPasswordVisible);
  };
  const toggleConfirmModalPasswordVisibility = () => {
    setModalConfirmPasswordVisible(!modalConfirmPasswordVisible);
  };

  const CreatAccount = () => {
    navigation.navigate("CreatAccount");
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const [login, { isSuccess, isError }] = useLoginMutation();
  const [changePassword] = useChangePasswordMutation();
  const [
    resetPassword,
    { data: resetRes, isSuccess: resetSucess, error: resetError },
  ] = useResetPasswordMutation();
  const [verifyOTP] = useVerifyOTPMutation();

  const handleNext = async () => {
    try {
      setIsLoading2(true);
      const { data: res, error: err } = await resetPassword({
        email: mordalEmail,
      });

      if (res) {
        console.log(res);
        openOtpModal();
      }

      if (err) {
        console.log("ths", error);
        // alert(resetError.data.message);
      }

      setIsLoading2(false); // Set loading state to false after successful response
    } catch (error) {
      // Handle errors
      console.error("Error resetting password:", error);

      // Show the specific error message in an alert
      alert(error.message || "Failed to reset password. Please try again.");

      setIsLoading2(false); // Set loading state to false in case of error
    }
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      // make request
      const { data, error } = await login({
        email,
        password,
      });

      if (data) {
        // await AsyncStorage("access", data.token);
        console.log("Login Successful", data);
        dispatch(setToken(data.token));
        dispatch(setUser(data.data));
        if (!data.data["display-name"]) {
          navigation.navigate("About1");
        }

        navigation.navigate("Home");
      } else {
        // Handle error, e.g., show an error message to the user
        console.error("Login Error:", error);

        // Extract and show error messages in an aler
        // alert(`Login failed. ${error.data.message}`);
      }
    } catch (error) {
      // Handle other errors, e.g., network issues
      console.error("Error:", error);

      // Show a generic error message in an alert
      alert("Login failed. Please check your network connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const otpString = Object.values(otp).join("");

  const handleVerifyOTP = async () => {
    try {
      setIsLoading2(true);

      const { data, error: err } = await verifyOTP({
        otp: otpString,
        email: mordalEmail,
      });

      if (data) {
        console.log(data);
        openNewPasswordModalVisible();
      } else {
        console.log(err);
        alert(err);
      }
    } catch (error) {}
  };
  // Function to handle submission of new password, confirm password, email, and OTP
  const handleSubmitPassword = async () => {
    try {
      // Validate that passwords match
      if (newPassword !== confirmPassword) {
        setPasswordError("Passwords do not match");
        return;
      }
      // send data to server
      const response = await changePassword({
        email: mordalEmail,
        password: newPassword,
      });

      if (response.data) {
        // Password reset successful
        alert("Password reset successful");
        // Close all modals
        setOtpModalVisible(false);
        setNewPasswordModalVisible(false);
        // Additional logic if needed
      } else {
        console.error("Password Reset Error:", response.error);
        // Extract and show error message
        const errorMessage =
          response.error.data.message ||
          "Password reset failed. Please try again.";
        alert(errorMessage);
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      // Show a generic error message
      alert("Password reset failed. Please try again.");
    }
  };

  const firstInput = useRef();
  const secondInput = useRef();
  const thirdtInput = useRef();
  const fourthInput = useRef();
  const fifthInput = useRef();
  const sixthInput = useRef();

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height" enabled>
      <TouchableWithoutFeedback onPress={closeModal}>
        <ScrollView>
          <View style={styles.logoPosition}>
            <Image
              style={styles.logo}
              resizeMode="cover"
              source={require("../../assets/logo.png")}
            />
          </View>
          <Text style={styles.createAnAccount1}>Access your Account</Text>
          <View style={{ alignItems: "center", marginTop: "5%" }}>
            <View style={styles.rectangleView}>
              <Image
                style={styles.groupIcon1}
                resizeMode="cover"
                source={require("../../assets/googleIcon.png")}
              />
              <Pressable style={styles.continueWithGoogle1}>
                <Text>Continue with Google</Text>
              </Pressable>
            </View>
          </View>
          <View style={{ alignItems: "center", marginTop: "10%" }}>
            <Text style={styles.or}>OR</Text>
            <View
              style={[
                styles.rectangleView1,
                emailFocused && { borderColor: "#0080fe", borderWidth: 1 },
              ]}
            >
              <TextInput
                style={styles.email}
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                onFocus={handleEmailFocus}
                onBlur={handleInputBlur}
              />
            </View>
            <View
              style={[
                styles.rectangleView2,
                passwordFocused && { borderColor: "#0080fe", borderWidth: 1 },
              ]}
            >
              <TextInput
                style={styles.email}
                placeholder="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={!passwordVisible}
                onFocus={handlePasswordFocus}
                onBlur={handleInputBlur}
              />
              <TouchableOpacity
                style={styles.passwordToggle}
                onPress={togglePasswordVisibility}
              >
                <Feather
                  name={passwordVisible ? "eye" : "eye-off"}
                  size={20}
                  color="gray"
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={openModal}>
              <Text style={styles.forgotPassword1}>Forgot password?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogin} style={styles.buttonParent}>
              {isLoading ? (
                <ActivityIndicator size="small" />
              ) : (
                <Text style={styles.button}>Sign in</Text>
              )}
            </TouchableOpacity>

            <View style={styles.text}>
              <Text style={styles.alreadyAUser1}>{`Not a User? `}</Text>
              <TouchableOpacity onPress={CreatAccount}>
                <Text style={styles.signIn}>Sign up</Text>
              </TouchableOpacity>
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
                      <Text style={styles.forgotYourPassword1}>
                        Forgot your password?
                      </Text>
                      <Text
                        style={styles.noWorriesJust1}
                      >{`No worries! Just follow the steps below to
reset it`}</Text>

                      <View
                        style={[
                          styles.rectangleView2,
                          modalEmailFocused && {
                            borderColor: "#0080fe",
                            borderWidth: 1,
                          },
                        ]}
                      >
                        <TextInput
                          style={styles.email}
                          placeholder="Email"
                          value={mordalEmail}
                          onChangeText={(text) => setMordalEmail(text)}
                          onFocus={handleModalEmailFocus}
                          onBlur={handleInputBlur}
                        />
                      </View>

                      <TouchableOpacity
                        onPress={handleNext}
                        style={styles.buttonParent}
                      >
                        {isLoading2 ? (
                          <ActivityIndicator size="small" />
                        ) : (
                          <Text style={styles.button}>Next</Text>
                        )}
                      </TouchableOpacity>
                    </View>
                  </TouchableWithoutFeedback>
                </Pressable>
              </KeyboardAvoidingView>
            </Modal>

            <Modal
              visible={otpModalVisible}
              transparent={true}
              animationType="fade"
            >
              <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
              >
                <Pressable
                  style={styles.modalContainer}
                  onPress={closeOtpModal}
                >
                  <TouchableWithoutFeedback
                    onPress={() => console.log("Tapped inside OTP modal")}
                  >
                    <View style={styles.otpmodalContent}>
                      <Text style={styles.otp1}>Enter OTP sent to Email</Text>
                      <Text style={styles.otp2}>
                        Enter 6-digit OTP sent to Email
                      </Text>
                      <View style={styles.otpContainer}>
                        <View
                          style={[
                            styles.otpBox,
                            otp1Focused && {
                              borderColor: "#0080fe",
                              borderWidth: 1,
                            },
                          ]}
                        >
                          <TextInput
                            style={styles.otpText}
                            keyboardType="number-pad"
                            maxLength={1}
                            ref={firstInput}
                            onChangeText={(text) => {
                              setOtp({ ...otp, 1: text });
                              text && secondInput.current.focus();
                            }}
                            onFocus={handleOtp1Focus}
                            onBlur={handleInputBlur}
                          />
                        </View>
                        <View
                          style={[
                            styles.otpBox,
                            otp2Focused && {
                              borderColor: "#0080fe",
                              borderWidth: 1,
                            },
                          ]}
                        >
                          <TextInput
                            style={styles.otpText}
                            keyboardType="number-pad"
                            maxLength={1}
                            ref={secondInput}
                            onChangeText={(text) => {
                              setOtp({ ...otp, 2: text });
                              text
                                ? thirdtInput.current.focus()
                                : firstInput.current.focus();
                            }}
                            onFocus={handleOtp2Focus}
                            onBlur={handleInputBlur}
                          />
                        </View>
                        <View
                          style={[
                            styles.otpBox,
                            otp3Focused && {
                              borderColor: "#0080fe",
                              borderWidth: 1,
                            },
                          ]}
                        >
                          <TextInput
                            style={styles.otpText}
                            keyboardType="number-pad"
                            maxLength={1}
                            ref={thirdtInput}
                            onChangeText={(text) => {
                              setOtp({ ...otp, 3: text });
                              text
                                ? fourthInput.current.focus()
                                : secondInput.current.focus();
                            }}
                            onFocus={handleOtp3Focus}
                            onBlur={handleInputBlur}
                          />
                        </View>
                        <View
                          style={[
                            styles.otpBox,
                            otp4Focused && {
                              borderColor: "#0080fe",
                              borderWidth: 1,
                            },
                          ]}
                        >
                          <TextInput
                            style={styles.otpText}
                            keyboardType="number-pad"
                            maxLength={1}
                            ref={fourthInput}
                            onChangeText={(text) => {
                              setOtp({ ...otp, 4: text });
                              text
                                ? fifthInput.current.focus()
                                : thirdtInput.current.focus();
                            }}
                            onFocus={handleOtp4Focus}
                            onBlur={handleInputBlur}
                          />
                        </View>
                        <View
                          style={[
                            styles.otpBox,
                            otp5Focused && {
                              borderColor: "#0080fe",
                              borderWidth: 1,
                            },
                          ]}
                        >
                          <TextInput
                            style={styles.otpText}
                            keyboardType="number-pad"
                            maxLength={1}
                            ref={fifthInput}
                            onChangeText={(text) => {
                              setOtp({ ...otp, 5: text });
                              text
                                ? sixthInput.current.focus()
                                : fourthInput.current.focus();
                            }}
                            onFocus={handleOtp5Focus}
                            onBlur={handleInputBlur}
                          />
                        </View>
                        <View
                          style={[
                            styles.otpBox,
                            otp6Focused && {
                              borderColor: "#0080fe",
                              borderWidth: 1,
                            },
                          ]}
                        >
                          <TextInput
                            style={styles.otpText}
                            keyboardType="number-pad"
                            maxLength={1}
                            ref={sixthInput}
                            onChangeText={(text) => {
                              setOtp({ ...otp, 6: text });
                              !text && fifthInput.current.focus();
                            }}
                            onFocus={handleOtp6Focus}
                            onBlur={handleInputBlur}
                          />
                        </View>
                      </View>
                      <TouchableOpacity
                        onPress={handleVerifyOTP}
                        style={styles.buttonParent}
                      >
                        <Text style={styles.button}>Next</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableWithoutFeedback>
                </Pressable>
              </KeyboardAvoidingView>
            </Modal>

            <Modal
              visible={newPasswordModalVisible}
              transparent={true}
              animationType="fade"
            >
              <Pressable
                style={styles.modalContainer}
                onPress={CloseNewPasswordModalVisible}
              >
                <TouchableWithoutFeedback
                  onPress={() => console.log("Tapped inside modal")}
                >
                  <View style={styles.modalContent}>
                    <Text style={styles.forgotYourPassword1}>
                      Reset Password
                    </Text>
                    <View
                      style={[
                        styles.rectangleView2,
                        ModalPasswordFocused && {
                          borderColor: "#0080fe",
                          borderWidth: 1,
                        },
                      ]}
                    >
                      <TextInput
                        style={styles.email}
                        placeholder="Password"
                        value={newPassword}
                        onChangeText={(text) => setNewPassword(text)}
                        secureTextEntry={!modalPasswordVisible}
                        onFocus={handleModalPasswordFocus}
                        onBlur={handleInputBlur}
                      />
                      <TouchableOpacity
                        style={styles.passwordToggle}
                        onPress={toggleModalPasswordVisibility}
                      >
                        <Feather
                          name={modalPasswordVisible ? "eye" : "eye-off"}
                          size={20}
                          color="gray"
                        />
                      </TouchableOpacity>
                    </View>

                    <View
                      style={[
                        styles.rectangleView2,

                        confirmPasswordFocused && {
                          borderColor: "#0080fe",
                          borderWidth: 1,
                        },
                      ]}
                    >
                      <TextInput
                        style={[styles.email]}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChangeText={(text) => setConfirmPassword(text)}
                        secureTextEntry={!modalConfirmPasswordVisible}
                        onFocus={handleConfirmPasswordFocus}
                        onBlur={handleInputBlur}
                      />
                      <TouchableOpacity
                        style={styles.passwordToggle}
                        onPress={toggleConfirmModalPasswordVisibility}
                      >
                        <Feather
                          name={modalConfirmPasswordVisible ? "eye" : "eye-off"}
                          size={20}
                          color="gray"
                        />
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                      onPress={handleSubmitPassword}
                      style={styles.buttonParent}
                    >
                      <Text style={styles.button}>Done</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableWithoutFeedback>
              </Pressable>
            </Modal>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    padding: 10,
  },
  logoPosition: {
    marginTop: "30%",
    alignItems: "center",
    justifyContent: "center",
    height: 24,
  },
  createAnAccount1: {
    fontSize: 28,
    marginTop: "10%",
    fontWeight: "500",
    color: "#1e1e1e",
    textAlign: "center",
  },
  rectangleView: {
    borderRadius: 7,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "rgba(204, 204, 204, 0.25)",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowRadius: 2,
    elevation: 2,
    shadowOpacity: 1,
    borderStyle: "solid",
    borderColor: "#ccc",
    borderWidth: 0.3,
    width: "60%",
    height: 40,
  },
  groupIcon1: {
    height: 24,
  },
  continueWithGoogle1: {
    fontSize: 16,
    color: "#383838",
    textAlign: "left",
  },
  or: {
    fontSize: 12,
    color: "#383838",
    textAlign: "left",
  },
  rectangleView1: {
    borderRadius: 10,
    backgroundColor: "#f5faff",
    justifyContent: "center",
    shadowColor: "rgba(204, 204, 204, 0.25)",
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
    justifyContent: "center",
    shadowColor: "rgba(204, 204, 204, 0.25)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    marginTop: "5%",
    elevation: 2,
    shadowOpacity: 1,
    width: "90%",
    height: 50,
  },
  email: {
    fontSize: 12,
    textAlign: "left",
    left: 10,
    fontWeight: "400",
    width: "100%",
  },
  passwordToggle: {
    position: "absolute",
    right: 15,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
  button: {
    fontSize: 14,
    fontWeight: "500",
    color: "#fff",
    // textAlign: "left"
  },
  buttonParent: {
    borderRadius: 10,
    backgroundColor: "#0080fe",
    width: "90%",
    marginTop: "40%",
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  alreadyAUser1: {
    fontSize: 12,
    color: "#383838",
  },
  signIn: {
    fontSize: 14,
    fontWeight: "500",
    color: "#0080fe",
  },
  text: {
    // textAlign: "left",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
  },
  forgotPassword1: {
    fontSize: 14,
    fontWeight: "500",
    color: "#0080fe",
    marginTop: "7%",
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
    height: 431,
    alignItems: "center",
  },
  otpmodalContent: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: "#fff",
    padding: 20,
    width: "100%",
    height: 431,
    // alignItems: 'center'
  },
  forgotYourPassword1: {
    fontSize: 28,
    fontWeight: "500",
    color: "#1e1e1e",
    textAlign: "center",
  },
  noWorriesJust1: {
    fontSize: 16,
    color: "#383838",
    textAlign: "center",
  },
  otp1: {
    fontSize: 28,
    fontWeight: "500",
    color: "#1e1e1e",
    // textAlign: "center"
  },
  otp2: {
    fontSize: 16,
    color: "#383838",
    // textAlign: "center"
  },
  otpContainer: {
    // justifyContent: 'space-evenly',
    alignItems: "center",
    flexDirection: "row",
    paddingTop: 10,
  },
  otpBox: {
    borderRadius: 5,
    width: 41,
    height: 41,
    borderWidth: 0.5,
    borderColor: "#525252",
    marginRight: 18,
  },
  otpText: {
    fontSize: 25,
    textAlign: "center",
  },
});
