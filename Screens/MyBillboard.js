import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../apiConfig";

export default function MyBillboard({ navigation }) {
  const [billboard, setBillboard] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBillboards = async () => {
      const endpointUrl = `${BASE_URL}/billboards/user/`;
      try {
        // Retrieve the access token from AsyncStorage
        const storedAccess = await AsyncStorage.getItem("access");

        const response = await fetch(endpointUrl, {
          headers: {
            Authorization: `Bearer ${storedAccess}`, // Use the retrieved token in the request headers
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();
        setBillboard(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError(error.message);
      }
    };
    fetchBillboards();
  }, []); // Remove 'access' from the dependencies array since it's not needed here

  const BillboardComp = ({ billboard }) => {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate("Billboardclicked2", { data: billboard });
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 16,
            marginRight: 10,
            marginTop: 10,
          }}
        >
          <MaterialCommunityIcons
            style={{ marginLeft: 20 }}
            name="map-marker"
            size={20}
            color="#0080FE"
          />
          <Text
            style={{
              fontSize: 16,
              fontWeight: "400",
              alignSelf: "center",
            }}
          >
            {billboard.location}
          </Text>
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
            <Feather
              style={{
                alignSelf: "center",
              }}
              name="more-vertical"
              size={20}
              color="black"
            />
          </View>
        </View>
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <Image
            resizeMode="cover"
            source={{ uri: billboard.image }}
            style={styles.billboardImage}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 5,
            marginRight: 20,
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
      </Pressable>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
            My Billboards
          </Text>
        </View>

        <View style={{}}>
          <View style={{}}>
            {billboard &&
              billboard.map((billboard, index) => (
                <BillboardComp key={index} billboard={billboard} />
              ))}
          </View>
        </View>
        {/* <Pressable onPress={() => {
                    navigation.navigate('Billboardclicked2')
                }}>
                    <View style={{
                        flexDirection: 'row',
                        gap: 16,
                        marginRight: 10,
                        marginTop: 10,
                    }}>
                        <MaterialCommunityIcons style={{ marginLeft: 20, }} name="map-marker" size={20} color="#0080FE" />
                        <Text style={{
                            fontSize: 16,
                            fontWeight: '400',
                            alignSelf: 'center'
                        }}>
                            Aka Road, Uyo, Akwa..
                        </Text>
                        <View style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row', gap: 16 }}>
                            <Fontisto style={{
                                alignSelf: 'center'
                            }} name="share-a" size={20} color="black" />
                            <Feather style={{
                                alignSelf: 'center'
                            }} name="more-vertical" size={20} color="black" />
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', marginTop: 10, }}>
                        <Image resizeMode="cover" source={require('/Billboard Spaces/BillboardSpaces/assets/profilePicture.jpeg')} style={styles.billboardImage} />
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        gap: 5,
                        marginRight: 20
                    }}>
                        <Text style={{
                            fontSize: 12,
                            fontWeight: '400',
                            alignSelf: 'center',
                            color: '#525252',
                            marginLeft: 20,
                            fontStyle: 'italic'
                        }}>Posted</Text>
                        <Text style={{
                            fontSize: 12,
                            fontWeight: '400',
                            alignSelf: 'center',
                            color: '#525252',
                            fontStyle: 'italic'
                        }}>
                            Aka Road, Uyo, Akwa..
                        </Text>

                        <View style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row', gap: 4 }}>
                            <Ionicons style={{
                                alignSelf: 'center'
                            }} name="eye-outline" size={12} color="#525252" />
                            <Text style={{
                                fontSize: 12,
                                fontWeight: '400',
                                alignSelf: 'center',
                                color: '#525252'
                            }}>104</Text>
                        </View>
                    </View>
                </Pressable> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    marginBottom: 10,
  },
  billboardImage: {
    width: "90%",
    height: 274,
    borderRadius: 10,
  },
});
