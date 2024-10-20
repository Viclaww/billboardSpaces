import { Alert } from "react-native";
export const cloudinaryUpload = async (photo) => {
  const data = new FormData();
  data.append("file", photo);
  data.append("upload_preset", "event_app");
  data.append("cloud_name", "dv5v8l2lr");
  try {
    let res = await fetch(
      "https://api.cloudinary.com/v1_1/dv5v8l2lr/auto/upload",
      {
        method: "POST",
        body: data,
      }
    );
    let responseData = await res.json();
    console.log(responseData);
    return {
      image: responseData.secure_url,
      message: "OK",
    };
  } catch (err) {
    console.log("Error while uploading image:", err);
    Alert.alert("An Error Occured While Uploading");
    Alert.alert(err.error);
  }
};
