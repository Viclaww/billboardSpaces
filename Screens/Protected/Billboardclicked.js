import React, { useState, useEffect } from "react";
import {
  Platform,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  StatusBar,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Table, Row, Rows, Cell } from "react-native-table-component";
import { useGetABillboardQuery } from "../../data/api/billboardSlice";
import { useSelector } from "react-redux";

const Billboardclicked = ({ route, navigation }) => {
  const [billboardData, setBillBoardData] = useState(null);
  const token = useSelector((state) => state.user.token);
  console.log(route.params.data._id);
  const {
    data: billboardRes,
    error,
    isFetching,
  } = useGetABillboardQuery({
    id: route.params.data._id,
    token,
  });

  useEffect(() => {
    if (billboardRes) {
      console.log(billboardRes);
      setBillBoardData(billboardRes.data);
    }
  }, [billboardRes]);

  const tableData = [
    ["Location", billboardData?.billboard.location],
    ["Size", billboardData?.billboard.size],
    ["Price", `${billboardData?.billboard.rentPerMonth}`],
  ];
  const [showDetails, setShowDetails] = useState(false);

  const handleLogin = () => {
    navigation.navigate("Set Advertising Duration");
  };

  const handleShowDetails = () => {
    setShowDetails((currentState) => !currentState);
  };

  if (isFetching) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Fetching Billboard</Text>
      </View>
    );
  }

  if (error) {
    console.log(error);
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Failed tot Fetch!</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ marginBottom: 5, backgroundColor: "white" }}
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
            backgroundColor: "white",
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
            source={{ uri: billboardData?.billboard.image }}
            style={styles.billboardImage}
          />
        </View>

        <View style={styles.rectangle1}>
          <TouchableOpacity>
            <Image
              style={{ width: 40, height: 40, borderRadius: 100 }}
              source={
                billboardData?.owner.profilePicture
                  ? billboardData.owner.profilePicture
                  : require("../../assets/profilePicture.jpeg")
              }
            />
          </TouchableOpacity>
          <Text style={{ fontSize: 16, fontWeight: "400", marginLeft: 5 }}>
            {billboardData?.owner.name}
          </Text>
          <View style={{ flex: 1, alignItems: "flex-end", paddingRight: 10 }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ExploreMore", { billboardData });
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
