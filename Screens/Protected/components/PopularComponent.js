import {View, TouchableOpacity, Text} from "react-native";
const PopularComponent = ({ popular }) => {
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
          onPress={() =>
            navigation.navigate("Billboardclicked", { data: popular })
          }
        >
          {/* <Image
            resizeMode="cover"
            source={{ uri: popular.image }}
            style={styles.rectangleIcon3}
          /> */}
          <Text>{popular.location}</Text>
        </TouchableOpacity>
      </View>
    );
  };

export default PopularComponent;