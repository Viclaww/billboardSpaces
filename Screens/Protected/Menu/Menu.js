import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
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
} from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { refreshToken } from "../../utils/authUtils";
import { BASE_URL } from "../../../apiConfig";
import ProductComponent from "../components/ProductComponent";
import PopularComponent from "../components/PopularComponent";

export default function Menu({ navigation }) {
  const [fieldModalVisible, setFieldModalVisible] = useState(false);
  const [stateModalVisible, setStateModalVisible] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [popular, setPopular] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(true);

  const openStateModal = () => {
    setStateModalVisible(true);
  };
  const closeStateModal = () => {
    setStateModalVisible(false);
  };
  const openFieldModal = () => {
    setFieldModalVisible(true);
  };
  const closeFieldModal = () => {
    setFieldModalVisible(false);
  };
  const handleTextSelection = (text) => {
    setSelectedText(text);
    closeFieldModal();
  };
  const handleStateSelection = (text) => {
    setSelectedState(text);
    closeStateModal();
  };
  const splitIntoRows = (data) => {
    const rows = [];
    for (let i = 0; i < data.length; i += 2) {
      rows.push(data.slice(i, i + 2));
    }
    return rows;
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ marginBottom: 5 }}
        horizontal={false}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 25,
          }}
        >
          <Text
            style={{
              fontSize: 28,
              fontWeight: "500",
            }}
          >
            Marketplace
          </Text>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchText}
            placeholder="Search"
            onChangeText={(text) => setSearchKeyword(text)}
          />
          <TouchableOpacity
            style={styles.passwordToggle}
          >
            <AntDesign name="search1" size={24} color="#CCCCCC" />
          </TouchableOpacity>
        </View>

        {showSearchResults ? (
          // Render search results
          <>
            <Text style={styles.newlyAdded}>Search Results</Text>
            {searchResults.length > 0 ? (
              <View style={styles.popularContainer}>
                {splitIntoRows(searchResults).map((row, rowIndex) => (
                  <View key={rowIndex} style={styles.popularRow}>
                    {row.map((item, itemIndex) => (
                      <PopularComponent key={itemIndex} popular={item} />
                    ))}
                  </View>
                ))}
              </View>
            ) : (
              // Display image when no search results
              <View style={styles.noResultContainer}>
                <Image
                  source={require("../../../assets/marketError.png")}
                  style={styles.noResultImage}
                />
                <Text style={styles.noResultText}>No results found</Text>
              </View>
            )}
          </>
        ) : (
          // Render Featured and Popular components
          <>
            <Text
              style={{
                fontSize: 16,
                paddingLeft: 25,
                fontWeight: "500",
                marginTop: 10,
              }}
            >
              Filter By
            </Text>

            <View
              style={{
                flexDirection: "row",
                paddingLeft: 25,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  marginTop: 10,
                }}
              >
                {selectedState !== "" ? selectedState : "Location"}
              </Text>
              <AntDesign
                onPress={openStateModal}
                style={styles.arrow}
                name="down"
                size={16}
                color="black"
              />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  marginTop: 10,
                  paddingLeft: 20,
                }}
              >
                {selectedText !== "" ? selectedText : "Size"}
              </Text>
              <AntDesign
                onPress={openFieldModal}
                style={styles.arrow}
                name="down"
                size={16}
                color="black"
              />
            </View>

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
                      onPress={() => handleStateSelection("  Adamawa")}
                    >
                      <Text style={styles.billboardOwner}>Adamawa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleStateSelection("  Akwaibom")}
                    >
                      <Text style={styles.billboardOwner}>Akwaibom</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleStateSelection("  Anambra")}
                    >
                      <Text style={styles.billboardOwner}>Anambra</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleStateSelection("  Bauchi")}
                    >
                      <Text style={styles.billboardOwner}>Bauchi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleStateSelection("  Benue")}
                    >
                      <Text style={styles.billboardOwner}>Benue</Text>
                    </TouchableOpacity>
                  </ScrollView>
                </View>
              </Pressable>
            </Modal>

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
                    onPress={() => handleTextSelection("Potrait")}
                  >
                    <Text style={styles.billboardOwner}>Potrait</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleTextSelection("Large Format")}
                  >
                    <Text style={styles.billboardOwner}>Large Format</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleTextSelection("48 Sheet")}
                  >
                    <Text style={styles.billboardOwner}>48 Sheet</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleTextSelection("Spectacular Billboard")}
                  >
                    <Text style={styles.billboardOwner}>
                      Spectacular Billboard
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleTextSelection("Gantry")}
                  >
                    <Text style={styles.billboardOwner}>Gantry</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleTextSelection("Unipole")}
                  >
                    <Text style={styles.billboardOwner}>Unipole</Text>
                  </TouchableOpacity>
                </View>
              </Pressable>
            </Modal>

            <Text style={styles.newlyAdded}>Featured</Text>
            <View style={styles.newlyAddedScroll}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <View style={styles.img2}>
                  {products &&
                    products.map((product, index) => (
                      <ProductComponent key={index} product={product} />
                    ))}
                </View>
              </ScrollView>
            </View>
            <Text style={styles.newlyAdded}>Popular</Text>
            <View style={styles.popularContainer}>
              {splitIntoRows(popular).map((row, rowIndex) => (
                <View key={rowIndex} style={styles.popularRow}>
                  {row.map((item, itemIndex) => (
                    <PopularComponent key={itemIndex} popular={item} />
                  ))}
                </View>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "white"
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
    width: "90%",
    height: 40,
    marginLeft: 25,
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
    right: 15,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
  arrow: {
    marginTop: 12,
    paddingLeft: 5,
  },
  newlyAdded: {
    fontSize: 22,
    fontWeight: "500",
    color: "#1e1e1e",
    paddingLeft: 25,
    marginTop: 20,
  },
  newlyAddedScroll: {
    alignItems: "center",
  },
  img2: {
    flexDirection: "row",
    paddingLeft: 25,
  },
  popularContainer: {
    paddingLeft: 25,
  },
  rectangleIcon2: {
    borderRadius: 10,
    height: 150,
    width: 159.5,
  },
  rectangleIcon3: {
    borderRadius: 10,
    height: 150,
    width: 159.5,
  },
  popularRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  modalContainer2: {
    flex: 1,
    paddingLeft: 25,
    // alignItems: 'center',
  },
  modalContent2: {
    marginTop: "42%",
    borderRadius: 10,
    backgroundColor: "#f5faff",
    padding: 15,
    width: 243,
    height: "30%",
  },
  modalContainer: {
    flex: 1,
    paddingLeft: "32%",
  },
  modalContent: {
    marginTop: "57.5%",
    borderRadius: 10,
    backgroundColor: "#f5faff",
    padding: 15,
    width: "90%",
    height: "30%",
  },
  billboardOwner: {
    fontSize: 14,
    fontWeight: "500",
    color: "#383838",
    padding: 10,
  },
  noResultContainer: {
    alignContent: "center",
    alignSelf: "center",
  },
  noResultImage: {
    marginTop: 30,
  },
  noResultText: {
    fontWeight: "500",
    fontSize: 22,
    lineHeight: 26.63,
    color: "#1E1E1E",
    alignSelf: "center",
    paddingTop: 50,
  },
});
