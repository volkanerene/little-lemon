import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Pressable,
} from "react-native";
import { validateEmail } from "../utils";
import { AuthContext } from "../AuthContext";

const Onboarding = () => {
  const [firstName, onChangeFirstName] = useState("");
  const [lastName, onChangeLastName] = useState("");
  const [email, onChangeEmail] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const isEmailValid = validateEmail(email);

  const validateName = (name) => {
    if (name.length > 0) {
      return name.match(/[^a-zA-Z]/);
    } else {
      return true;
    }
  };

  const { onboard } = useContext(AuthContext);

  useEffect(() => {
    const isValid = !validateName(firstName) && !validateName(lastName) && isEmailValid;
    setIsFormValid(isValid);
  }, [firstName, lastName, email]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require("../assets/LittleLemonLogo2.png")}
          resizeMode="contain"
        />
      </View>
      <View style={styles.form}>
        <Text style={styles.welcomeText}>
          Welcome! Join us for fresh flavors and exciting dishes delivered right to your doorstep.
        </Text>
        <Text style={styles.welcomeText}>
          Please provide your first name, last name, and email to get started, explore our menu, and make your first order.
        </Text>
        <Text style={styles.welcomeText}>
          We can’t wait to serve you!
        </Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={onChangeFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={onChangeLastName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={onChangeEmail}
          keyboardType="email-address"
        />
        <Pressable
          style={[styles.button, !isFormValid && styles.buttonDisabled]}
          onPress={() => onboard({ firstName, lastName, email })}
          disabled={!isFormValid}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f8f8f8",
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  logo: {
    width: 200,
    height: 200,
  },
  form: {
    width: "100%",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  welcomeText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 16,
    color: "#333",
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: "#495e57",
    padding: 12,
    alignItems: "center",
    borderRadius: 4,
  },
  buttonDisabled: {
    backgroundColor: "#495e57",
    opacity: 0.5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default Onboarding;