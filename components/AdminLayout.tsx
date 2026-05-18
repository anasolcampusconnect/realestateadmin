import { Href, router } from "expo-router";
import React, { useState } from "react";
import {
    Dimensions,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { width, height: screenHeight } = Dimensions.get("window");
const isWeb = Platform.OS === "web" || width > 1024;

interface AdminOption {
  label: string;
  icon: string;
  path: Href<string>;
}

interface AdminLayoutProps {
  children: React.ReactNode;
  currentPageLabel: string; // Used to track which drawer tab is currently active
}

export default function AdminLayout({
  children,
  currentPageLabel,
}: AdminLayoutProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const adminOptions: AdminOption[] = [
    { label: "Dashboard", icon: "📊", path: "./dashboard" as Href },
    {
      label: "Agent Management",
      icon: "👥",
      path: "./agentManagement" as Href,
    },
    {
      label: "Property Approvals",
      icon: "🏢",
      path: "./properties" as Href,
    },
    {
      label: "Location & Categories",
      icon: "📍",
      path: "./categories" as Href,
    },
    { label: "Legal Verification", icon: "⚖️", path: "./legal" as Href },
    { label: "Financial Reports", icon: "📈", path: "./reports" as Href },
    {
      label: "System Audit Logs",
      icon: "📜",
      path: "./auditLogs" as Href,
    },
    { label: "Marketing & Offers", icon: "📢", path: "./offers" as Href },
    {
      label: "Complaints & Support",
      icon: "🛠️",
      path: "./support" as Href,
    },
  ];

  const handleNavigation = (path: Href<string>) => {
    setIsDrawerOpen(false);
    router.push(path);
  };

  const handleConfirmedLogout = () => {
    setIsLogoutModalOpen(false);
    setIsDrawerOpen(false);

    // --- STACK POOL CLEARING BREAKOUT PIPELINE ---
    if (router.canDismiss()) {
      router.dismissAll();
    }

    router.replace("/");
  };

  // Sidebar list shared across both Web view and Mobile sliding modal drawer
  const DrawerContent = () => (
    <View style={styles.drawerInner}>
      <View style={styles.drawerHeader}>
        <View style={styles.logoBadge}>
          <Text style={styles.logoBadgeText}>RE</Text>
        </View>
        <View>
          <Text style={styles.brandSubtext}>Admin Console</Text>
        </View>
      </View>

      <ScrollView
        style={styles.menuScroll}
        showsVerticalScrollIndicator={false}
      >
        {adminOptions.map((item) => {
          const isActive = item.label === currentPageLabel;
          return (
            <TouchableOpacity
              key={item.label}
              style={[styles.menuItem, isActive && styles.menuItemActive]}
              activeOpacity={0.7}
              onPress={() => handleNavigation(item.path)}
            >
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text
                style={[styles.menuLabel, isActive && styles.menuLabelActive]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* --- LOGOUT TRIGGER --- */}
      <TouchableOpacity
        style={styles.drawerLogoutTrigger}
        activeOpacity={0.7}
        onPress={() => setIsLogoutModalOpen(true)}
      >
        <Text style={styles.logoutIcon}>🚪</Text>
        <Text style={styles.logoutLabelText}>LOG OUT</Text>
      </TouchableOpacity>

      <View style={styles.drawerFooterMeta}>
        <Text style={styles.operatorLabel}>OPERATOR PROFILE</Text>
        <Text style={styles.operatorValue}>Mahwish Khan</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.windowWrapper}>
      {/* --- TOP GLOBAL NAVIGATION BAR --- */}
      <View style={styles.appHeader}>
        <View style={styles.navLeftRow}>
          <TouchableOpacity
            style={styles.hamburgerButton}
            onPress={() => setIsDrawerOpen(!isDrawerOpen)}
          >
            <Text style={styles.hamburgerIconText}>☰</Text>
          </TouchableOpacity>
          <Text style={styles.headerLogo}>Real Estate Platform</Text>
        </View>

        <View style={styles.profileControls}>
          <TouchableOpacity style={styles.bellIconWrapper}>
            <Text style={styles.bellText}>🔔</Text>
            <View style={styles.notificationDot} />
          </TouchableOpacity>
          <View style={styles.userProfileRow}>
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarInitial}>MK</Text>
            </View>
            {isWeb && (
              <View style={styles.profileMeta}>
                <Text style={styles.profileName}>Mahwish Khan</Text>
                <Text style={styles.profileEmail}>mahwish.khan@anasol.com</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* --- MAIN APP INTERFACE CORE --- */}
      <View style={styles.workbenchBody}>
        {/* Persistent Side Navigation Drawer on Desktop Web */}
        {isWeb && (
          <View style={styles.desktopSidebarContainer}>
            <DrawerContent />
          </View>
        )}

        {/* Dynamic Inner Workspace Panel Viewports */}
        <View style={styles.workspaceShell}>{children}</View>
      </View>

      {/* --- CROSS-PLATFORM MOBILE COLLAPSIBLE DRAWER --- */}
      {!isWeb && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isDrawerOpen}
          onRequestClose={() => setIsDrawerOpen(false)}
        >
          <TouchableOpacity
            style={styles.drawerModalOverlay}
            activeOpacity={1}
            onPress={() => setIsDrawerOpen(false)}
          >
            <TouchableOpacity
              activeOpacity={1}
              style={styles.mobileDrawerPanel}
            >
              <DrawerContent />
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      )}

      {/* --- DEEP BLACK METROPOLIS LOGOUT DIALOG MODAL --- */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isLogoutModalOpen}
        onRequestClose={() => setIsLogoutModalOpen(false)}
      >
        <TouchableOpacity
          style={styles.blackModalOverlay}
          activeOpacity={1}
          onPress={() => setIsLogoutModalOpen(false)}
        >
          <TouchableOpacity activeOpacity={1} style={styles.blackModalCard}>
            <Text style={styles.blackModalHeading}>
              Terminate Console Session?
            </Text>
            <Text style={styles.blackModalDescription}>
              Are you sure you want to log out from Kontako Systems? Active
              operations workflows and pipeline states will be uncoupled safely.
            </Text>

            <View style={styles.blackModalActionRow}>
              <TouchableOpacity
                style={[styles.blackModalBtn, styles.btnCancelDark]}
                onPress={() => setIsLogoutModalOpen(false)}
              >
                <Text style={styles.btnCancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.blackModalBtn, styles.btnConfirmRust]}
                onPress={handleConfirmedLogout}
              >
                <Text style={styles.btnConfirmText}>Confirm Logout</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  windowWrapper: {
    flex: 1,
    backgroundColor: "#F3F3F3",
  },
  appHeader: {
    // FIXED: Increased structural height and dynamically added standard device padding clearance layout for Android pipelines
    height: Platform.OS === "android" ? 95 : 70,
    paddingTop: Platform.OS === "android" ? 28 : 0,
    backgroundColor: "#111111",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    zIndex: 100,
  },
  navLeftRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  hamburgerButton: {
    padding: 6,
  },
  hamburgerIconText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  headerLogo: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  profileControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  bellIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#222222",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  bellText: {
    fontSize: 16,
  },
  notificationDot: {
    position: "absolute",
    top: 10,
    right: 12,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#D95D29",
  },
  userProfileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ff3b00",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarInitial: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  profileMeta: {
    justifyContent: "center",
  },
  profileName: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
  profileEmail: {
    color: "#666666",
    fontSize: 11,
    marginTop: 1,
  },
  workbenchBody: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
  },
  desktopSidebarContainer: {
    width: 260,
    height: "100%",
    backgroundColor: "#111111",
    borderRightWidth: 1,
    borderColor: "#222222",
  },
  drawerInner: {
    flex: 1,
    backgroundColor: "#111111",
    height: "100%", // FIXED: Stretches component children seamlessly vertically
  },
  drawerHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 12,
    borderBottomWidth: 1,
    borderColor: "#222222",
  },
  logoBadge: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#D95D29",
    justifyContent: "center",
    alignItems: "center",
  },
  logoBadgeText: {
    color: "#ffffff",
    fontWeight: "900",
    fontSize: 15,
  },
  brandText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
  },
  brandSubtext: {
    color: "#64748b",
    fontSize: 11,
    fontWeight: "600",
    marginTop: 1,
  },
  menuScroll: {
    flex: 1,
    paddingHorizontal: 12,
    marginTop: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginBottom: 6,
    gap: 12,
  },
  menuItemActive: {
    backgroundColor: "rgba(217, 93, 41, 0.15)",
  },
  menuIcon: {
    fontSize: 16,
  },
  menuLabel: {
    color: "#888888",
    fontSize: 13.5,
    fontWeight: "600",
  },
  menuLabelActive: {
    color: "#D95D29",
    fontWeight: "700",
  },
  drawerLogoutTrigger: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 26,
    gap: 12,
    borderTopWidth: 1,
    borderColor: "#222222",
  },
  logoutIcon: {
    fontSize: 15,
  },
  logoutLabelText: {
    color: "#ef4444",
    fontSize: 13.5,
    fontWeight: "700",
  },
  drawerFooterMeta: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: "#222222",
    backgroundColor: "#0a0a0a",
    paddingBottom: Platform.OS === "android" ? 30 : 20, // Clean safe distance spacing from Android lower navigation layout pill shape
  },
  workspaceShell: {
    flex: 1,
    height: "100%",
  },
  drawerModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  mobileDrawerPanel: {
    width: 260,
    height: screenHeight, // FIXED: Absolute stretch override to lock panel boundaries down to screen viewport edge
    backgroundColor: "#111111",
    alignSelf: "flex-start",
  },
  blackModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  blackModalCard: {
    backgroundColor: "#111111",
    width: Platform.OS === "web" && width > 480 ? 400 : "90%",
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: "#222222",
  },
  blackModalHeading: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 0.3,
  },
  blackModalDescription: {
    color: "#94a3b8",
    fontSize: 13.5,
    lineHeight: 20,
    marginTop: 10,
    fontWeight: "500",
  },
  blackModalActionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 24,
  },
  blackModalBtn: {
    flex: 1,
    height: 42,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  btnCancelDark: {
    backgroundColor: "#222222",
    borderWidth: 1,
    borderColor: "#334155",
  },
  btnCancelText: {
    color: "#cbd5e1",
    fontSize: 13,
    fontWeight: "700",
  },
  btnConfirmRust: {
    backgroundColor: "#D95D29",
  },
  btnConfirmText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
});
