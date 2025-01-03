import { StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React from 'react'
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle
} from 'react-native-reanimated'

const RenderItems = ({ item, x, index }) => {
  const { width } = useWindowDimensions()

  const animatedStyle = useAnimatedStyle(() => {
    const opacityAnim = interpolate(
      x.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [-0.3, 1, -0.3],
      Extrapolation.CLAMP
    )
    return {
      opacity: opacityAnim
    }
  })

  return (
    <View style={[{ width }, styles.container]}>
      <Animated.Image
        resizeMode='stretch'
        source={item}
        style={[styles.titleImage, animatedStyle, { width: width - 32 * 0.49 }]}
      />
    </View>
  )
}

export default RenderItems

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 16,
    borderRadius: 10,
    // width: WIDTH * 0.9,
    // flex: 1,
    // margin: '10%',
    // borderWidth: 5,
    borderColor: '#0080FE'
    // flexGrow: 1
  },
  titleImage: {
    // width: SCREEN_WIDTH - wpx(32), // adjust the width of the image and horizontal padding
    // height: hpx(194),
    alignSelf: 'center',

    maxWidth: '100%'
    // aspectRatio: 343 / 179
    // borderRadius: nf(16),
  }
})
