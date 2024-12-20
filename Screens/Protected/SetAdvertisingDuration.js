import React, { useState, useRef } from 'react'
import {
  StyleSheet,
  Platform,
  Text,
  View,
  TextInput,
  SafeAreaView,
  StatusBar,
  Modal,
  Pressable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  ActivityIndicator,
  Dimensions
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Paystack } from 'react-native-paystack-webview'
import { AntDesign } from '@expo/vector-icons'
import {
  useInitiateBookingMutation,
  useValidateBookingMutation
} from '../../data/api/billboardSlice'
import { useSelector } from 'react-redux'

export default function SetAdvertisingDuration ({ navigation, route }) {
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedText, setSelectedText] = useState('')
  const [selectedState, setSelectedState] = useState('')
  const [fieldModalVisible, setFieldModalVisible] = useState(false)
  const [timelineModalVisible, settimelineModalVisible] = useState(false)
  const [bookingFormat, setBookingFormat] = useState('monthly')
  const [mordalEmail, setMordalEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const token = useSelector(state => state.user.token)
  const [timeline, setTimeLine] = useState(0)
  const [transactionId, setTransactionId] = useState('')
  console.log(route.params.data.billboard.rentPerMonth)
  const [initiateBooking] = useInitiateBookingMutation()
  const [validateBooking] = useValidateBookingMutation()

  const rentPerMonth = route.params.data.billboard.rentPerMonth

  const calculatePrice = () => {
    if (bookingFormat == 'monthly') {
      return timeline * rentPerMonth
    } else {
      return timeline * rentPerMonth * 11
    }
  }
  const openFieldModal = () => {
    setFieldModalVisible(true)
  }

  const openStateModal = () => {
    settimelineModalVisible(true)
  }

  const handleInitiatePayment = async billboardId => {
    setIsLoading(true)
    try {
      console.log('this')
      const response = await initiateBooking({ token, body: { billboardId } })

      if (response.data) {
        console.log(response.data)
        setTransactionId(response.data.data.transactionId)
        paystackWebViewRef.current.startTransaction()
      } else {
        Alert.alert(response.error.data.message || 'Something Went Wrong!')
        console.log(response.error)
      }
    } catch (error) {}
    setIsLoading(false)
  }

  const closeFieldModal = () => {
    setFieldModalVisible(false)
  }

  const closeStateModal = () => {
    settimelineModalVisible(false)
  }

  const openModal = () => {
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  const handleTextSelection = text => {
    setSelectedText(text)
    setBookingFormat(text.toLowerCase())
    closeFieldModal()
    if (selectedState !== '') {
      openModal() // Open the modal if both options are selected
    }
  }

  const handleTimeLineSelection = text => {
    setSelectedState(text)
    setTimeLine(text)
    closeStateModal()
    if (selectedText !== '') {
      openModal() // Open the modal if both options are selected
    }
  }
  const paystackWebViewRef = useRef()
  return (
    <SafeAreaView style={styles.container}>
      <Paystack
        paystackKey='pk_test_6892bd6c7ad948f65d0d583d7e23de43a0f5bb60'
        billingEmail='w@billboardspaces.com'
        channels={['card', 'bank', 'ussd', 'qr', 'mobile_money']}
        amount={calculatePrice()}
        onCancel={e => {
          console.log(e)
          // handle response here
        }}
        onSuccess={async res => {
          console.log(res.data.transactionRef.reference)
          setIsLoading(true)
          const response = await validateBooking({
            body: {
              ref: res.data.transactionRef.reference,
              trxId: transactionId,
              billboardId: route.params.data.billboard._id,
              duration: timeline,
              bookingFormat: bookingFormat
            },
            token
          })
          console.log(response)
          if (response.data) {
            navigation.navigate('Billboardclicked', {
              data: route.params.data.billboard
            })
            setLoading(false)
            return
          }
          alert('Payment Failed')
          setLoading(false)
        }}
        ref={paystackWebViewRef}
      />
      {/* <View style={styles.firstView}>
                <Ionicons name="arrow-back-outline" size={40} color="black" />
                <Text style={styles.text1}>Set Advertising Duration</Text>
            </View> */}
      <Text style={styles.text2}>Select Period of Booking</Text>
      <TouchableOpacity style={{}} onPress={openFieldModal}>
        <View style={styles.rectangleView1}>
          <Text style={{ padding: 10 }}>
            {selectedText !== '' ? selectedText : 'Select an option'}
          </Text>
          <View style={styles.arrowContainer}>
            <AntDesign
              style={styles.arrow}
              name='down'
              size={20}
              color='black'
            />
          </View>
        </View>
      </TouchableOpacity>
      <Modal
        visible={fieldModalVisible}
        transparent={true}
        animationType='slide'
      >
        <Pressable style={styles.modalContainer} onPress={closeFieldModal}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => handleTextSelection('Annually')}>
              <Text style={styles.billboardOwner}>Annually</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTextSelection('Monthly')}>
              <Text style={styles.billboardOwner}>Monthly</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
      <Text style={styles.text3}>Select Timeline of Usage</Text>
      <TouchableOpacity onPress={openStateModal}>
        <View style={styles.rectangleView2}>
          <Text style={{ padding: 10 }}>
            {selectedState !== '' ? selectedState : 'Enter timeline'}
          </Text>
          <View style={styles.arrowContainer}>
            <AntDesign
              style={styles.arrow}
              name='down'
              size={20}
              color='black'
            />
          </View>
        </View>
      </TouchableOpacity>
      <Modal
        visible={timelineModalVisible}
        transparent={true}
        animationType='slide'
      >
        <Pressable style={styles.modalContainer2} onPress={closeStateModal}>
          <View style={styles.modalContent2}>
            <TouchableOpacity onPress={() => handleTimeLineSelection(1)}>
              <Text style={styles.billboardOwner}>1 year</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTimeLineSelection(2)}>
              <Text style={styles.billboardOwner}>2 years</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTimeLineSelection(3)}>
              <Text style={styles.billboardOwner}>3 years</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTimeLineSelection(4)}>
              <Text style={styles.billboardOwner}>4 years</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTimeLineSelection(5)}>
              <Text style={styles.billboardOwner}>5 years</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      <Modal visible={modalVisible} transparent={true} animationType='fade'>
        <Pressable style={styles.modalContainer3} onPress={closeModal}>
          <TouchableWithoutFeedback
            onPress={() => console.log('Tapped inside modal')}
          >
            <View style={styles.modalContent3}>
              <Text style={styles.forgotYourPassword1}>Period of Booking</Text>
              <View style={styles.rectangleView3}>
                <Text style={styles.email}>
                  {selectedText !== '' ? selectedText : 'Select an option'}
                </Text>
              </View>
              <Text style={styles.timeLine}>Timeline of Usage</Text>
              <View style={styles.rectangleView3}>
                <Text style={styles.email}>
                  {selectedState !== '' ? selectedState : 'Enter state'}
                </Text>
              </View>
              <Text style={styles.timeLine}>Price</Text>
              <Text style={{ paddingTop: 6 }}>
                N{calculatePrice().toLocaleString()}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  handleInitiatePayment(route.params.data.billboard._id)
                }}
                style={{
                  width: '100%',
                  paddingHorizontal: 20,
                  paddingVertical: 10,

                  backgroundColor: '#0080FE',
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 40
                }}
              >
                {isLoading ? (
                  <ActivityIndicator></ActivityIndicator>
                ) : (
                  <Text style={{ color: '#fff' }}>Proceed to Pay</Text>
                )}
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </Pressable>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  firstView: {
    flexDirection: 'row',
    padding: 20
  },
  text1: {
    padding: 6,
    fontSize: 22,
    paddingLeft: 16
  },
  text2: {
    paddingLeft: 16
  },
  modalContainer: {
    flex: 1
    // alignItems: 'center',
  },
  modalContent: {
    marginTop: '40%',
    marginLeft: 16,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#f5faff',
    padding: 15,
    width: '90%',
    height: '19%'
  },
  billboardOwner: {
    fontSize: 14,
    fontWeight: '500',
    color: '#383838',
    // paddingTop: 5,
    padding: 10
  },
  rectangleView1: {
    borderRadius: 10,
    backgroundColor: '#f5faff',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: 'rgba(204, 204, 204, 0.25)',
    flexDirection: 'row',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 2,
    elevation: 2,
    shadowOpacity: 1,
    borderStyle: 'solid',
    // borderColor: "#0080fe",
    marginTop: '4%',
    marginLeft: 16,
    // borderWidth: 1,
    width: '90%',
    height: 50
  },
  text3: {
    paddingLeft: 16,
    paddingTop: 20
  },
  rectangleView2: {
    borderRadius: 10,
    backgroundColor: '#f5faff',
    alignItems: 'center',
    marginLeft: 16,
    justifyContent: 'space-between',
    shadowColor: 'rgba(204, 204, 204, 0.25)',
    flexDirection: 'row',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 2,
    elevation: 2,
    shadowOpacity: 1,
    borderStyle: 'solid',
    borderColor: '#f5faff',
    marginTop: '5%',
    borderWidth: 1,
    width: '90%',
    height: 'auto'
  },
  modalContainer2: {
    flex: 1,
    marginLeft: 16
  },
  modalContent2: {
    marginTop: '73%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#f5faff',
    padding: 15,
    width: '93.7%',
    height: '30%'
  },
  modalContainer3: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent3: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: '#fff',
    padding: 20,
    width: '100%',
    height: 367
    // alignItems: 'center'
  },
  forgotYourPassword1: {
    color: '#1e1e1e',
    paddingTop: 20
  },
  timeLine: {
    paddingTop: 10
  },
  email: {
    fontSize: 12,
    padding: 10,
    color: '#808080',
    fontWeight: 'bold'
  },
  rectangleView3: {
    borderRadius: 10,
    backgroundColor: '#f5faff',
    justifyContent: 'center',
    shadowColor: 'rgba(204, 204, 204, 0.25)',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 2,
    marginTop: '3%',
    elevation: 2,
    shadowOpacity: 1,
    width: '100%',
    height: 40
  }
})
