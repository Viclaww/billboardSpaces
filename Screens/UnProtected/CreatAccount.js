import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../apiConfig';

export default function CreateAccount({ navigation }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false); // Track if email input is focused
  const [passwordFocused, setPasswordFocused] = useState(false); // Track if password input is focused
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false); // Track if confirm password input is focused


  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleEmailFocus = () => {
    setEmailFocused(true);
    setPasswordFocused(false);
    setConfirmPasswordFocused(false);
  };

  const handlePasswordFocus = () => {
    setEmailFocused(false);
    setPasswordFocused(true);
    setConfirmPasswordFocused(false);
  };

  const handleConfirmPasswordFocus = () => {
    setEmailFocused(false);
    setPasswordFocused(false);
    setConfirmPasswordFocused(true);
  };

  const handleInputBlur = () => {
    setEmailFocused(false);
    setPasswordFocused(false);
    setConfirmPasswordFocused(false);
  };

  // const Signup = async () => {
  //   try {
  //     setIsLoading(true);

  //     // Use fetch to send the signup request
  //     const response = await fetch(
  //       "https://bb-spaces.onrender.com/auth/create/",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           password: password,
  //           email: email,
  //           password2: confirmPassword,
  //         }),
  //       }
  //     );

  //     // Log the details of the response
  //     console.log("Response Status:", response.status);
  //     console.log("Response Headers:", response.headers);
  //     const responseData = await response.json();
  //     console.log("Response Data:", responseData);

  //     if (response.ok) {
  //       console.log("Signup Successful:", responseData);
  //       // Extract user_id from responseData
  //       const userId = responseData.id;
  //       // alert('Pa successful');

  //       // Construct URL for profile update endpoint
  //       const profileUpdateUrl = `https://bb-spaces.onrender.com/auth/update-profile/${userId}/`;

  //       // Send request to update profile
  //       const profileUpdateResponse = await fetch(profileUpdateUrl, {
  //         method: "PUT", // or "PATCH" depending on your API
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           // Include any profile update data here
  //         }),
  //       });

  //       // Handle response for profile update if needed

  //       // Handle navigation or state updates on successful signup
  //       navigation.navigate("About1", { userId: responseData.id });
  //     } else {
  //       console.error("Signup Error:", responseData);

  //       // Extract and show error messages in an alert
  //       const errorMessages = Object.values(responseData.errors).flat();
  //       alert(`Signup failed. ${errorMessages.join("\n")}`);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);

  //     // Handle other errors, e.g., network issues
  //     const errorMessage =
  //       error.message ||
  //       "Signup failed. Please check your network connection.";
  //     alert(errorMessage);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const Signup = async () => {
    const endpointUrl = `${BASE_URL}/auth/create/`;
    try {
      setIsLoading(true);

      // Use fetch to send the signup request
      const response = await fetch(endpointUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: password,
          email: email,
          password2: confirmPassword,
        }),
      }
      );

      // Log the details of the response
      console.log("Response Status:", response.status);
      console.log("Response Headers:", response.headers);
      const responseData = await response.json();
      console.log("Response Data:", responseData);

      if (response.ok) {
        console.log("Signup Successful:", responseData);
        // Extract tokens from responseData
        const access = responseData.access;
        const refresh = responseData.refresh;

        // Store tokens securely
        await AsyncStorage.setItem('access', access);
        await AsyncStorage.setItem('refresh', refresh);

        // Extract user_id from responseData
        const userId = responseData.id;

        // Construct URL for profile update endpoint
        const profileUpdateUrl = `${BASE_URL}/auth/update-profile/${userId}/`;

        // Send request to update profile
        const profileUpdateResponse = await fetch(profileUpdateUrl, {
          method: "PUT", // or "PATCH" depending on your API
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // Include any profile update data here
          }),
        });

        // Handle response for profile update if needed

        // Handle navigation or state updates on successful signup
        navigation.navigate("About1", { userId: responseData.id });
      } else {
        console.error("Signup Error:", responseData);

        // Extract and show error messages in an alert
        const errorMessages = Object.values(responseData.errors).flat();
        alert(`Signup failed. ${errorMessages.join("\n")}`);
      }
    } catch (error) {
      console.error("Error:", error);

      // Handle other errors, e.g., network issues
      const errorMessage =
        error.message ||
        "Signup failed. Please check your network connection.";
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };



  const SignIn = () => {
    navigation.navigate('SignIn');
  };


  const SignupWithGoogle = async () => {
    const endpointUrl = `${BASE_URL}/auth/google-signup/`;
    try {
      setIsLoading(true);

      // Use fetch to send the signup request
      const response = await fetch(endpointUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // If any additional data is required for Google signup, include it here
        }),
      });

      // Log the details of the response
      console.log("Response Status:", response.status);
      console.log("Response Headers:", response.headers);
      const responseData = await response.json();
      console.log("Response Data:", responseData);

      if (response.ok) {
        console.log("Google Signup Successful:", responseData);
        // Handle navigation or state updates on successful Google signup
        // For example, you may navigate to a different screen or update state to indicate successful signup
      } else {
        console.error("Google Signup Error:", responseData);

        // Extract and show error messages in an alert
        const errorMessage = responseData.message || "Google signup failed.";
        alert(errorMessage);
      }
    } catch (error) {
      console.error("Error:", error);

      // Handle other errors, e.g., network issues
      const errorMessage =
        error.message ||
        "Google signup failed. Please check your network connection.";
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <KeyboardAvoidingView style={styles.container} behavior="height" enabled>
      <ScrollView>
        <View style={styles.logoPosition}>
          <Image
            style={styles.logo}
            resizeMode="cover"
            source={require('../../assets/logo.png')}
          />
        </View>
        <Text style={styles.createAnAccount1}>Create an Account</Text>
        <View style={{ alignItems: 'center', marginTop: '5%' }}>
          <View style={styles.rectangleView}>
            <Image style={styles.groupIcon1} resizeMode="cover" source={require("../../assets/googleIcon.png")} />
            <Text style={styles.continueWithGoogle1}>    Continue with Google</Text>
          </View>
        </View>
        <View style={{ alignItems: 'center', marginTop: '10%' }}>
          <Text style={styles.or}>OR</Text>
          <View style={[styles.rectangleView1,
          emailFocused && { borderColor: "#0080fe", borderWidth: 1, },]}>
            <TextInput
              style={[
                styles.email,

              ]}
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              onFocus={handleEmailFocus}
              onBlur={handleInputBlur}
            />
          </View>
          <View style={[styles.rectangleView2,
          passwordFocused && { borderColor: "#0080fe", borderWidth: 1 },]}>
            <TextInput
              style={[
                styles.email,
              ]}
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
                name={passwordVisible ? 'eye' : 'eye-off'}
                size={20}
                color="gray"
              />
            </TouchableOpacity>
          </View>
          <View style={[styles.rectangleView2,

          confirmPasswordFocused && { borderColor: "#0080fe", borderWidth: 1 },
          ]}>
            <TextInput
              style={[
                styles.email,
              ]}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              secureTextEntry={!confirmPasswordVisible}
              onFocus={handleConfirmPasswordFocus}
              onBlur={handleInputBlur}
            />
            <TouchableOpacity
              style={styles.passwordToggle}
              onPress={toggleConfirmPasswordVisibility}
            >
              <Feather
                name={confirmPasswordVisible ? 'eye' : 'eye-off'}
                size={20}
                color="gray"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={Signup} style={styles.buttonParent}>
            {isLoading ? (
              <ActivityIndicator size="small" />
            ) : (
              <Text style={styles.button}>Sign up</Text>
            )}
          </TouchableOpacity>
          <View style={styles.text}>
            <Text style={styles.alreadyAUser1}>{`Already a user? `}</Text>
            <TouchableOpacity onPress={SignIn}>
              <Text style={styles.signIn}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    padding: 10,
  },
  logoPosition: {
    marginTop: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 24,
  },
  createAnAccount1: {
    fontSize: 28,
    marginTop: '10%',
    fontWeight: "500",
    color: "#1e1e1e",
    textAlign: "center"
  },
  rectangleView: {
    borderRadius: 7,
    backgroundColor: "#fff",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
    shadowColor: "rgba(204, 204, 204, 0.25)",
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowRadius: 2,
    elevation: 2,
    shadowOpacity: 1,
    borderStyle: "solid",
    borderColor: "#ccc",
    borderWidth: 0.3,
    width: "60%",
    height: 40
  },
  groupIcon1: {
    height: 24
  },
  continueWithGoogle1: {
    fontSize: 16,
    color: "#383838",
    textAlign: "left"
  },
  or: {
    fontSize: 12,
    color: "#383838",
    textAlign: "left",
  },
  rectangleView1: {
    borderRadius: 10,
    backgroundColor: "#f5faff",
    justifyContent: 'center',
    shadowColor: "rgba(204, 204, 204, 0.25)",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 2,
    elevation: 2,
    shadowOpacity: 1,
    borderStyle: "solid",
    // borderColor: "#0080fe",
    marginTop: '5%',
    // borderWidth: 1,
    width: "90%",
    height: 50
  },
  rectangleView2: {
    borderRadius: 10,
    backgroundColor: "#f5faff",
    justifyContent: 'center',
    shadowColor: "rgba(204, 204, 204, 0.25)",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 2,
    marginTop: '5%',
    elevation: 2,
    shadowOpacity: 1,
    width: "90%",
    height: 50
  },
  email: {
    fontSize: 12,
    fontWeight: '400',
    textAlign: "left",
    left: 10,
    width: '100%'
  },
  passwordToggle: {
    position: 'absolute',
    right: 15,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  button: {
    fontSize: 14,
    // fontWeight: "500",
    color: "#fff",
    // textAlign: "left"
  },
  buttonParent: {
    borderRadius: 10,
    backgroundColor: "#0080fe",
    width: "90%",
    marginTop: '20%',
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  alreadyAUser1: {
    fontSize: 12,
    color: "#383838"
  },
  signIn: {
    fontSize: 14,
    fontWeight: "500",
    color: "#0080fe"
  },
  text: {
    // textAlign: "left",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20
  }
})
