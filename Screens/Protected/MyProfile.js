import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  Keyboard,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  Image,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  Button
} from 'react-native'
import React, { useState, useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { Feather } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { BASE_URL } from '../../apiConfig'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { refreshToken } from '../utils/authUtils'
import {
  useGetProfileQuery,
  useUpdateUserMutation
} from '../../data/api/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { cloudinaryUpload } from '../../utils/cloudinaryUpload'
import { setUser } from '../../data/dataSlices/user.slice'

export default function MyProfile ({ navigation }) {
  const [selectedImage, setSelectedImage] = useState(null)
  const [editMode, setEditMode] = useState(false) // State to manage edit mode
  const [editMode2, setEditMode2] = useState(false) // State to manage edit mode
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [state, setState] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [field, setField] = useState('')
  const token = useSelector(state => state.user.token)
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()
  const { data, isFetching, error, refetch } = useGetProfileQuery({
    access: token
  })
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation()
  useEffect(() => {
    if (data) {
      console.log('DATA', data)
      setName(data.data['full-name'])
      setPhoneNumber(data.data['phone-number'])
      setDisplayName(data.data['display-name'])
      setField(data.data.field)
      setState(data.data['State of residence'])
      setSelectedImage(data.data.image)
      dispatch(setUser(data.data))
    }
  }, [data])
  const openImagePickerAsync = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (!permissionResult.granted) {
      Alert.alert('Permission to access camera roll is required!')
      return
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync()
    console.log('Picker Result:', pickerResult) // Log picker result for debugging
    if (!pickerResult.cancelled && pickerResult.assets.length > 0) {
      const selectedUri = pickerResult.assets[0].uri
      console.log('Selected Image URI:', selectedUri) // Log selected image URI for debugging
      setSelectedImage({
        name: pickerResult.assets[0].fileName,
        type: pickerResult.assets[0].mimeType,
        uri: pickerResult.assets[0].uri
      })
    }
  }

  const backgroundImage = selectedImage
    ? { uri: selectedImage.uri || selectedImage }
    : require('../../assets/imageupload.png')

  const handleEditMode = () => {
    setEditMode(currentMode => !currentMode)
  }
  const handleEditMode2 = () => {
    setEditMode2(currentMode => !currentMode)
  }

  // State variables to track focus
  const [nameFocused, setNameFocused] = useState(false)
  const [emailFocused, setEmailFocused] = useState(false) // Track if email input is focused
  const [phoneNumberFocused, setPhoneNumberFocused] = useState(false)
  const [stateFocused, setstateFocused] = useState(false)
  const [displayNameFocused, setDisplayNameFocused] = useState(false)
  const [fieldFocused, setFieldFocused] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Functions to handle input field focus
  const handleNameFocus = () => {
    setNameFocused(true)
    setPhoneNumberFocused(false)
    setstateFocused(false)
    setEmailFocused(false)
  }

  const handlePhoneNumberFocus = () => {
    setNameFocused(false)
    setPhoneNumberFocused(true)
    setstateFocused(false)
    setEmailFocused(false)
  }

  const handleStateFocus = () => {
    setNameFocused(false)
    setPhoneNumberFocused(false)
    setstateFocused(true)
    setEmailFocused(false)
  }
  const handleEmailFocus = () => {
    setEmailFocused(true)
    setNameFocused(false)
    setPhoneNumberFocused(false)
    setstateFocused(false)
  }
  const handleDisplayNameFocus = () => {
    setEmailFocused(false)
    setNameFocused(false)
    setPhoneNumberFocused(false)
    setstateFocused(false)
    setDisplayNameFocused(true)
  }
  const handleFieldFocus = () => {
    setEmailFocused(false)
    setNameFocused(false)
    setPhoneNumberFocused(false)
    setstateFocused(false)
    setFieldFocused(true)
  }

  const handleSave = async () => {
    try {
      setIsLoading(true)
      // Create an object to store the fields to be updated
      const updatedFields = {}
      if (field != data?.data.field) updatedFields.field = field
      if (name !== data?.data['full-name']) updatedFields.fullName = name
      if (phoneNumber !== data?.data['phone-number'])
        updatedFields.phone = phoneNumber
      if (state !== data?.data['State of residence']) updatedFields.SOR = state
      if (displayName !== data?.data['display-name'])
        updatedFields.displayName = displayName
      if (selectedImage !== data.data.image)
        updatedFields.image = (await cloudinaryUpload(selectedImage)).image

      console.log('Updated fields:', updatedFields)
      const response = await updateUser({
        access: token,
        body: updatedFields
      })

      if (response.data) {
        console.log('the guy', response.data)
        dispatch(setUser(response.data.data))
        refetch()
        // navigation.navigate("Home");
      } else {
        console.error('PUT request failed:', response.status)
        let errorMessage = 'Failed to update user data'
        // Parse error response if available
        try {
          const errorResponseData = response.erro
          console.log('TEST?? ')
          console.log(errorResponseData)

          console.log('Error response data:', errorResponseData)
        } catch (jsonError) {
          console.error(
            'Failed to parse error response as JSON:',
            jsonError.message
          )
        }
        alert(errorMessage)
      }
    } catch (error) {
      console.error('An error occurred during PUT request:', error.message)
      alert('Failed to update user data')
    } finally {
      setIsLoading(false)
    }
  }

  if (isFetching) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <ActivityIndicator size='large' color='#0080FE' />
        <Text>Fetching Profile</Text>
      </View>
    )
  }

  if (error) {
    console.log(error)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text>Failed to get Profile!</Text>
      </View>
    )
  }
  return (
    <SafeAreaView style={{ flex: 1,paddingHorizontal:16 }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled
      >
        <ScrollView>
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
              My Profile
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              width: 130,
              height: 130
            }}
          >
            <Image
              resizeMode='cover'
              source={backgroundImage}
              style={{
                width: 130,
                height: 126,
                borderRadius: 100
              }}
            ></Image>
            <TouchableOpacity
              style={{ top: '60%', right: '20%' }}
              onPress={openImagePickerAsync}
            >
              <Image
                resizeMode='contain'
                source={require('../../assets/cam.png')}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginRight: 16,
              justifyContent: 'space-between',
              marginTop: 40
            }}
          >
            <Text
              style={{
                fontWeight: '400',
                fontSize: 16,
                lineHeight: 19.36
              }}
            >
              Personal Data
            </Text>
            <Feather name='edit-3' size={24} color='#0080FE' />
          </View>

          <View
            style={{
              width: '100%',
              backgroundColor: '#E2F3FD',
              borderRadius: 10,
              marginTop: 10,
              padding: 16,
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
            }}
          >
            <View style={{ gap: 10 }}>
              <View style={styles.inputView}>
                <Text style={styles.email}>Name</Text>
                <View
                  style={[styles.editInput, nameFocused && styles.focusedInput]}
                >
                  <TextInput
                    style={styles.Text}
                    value={name}
                    onChangeText={text => setName(text)}
                    placeholder='kijdas'
                    onFocus={handleNameFocus}
                    onBlur={() => setNameFocused(false)}
                  />
                </View>
              </View>
              {/* <View style={styles.inputView}>
                                <Text style={styles.email}>Email</Text>
                                <View style={[styles.editInput, emailFocused && styles.focusedInput]}>
                                    <TextInput
                                        style={styles.Text}
                                        value={email}
                                        onChangeText={(text) => setEmail(text)}
                                        placeholder="kijdas"
                                        onFocus={handleEmailFocus}
                                        onBlur={() => setEmailFocused(false)}
                                    />
                                </View>
                            </View> */}
              <View style={styles.inputView}>
                <Text style={styles.email}>Phone Number</Text>
                <View
                  style={[
                    styles.editInput,
                    phoneNumberFocused && styles.focusedInput
                  ]}
                >
                  <TextInput
                    style={styles.Text}
                    value={phoneNumber}
                    onChangeText={text => setPhoneNumber(text)}
                    placeholder='kijdas'
                    onFocus={handlePhoneNumberFocus}
                    onBlur={() => setPhoneNumberFocused(false)}
                  />
                </View>
              </View>
              <View style={styles.inputView}>
                <Text style={styles.email}>State of Residence</Text>
                <View
                  style={[
                    styles.editInput,
                    stateFocused && styles.focusedInput
                  ]}
                >
                  <TextInput
                    style={styles.Text}
                    value={state}
                    onChangeText={text => setState(text)}
                    placeholder='kijdas'
                    onFocus={handleStateFocus}
                    onBlur={() => setstateFocused(false)}
                  />
                </View>
              </View>
              <View style={styles.inputView}>
                <Text style={styles.email}>Display/ Business name</Text>
                <View
                  style={[
                    styles.editInput,
                    displayNameFocused && styles.focusedInput
                  ]}
                >
                  <TextInput
                    style={styles.Text}
                    value={displayName}
                    onChangeText={text => setDisplayName(text)}
                    placeholder='kijdas'
                    onFocus={handleDisplayNameFocus}
                    onBlur={() => setDisplayNameFocused(false)}
                  />
                </View>
              </View>
              <View style={styles.inputView}>
                <Text style={styles.email}>Field</Text>
                <View
                  style={[
                    styles.editInput,
                    fieldFocused && styles.focusedInput
                  ]}
                >
                  <TextInput
                    style={styles.Text}
                    value={field}
                    onChangeText={text => setField(text)}
                    placeholder='kijdas'
                    onFocus={handleFieldFocus}
                    onBlur={() => setFieldFocused(false)}
                  />
                </View>
              </View>
            </View>
          </View>

          <View
            style={{ marginTop: '40%', alignItems: 'center', marginBottom: 20 }}
          >
            <TouchableOpacity onPress={handleSave} style={styles.buttonParent}>
              <Text style={styles.button}>
                {isUpdating ? <ActivityIndicator color="white"/> : 'Save Changes'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  editInput: {
    width: 152
  },
  email: {
    fontSize: 12,
    fontWeight: '500',
    width: 152
  },
  Text: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14.52,
    alignSelf: 'flex-end'
  },
  focusedInput: {
    borderColor: '#0080FE',
    borderBottomWidth: 1
  },
  inputView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  button: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff'
  },
  buttonParent: {
    borderRadius: 10,
    backgroundColor: '#0080FE',
    width: '100%',
    // marginTop: '40%',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  }
})
