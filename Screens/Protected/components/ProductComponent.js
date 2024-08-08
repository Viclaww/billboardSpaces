import {View, TouchableOpacity, Text} from "react-native";
const ProductComponent = ({ product }) => {
    console.log('edact');
    // const [data] = useGetNewBillboardQuery();
    return (
      <View
        style={{
          padding: 5,
          // flex: 1,
          // backgroundColor:'red',
          width: 180,
        }}
      >
        <TouchableOpacity
        //   onPress={() =>
        //     // navigation.navigate("Billboardclicked", { data: product })
        //   }
        >
          {/* <Image
            resizeMode="cover"
            source={{ uri: product.image }}
            style={styles.rectangleIcon2}
          /> */}
          <Text>{product.location}</Text>
        </TouchableOpacity>
      </View>
    );
  };
export default ProductComponent;