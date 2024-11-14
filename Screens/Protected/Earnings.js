import {
  Modal,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  TextInput,
} from "react-native";
import { Text } from "react-native";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import { TouchableWithoutFeedback } from "react-native";

const AHistory = () => {
  return (
    <View
      style={{
        display: "flex",
        width: "100%",
        padding: 14,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          //   width: "100%",
          gap: 15,
        }}
      >
        <View
          style={{
            backgroundColor: "#EBF8FE",
            // width: "10%",
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            borderRadius: 30,
            // transform: [{ rotate: "30deg" }],
          }}
        >
          <Ionicons
            onPress={() => {
              navigation.goBack();
            }}
            name="person-outline"
            size={25}
            color="#0080FE"
          />
        </View>
        <View
          style={{
            fontSize: 20,
            display: "flex",
            flexDirection: "column",
            gap: 5,
          }}
        >
          <Text
            style={{
              fontSize: 16,
            }}
          >
            Edu Advertising Firm
          </Text>

          <Text
            style={{
              fontSize: 16,
              color: "#999999",
            }}
          >
            November 23th at 1PM
          </Text>
        </View>
      </View>
      <View>
        <Text
          style={{
            color: "green",
            fontWeight: "800",
            fontSize: 20,
          }}
        >
          +10,000
        </Text>
      </View>
    </View>
  );
};

export default function Earnings({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ color: "black" }}
        horizontal={false}
        showsVerticalScrollIndicator={false}
      >
        <Modal visible={!modalVisible} transparent={true} animationType="fade">
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <Pressable
              style={styles.modalContainer}
              // onPress={closeModal}
            >
              <TouchableWithoutFeedback
                onPress={() => console.log("Tapped inside modal")}
              >
                <View style={styles.modalContent}>
                  <View
                    style={
                      {
                        borderRadius: 10,
                        backgroundColor: "#f5faff",
                        justifyContent: "center",
                        width: "100%",
                        shadowColor: "rgba(204, 204, 204, 0.25)",
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                      }
                      // modalEmailFocused && {
                      //   borderColor: "#0080fe",
                      //   borderWidth: 1,
                      // },
                    }
                  >
                    <View>
                      <Text>Account Name</Text>
                      <TextInput
                        style={{
                          fontSize: 12,
                          textAlign: "left",
                          left: 10,
                          fontWeight: "400",
                          width: "100%",
                        }}
                        placeholder="Email"
                        // value={mordalEmail}
                        // onChangeText={(text) => setMordalEmail(text)}
                        // onFocus={handleModalEmailFocus}
                        // onBlur={handleInputBlur}
                      />
                    </View>
                    <View>
                      <Text>Account Name</Text>
                      <TextInput
                        style={{
                          fontSize: 12,
                          textAlign: "left",
                          left: 10,
                          fontWeight: "400",
                          width: "100%",
                        }}
                        placeholder="Email"
                        // value={mordalEmail}
                        // onChangeText={(text) => setMordalEmail(text)}
                        // onFocus={handleModalEmailFocus}
                        // onBlur={handleInputBlur}
                      />
                    </View>
                    <View>
                      <Text>Account Name</Text>
                      <TextInput
                        style={{
                          fontSize: 12,
                          textAlign: "left",
                          left: 10,
                          fontWeight: "600",
                          shadowColor: "black",
                          shadowOpacity: 1,
                          shadowOffset: {
                            width: 20,
                            height: 20,
                          },
                          width: "100%",
                          paddingVertical: 10,
                        }}
                        placeholder="Email"
                        // value={mordalEmail}
                        // onChangeText={(text) => setMordalEmail(text)}
                        // onFocus={handleModalEmailFocus}
                        // onBlur={handleInputBlur}
                      />
                    </View>
                  </View>

                  <TouchableOpacity
                  // onPress={handleNext}
                  // style={styles.buttonParent}
                  >
                    {/* {isLoading2 ? (
                      <ActivityIndicator size="small" />
                    ) : (
                      <Text style={styles.button}>Next</Text>
                    )} */}
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </Pressable>
          </KeyboardAvoidingView>
        </Modal>
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
            Earnings
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#66B3FFCC",
            padding: 25,
            color: "white",
            borderRadius: 20,
            display: "flex",
            flexDirection: "row",
            marginVertical: 24,
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          <View
            style={{
              backgroundColor: "#E1F5FE",
              color: "white",
              width: "30%",
              //   flex: 1,
              justifyContent: "center",
              alignItems: "center",
              gap: 4,
              display: "flex",
              paddingHorizontal: 10,
              flexDirection: "row",
              borderRadius: 100,
            }}
          >
            <Text
              style={{
                fontSize: 15,
              }}
            >
              Balance
            </Text>
            <Ionicons
              onPress={() => {
                navigation.goBack();
              }}
              name="eye-outline"
              size={20}
              color="black"
            />
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "#0080FE",
              width: "35%",
              display: "flex",
              padding: 4,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 8,
              borderRadius: 8,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "white",
              }}
            >
              Withdraw
            </Text>
          </TouchableOpacity>
          <View>
            <Text
              style={{
                fontSize: 30,
                fontWeight: "700",
                paddingVertical: 5,
              }}
            >
              N10,000.00
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            backgroundColor: "#FAFCFF",
            borderRadius: 10,
            display: "flex",
            width: "100%",
            padding: 14,
            borderColor: "#F2F2F2",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              gap: 15,
            }}
          >
            <View
              style={{
                backgroundColor: "#EBF8FE",
                // width: "10%",
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
                borderRadius: 30,
                // transform: [{ rotate: "30deg" }],
              }}
            >
              <Ionicons
                onPress={() => {
                  navigation.goBack();
                }}
                name="notifications-outline"
                size={25}
                color="#0080FE"
              />
            </View>
            <View
              style={{
                fontSize: 20,
                display: "flex",
                flexDirection: "column",
                gap: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                }}
              >
                Add Account Details
              </Text>

              <Text
                style={{
                  fontSize: 16,
                }}
              >
                Connect toMake withdrawals Possible
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={{
            marginTop: 30,
          }}
        >
          <Text
            style={{
              fontWeight: "700",
              fontSize: 20,
            }}
          >
            History
          </Text>
          <View>
            <AHistory />
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
    backgroundColor: "white",
    padding: 20,
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
});
