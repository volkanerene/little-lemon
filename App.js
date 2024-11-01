import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider, AuthContext } from "./AuthContext";

import SplashScreen from "./screens/SplashScreen";
import Onboarding from "./screens/Onboarding";
import Home from "./screens/Home";
import Profile from "./screens/Profile";

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { state } = useContext(AuthContext);

  if (state.isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {state.isOnboardingCompleted ? (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Profile" component={Profile} />
          </>
        ) : (
          <Stack.Screen name="Onboarding" component={Onboarding} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}