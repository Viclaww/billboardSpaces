import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar
} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../Protected/Home/HomeScreen'
import AddBillboard from '../Protected/AddBillboard/AddBillboard'
import Menu from '../Protected/Menu/Menu'
import More from '../Protected/More/More'
import Annoucment from '../Protected/Announcement/Annoucment'
import {
  Feather,
  AntDesign,
  Foundation,
  MaterialCommunityIcons
} from '@expo/vector-icons'
import {
  AnnouncementIcon,
  HomeIcon,
  MenuIcon,
  PlusIcon
} from '../Protected/components/Icons'

const Tab = createBottomTabNavigator()

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      top: -20,
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#0080FE',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
)

const Tabs = () => {
  StatusBar.setBarStyle('dark-content') // Change status bar style (light or dark)
  StatusBar.setBackgroundColor('#0080FE') // Change color as per your requirement
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: '#FFFFFF', // Set your desired background color here
          height: 72
        }
      }}
    >
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <HomeIcon color={focused ? '#0080FE' : '#383838'} />
            </View>
          )
        }}
      />
      <Tab.Screen
        name='Menu'
        component={Menu}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <MenuIcon color={focused ? '#0080FE' : '#383838'} />
            </View>
          )
        }}
      />
      <Tab.Screen
        name='AddBillboard'
        component={AddBillboard}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => <PlusIcon />,
          tabBarButton: props => <CustomTabBarButton {...props} />
        }}
      />
      <Tab.Screen
        name='Annoucment'
        component={Annoucment}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <AnnouncementIcon color={focused ? '#0080FE' : '#383838'} />
            </View>
          )
        }}
      />
      <Tab.Screen
        name='More'
        component={More}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text
                style={{
                  color: focused ? '#0080FE' : '#383838'
                }}
              >
                <Feather name='more-horizontal' size={30} />
              </Text>
            </View>
          )
        }}
      />
    </Tab.Navigator>
  )
}
const styles = StyleSheet.create({
  addBillboardButton: {
    marginBottom: 10
  }
})

export default Tabs
