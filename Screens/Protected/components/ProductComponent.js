import { Dimensions } from 'react-native'
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native'

const screenWidth = Dimensions.get('window').width
const parentPadding = 16
const responsiveWidth = (screenWidth - parentPadding * 2) * 0.49 // Calculate image width with padding

const ProductComponent = ({ product, navigation }) => {
  // console.log(product);
  // const [data] = useGetNewBillboardQuery();
  return (
    <View
      style={{
        // padding: 5,
        // flex: 1
        // position: 'relative'
        width: responsiveWidth
      }}
    >
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Billboardclicked', { data: product })
        }
        style={styles.imageContainer}
      >
        <Image
          resizeMode='cover'
          source={{ uri: product.image }}
          style={styles.rectangleIcon2}
          alt='none'
        />
        <Text style={styles.productSize}>{product.size}</Text>
        <Text>{product.location}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  rectangle1: {
    // width: responsiveWidth,
    // height: 400,
    // position: 'relative',
    paddingLeft: 20,
    marginTop: '5%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  productSize: {
    position: 'absolute',
    backgroundColor: '#F4CAB9',
    paddingVertical: 1,
    paddingHorizontal: 12,
    borderRadius: 20,
    top: 5,
    right: 8
  },
  rectangleIcon2: {
    borderRadius: 10,
    // height: 150,
    width: '100%',
    // position: 'relative',
    aspectRatio: 1,
    flex: 1
  },
  imageContainer: {
    maxWidth: '100%',
    width: responsiveWidth,
    flex: 1
  }
})
export default ProductComponent
