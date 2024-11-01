import React, { useContext, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import { validateEmail } from "../utils";
import { AuthContext } from "../AuthContext";
import Checkbox from "expo-checkbox";
import * as ImagePicker from "expo-image-picker";

const Profile = () => {
  const { state: { profile }, updateProfile, logout } = useContext(AuthContext);

  const [localProfile, setLocalProfile] = useState(profile);

  const validateName = (name) => name.length > 0 && !name.match(/[^a-zA-Z]/);
  const validateNumber = (number) => !isNaN(number) && number.length === 10;

  const handleChange = (key, value) => {
    setLocalProfile((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const getIsFormValid = () => {
    return (
      validateName(localProfile.firstName) &&
      validateName(localProfile.lastName) &&
      validateEmail(localProfile.email) &&
      validateNumber(localProfile.phoneNumber)
    );
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      handleChange("image", result.assets[0].uri);
    }
  };

  const removeImage = () => handleChange("image", "");

  const handleSave = () => {
    if (getIsFormValid()) {
      updateProfile(localProfile);
      Alert.alert("Success", "Profile updated successfully!");
    } else {
      Alert.alert("Invalid Input", "Please check your inputs and try again.");
    }
  };

  const inputFields = [
    { key: "firstName", placeholder: "First Name", validate: validateName },
    { key: "lastName", placeholder: "Last Name", validate: validateName },
    { key: "email", placeholder: "Email", keyboardType: "email-address", validate: validateEmail },
    { key: "phoneNumber", placeholder: "Phone number", keyboardType: "phone-pad", validate: validateNumber },
  ];

  const notificationOptions = [
    { key: "orderStatuses", label: "Order statuses" },
    { key: "passwordChanges", label: "Password changes" },
    { key: "specialOffers", label: "Special offers" },
    { key: "newsletter", label: "Newsletter" },
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require("../assets/LittleLemonLogo.png")}
          accessible={true}
          accessibilityLabel={"Little Lemon Logo"}
        />
      </View>
      <ScrollView style={styles.viewScroll}>
        <Text style={styles.headertext}>Personal information</Text>
        <Text style={styles.text}>Avatar</Text>
        <View style={styles.avatarContainer}>
          {localProfile.image ? (
            <Image source={{ uri: localProfile.image }} style={styles.avatarImage} />
          ) : (
            <View style={styles.avatarEmpty}>
              <Text style={styles.avatarEmptyText}>
                {localProfile.firstName.charAt(0)}
                {localProfile.lastName.charAt(0)}
              </Text>
            </View>
          )}
          <View style={styles.avatarButtons}>
            <Pressable style={styles.changeBtn} onPress={pickImage}>
              <Text style={styles.saveBtnText}>Change</Text>
            </Pressable>
            <Pressable style={styles.removeBtn} onPress={removeImage}>
              <Text style={styles.discardBtnText}>Remove</Text>
            </Pressable>
          </View>
        </View>

        {inputFields.map((field) => (
          <View key={field.key}>
            <Text
              style={[
                styles.text,
                field.validate(localProfile[field.key]) ? null : styles.error,
              ]}
            >
              {field.placeholder}
            </Text>
            <TextInput
              style={styles.inputBox}
              value={localProfile[field.key]}
              onChangeText={(newValue) => handleChange(field.key, newValue)}
              placeholder={field.placeholder}
              keyboardType={field.keyboardType || "default"}
            />
          </View>
        ))}

        <Text style={styles.headertext}>Email notifications</Text>

        {notificationOptions.map((option) => (
          <View style={styles.section} key={option.key}>
            <Checkbox
              style={styles.checkbox}
              value={localProfile[option.key]}
              onValueChange={(newValue) => handleChange(option.key, newValue)}
            />
            <Text style={styles.paragraph}>{option.label}</Text>
          </View>
        ))}

        <Pressable style={styles.btn} onPress={logout}>
          <Text style={styles.btntext}>Log out</Text>
        </Pressable>
        <View style={styles.buttons}>
          <Pressable style={styles.discardBtn} onPress={() => setLocalProfile(profile)}>
            <Text style={styles.discardBtnText}>Discard changes</Text>
          </Pressable>
          <Pressable
            style={[styles.saveBtn, getIsFormValid() ? null : styles.btnDisabled]}
            onPress={handleSave}
            disabled={!getIsFormValid()}
          >
            <Text style={styles.saveBtnText}>Save changes</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 12,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#dee3e9",
  },
  logo: {
    height: 50,
    width: 150,
    resizeMode: "contain",
  },
  viewScroll: {
    flex: 1,
    padding: 10,
  },
  headertext: {
    fontSize: 22,
    paddingBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputBox: {
    alignSelf: "stretch",
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    borderRadius: 9,
    borderColor: "#dfdfe5",
  },
  btn: {
    backgroundColor: "#f4ce14",
    borderRadius: 9,
    alignSelf: "stretch",
    marginVertical: 18,
    padding: 10,
    borderWidth: 1,
    borderColor: "#cc9a22",
  },
  btnDisabled: {
    backgroundColor: "#98b3aa",
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 60,
  },
  saveBtn: {
    flex: 1,
    backgroundColor: "#495e57",
    borderRadius: 9,
    alignSelf: "stretch",
    padding: 10,
    borderWidth: 1,
    borderColor: "#3f554d",
  },
  saveBtnText: {
    fontSize: 18,
    color: "#FFFFFF",
    alignSelf: "center",
  },
  discardBtn: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 9,
    alignSelf: "stretch",
    marginRight: 18,
    padding: 10,
    borderWidth: 1,
    borderColor: "#83918c",
  },
  discardBtnText: {
    fontSize: 18,
    color: "#3e524b",
    alignSelf: "center",
  },
  btntext: {
    fontSize: 22,
    color: "#3e524b",
    fontWeight: "bold",
    alignSelf: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
  error: {
    color: "#d14747",
    fontWeight: "bold",
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatarEmpty: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#0b9a6a",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarEmptyText: {
    fontSize: 32,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  avatarButtons: {
    flexDirection: "row",
  },
  changeBtn: {
    backgroundColor: "#495e57",
    borderRadius: 9,
    marginHorizontal: 18,
    padding: 10,
    borderWidth: 1,
    borderColor: "#3f554d",
  },
  removeBtn: {
    backgroundColor: "#FFFFFF",
    borderRadius: 9,
    padding: 10,
    borderWidth: 1,
    borderColor: "#83918c",
  },
});

export default Profile;
