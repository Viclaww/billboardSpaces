import {View, TouchableOpacity, Text, ImageBackground} from "react-native";
const EventComponent = ({ events }) => {
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
          onPress={() => navigation.navigate("Eventclicked", { data: events })}
        >
          {/* <Image
            resizeMode="cover"
            source={{ uri: events.image }}
            style={styles.rectangleIcon3}
          /> */}
          <Text>{events.name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  export default EventComponent;
