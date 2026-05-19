import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Modal,
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
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Card-Flipping and Recovery Pipeline States
  const [isFlipped, setIsFlipped] = useState(false);
  const [recoveryStep, setRecoveryStep] = useState<"email" | "otp" | "reset">(
    "email",
  );
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleTriggerOTPRequest = () => {
    if (!recoveryEmail.trim() || !recoveryEmail.includes("@")) {
      Alert.alert(
        "Invalid Input",
        "Please enter a valid administrator email address.",
      );
      return;
    }
    setRecoveryStep("otp");
    Alert.alert(
      "OTP Sent",
      `A verification security code has been dispatched to ${recoveryEmail}.`,
    );
  };

  const handleVerifyOTP = () => {
    if (otpCode.trim().length < 4) {
      Alert.alert(
        "Verification Error",
        "Please input the full secure security code sequence.",
      );
      return;
    }
    setRecoveryStep("reset");
  };

  const handleUpdatePassword = () => {
    if (newPassword.length < 6) {
      Alert.alert(
        "Security Check",
        "Password must be at least 6 characters long.",
      );
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Mismatch", "Password entries do not match.");
      return;
    }
    Alert.alert(
      "Success",
      "Your account security credentials have been updated safely.",
      [
        {
          text: "Proceed",
          onPress: () => {
            setIsFlipped(false);
            setRecoveryStep("email");
            setRecoveryEmail("");
            setOtpCode("");
            setNewPassword("");
            setConfirmPassword("");
          },
        },
      ],
    );
  };

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
            {/* FIXED: Repaired missing object property reference access layout syntax typo here */}
            <Text style={styles.logoText}>KONTAKO</Text>
            <TouchableOpacity
              style={styles.contactButton}
              onPress={() => setIsContactModalOpen(true)}
            >
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

            {/* Right Side / Bottom: Frosted Glass Flip Panel Viewport Container */}
            <View
              style={[
                styles.loginCardContainer,
                isWeb ? { width: "40%", maxWidth: 450 } : { width: "100%" },
              ]}
            >
              {Platform.OS === "android" ? (
                <View
                  style={[styles.blurWrapper, styles.androidFallbackBackground]}
                >
                  {!isFlipped ? (
                    /* --- FACE SIDE: LOGIN VIEW --- */
                    <View style={styles.formInnerContent}>
                      <Text style={styles.formTitle}>SECURE ACCESS</Text>

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

                      <TouchableOpacity
                        style={styles.forgotPasswordContainer}
                        onPress={() => setIsFlipped(true)}
                      >
                        <Text style={styles.forgotText}>Forgot Password?</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.loginButton}
                        onPress={() => router.replace("/dashboard")}
                      >
                        <Text style={styles.loginButtonText}>LOG IN</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    /* --- REVERSE SIDE: ACCOUNT RECOVERY VIEW --- */
                    <View style={styles.formInnerContent}>
                      <Text style={styles.formTitle}>ACCOUNT RECOVERY</Text>

                      {recoveryStep === "email" && (
                        <>
                          <Text style={styles.recoveryStepDescriptionText}>
                            Input your verified admin console email to generate
                            a security payload loop token.
                          </Text>
                          <View style={styles.inputContainer}>
                            <TextInput
                              style={styles.input}
                              placeholder="Account Email"
                              placeholderTextColor="rgba(255,255,255,0.4)"
                              keyboardType="email-address"
                              value={recoveryEmail}
                              onChangeText={setRecoveryEmail}
                              autoCapitalize="none"
                            />
                          </View>
                          <TouchableOpacity
                            style={styles.loginButton}
                            onPress={handleTriggerOTPRequest}
                          >
                            <Text style={styles.loginButtonText}>
                              GENERATE OTP
                            </Text>
                          </TouchableOpacity>
                        </>
                      )}

                      {recoveryStep === "otp" && (
                        <>
                          <Text style={styles.recoveryStepDescriptionText}>
                            Enter the 4-digit code dispatched to your profile
                            mail address to verify ownership.
                          </Text>
                          <View style={styles.inputContainer}>
                            <TextInput
                              style={styles.input}
                              placeholder="Verification Code"
                              placeholderTextColor="rgba(255,255,255,0.4)"
                              keyboardType="numeric"
                              maxLength={6}
                              value={otpCode}
                              onChangeText={setOtpCode}
                            />
                          </View>
                          <TouchableOpacity
                            style={styles.loginButton}
                            onPress={handleVerifyOTP}
                          >
                            <Text style={styles.loginButtonText}>
                              VERIFY TOKEN
                            </Text>
                          </TouchableOpacity>
                        </>
                      )}

                      {recoveryStep === "reset" && (
                        <>
                          <Text style={styles.recoveryStepDescriptionText}>
                            Configure your new credential layout criteria safely
                            below.
                          </Text>
                          <View style={styles.inputContainer}>
                            <TextInput
                              style={styles.input}
                              placeholder="New Password"
                              placeholderTextColor="rgba(255,255,255,0.4)"
                              secureTextEntry
                              value={newPassword}
                              onChangeText={setNewPassword}
                              autoCapitalize="none"
                            />
                          </View>
                          <View style={styles.inputContainer}>
                            <TextInput
                              style={styles.input}
                              placeholder="Confirm New Password"
                              placeholderTextColor="rgba(255,255,255,0.4)"
                              secureTextEntry
                              value={confirmPassword}
                              onChangeText={setConfirmPassword}
                              autoCapitalize="none"
                            />
                          </View>
                          <TouchableOpacity
                            style={styles.loginButton}
                            onPress={handleUpdatePassword}
                          >
                            <Text style={styles.loginButtonText}>
                              UPDATE PASSWORD
                            </Text>
                          </TouchableOpacity>
                        </>
                      )}

                      <TouchableOpacity
                        style={styles.backToLoginTriggerContainer}
                        onPress={() => {
                          setIsFlipped(false);
                          setRecoveryStep("email");
                        }}
                      >
                        <Text style={styles.backToLoginText}>
                          ← Back to Login
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              ) : (
                <BlurView
                  intensity={70}
                  tint="dark"
                  blurMethod="dimezisBlurView"
                  style={styles.blurWrapper}
                >
                  {!isFlipped ? (
                    /* --- FACE SIDE: LOGIN VIEW --- */
                    <View style={styles.formInnerContent}>
                      <Text style={styles.formTitle}>SECURE ACCESS</Text>

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

                      <TouchableOpacity
                        style={styles.forgotPasswordContainer}
                        onPress={() => setIsFlipped(true)}
                      >
                        <Text style={styles.forgotText}>Forgot Password?</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.loginButton}
                        onPress={() => router.replace("/dashboard")}
                      >
                        <Text style={styles.loginButtonText}>LOG IN</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    /* --- REVERSE SIDE: ACCOUNT RECOVERY VIEW --- */
                    <View style={styles.formInnerContent}>
                      <Text style={styles.formTitle}>ACCOUNT RECOVERY</Text>

                      {recoveryStep === "email" && (
                        <>
                          <Text style={styles.recoveryStepDescriptionText}>
                            Input your verified admin console email to generate
                            a security payload loop token.
                          </Text>
                          <View style={styles.inputContainer}>
                            <TextInput
                              style={styles.input}
                              placeholder="Account Email"
                              placeholderTextColor="rgba(255,255,255,0.4)"
                              keyboardType="email-address"
                              value={recoveryEmail}
                              onChangeText={setRecoveryEmail}
                              autoCapitalize="none"
                            />
                          </View>
                          <TouchableOpacity
                            style={styles.loginButton}
                            onPress={handleTriggerOTPRequest}
                          >
                            <Text style={styles.loginButtonText}>
                              GENERATE OTP
                            </Text>
                          </TouchableOpacity>
                        </>
                      )}

                      {recoveryStep === "otp" && (
                        <>
                          <Text style={styles.recoveryStepDescriptionText}>
                            Enter the 4-digit code dispatched to your profile
                            mail address to verify ownership.
                          </Text>
                          <View style={styles.inputContainer}>
                            <TextInput
                              style={styles.input}
                              placeholder="Verification Code"
                              placeholderTextColor="rgba(255,255,255,0.4)"
                              keyboardType="numeric"
                              maxLength={6}
                              value={otpCode}
                              onChangeText={setOtpCode}
                            />
                          </View>
                          <TouchableOpacity
                            style={styles.loginButton}
                            onPress={handleVerifyOTP}
                          >
                            <Text style={styles.loginButtonText}>
                              VERIFY TOKEN
                            </Text>
                          </TouchableOpacity>
                        </>
                      )}

                      {recoveryStep === "reset" && (
                        <>
                          <Text style={styles.recoveryStepDescriptionText}>
                            Configure your new credential layout criteria safely
                            below.
                          </Text>
                          <View style={styles.inputContainer}>
                            <TextInput
                              style={styles.input}
                              placeholder="New Password"
                              placeholderTextColor="rgba(255,255,255,0.4)"
                              secureTextEntry
                              value={newPassword}
                              onChangeText={setNewPassword}
                              autoCapitalize="none"
                            />
                          </View>
                          <View style={styles.inputContainer}>
                            <TextInput
                              style={styles.input}
                              placeholder="Confirm New Password"
                              placeholderTextColor="rgba(255,255,255,0.4)"
                              secureTextEntry
                              value={confirmPassword}
                              onChangeText={setConfirmPassword}
                              autoCapitalize="none"
                            />
                          </View>
                          <TouchableOpacity
                            style={styles.loginButton}
                            onPress={handleUpdatePassword}
                          >
                            <Text style={styles.loginButtonText}>
                              UPDATE PASSWORD
                            </Text>
                          </TouchableOpacity>
                        </>
                      )}

                      <TouchableOpacity
                        style={styles.backToLoginTriggerContainer}
                        onPress={() => {
                          setIsFlipped(false);
                          setRecoveryStep("email");
                        }}
                      >
                        <Text style={styles.backToLoginText}>
                          ← Back to Login
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </BlurView>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* --- CONTACT INFORMATION MODAL OVERLAY --- */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isContactModalOpen}
        onRequestClose={() => setIsContactModalOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsContactModalOpen(false)}
        >
          <View style={[styles.contactCard, { width: isWeb ? 460 : "88%" }]}>
            <LinearGradient
              colors={["#FF3B00", "#d13100"]}
              style={styles.modalHeaderGradient}
            >
              <View style={styles.modalHeaderRow}>
                <Text style={styles.modalHeadingTitle}>Contact Support</Text>
                <TouchableOpacity onPress={() => setIsContactModalOpen(false)}>
                  <Ionicons name="close" size={22} color="white" />
                </TouchableOpacity>
              </View>
            </LinearGradient>

            <View style={styles.modalBody}>
              <View style={styles.contactDetailsWrapper}>
                {/* Location Block */}
                <View style={styles.contactItemRow}>
                  <View style={styles.contactIconContainer}>
                    <Ionicons name="location" size={18} color="#FF3B00" />
                  </View>
                  <View style={styles.contactTextColumn}>
                    <Text style={styles.contactLabelText}>
                      HQ Corporate Address
                    </Text>
                    <Text style={styles.contactValueText}>
                      Anasol Consultancy Services, Kukatpally, Hyderabad,
                      Telangana, 500072
                    </Text>
                  </View>
                </View>

                {/* Phone Block */}
                <View style={styles.contactItemRow}>
                  <View style={styles.contactIconContainer}>
                    <Ionicons name="call" size={16} color="#FF3B00" />
                  </View>
                  <View style={styles.contactTextColumn}>
                    <Text style={styles.contactLabelText}>Direct Helpline</Text>
                    <Text style={styles.contactValueText}>
                      +91 40 4917 2200
                    </Text>
                  </View>
                </View>

                {/* Email Block */}
                <View style={styles.contactItemRow}>
                  <View style={styles.contactIconContainer}>
                    <Ionicons name="mail" size={16} color="#FF3B00" />
                  </View>
                  <View style={styles.contactTextColumn}>
                    <Text style={styles.contactLabelText}>Email Desk</Text>
                    <Text style={styles.contactValueText}>
                      support@kontako.com
                    </Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                style={styles.modalCloseActionButton}
                onPress={() => setIsContactModalOpen(false)}
              >
                <Text style={styles.modalCloseActionButtonText}>Dismiss</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
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
    backgroundColor: "rgba(15, 15, 15, 0.85)",
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
  backToLoginTriggerContainer: {
    alignSelf: "flex-start",
    marginTop: 16,
  },
  backToLoginText: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 13,
    fontWeight: "600",
  },
  recoveryStepDescriptionText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 16,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    justifyContent: "center",
    alignItems: "center",
  },
  contactCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    overflow: "hidden",
    ...Platform.select({
      web: {
        boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.3)",
      },
      default: {
        elevation: 10,
      },
    }),
  },
  modalHeaderGradient: {
    padding: 20,
  },
  modalHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalHeadingTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "white",
  },
  modalBody: {
    padding: 20,
  },
  contactDetailsWrapper: {
    gap: 16,
    marginBottom: 20,
  },
  contactItemRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  contactIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#fff0ec",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  contactTextColumn: {
    flex: 1,
  },
  contactLabelText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#9ca3af",
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  contactValueText: {
    fontSize: 13.5,
    fontWeight: "600",
    color: "#27272a",
    marginTop: 2,
    lineHeight: 18,
  },
  modalCloseActionButton: {
    backgroundColor: "#27272a",
    height: 42,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  modalCloseActionButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
  },
});
