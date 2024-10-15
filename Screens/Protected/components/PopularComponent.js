import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
const PopularComponent = ({ popular, navigation }) => {
  console.log(popular);
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
          navigation.navigate("Billboardclicked", { data: popular })
        }
      >
        <Image
          resizeMode="cover"
          source={{ uri: popular.image }}
          style={styles.rectangleIcon3}
        />
        <Text>{popular.location}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  rectangleIcon3: {
    borderRadius: 10,
    height: 150,
    width: 159.5,
  },
});
export default PopularComponent;
