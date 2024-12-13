import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Dimensions
} from 'react-native'

const WIDTH = Dimensions.get('window').width
const RESPONSIVEWIDTH = (WIDTH - 16 * 2) * 0.48

const PopularComponent = ({ popular, navigation }) => {
  return (
    <View
      style={{
        // padding: 5,
        // flex: 1,
        // borderWidth: 1,
        // borderColor: 'red',
        width: RESPONSIVEWIDTH
      }}
    >
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Billboardclicked', { data: popular })
        }
        style={styles.imageContainer}
      >
        <Image
          resizeMode='cover'
          source={{ uri: popular.image }}
          style={styles.image}
        />
        <Text>{popular.location}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    // borderRadius: 10,
    // height: 150,
    // width: 159.5,
    width: '100%',
    flex: 1,
    aspectRatio: 1
  },
  imageContainer: {
    maxWidth: '100%',
    width: RESPONSIVEWIDTH,
    flex: 1,
    borderColor: 'blue'
    // borderWidth: 3
  }
})
export default PopularComponent
