import { BlurView } from "expo-blur";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");
const isWeb = Platform.OS === "web";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ImageBackground
      source={require("../assets/images/home.jpg")} // Your uploaded background image
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* --- TOP NAVIGATION BAR --- */}
          <View style={styles.header}>
            <Text style={styles.navText}>MENU</Text>
            <Text style={styles.logoText}>KONTAKO</Text>
            <TouchableOpacity style={styles.contactButton}>
              <Text style={styles.contactButtonText}>CONTACT US</Text>
            </TouchableOpacity>
          </View>

          {/* --- MAIN CONTENT CONTAINER --- */}
          <View
            style={[
              styles.mainContainer,
              isWeb ? styles.rowLayout : styles.columnLayout,
            ]}
          >
            {/* Left Side: Branding Typography */}
            <View
              style={[
                styles.typographySection,
                isWeb ? { width: "50%" } : { width: "100%" },
              ]}
            >
              <Text style={styles.mainHeading}>
                THE FUTURE{"\n"}OF HOME LIVING
                <Text style={styles.orangeDot}>.</Text>
              </Text>
              <Text style={styles.subHeading}>
                Trust us with your dreams! We are ready to help you build the
                dream property that will be your future.
              </Text>
            </View>

            {/* Right Side / Bottom: Frosted Glass Login Panel */}
            <View
              style={[
                styles.loginCardContainer,
                isWeb ? { width: "40%", maxWidth: 450 } : { width: "100%" },
              ]}
            >
              {/* FIXED: 
                1. Removed deprecated 'experimentalBlurMethod' and replaced it with 'blurMethod'.
                2. On Android, expo-blur native view managers can fail to link/render safely 
                   depending on the environment version. Using a solid dark fallback backdrop 
                   safeguards it from crashing and clears out the ViewManagerAdapters core errors.
              */}
              {Platform.OS === "android" ? (
                <View
                  style={[styles.blurWrapper, styles.androidFallbackBackground]}
                >
                  <View style={styles.formInnerContent}>
                    <Text style={styles.formTitle}>SECURE ACCESS</Text>

                    {/* Username Field */}
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.input}
                        placeholder="Username"
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                      />
                    </View>

                    {/* Password Field */}
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        autoCapitalize="none"
                      />
                    </View>

                    {/* Forgot Password Link */}
                    <TouchableOpacity style={styles.forgotPasswordContainer}>
                      <Text style={styles.forgotText}>Forgot Password ?</Text>
                    </TouchableOpacity>

                    {/* Action Login Button */}
                    <TouchableOpacity
                      style={styles.loginButton}
                      onPress={() => router.replace("/dashboard")}
                    >
                      <Text style={styles.loginButtonText}>LOG IN</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <BlurView
                  intensity={70}
                  tint="dark"
                  blurMethod="dime" // Replaced deprecated prop
                  style={styles.blurWrapper}
                >
                  <View style={styles.formInnerContent}>
                    <Text style={styles.formTitle}>SECURE ACCESS</Text>

                    {/* Username Field */}
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.input}
                        placeholder="Username"
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                      />
                    </View>

                    {/* Password Field */}
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        autoCapitalize="none"
                      />
                    </View>

                    {/* Forgot Password Link */}
                    <TouchableOpacity style={styles.forgotPasswordContainer}>
                      <Text style={styles.forgotText}>Forgot Password?</Text>
                    </TouchableOpacity>

                    {/* Action Login Button */}
                    <TouchableOpacity
                      style={styles.loginButton}
                      onPress={() => router.replace("/dashboard")}
                    >
                      <Text style={styles.loginButtonText}>LOG IN</Text>
                    </TouchableOpacity>
                  </View>
                </BlurView>
              )}
            </View>
          </View>

          {/* Floating Action Arrow Button (From design reference) */}
          {isWeb && (
            <TouchableOpacity style={styles.floatingArrow}>
              <Text style={styles.arrowIcon}>↗</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

// --- ELEGANT DESIGNS & STYLESHEET ---
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingHorizontal: isWeb ? 60 : 20,
    paddingVertical: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: isWeb ? 40 : 20,
    gap: 10,
  },
  navText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 1.5,
  },
  logoText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 2,
    textAlign: "center",
  },
  contactButton: {
    backgroundColor: "#FF3B00",
    paddingHorizontal: isWeb ? 20 : 12,
    paddingVertical: 10,
    borderRadius: 25,
  },
  contactButtonText: {
    color: "#FFF",
    fontSize: 11,
    fontWeight: "700",
  },
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  rowLayout: {
    flexDirection: "row",
    paddingBottom: 80,
  },
  columnLayout: {
    flexDirection: "column",
    justifyContent: "center",
    gap: 30,
    paddingBottom: 20,
  },
  typographySection: {
    justifyContent: "center",
  },
  mainHeading: {
    color: "#FFF",
    fontSize: isWeb ? 64 : 32,
    fontWeight: "800",
    lineHeight: isWeb ? 72 : 40,
    letterSpacing: -1,
  },
  orangeDot: {
    color: "#FF3B00",
  },
  subHeading: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 16,
    maxWidth: 450,
  },
  loginCardContainer: {
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    // FIXED: Modernized shadow style parameters to box-shadow syntax to fix layout deprecation warnings
    ...Platform.select({
      web: {
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)",
      },
      default: {
        elevation: 5,
      },
    }),
  },
  blurWrapper: {
    padding: isWeb ? 40 : 22,
  },
  androidFallbackBackground: {
    backgroundColor: "rgba(15, 15, 15, 0.85)", // Clean frosted visual workaround for the Android core ExpoBlur module mismatch
  },
  formInnerContent: {
    width: "100%",
  },
  formTitle: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 1.5,
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    height: 52,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.25)",
    backgroundColor: "rgba(255,255,255,0.05)",
    marginBottom: 14,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  input: {
    color: "#FFF",
    fontSize: 16,
    padding: 0,
  },
  forgotPasswordContainer: {
    alignSelf: "flex-end",
    marginBottom: 22,
  },
  forgotText: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 13,
  },
  loginButton: {
    backgroundColor: "#FF3B00",
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      web: {
        boxShadow: "0px 4px 10px rgba(255, 59, 0, 0.3)",
      },
    }),
  },
  loginButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 1,
  },
  floatingArrow: {
    position: "absolute",
    bottom: 40,
    right: 60,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(139, 32, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  arrowIcon: {
    color: "#FFF",
    fontSize: 28,
  },
});
