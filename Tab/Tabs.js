import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../Screens/HomeScreen";
import AddBillboard from "./AddBillboard"
import Menu from "./Menu";
import More from "./More"
import Annoucment from "./Annoucment"
import { Foundation } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }) => (
    <TouchableOpacity onPress={onPress} style={{
        top: -20,
        justifyContent: 'center',
        alignItems: 'center',
    }}>
        <View style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: '#0080FE',   
        }}>
            {children}
        </View>
    </TouchableOpacity>
)

const Tabs = () => {

    StatusBar.setBarStyle('dark-content'); // Change status bar style (light or dark)
    StatusBar.setBackgroundColor('#0080FE'); // Change color as per your requirement
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarHideOnKeyboard:true,
                tabBarStyle: {
                    backgroundColor: "#FFFFFF", // Set your desired background color here
                    height: 72                              
                    
                }
            }}
        >
            <Tab.Screen name="HomeTab" component={HomeScreen} options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{
                            color: focused ? "#0080FE" : "#383838"
                        }}>
                            <Foundation name="home" size={30} />
                        </Text>
                    </View>
                )

            }} />
            <Tab.Screen name="Menu" component={Menu} options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{
                            color: focused ? "#0080FE" : "#383838"
                        }}>
                            <AntDesign name="menufold" size={30} />
                        </Text>
                    </View>
                )

            }} />
            <Tab.Screen name="AddBillboard" component={AddBillboard} options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <Image source={(require('../assets/AddBill.png'))}
                        resizeMode='contain' />
                ),
                tabBarButton: (props) => (
                    <CustomTabBarButton {...props} />
                )

            }} />
            <Tab.Screen name="Annoucment" component={Annoucment} options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{
                            color: focused ? "#0080FE" : "#383838"
                        }}>
                            <AntDesign name="notification" size={30} />
                        </Text>
                    </View>
                )

            }} />
            <Tab.Screen name="More" component={More} options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{
                            color: focused ? "#0080FE" : "#383838"
                        }}>
                            <Feather name="more-horizontal" size={30} />
                        </Text>
                    </View>
                )

            }} />
        </Tab.Navigator>
    );
}
const style = StyleSheet.create({

})

export default Tabs