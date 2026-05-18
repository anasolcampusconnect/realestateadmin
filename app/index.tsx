import { BlurView } from "expo-blur"; // Use '@react-native-community/blur' if using bare CLI
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
        <ScrollView contentContainerStyle={styles.scrollContainer}>
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
                isWeb ? { width: "40%" } : { width: "100%" },
              ]}
            >
              {/* Conditional rendering for high-performance blur effect */}
              <BlurView intensity={70} tint="dark" style={styles.blurWrapper}>
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
    marginBottom: 40,
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
  },
  contactButton: {
    backgroundColor: "#FF3B00",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  contactButtonText: {
    color: "#FFF",
    fontSize: 12,
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
    gap: 40,
  },
  typographySection: {
    justifyContent: "center",
  },
  mainHeading: {
    color: "#FFF",
    fontSize: isWeb ? 64 : 36,
    fontWeight: "800",
    lineHeight: isWeb ? 72 : 44,
    letterSpacing: -1,
  },
  orangeDot: {
    color: "#FF3B00",
  },
  subHeading: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 20,
    maxWidth: 450,
  },
  loginCardContainer: {
    borderRadius: 24,
    overflow: "hidden", // clips blur background shapes cleanly
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5,
  },
  blurWrapper: {
    padding: isWeb ? 40 : 25,
    backgroundColor: "rgba(0, 0, 0, 0.25)", // fallback layer for Android platforms
  },
  formInnerContent: {
    width: "100%",
  },
  formTitle: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 1.5,
    marginBottom: 25,
  },
  inputContainer: {
    width: "100%",
    height: 54,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.25)",
    backgroundColor: "rgba(255,255,255,0.05)",
    marginBottom: 16,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  input: {
    color: "#FFF",
    fontSize: 16,
  },
  forgotPasswordContainer: {
    alignSelf: "flex-end",
    marginBottom: 25,
  },
  forgotText: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 13,
  },
  loginButton: {
    backgroundColor: "#FF3B00",
    height: 54,
    borderRadius: 27,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FF3B00",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
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
