import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import React from 'react'

const screenWidth = Dimensions.get('window').width
const parentPadding = 16
const responsiveWidth = (screenWidth - parentPadding * 2) * 0.48 // Calculate image width with padding

const DiscoverLists = ({ navigation }) => {
  const handleImagePress = name => {
    navigation.navigate('DiscoverDetails', { billboardSize: name })
  }

  return (
    <View style={styles.container}>
      {/* First Row */}
      <View style={styles.firstRow}>
        <View
          style={{
            flexDirection: 'column',
            gap: 16,
            flex: 1
          }}
        >
          {/* Potrait */}
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={() => handleImagePress('Potrait')}
          >
            <Image
              source={require('../../../assets/discover/Potrait.jpg')}
              style={[styles.firstRowLeftImages, styles.images]}
            />
            <Text style={styles.text}>Potrait</Text>
            <View style={styles.blurOverlay} />
          </TouchableOpacity>

          {/* Large Format */}
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={() => handleImagePress('Large-format')}
          >
            <Image
              source={require('../../../assets/discover/LargeFormat.jpg')}
              style={[styles.firstRowLeftImages, styles.images]}
            />
            <Text style={styles.text}>Large Format</Text>
            <View style={styles.blurOverlay} />
          </TouchableOpacity>
        </View>

        {/* 48 Sheet */}
        <TouchableOpacity
          style={[
            styles.imageContainer,
            {
              flex: 1,
              borderColor: 'blue'
              // borderWidth: 3
            }
          ]}
          onPress={() => handleImagePress('48 Sheet')}
        >
          <Image
            source={require('../../../assets/discover/48 Sheet.jpg')}
            style={[
              styles.images,
              {
                flex: 1,
                width: responsiveWidth,
                height: 'auto'
              }
            ]}
            resizeMode='cover'
          />
          <Text style={styles.text}>48 Sheet</Text>
          <View style={styles.blurOverlay} />
        </TouchableOpacity>
      </View>

      {/* Second Row  */}

      <TouchableOpacity
        style={[
          styles.imageContainer,
          {
            flex: 1,
            // width: responsiveWidth,
            borderColor: 'blue'
            // borderWidth: 3
          }
        ]}
        onPress={() => handleImagePress('Spectacular Billboard')}
      >
        <Image
          source={require('../../../assets/discover/Spectacular.jpg')}
          style={[{ width: '100%', height: 80 }, styles.images]}
          resizeMode='cover'
        />
        <Text style={styles.text}>Spectacular</Text>
        <View style={styles.blurOverlay} />
      </TouchableOpacity>

      {/* Third Row  */}
      <View style={styles.thirdRowContainer}>
        {/* Gantry  */}
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => handleImagePress('Gantry')}
        >
          <Image
            source={require('../../../assets/discover/Gantry.jpg')}
            style={[styles.images, styles.thirdRowImages]}
          />
          <Text style={styles.text}>Gantry</Text>
          <View style={styles.blurOverlay} />
        </TouchableOpacity>

        {/* Unipole  */}
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => handleImagePress('Unipole')}
        >
          <Text style={styles.text}>Unipole</Text>
          <Image
            source={require('../../../assets/discover/Unipole.jpg')}
            style={[styles.images, styles.thirdRowImages]}
          />
          <View style={styles.blurOverlay} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default DiscoverLists

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 16
  },
  firstRow: {
    flexDirection: 'row',
    // width: responsiveWidth,
    justifyContent: 'center',
    flex: 1,
    borderColor: 'red',
    // borderWidth: 3,
    gap: 16
  },
  firstRowImages: {},

  images: {
    borderRadius: 10,
    flex: 1,
    zIndex: 0
  },
  thirdRowContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 80,
    width: '100%',
    borderColor: 'red',
    // borderWidth: 3,
    gap: 16,
    justifyContent: 'center'
  },
  thirdRowImages: {
    flex: 1,
    width: responsiveWidth,
    borderColor: 'blue'
    // borderWidth: 3
  },
  firstRowLeftImages: {
    width: responsiveWidth,
    height: 80
  },
  imageContainer: {
    justifyContent: 'center',
    position: 'relative',
    alignItems: 'center',

    zIndex: 100,
    overflow: 'hidden',
    borderRadius: 10
  },
  text: {
    color: 'white',
    position: 'absolute',
    textAlign: 'center',
    zIndex: 10
  },
  blurOverlay: {
    ...StyleSheet.absoluteFillObject, // Overlay to cover the image
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  }
})
