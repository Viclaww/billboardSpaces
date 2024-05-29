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
  Modal,
  Pressable,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Table, Row, Rows, Cell } from "react-native-table-component";

const Billboardclicked = ({ route, navigation }) => {
  const tableData = [
    ["Location", route.params.data.location],
    ["Size", route.params.data.size],
    ["Target Audience", "30"],
  ];
  const { data } = route.params;
  const [showDetails, setShowDetails] = useState(false);

  const handleLogin = () => {
    navigation.navigate("Set Advertising Duration");
  };

  const handleShowDetails = () => {
    setShowDetails((currentState) => !currentState);
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
            paddingLeft: 16,
            paddingRight: 10,
            paddingTop: 10,
          }}
        >
          <AntDesign
            onPress={() => navigation.goBack()}
            name="arrowleft"
            size={30}
            color="#383838"
          />
          <MaterialCommunityIcons
            name="dots-vertical"
            size={24}
            color="#383838"
          />
        </View>

        <View style={{ alignItems: "center", marginTop: 10 }}>
          <Image
            resizeMode="cover"
            source={{ uri: data.image }}
            style={styles.billboardImage}
          />
        </View>

        <View style={styles.rectangle1}>
          <TouchableOpacity>
            <Image
              style={{ width: 40, height: 40, borderRadius: 100 }}
              source={require("../assets/profilePicture.jpeg")}
            />
          </TouchableOpacity>
          <Text style={{ fontSize: 16, fontWeight: "400", marginLeft: 5 }}>
            Greyfield. co
          </Text>
          <View style={{ flex: 1, alignItems: "flex-end", paddingRight: 10 }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ExploreMore", { data });
              }}
              style={{
                justifyContent: "center",
                borderRadius: 10,
                width: "50%",
                height: 40,
                borderWidth: 1,
                borderColor: "#0080FE",
              }}
            >
              <Text style={{ color: "#0080FE", alignSelf: "center" }}>
                Explore More
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text
          style={{
            fontWeight: "400",
            fontSize: 22,
            marginTop: 10,
            paddingLeft: 20,
          }}
        >
          Description
        </Text>
        <Table
          style={{
            width: "90%",
            borderRadius: 10,
            overflow: "hidden",
            marginLeft: 20,
            marginTop: 10,
          }}
          borderStyle={{ borderWidth: 1, borderColor: "#999999" }}
        >
          <Rows data={tableData} textStyle={styles.tableText} />
        </Table>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 16,
            paddingRight: 10,
            marginTop: 10,
          }}
        >
          <Text style={{ fontSize: 16, marginBottom: 10, fontWeight: "400" }}>
            Design and Services
          </Text>
          <AntDesign
            onPress={handleShowDetails}
            name={showDetails ? "up" : "down"}
            size={20}
            color="black"
          />
        </View>

        {showDetails && (
          <View>
            <Text
              style={{
                fontSize: 14,
                paddingLeft: 16,
                color: "#0080FE",
                padding: 10,
                fontWeight: "500",
              }}
            >
              DIY Design with Canva API
            </Text>
            <Text
              style={{
                fontSize: 14,
                paddingLeft: 16,
                color: "#0080FE",
                fontWeight: "500",
              }}
            >
              Book Professional Design Services
            </Text>
          </View>
        )}

        <TouchableOpacity onPress={handleLogin} style={styles.buttonParent}>
          <Text style={styles.button}>Book Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  billboardImage: {
    width: "90%",
    height: 274,
    borderRadius: 10,
  },
  rectangle1: {
    width: "100%",
    height: 40,
    // backgroundColor: "blu/e",
    paddingLeft: 20,
    marginTop: "5%",
    flexDirection: "row",
    alignItems: "center",
  },
  tableContainer: {
    overflow: "hidden",
    paddingLeft: 20,
    marginTop: 10,
  },
  tableText: {
    margin: 10,
  },
  boldText: {
    fontWeight: "bold",
  },
  buttonParent: {
    borderRadius: 10,
    backgroundColor: "#0080fe",
    width: "90%",
    marginTop: "15%",
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  button: {
    fontSize: 14,
    fontWeight: "500",
    color: "#fff",
  },
  cellText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#0080FE",
  },
};

export default Billboardclicked;
