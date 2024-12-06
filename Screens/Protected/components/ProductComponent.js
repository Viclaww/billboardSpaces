import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
const ProductComponent = ({ product, navigation }) => {
  // console.log(product);
  // const [data] = useGetNewBillboardQuery();
  return (
    <View
      style={{
        padding: 5,
        flex: 1,

        width: 180,
      }}
    >
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Billboardclicked", { data: product })
        }
      >
        <Image
          resizeMode="cover"
          source={{ uri: product.image }}
          style={styles.rectangleIcon2}
          alt="none"
        />
        <Text style={styles.productSize}>{product.size}</Text>
        <Text>{product.location}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  rectangle1: {
    width: 300,
    height: 400,
    paddingLeft: 20,
    marginTop: "5%",
    flexDirection: "row",
    alignItems: "center",
  },
  productSize: {
    position: "absolute",
    backgroundColor: "#F4CAB9",
    paddingVertical: 1,
    paddingHorizontal:12,
    borderRadius: 20,
    top: 5,
    right: 15,
  },
  rectangleIcon2: {
    borderRadius: 10,
    height: 150,
    width: 159.5,
  },
});
export default ProductComponent;
