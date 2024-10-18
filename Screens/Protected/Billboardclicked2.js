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
import { Fontisto } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const Billboardclicked2 = ({ route, navigation }) => {
  const { data } = route.params;
  const tableData = [
    ["Location", route.params.data.location],
    ["Size", route.params.data.size],
    ["Target Audience", "30"],
  ];
  const [showDetails, setShowDetails] = useState(false);

  const handleShowDetails = () => {
    setShowDetails((currentState) => !currentState);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ marginBottom: 5, backgroundColor: 'white' }}
        horizontal={false}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 16,
            marginRight: 10,
            marginTop: 10,
            backgroundColor: 'white'
          }}
        >
          <AntDesign
            style={{ marginLeft: 20 }}
            onPress={() => navigation.goBack()}
            name="arrowleft"
            size={30}
            color="#383838"
          />
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              flexDirection: "row",
              gap: 16,
            }}
          >
            <Fontisto
              style={{
                alignSelf: "center",
              }}
              name="share-a"
              size={20}
              color="black"
            />
            <MaterialCommunityIcons
              name="dots-vertical"
              size={24}
              color="#383838"
            />
          </View>
        </View>

        <View style={{ alignItems: "center", marginTop: 10 }}>
          <Image
            resizeMode="cover"
            source={{ uri: data.image }}
            style={styles.billboardImage}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 5,
            marginRight: 20,
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: "400",
              alignSelf: "center",
              color: "#525252",
              marginLeft: 20,
              fontStyle: "italic",
            }}
          >
            Posted
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "400",
              alignSelf: "center",
              color: "#525252",
              fontStyle: "italic",
            }}
          >
            Aka Road, Uyo, Akwa..
          </Text>

          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              flexDirection: "row",
              gap: 4,
            }}
          >
            <Ionicons
              style={{
                alignSelf: "center",
              }}
              name="eye-outline"
              size={12}
              color="#525252"
            />
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                alignSelf: "center",
                color: "#525252",
              }}
            >
              104
            </Text>
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

export default Billboardclicked2;
