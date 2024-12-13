import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
  TouchableOpacity,
  StatusBar,
  Dimensions
} from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'
import { Ionicons } from '@expo/vector-icons' // Add this import

const slides = [
  {
    key: 'slide1',
    title: 'Welcome to Billboard Spaces',
    text: 'Streamline your outdoor advertising operations to be more efficient, profitable, and accessible',
    image: require('../../assets/onboarding1.png')
  },
  {
    key: 'slide2',
    title: 'Explore Billboards Near You',
    text: 'Streamline your outdoor advertising operations to be more efficient, profitable, and accessible',
    image: require('../../assets/onboarding2.jpeg')
  },
  {
    key: 'slide3',
    title: 'Earn Passive Income',
    text: 'Easily list your billboards on our platform, manage availability and pricing, and connect with advertisers eager to promote their brands on your prime locations.',
    image: require('../../assets/onboarding3.png')
  },
  {
    key: 'slide4',
    title: 'Unlock Targeted Advertising Excellence',
    text: 'AdSpace allows advertisers to tailor their campaigns with precision',
    image: require('../../assets/onboarding4.png')
  }
]

const WIDTH = Dimensions.get('window').width

const OnboardingSlider = ({ navigation }) => {
  const renderPrevButton = () => (
    <View style={styles.vector}>
      <Ionicons
        style={styles.icon}
        name='ios-arrow-back'
        size={35}
        color='red'
      />
    </View>
  )

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <ImageBackground source={item.image} style={styles.imageBackground}>
        <View style={styles.frameParent}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </ImageBackground>
    </View>
  )

  const renderNextButton = label => {
    return (
      <View style={styles.nextButton}>
        <Text style={styles.buttonText}>{label}</Text>
      </View>
    )
  }

  const renderSkipButton = label => {
    return (
      <View style={styles.skipButton}>
        <Text style={styles.skipText}>{label}</Text>
      </View>
    )
  }

  const renderDoneButton = label => {
    return (
      <View style={styles.doneButton}>
        <Text style={styles.buttonText}>{label}</Text>
      </View>
    )
  }

  const onDone = () => {
    // Navigate to the next screen after onboarding
    navigation.navigate('CreatAccount')
  }

  return (
    <AppIntroSlider
      data={slides}
      renderItem={renderItem}
      renderPrevButton={renderPrevButton} // Make sure to pass renderPrevButton here
      renderNextButton={() => renderNextButton('Next')}
      renderSkipButton={() => renderSkipButton('Skip')}
      renderDoneButton={() => renderDoneButton('Get Started')}
      onDone={onDone}
      showSkipButton={true}
      activeDotStyle={{
        backgroundColor: '#0080FE',
        width: 27,
        bottom: 100
      }}
      dotStyle={{
        bottom: 100,
        backgroundColor: '#FFFFFF'
      }}
      style={{ flex: 1, width: '100%' }}
    />
  )
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
    // width: '100%',
    // position: 'relative'
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover'
  },
  frameParent: {
    alignItems: 'center',
    width: '80%',
    position: 'absolute',
    gap: 16,
    paddingTop: '60%'
  },
  title: {
    fontSize: 34,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 16,
    color: '#fff'
  },
  text: {
    fontSize: 16,
    marginTop: 16,
    color: '#fff'
  },
  vector: {
    left: '3.73%',
    top: '8.5%',
    right: '88.27%',
    bottom: '88.05%',
    width: '8%',
    height: '3.45%',
    position: 'absolute'
  },
  icon: {
    height: '100%',
    maxWidth: '100%',
    maxHeight: '100%',
    overflow: 'hidden',
    color: '#fff',
    width: '100%'
  },
  skipButton: {
    left: 20,
    alignSelf: 'center'
  },
  skipText: {
    color: '#0080FE'
  },
  nextButton: {
    bottom: 10,
    right: 0,
    backgroundColor: '#0080fe',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    // height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  doneButton: {
    bottom: 10,
    backgroundColor: '#0080fe',
    paddingHorizontal: 20,
    paddingVertical: 10,
    // width: 300, // Set a fixed width to accommodate the text
    borderRadius: 10,
    // flex: 1,
    width: WIDTH * 0.9,
    alignItems: 'center', // Align text in the center horizontally
    justifyContent: 'center' // Align text in the center vertically
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff'
  }
})

export default OnboardingSlider
