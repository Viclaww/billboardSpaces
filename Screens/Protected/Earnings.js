import {
  ActivityIndicator,
  Alert,
  BackHandler,
  Dimensions,
  Modal,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  TextInput
} from 'react-native'
import { Text } from 'react-native'
import { SafeAreaView, ScrollView, View } from 'react-native'
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native'
import {
  useAddBankDetailsMutation,
  useGetEarningQuery,
  useLazyGetBanksQuery,
  useLazyRequestQuery,
  useLazyRequestWithdrawalQuery,
  useResolveAccountMutation
} from '../../data/api/billboardSlice'
import { useSelector } from 'react-redux'
import { formatTimestamp } from '../utils/functions'
import { Image } from 'react-native'
const AHistory = ({ transaction }) => {
  // if (transaction.status == "unpaid") return;
  return (
    <View
      key={transaction._id}
      style={{
        display: 'flex',
        width: '100%',
        padding: 14,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          //   width: "100%",
          gap: 15
        }}
      >
        <View
          style={{
            backgroundColor: '#EBF8FE',
            // width: "10%",
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            borderRadius: 30
            // transform: [{ rotate: "30deg" }],
          }}
        >
          <Ionicons
            onPress={() => {
              navigation.goBack()
            }}
            name='person-outline'
            size={25}
            color='#0080FE'
          />
        </View>
        <View
          style={{
            fontSize: 20,
            display: 'flex',
            flexDirection: 'column',
            gap: 5
          }}
        >
          <Text
            style={{
              fontSize: 16
            }}
          >
            {transaction.transactionType == 'booking'
              ? 'Billboard Booking'
              : 'Billboard'}
          </Text>

          <Text
            style={{
              fontSize: 16,
              color: '#999999'
            }}
          >
            {formatTimestamp(transaction.transactionDate)}
          </Text>
        </View>
      </View>
      <View>
        <Text
          style={{
            color: 'green',
            fontWeight: '800',
            fontSize: 20
          }}
        >
          {transaction.amount
            ? `N${transaction.amount.toLocaleString()}`
            : 'unpaid'}
        </Text>
      </View>
    </View>
  )
}

export default function Earnings ({ navigation }) {
  const token = useSelector(state => state.user.token)
  const [history, setHistory] = useState([])
  const { data, error, isFetching: isLoading } = useGetEarningQuery({ token })

  const [banks, setBanks] = useState([])
  const [selectedBank, setSelectedBank] = useState(null)
  const [accountNumber, setAccountNumber] = useState('')
  const [accountName, setAccountName] = useState('')
  const [getBanks, { isFetching }] = useLazyGetBanksQuery()
  const [resolveAccount, { isLoading: resolving, error: resolveError }] =
    useResolveAccountMutation()
  const [addBankDetails, { isLoading: isAdding, error: addingDetailsError }] =
    useAddBankDetailsMutation()
  const [request] = useLazyRequestQuery()
  useEffect(() => {
    const backAction = () => {
      // Your custom back action
      navigation.goBack()
      return true
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    )

    return () => backHandler.remove()
  }, [])
  useEffect(() => {
    if (data) {
      setHistory(data.data.history)
      // console.log(history[0]);
      console.log(data)
    }
    if (error) {
      console.log(error)
    }
  }, [data])

  const handleUpdateDetails = async () => {
    if (!selectedBank || !accountNumber || !accountName) {
      Alert.alert('Add Valid Details')
    }
    try {
      const response = await addBankDetails({
        token,
        body: {
          accountNumber,
          accountName,
          bankName: selectedBank.name,
          bankCode: selectedBank.code
        }
      })
      console.log(response)
      if (response.data) {
        Alert.alert('Details Added Successfully')
        setModalVisible(false)
      }
    } catch (error) {
      console.error('adding details error', error)
    }
  }

  const handleWithdraw = async () => {
    const response = await request({ token, amount: 1000 })
    console.log(response)
  }
  useEffect(() => {
    const resolve = async () => {
      const response = await resolveAccount({
        token,
        body: { accountNumber, bankCode: selectedBank.code }
      })
      // console.log(response);
      if (response.data) {
        setAccountName(response.data.data.account_name)
      }
      return response
    }

    if (accountNumber.length == 10 && selectedBank) {
      resolve()
    }
  }, [accountNumber, selectedBank])
  const openBankModal = async () => {
    try {
      setBanskModalVisible(true)
      const response = await getBanks({ token })
      // console.log(response);
      if (response.data) {
        setBanks(response.data.data)
        return
      }

      console.log('Fetching Banks', response.error)
    } catch (error) {
      console.log(error)
    }
  }

  const handleAccoutNumberInput = text => {
    if (accountNumber.length == 10 && text.length > 10) return
    setAccountNumber(text)
  }
  const handleSelectedBank = bank => {
    setSelectedBank(bank)
    setBanskModalVisible(false)
  }
  const [modalVisible, setModalVisible] = useState(false)
  const [banksModalVisible, setBanskModalVisible] = useState(false)
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ color: 'black' }}
        horizontal={false}
        showsVerticalScrollIndicator={false}
      >
        <Modal visible={modalVisible} transparent={true} animationType='fade'>
          <KeyboardAvoidingView
            style={{
              flex: 1,
              gap: 40,
              display: 'flex',
              flexDirection: 'column'
            }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <Pressable
              style={styles.modalContainer}
              // onPress={closeModal}
            >
              <TouchableWithoutFeedback
                onPress={() => console.log('Tapped inside modal')}
              >
                <View style={styles.modalContent}>
                  <View
                    style={
                      {
                        borderRadius: 10,
                        backgroundColor: '#f5faff',
                        justifyContent: 'center',
                        width: '100%',
                        shadowColor: 'rgba(204, 204, 204, 0.25)',
                        shadowOffset: {
                          width: 0,
                          height: 2
                        }
                      }
                      // modalEmailFocused && {
                      //   borderColor: "#0080fe",
                      //   borderWidth: 1,
                      // },
                    }
                  >
                    <AntDesign
                      onPress={() => {
                        setModalVisible(false)
                      }}
                      style={{
                        position: 'absolute',
                        top: 20,
                        left: '90%',
                        zIndex: 20
                      }}
                      name='close'
                      size={25}
                      color='#000'
                    />
                    <View
                      style={{
                        display: 'flex',
                        gap: 10,
                        marginTop: 30
                      }}
                    >
                      <Text>Bank Name</Text>
                      <TouchableOpacity onPress={openBankModal}>
                        <TextInput
                          readOnly
                          value={selectedBank?.name}
                          style={{
                            fontSize: 12,
                            textAlign: 'left',
                            // backgroundColor:'red',
                            padding: 10,
                            borderWidth: 1,
                            borderColor: '#eee',
                            borderRadius: 5,
                            color: 'black',
                            height: 40,
                            fontWeight: '400',
                            width: '100%'
                          }}
                          placeholder='Select Bank'
                        />
                        <AntDesign
                          onPress={() => {
                            navigation.goBack()
                          }}
                          style={{
                            position: 'absolute',
                            top: 12,
                            left: '92%'
                          }}
                          name='right'
                          size={16}
                          color='#000'
                        />
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        display: 'flex',
                        gap: 10,
                        marginTop: 30
                      }}
                    >
                      <Text>Account Number</Text>
                      <TextInput
                        style={{
                          fontSize: 12,
                          textAlign: 'left',
                          // backgroundColor:'red',
                          padding: 10,
                          borderWidth: 1,
                          borderColor: '#eee',
                          borderRadius: 5,
                          color: 'black',
                          height: 40,
                          fontWeight: '400',
                          width: '100%'
                        }}
                        placeholder='Account Number'
                        value={accountNumber}
                        keyboardType='number-pad'
                        onChangeText={text => handleAccoutNumberInput(text)}
                        // onFocus={handleModalEmailFocus}
                        // onBlur={handleInputBlur}
                      />
                    </View>
                    <View
                      style={{
                        display: 'flex',
                        gap: 10,
                        marginTop: 30
                      }}
                    >
                      <Text>Account Name</Text>
                      <TextInput
                        readonly
                        style={{
                          fontSize: 12,
                          textAlign: 'left',
                          // backgroundColor:'red',
                          padding: 10,
                          borderWidth: 1,
                          borderColor: '#eee',
                          borderRadius: 5,
                          color: 'black',
                          height: 40,
                          fontWeight: '400',
                          width: '100%'
                        }}
                        value={accountName}
                        placeholder={
                          resolving
                            ? 'Resolving'
                            : resolveError
                            ? 'failed to resolve account'
                            : 'Account Name'
                        }
                        // value={mordalEmail}
                        // onChangeText={(text) => setMordalEmail(text)}
                        // onFocus={handleModalEmailFocus}
                        // onBlur={handleInputBlur}
                      />
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={handleUpdateDetails}
                    style={{
                      backgroundColor: '#0080FE',
                      width: '100%',
                      display: 'flex',
                      color: 'white',
                      textAlign: 'center',
                      justifyContent: 'center',
                      padding: 10,
                      marginTop: 50,
                      borderRadius: 10
                    }}
                  >
                    {isAdding ? (
                      <ActivityIndicator size='small' />
                    ) : (
                      <Text
                        style={{
                          textAlign: 'center',
                          color: 'white'
                        }}
                      >
                        Update
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </Pressable>
          </KeyboardAvoidingView>
        </Modal>
        <Modal
          visible={banksModalVisible}
          transparent={true}
          animationType='slide'
        >
          <>
            <View
              style={{
                flex: 1,
                gap: 40,
                display: 'flex',
                flexDirection: 'column'
              }}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
              <AntDesign
                onPress={() => {
                  setBanskModalVisible(false)
                }}
                style={{
                  position: 'absolute',
                  top: 20,
                  left: '90%',
                  zIndex: 20
                }}
                name='close'
                size={25}
                color='#000'
              />
              <Pressable
                style={styles.modalContainer}
                // onPress={closeModal}
              >
                <TouchableWithoutFeedback
                  onPress={() => console.log('Tapped inside modal')}
                >
                  <View
                    style={{
                      backgroundColor: '#fff',
                      padding: 20,
                      width: '100%',
                      height: '100%',
                      marginTop: 100
                      // alignItems: "center",
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: '900'
                        }}
                      >
                        Select Bank
                      </Text>
                    </View>
                    {isFetching ? (
                      <ActivityIndicator />
                    ) : (
                      <ScrollView>
                        {banks && banks.length > 0 ? (
                          banks.map(bank => (
                            <TouchableOpacity
                              onPress={() => handleSelectedBank(bank)}
                              key={bank.slug}
                            >
                              <View
                                style={{
                                  marginTop: 40
                                }}
                              >
                                <Text
                                  style={{
                                    fontSize: 18
                                  }}
                                >
                                  {bank.name}
                                </Text>
                              </View>
                            </TouchableOpacity>
                          ))
                        ) : (
                          <Text>Failed To Fetch Banks</Text>
                        )}
                      </ScrollView>
                    )}
                  </View>
                </TouchableWithoutFeedback>
              </Pressable>
            </View>
          </>
        </Modal>
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
            Earning
          </Text>
        </View>
        <View
          style={{
            backgroundColor: '#66B3FFCC',
            padding: 16,
            color: 'white',
            borderRadius: 20,
            display: 'flex',
            flexDirection: 'row',
            marginVertical: 24,
            justifyContent: 'space-between',
            // alignItems:"center",
            flexWrap: 'wrap',
            gap: 10
          }}
        >
          <View
            style={{
              backgroundColor: '#E1F5FE',
              color: 'white',
              width: 'auto',
              // flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              gap: 10,
              // display: "flex",
              paddingHorizontal: 10,
              paddingVertical: 0,
              flexDirection: 'row',
              borderRadius: 10,
              height: 24
            }}
          >
            <Text
              style={{
                fontSize: 13
              }}
            >
              Balance
            </Text>
            <Ionicons
              onPress={() => {
                navigation.goBack()
              }}
              name='eye-outline'
              size={20}
              color='black'
            />
          </View>
          {data?.data?.bank_details?.account_name && (
            <TouchableOpacity
              onPress={handleWithdraw}
              style={{
                backgroundColor: '#0080FE',
                width: 'auto',
                display: 'flex',
                paddingHorizontal: 15,
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 9,
                borderRadius: 10
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: 'white'
                }}
              >
                Withdraw
              </Text>
            </TouchableOpacity>
          )}
          <View
            style={{
              width: '100%'
            }}
          >
            <Text
              style={{
                fontSize: 25,
                fontWeight: '500',
                paddingVertical: 5,
                color: '#383838'
              }}
            >
              {data ? (
                `₦${data?.data.balance.toLocaleString()}`
              ) : isLoading ? (
                <ActivityIndicator></ActivityIndicator>
              ) : (
                <Text>failed to get Details</Text>
              )}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            borderWidth: 1,
            backgroundColor: '#FAFCFF',
            borderRadius: 10,
            display: 'flex',
            width: '100%',
            padding: 14,
            borderColor: '#F2F2F2',
           flexWrap:"wrap"
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              gap: 15,
            }}
          >
            <View
              style={{
                backgroundColor: '#EBF8FE',
                width: 47,
                height: 47,
                justifyContent: 'center',
                alignSelf: 'center',
                alignItems:"center",
                padding: 10,
                borderRadius: 30
              }}
            >
              {data?.data?.bank_details?.account_number ? (
                <MaterialCommunityIcons
                  name='bank-outline'
                  size={24}
                  color='#383838'
                />
              ) : (
                <Ionicons
                  onPress={() => {
                    // navigation.goBack();
                  }}
                  name='notifications-outline'
                  size={25}
                  color='#0080FE'
                  style={{ transform: [{ rotate: '30deg' }] }}
                />
              )}
            </View>
            <View
              style={{
                fontSize: 20,
                display: 'flex',
                flexDirection: 'column',
                gap: 5,

              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight:"500",
                  color:"#383838"
                }}
              >
                {data && data?.data.bank_details.account_name
                  ? data.data.bank_details.account_name
                  : 'Add Account Details'}
              </Text>

              <Text
                style={{
                  fontSize: 15,
                  color: '#383838'

                }}
              >
                {data && data.data.bank_details.account_number
                  ? `${data.data.bank_details.account_number}, ${data.data.bank_details.bank_name}`
                  : 'Connect to Make withdrawals Possible'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={{
            marginTop: 30
          }}
        >
          <Text
            style={{
              fontWeight: '700',
              fontSize: 20
            }}
          >
            History
          </Text>
          <View>
            {history.length < 1 && isLoading ? (
              <ActivityIndicator></ActivityIndicator>
            ) : history.length < 1 ? (
              <View
                style={{
                  marginTop: 100,
                  paddingHorizontal: 15,
                  paddingVertical: 30
                }}
              >
                <Image
                  resizeMode='cover'
                  source={require('../../assets/oops.png')}
                  style={styles.billboardImage}
                />
                <Text
                  style={{
                    fontSize: 20,
                    textAlign: 'center'
                  }}
                >
                  Oops! No Transactions yet
                </Text>
              </View>
            ) : (
              history.map(tx => <AHistory transaction={tx} />)
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: 'white',
    paddingHorizontal: 16
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    gap: 40,
    display: 'flex'
  },
  modalContent: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: '#fff',
    padding: 20,
    width: '100%',
    height: 431,
    marginTop: 100,
    alignItems: 'center'
  }
})
