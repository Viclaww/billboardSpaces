import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Platform,
  ScrollView,
  TextInput,
  SafeAreaView,
  Image,
  StatusBar,
  Pressable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  KeyboardAvoidingView
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { BASE_URL } from '../../apiConfig'
import { CheckMark } from './components/Icons'

export default function Subscription ({ navigation }) {
  const [showBillboardDetails, setShowBillboardDetails] = useState(false)
  const [showAdDetails, setShowAdDetails] = useState(true)
  const [showProTierDetails, setShowProTierDetails] = useState(false)
  const [activeButton, setActiveButton] = useState('ad')
  const [activeText, setActiveText] = useState('ad')

  const toggleAdDetails = () => {
    setShowAdDetails(true)
    setShowProTierDetails(false)
    setShowBillboardDetails(false) // Hide Billboard details when Ad details are shown
    setActiveButton('ad') // Set active button state to 'ad' when Ad button is pressed
    setActiveText('ad')
  }

  const toggleBillboardDetails = () => {
    setShowBillboardDetails(true)
    setShowProTierDetails(false)
    setShowAdDetails(false) // Hide Ad details when Billboard details are shown
    setActiveButton('billboard') // Set active button state to 'billboard' when Billboard button is pressed
    setActiveText('billboard')
  }

  const toggleProTierDetails = () => {
    setShowProTierDetails(true)
    setShowBillboardDetails(false) // Hide Billboard details when Pro Tier details are shown
    setShowAdDetails(false) // Hide Ad details when Pro Tier details are shown
    setActiveButton('pro') // Set active button state to 'pro' when Pro Tier button is pressed
    setActiveText('pro')
  }
  // API Integration
  const subscribe = async plan => {
    const endpointUrl = `${BASE_URL}/subscription/`

    try {
      const response = await fetch(endpointUrl, {
        method: 'POST',
        body: {
          plan
        }
      })
    } catch (error) {}
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', gap: 16, marginTop: 10 }}>
          <Ionicons
            onPress={() => {
              navigation.goBack()
            }}
            name='arrow-back-outline'
            size={35}
            color='black'
          />
          <Text
            style={{
              fontWeight: '500',
              fontSize: 22,
              lineHeight: 26.63,
              alignSelf: 'center'
            }}
          >
            Subscription
          </Text>
        </View>
        {showAdDetails && (
          <View>
            <Image
              style={{ width: '55%', height: 133.38, alignSelf: 'center' }}
              source={require('../../assets/sub.png')}
            />

            <View style={{ marginTop: 20, width: '100%', height: 54 }}>
              <Text style={{ fontWeight: '400', fontSize: 22, left: 16 }}>
                Basic Tier
              </Text>
            </View>
            <View style={styles.DetailsContainer}>
              <View style={styles.Details}>
                <View style={styles.circle}></View>
                <Text style={styles.detailsText}>
                  Access to a curated selection of billboards.
                </Text>
              </View>

              <View style={styles.line}></View>

              <View style={styles.Details}>
                <View style={styles.circle}></View>
                <Text style={styles.detailsText}>
                  Basic search functionality.
                </Text>
              </View>

              <View style={styles.line}></View>

              <View style={styles.Details}>
                <View style={styles.circle}></View>
                <Text style={styles.detailsText}>
                  Limited customization options (e.g. favorite billboards,
                  location-based filters).
                </Text>
              </View>
            </View>
          </View>
        )}

        {showProTierDetails && (
          <View>
            <Image
              style={{ width: '40%', height: 133.38, alignSelf: 'center' }}
              source={require('../../assets/sub3.png')}
            />

            <View style={{ marginTop: 20, width: '100%', height: 54 }}>
              <Text style={{ fontWeight: '400', fontSize: 22, left: 16 }}>
                Pro Tier
              </Text>
            </View>

            <View style={styles.DetailsContainer}>
              <View style={styles.Details}>
                <View style={styles.circle}></View>
                <Text style={styles.detailsText}>
                  All Premium Tier features.
                </Text>
              </View>

              <View style={styles.line2}></View>

              <View style={styles.Details2}>
                <View style={styles.circle}></View>
                <Text style={styles.detailsText}>
                  Exclusive access to premium billboards (e.g., limited-edition
                  artworks, celebrity endorsements).
                </Text>
              </View>

              <View style={styles.line3}></View>

              <View style={styles.Details}>
                <View style={styles.circle}></View>
                <Text style={styles.detailsText}>
                  Priority customer support.
                </Text>
              </View>

              <View style={styles.line2}></View>

              <View style={styles.Details2}>
                <View style={styles.circle}></View>
                <Text style={styles.detailsText}>
                  Advanced customization (e.g., custom themes, font styles).{' '}
                </Text>
              </View>

              <View style={styles.line2}></View>

              <View style={styles.Details}>
                <View style={styles.circle}></View>
                <Text style={styles.detailsText}>
                  Ability to submit user-generated billboards.{' '}
                </Text>
              </View>
            </View>
          </View>
        )}

        {showBillboardDetails && (
          <View>
            <Image
              style={{ width: '40%', height: 133.38, alignSelf: 'center' }}
              source={require('../../assets/sub3.png')}
            />

            <View style={{ marginTop: 20, width: '100%', height: 54 }}>
              <Text style={{ fontWeight: '400', fontSize: 22, left: 16 }}>
                Premium Tier
              </Text>
            </View>

            <View style={styles.DetailsContainer}>
              <View style={styles.Details}>
                <View style={styles.circle}></View>
                <Text style={styles.detailsText}>
                  All Premium Tier features.
                </Text>
              </View>

              <View style={styles.line2}></View>

              <View style={styles.Details}>
                <View style={styles.circle}></View>
                <Text style={styles.detailsText}>Ad-free experience.</Text>
              </View>

              <View style={styles.line2}></View>

              <View style={styles.Details}>
                <View style={styles.circle}></View>
                <Text style={styles.detailsText}>
                  High-resolution billboard images.
                </Text>
              </View>

              <View style={styles.line2}></View>

              <View style={styles.Details2}>
                <View style={styles.circle}></View>
                <Text style={styles.detailsText}>
                  Personalized recommendations based on user preferences.{' '}
                </Text>
              </View>

              <View style={styles.line2}></View>

              <View style={styles.Details}>
                <View style={styles.circle}></View>
                <Text style={styles.detailsText}>
                  Ability to create custom collections of favorite billboards.{' '}
                </Text>
              </View>
            </View>
          </View>
        )}

        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={{ marginTop: 50, flex: 1 }}
        >
          <TouchableOpacity
            onPress={toggleAdDetails}
            style={[
              styles.buttonParent,
              activeButton === 'ad' ? styles.activeButton : null
            ]}
          >
            <View
              style={[
                styles.button,
                activeText === 'ad' ? styles.activeText : null
              ]}
            >
              <Text style={{ fontSize: 16 }}>Basic Tier</Text>

              {activeText == 'ad' && <CheckMark />}
            </View>
            <Text
              style={[
                styles.button,
                activeText === 'billboard' ? styles.activeText : null
              ]}
            >
              $100/month
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggleProTierDetails}
            style={[
              styles.buttonParent2,
              activeButton === 'pro' ? styles.activeButton : null
            ]}
          >
            <View
              style={[
                styles.button,
                activeText === 'pro' ? styles.activeText : null
              ]}
            >
              <Text style={{ fontSize: 16 }}>Pro Tier</Text>
              {activeText == 'pro' && <CheckMark />}
            </View>
            <Text
              style={[
                styles.button,
                activeText === 'pro' ? styles.activeText : null
              ]}
            >
              $500/month
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggleBillboardDetails}
            style={[
              styles.buttonParent3,
              activeButton === 'billboard' ? styles.activeButton : null
            ]}
          >
            <View
              style={[
                styles.button,
                activeText === 'billboard' ? styles.activeText : null
              ]}
            >
              <Text style={{ fontSize: 16 }}>Premium Tier</Text>
              {activeText == 'billboard' && <CheckMark />}
            </View>
            <Text
              style={[
                styles.button,
                activeText === 'billboard' ? styles.activeText : null
              ]}
            >
              $1000/month
            </Text>
          </TouchableOpacity>
        </ScrollView>

        <TouchableOpacity
          style={{
            marginTop: 60,
            width: '100%',
            height: 40,
            backgroundColor: '#0080FE',
            justifyContent: 'center',
            borderRadius: 10,
            bottom: 10
          }}
        >
          <Text
            style={{
              color: '#FFFFFF',
              fontWeight: '500',
              fontSize: 14,
              alignSelf: 'center'
            }}
          >
            Subscribe
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    alignItems: 'center',
    paddingHorizontal: 16
  },
  buttonParent: {
    borderRadius: 10,
    width: '40%',
    height: 100,
    padding: 10,
    flex: 1,
    backgroundColor: '#66B3FF33',
    justifyContent: 'space-between'
  },
  buttonParent2: {
    borderRadius: 10,
    width: '40%',
    height: 100,
    padding: 10,
    flex: 1,
    marginLeft: 16,
    borderStyle: 'solid',
    backgroundColor: '#66B3FF33',
    justifyContent: 'space-between'
  },
  buttonParent3: {
    borderRadius: 10,
    width: '40%',
    height: 100,
    padding: 10,
    flex: 1,
    marginLeft: 16,
    borderStyle: 'solid',

    backgroundColor: '#66B3FF33',
    justifyContent: 'space-between'
  },
  button: {
    fontSize: 21,
    fontWeight: '500',
    color: '#1E1E1E',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  activeButton: {
    borderColor: '#0080FE', // Border color when button is active
    borderWidth: 2
  },
  activeText: {
    alignItems: 'center',
    gap: 10
  },
  DetailsContainer: {
    left: 16
  },
  Details: {
    width: '80%',
    // backgroundColor: 'red',
    flexDirection: 'row',
    gap: 9,
    height: 38
  },
  Details2: {
    width: '80%',
    // backgroundColor: 'red',
    flexDirection: 'row',
    gap: 9
    // height: 38
  },
  circle: {
    backgroundColor: '#0080FE',
    width: 19,
    height: 19,
    borderRadius: 100
  },
  detailsText: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 19.36
  },
  line: {
    borderWidth: 1,
    height: 50,
    width: 1,
    left: 9.5,
    top: -10,
    backgroundColor: '#808080'
  },
  line2: {
    borderWidth: 1,
    height: 30,
    width: 2,
    left: 9.5,
    top: -10,
    backgroundColor: '#808080'
  },
  line3: {
    borderWidth: 1,
    height: 30,
    width: 0.5,
    left: 9.5,
    top: -20,
    backgroundColor: '#808080'
  }
})
