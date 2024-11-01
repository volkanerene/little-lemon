import React, { createContext, useReducer, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const AuthContext = createContext();

const initialAuthState = {
  isLoading: true,
  isOnboardingCompleted: false,
  userToken: null,
  profile: {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    orderStatuses: false,
    passwordChanges: false,
    specialOffers: false,
    newsletter: false,
    image: "",
  },
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "RESTORE_TOKEN":
      return { ...state, userToken: action.token, isLoading: false };
    case "SIGN_IN":
      return { ...state, isSignout: false, userToken: action.token };
    case "SIGN_OUT":
      return { ...state, isSignout: true, userToken: null };
    case "ONBOARD":
      return {
        ...state,
        isLoading: false,
        isOnboardingCompleted: action.isOnboardingCompleted,
        profile: action.profile || state.profile,
      };
    case "UPDATE_PROFILE":
      return { ...state, profile: { ...state.profile, ...action.profile } };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const profileData = await AsyncStorage.getItem("profile");
        if (profileData) {
          dispatch({
            type: "ONBOARD",
            isOnboardingCompleted: true,
            profile: JSON.parse(profileData),
          });
        } else {
          dispatch({ type: "ONBOARD", isOnboardingCompleted: false });
        }
      } catch (e) {
        console.error("Error loading profile data:", e);
      }
    };

    loadProfileData();
  }, []);

  const authContext = {
    onboard: async (profileData) => {
      try {
        await AsyncStorage.setItem("profile", JSON.stringify(profileData));
        dispatch({
          type: "ONBOARD",
          isOnboardingCompleted: true,
          profile: profileData,
        });
      } catch (e) {
        console.error("Error saving profile data:", e);
      }
    },
    updateProfile: async (profileUpdates) => {
      try {
        const updatedProfile = { ...state.profile, ...profileUpdates };
        await AsyncStorage.setItem("profile", JSON.stringify(updatedProfile));
        dispatch({ type: "UPDATE_PROFILE", profile: profileUpdates });
        Alert.alert("Success", "Profile updated successfully!");
      } catch (e) {
        console.error("Error updating profile data:", e);
      }
    },
    logout: async () => {
      try {
        await AsyncStorage.clear();
        dispatch({ type: "SIGN_OUT" });
        dispatch({ type: "ONBOARD", isOnboardingCompleted: false });
      } catch (e) {
        console.error("Error during logout:", e);
      }
    },
  };

  return (
    <AuthContext.Provider value={{ ...authContext, state }}>
      {children}
    </AuthContext.Provider>
  );
};