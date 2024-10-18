import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  SafeAreaView,
  Image,
  StatusBar,
  Pressable,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useGetBillboardsByUserQuery } from "../../data/api/billboardSlice";
import { useSelector } from "react-redux";

export default function MyBillboard({ navigation }) {
  const [billboard, setBillboard] = useState();
  // const [error, setError] = useState(null);
  const user = useSelector((state) => state.user);
  console.log(user);
  const { data, error, isError, isFetching } = useGetBillboardsByUserQuery({
    token: user.token
  });
  console.log(data);
  console.log(error);
  console.log("Error/FEtching:", isError, isFetching);
  // if(isError) {
  //   console.log(error);
  //   Alert.alert('Error', 'Error fetching billboards')
  // }
  console.log("Data:", data);
  // setBillboard(data.data);
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
        <View
          style={{
            backgroundColor: "white",
            flexDirection: "row",
            gap: 16,
            marginTop: 10,
          }}
        >
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

        {(billboard?.length === 0 || !billboard) && (
          <View
            style={{
              marginTop: 100,
              paddingHorizontal: 15,
              paddingVertical: 30,
            }}
          >
            <Image
              resizeMode="cover"
              source={require("../../assets/oops.png")}
              style={styles.billboardImage}
            />
            <Text
              style={{
                fontSize: 20,
                textAlign: "center",
              }}
            >
              Oops! No billboards yet
            </Text>
          </View>
        )}
        {isError && (
          <View
            style={{
              marginTop: 100,
              paddingHorizontal: 15,
              paddingVertical: 30,
            }}
          >
            <Image
              resizeMode="cover"
              source={require("../../assets/oops.png")}
              style={styles.billboardImage}
            />
            <Text
              style={{
                fontSize: 20,
                textAlign: "center",
              }}
            >
              Oops! Error finding billboards!
            </Text>
          </View>
        )}
        {billboard?.length !== 0 && (
          <View style={{}}>
            <View style={{}}>
              {billboard &&
                billboard?.map((billboard, index) => (
                  <BillboardComp key={index} billboard={billboard} />
                ))}
            </View>
          </View>
        )}
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
    backgroundColor: "white",
  },
  billboardImage: {
    width: "90%",
    height: 274,
    borderRadius: 10,
  },
});
