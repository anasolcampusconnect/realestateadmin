import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AdminLayout from "../components/AdminLayout";

const { width, height } = Dimensions.get("window");
const isWeb = Platform.OS === "web" || width > 1024;

interface Agent {
  id: string;
  name: string;
  email: string;
  region: string;
  listings: number;
  salesClosed: number;
  status: "Active" | "Pending" | "Suspended";
  permissions: "Full Access" | "Standard" | "Restricted" | "No Access";
}

export default function AgentManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<
    "All" | "Active" | "Pending" | "Suspended"
  >("All");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  // Form state for adding new agent
  const [newAgent, setNewAgent] = useState({
    name: "",
    email: "",
    region: "",
    status: "Active" as "Active" | "Pending" | "Suspended",
    permissions: "Standard" as
      | "Full Access"
      | "Standard"
      | "Restricted"
      | "No Access",
  });

  const [agentsData, setAgentsData] = useState<Agent[]>([
    {
      id: "AGT-101",
      name: "Rohan Sharma",
      email: "rohan.sharma@kontako.com",
      region: "Mumbai South",
      listings: 24,
      salesClosed: 14,
      status: "Active",
      permissions: "Full Access",
    },
    {
      id: "AGT-102",
      name: "Ananya Iyer",
      email: "ananya.i@kontako.com",
      region: "Bangalore East",
      listings: 18,
      salesClosed: 9,
      status: "Active",
      permissions: "Standard",
    },
    {
      id: "AGT-103",
      name: "Vikram Malhotra",
      email: "v.malhotra@kontako.com",
      region: "Delhi NCR",
      listings: 31,
      salesClosed: 22,
      status: "Active",
      permissions: "Full Access",
    },
    {
      id: "AGT-104",
      name: "Sneha Reddy",
      email: "sneha.r@kontako.com",
      region: "Hyderabad West",
      listings: 7,
      salesClosed: 2,
      status: "Pending",
      permissions: "Restricted",
    },
    {
      id: "AGT-105",
      name: "Kabir Mehta",
      email: "kabir.m@kontako.com",
      region: "Pune Central",
      listings: 0,
      salesClosed: 0,
      status: "Suspended",
      permissions: "No Access",
    },
  ]);

  const filteredAgents = agentsData.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatusFilter === "All" || agent.status === selectedStatusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalActive = agentsData.filter((a) => a.status === "Active").length;
  const totalPending = agentsData.filter((a) => a.status === "Pending").length;
  const totalSuspended = agentsData.filter(
    (a) => a.status === "Suspended",
  ).length;
  const totalListings = agentsData.reduce((sum, a) => sum + a.listings, 0);
  const totalSales = agentsData.reduce((sum, a) => sum + a.salesClosed, 0);
  const avgConversion =
    totalSales > 0 ? ((totalSales / totalListings) * 100).toFixed(1) : "0";

  const metrics = [
    {
      label: "TOTAL ACTIVE AGENTS",
      value: totalActive.toString(),
      subtext: "Currently onboarded",
      icon: "people-outline",
      gradient: ["#667eea", "#764ba2"] as const,
      color: "#667eea",
    },
    {
      label: "PENDING VERIFICATIONS",
      value: totalPending.toString(),
      subtext: "Awaiting approval",
      icon: "time-outline",
      gradient: ["#f093fb", "#f5576c"] as const,
      color: "#f5576c",
    },
    {
      label: "TOTAL LISTINGS",
      value: totalListings.toString(),
      subtext: "Active properties",
      icon: "home-outline",
      gradient: ["#4facfe", "#00f2fe"] as const,
      color: "#4facfe",
    },
    {
      label: "CONVERSION RATE",
      value: `${avgConversion}%`,
      subtext: "Sales to listings",
      icon: "trending-up-outline",
      gradient: ["#fa709a", "#fee140"] as const,
      color: "#fee140",
    },
  ];

  const handleOpenActionModal = (agent: Agent) => {
    setSelectedAgent({ ...agent });
    setIsEditModalOpen(true);
  };

  const handleUpdateStatus = (
    newStatus: "Active" | "Pending" | "Suspended",
  ) => {
    if (!selectedAgent) return;
    setAgentsData((prev) =>
      prev.map((a) =>
        a.id === selectedAgent.id ? { ...a, status: newStatus } : a,
      ),
    );
    setIsEditModalOpen(false);
    Alert.alert("Success", `Agent status updated to ${newStatus}`);
  };

  const handleAddAgent = () => {
    if (!newAgent.name.trim()) {
      Alert.alert("Error", "Please enter agent name");
      return;
    }
    if (!newAgent.email.trim()) {
      Alert.alert("Error", "Please enter agent email");
      return;
    }
    if (!newAgent.region.trim()) {
      Alert.alert("Error", "Please enter region");
      return;
    }

    const newId = `AGT-${Math.floor(Math.random() * 900) + 200}`;

    const agentToAdd: Agent = {
      id: newId,
      name: newAgent.name,
      email: newAgent.email,
      region: newAgent.region,
      listings: 0,
      salesClosed: 0,
      status: newAgent.status,
      permissions: newAgent.permissions,
    };

    setAgentsData((prev) => [...prev, agentToAdd]);

    setNewAgent({
      name: "",
      email: "",
      region: "",
      status: "Active",
      permissions: "Standard",
    });

    setIsAddModalOpen(false);
    Alert.alert(
      "Success",
      `Agent ${newAgent.name} has been added successfully!`,
    );
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "Active":
        return {
          bg: "rgba(16, 185, 129, 0.12)",
          text: "#10b981",
          dot: "#10b981",
          label: "Active",
        };
      case "Pending":
        return {
          bg: "rgba(217, 93, 41, 0.12)",
          text: "#D95D29",
          dot: "#D95D29",
          label: "Pending",
        };
      case "Suspended":
        return {
          bg: "rgba(239, 68, 68, 0.12)",
          text: "#ef4444",
          dot: "#ef4444",
          label: "Suspended",
        };
      default:
        return {
          bg: "#f3f4f6",
          text: "#6b7280",
          dot: "#9ca3af",
          label: "Unknown",
        };
    }
  };

  const getPermissionsBadge = (permissions: string) => {
    switch (permissions) {
      case "Full Access":
        return {
          icon: "shield-checkmark-outline",
          color: "#10b981",
          label: "Full",
        };
      case "Standard":
        return { icon: "shield-outline", color: "#4facfe", label: "Standard" };
      case "Restricted":
        return {
          icon: "shield-half-outline",
          color: "#f5576c",
          label: "Restricted",
        };
      default:
        return {
          icon: "close-circle-outline",
          color: "#ef4444",
          label: "No Access",
        };
    }
  };

  return (
    <AdminLayout currentPageLabel="Agent Management">
      <ScrollView
        style={styles.pageWrapper}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header Section */}
        <View style={styles.headerSection}>
          <View>
            <Text style={styles.pageTitle}>Agent Management</Text>
            <Text style={styles.pageSubtitle}>
              Manage your real estate team and permissions
            </Text>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setIsAddModalOpen(true)}
          >
            <LinearGradient
              colors={["#D95D29", "#c04e21"]}
              style={styles.addButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name="add-outline" size={20} color="white" />
              <Text style={styles.addButtonText}>Add New Agent</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Metrics Section */}
        {isWeb ? (
          <View style={styles.metricsGrid}>
            {metrics.map((metric, idx) => (
              <LinearGradient
                key={idx}
                colors={metric.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.metricCard}
              >
                <View style={styles.metricHeader}>
                  <View style={styles.metricIconContainer}>
                    <Ionicons
                      name={metric.icon as any}
                      size={22}
                      color="white"
                    />
                  </View>
                  <Text style={styles.metricLabel}>{metric.label}</Text>
                </View>
                <Text style={styles.metricValue}>{metric.value}</Text>
                <Text style={styles.metricSubtext}>{metric.subtext}</Text>
              </LinearGradient>
            ))}
          </View>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.metricsCarousel}
            contentContainerStyle={styles.metricsCarouselContent}
          >
            {metrics.map((metric, idx) => (
              <LinearGradient
                key={idx}
                colors={metric.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.metricCarouselCard}
              >
                <View style={styles.metricHeader}>
                  <View style={styles.metricIconContainerMobile}>
                    <Ionicons
                      name={metric.icon as any}
                      size={18}
                      color="white"
                    />
                  </View>
                  <Text style={styles.metricLabelMobile}>{metric.label}</Text>
                </View>
                <Text style={styles.metricValueMobile}>{metric.value}</Text>
                <Text style={styles.metricSubtextMobile}>{metric.subtext}</Text>
              </LinearGradient>
            ))}
          </ScrollView>
        )}

        {/* Filter Toolbar */}
        <View style={styles.toolbarContainer}>
          <View style={styles.searchSection}>
            <View style={styles.searchContainer}>
              <Ionicons name="search-outline" size={20} color="#9ca3af" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search by name, ID, region..."
                placeholderTextColor="#9ca3af"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery("")}>
                  <Ionicons name="close-circle" size={18} color="#9ca3af" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Status:</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.statusFiltersWrapper}
            >
              {(["All", "Active", "Pending", "Suspended"] as const).map(
                (status) => (
                  <TouchableOpacity
                    key={status}
                    style={[
                      styles.statusTabChip,
                      selectedStatusFilter === status &&
                        styles.statusTabChipActive,
                    ]}
                    onPress={() => setSelectedStatusFilter(status)}
                  >
                    <Text
                      style={[
                        styles.statusTabChipText,
                        selectedStatusFilter === status &&
                          styles.statusTabChipTextActive,
                      ]}
                    >
                      {status}
                      {status !== "All" && (
                        <Text style={styles.statusCount}>
                          {" "}
                          (
                          {agentsData.filter((a) => a.status === status).length}
                          )
                        </Text>
                      )}
                    </Text>
                  </TouchableOpacity>
                ),
              )}
            </ScrollView>
          </View>
        </View>

        {/* Agent Directory */}
        <View
          style={
            isWeb ? styles.ledgerWrapperCard : styles.mobileLedgerContainer
          }
        >
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.ledgerHeading}>Agent Directory</Text>
              <Text style={styles.ledgerSubheading}>
                {filteredAgents.length} agents found
              </Text>
            </View>
            <TouchableOpacity style={styles.exportButton}>
              <Ionicons name="download-outline" size={16} color="#D95D29" />
              <Text style={styles.exportButtonText}>Export</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.horizontalDivider} />

          {isWeb ? (
            <View style={styles.tableWrapper}>
              <View style={styles.tableHeaderRow}>
                <Text style={[styles.thCell, { width: "10%" }]}>ID</Text>
                <Text style={[styles.thCell, { width: "22%" }]}>Agent</Text>
                <Text style={[styles.thCell, { width: "15%" }]}>Region</Text>
                <Text
                  style={[styles.thCell, { width: "10%", textAlign: "center" }]}
                >
                  Listings
                </Text>
                <Text
                  style={[styles.thCell, { width: "10%", textAlign: "center" }]}
                >
                  Sales
                </Text>
                <Text style={[styles.thCell, { width: "12%" }]}>
                  Permissions
                </Text>
                <Text style={[styles.thCell, { width: "10%" }]}>Status</Text>
                <Text
                  style={[styles.thCell, { width: "11%", textAlign: "center" }]}
                >
                  Actions
                </Text>
              </View>

              {filteredAgents.map((agent) => {
                const statusConfig = getStatusConfig(agent.status);
                const permConfig = getPermissionsBadge(agent.permissions);
                return (
                  <View key={agent.id} style={styles.tableDataRow}>
                    <Text
                      style={[
                        styles.tdCell,
                        styles.idHighlight,
                        { width: "10%" },
                      ]}
                    >
                      {agent.id}
                    </Text>
                    <View style={{ width: "22%" }}>
                      <Text style={styles.agentPrimaryName}>{agent.name}</Text>
                      <Text style={styles.agentSubEmail}>{agent.email}</Text>
                    </View>
                    <View
                      style={{
                        width: "15%",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <Ionicons
                        name="location-outline"
                        size={12}
                        color="#9ca3af"
                      />
                      <Text style={styles.tdCell}>{agent.region}</Text>
                    </View>
                    <Text
                      style={[
                        styles.tdCell,
                        {
                          width: "10%",
                          textAlign: "center",
                          fontWeight: "700",
                          color: "#D95D29",
                        },
                      ]}
                    >
                      {agent.listings}
                    </Text>
                    <Text
                      style={[
                        styles.tdCell,
                        {
                          width: "10%",
                          textAlign: "center",
                          fontWeight: "700",
                          color: "#10b981",
                        },
                      ]}
                    >
                      {agent.salesClosed}
                    </Text>
                    <View style={{ width: "12%" }}>
                      <View
                        style={[
                          styles.permissionBadge,
                          { backgroundColor: `${permConfig.color}15` },
                        ]}
                      >
                        <Ionicons
                          name={permConfig.icon as any}
                          size={12}
                          color={permConfig.color}
                        />
                        <Text
                          style={[
                            styles.permissionText,
                            { color: permConfig.color },
                          ]}
                        >
                          {permConfig.label}
                        </Text>
                      </View>
                    </View>
                    <View style={{ width: "10%" }}>
                      <View
                        style={[
                          styles.statusBadge,
                          { backgroundColor: statusConfig.bg },
                        ]}
                      >
                        {/* FIXED: Swapped out ")" syntax layout with a standard configuration closing array bracket "]" safely below */}
                        <View
                          style={[
                            styles.statusDot,
                            { backgroundColor: statusConfig.dot },
                          ]}
                        />
                        <Text
                          style={[
                            styles.statusBadgeText,
                            { color: statusConfig.text },
                          ]}
                        >
                          {statusConfig.label}
                        </Text>
                      </View>
                    </View>
                    <View style={[styles.tableActionPort, { width: "11%" }]}>
                      <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => handleOpenActionModal(agent)}
                      >
                        <Ionicons
                          name="create-outline"
                          size={16}
                          color="#D95D29"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.actionButton}>
                        <Ionicons
                          name="eye-outline"
                          size={16}
                          color="#6b7280"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </View>
          ) : (
            <View style={styles.mobileCardsStream}>
              {filteredAgents.map((agent) => {
                const statusConfig = getStatusConfig(agent.status);
                const permConfig = getPermissionsBadge(agent.permissions);
                return (
                  <View key={agent.id} style={styles.mobileAgentCard}>
                    <View style={styles.cardHeaderRowMobile}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <Text style={styles.mobileCardId}>{agent.id}</Text>
                        <Text style={styles.mobileCardName}>{agent.name}</Text>
                      </View>
                      <View
                        style={[
                          styles.statusBadgeMobile,
                          { backgroundColor: statusConfig.bg },
                        ]}
                      >
                        <View
                          style={[
                            styles.statusDot,
                            { backgroundColor: statusConfig.dot },
                          ]}
                        />
                        <Text
                          style={[
                            styles.statusBadgeTextMobile,
                            { color: statusConfig.text },
                          ]}
                        >
                          {statusConfig.label}
                        </Text>
                      </View>
                    </View>

                    <Text style={styles.mobileCardEmail}>{agent.email}</Text>

                    <View style={styles.cardDetailsBoxMobile}>
                      <View style={styles.detailRowMobile}>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <Ionicons
                            name="location-outline"
                            size={12}
                            color="#6b7280"
                          />
                          <Text style={styles.detailFieldValueMobile}>
                            {agent.region}
                          </Text>
                        </View>
                        <View
                          style={[
                            styles.permissionBadgeMobile,
                            { backgroundColor: `${permConfig.color}15` },
                          ]}
                        >
                          <Ionicons
                            name={permConfig.icon as any}
                            size={10}
                            color={permConfig.color}
                          />
                          <Text
                            style={[
                              styles.permissionTextMobile,
                              { color: permConfig.color },
                            ]}
                          >
                            {permConfig.label}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.metricsSplitRowMobile}>
                        <View style={styles.metricItemMobile}>
                          <Text style={styles.metricCountLabelMobile}>
                            Listings
                          </Text>
                          <Text style={styles.metricCountValueMobileOrange}>
                            {agent.listings}
                          </Text>
                        </View>
                        <View style={styles.metricItemMobile}>
                          <Text style={styles.metricCountLabelMobile}>
                            Deals Closed
                          </Text>
                          <Text style={styles.metricCountValueMobileGreen}>
                            {agent.salesClosed}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View style={styles.mobileCardActionsRow}>
                      <TouchableOpacity
                        style={styles.mobileEditButton}
                        onPress={() => handleOpenActionModal(agent)}
                      >
                        <Ionicons
                          name="create-outline"
                          size={14}
                          color="white"
                        />
                        <Text style={styles.mobileEditButtonText}>
                          Manage Agent
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Edit Status Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsEditModalOpen(false)}
        >
          <View
            style={[styles.modalContentCard, { width: isWeb ? 500 : "90%" }]}
          >
            <LinearGradient
              colors={["#D95D29", "#c04e21"]}
              style={styles.modalGradientHeader}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.modalHeadingTitle}>Manage Agent Profile</Text>
              <Text style={styles.modalSubheadingText}>
                Update status and permissions
              </Text>
            </LinearGradient>

            <View style={styles.modalBody}>
              <View style={styles.selectedDossierBox}>
                <View style={styles.dossierHeader}>
                  <Ionicons
                    name="person-circle-outline"
                    size={48}
                    color="#D95D29"
                  />
                  <View style={styles.dossierInfo}>
                    <Text style={styles.dossierValueText}>
                      {selectedAgent?.name}
                    </Text>
                    <Text style={styles.dossierSubText}>
                      {selectedAgent?.email}
                    </Text>
                    <Text style={styles.dossierIdText}>
                      {selectedAgent?.id}
                    </Text>
                  </View>
                </View>
              </View>

              <Text style={styles.actionPromptText}>
                Change Account Status:
              </Text>
              <View style={styles.modalActionButtonsGrid}>
                <TouchableOpacity
                  style={[styles.actionBtn, styles.btnActiveOverride]}
                  onPress={() => handleUpdateStatus("Active")}
                >
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={18}
                    color="#10b981"
                  />
                  <Text style={[styles.actionBtnText, { color: "#10b981" }]}>
                    Activate Account
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionBtn, styles.btnPendingOverride]}
                  onPress={() => handleUpdateStatus("Pending")}
                >
                  <Ionicons name="time-outline" size={18} color="#D95D29" />
                  <Text style={[styles.actionBtnText, { color: "#D95D29" }]}>
                    Mark Pending
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionBtn, styles.btnSuspendOverride]}
                  onPress={() => handleUpdateStatus("Suspended")}
                >
                  <Ionicons name="ban-outline" size={18} color="#ef4444" />
                  <Text style={[styles.actionBtnText, { color: "#ef4444" }]}>
                    Suspend Access
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => setIsEditModalOpen(false)}
              >
                <Text style={styles.modalCancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Add New Agent Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isAddModalOpen}
        onRequestClose={() => setIsAddModalOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsAddModalOpen(false)}
        >
          <View
            style={[
              styles.modalContentCard,
              { width: isWeb ? 520 : "92%", maxWidth: 550 },
            ]}
          >
            <LinearGradient
              colors={["#D95D29", "#c04e21"]}
              style={styles.modalGradientHeader}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.modalHeadingTitle}>Add New Agent</Text>
              <Text style={styles.modalSubheadingText}>
                Enter agent details to add to the directory
              </Text>
            </LinearGradient>

            <ScrollView
              style={styles.modalFormScroll}
              contentContainerStyle={styles.modalFormScrollContent}
              showsVerticalScrollIndicator={true}
            >
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Full Name *</Text>
                <View style={styles.formInputContainer}>
                  <Ionicons name="person-outline" size={18} color="#9ca3af" />
                  <TextInput
                    style={styles.formInput}
                    placeholder="Enter agent's full name"
                    placeholderTextColor="#9ca3af"
                    value={newAgent.name}
                    onChangeText={(text) =>
                      setNewAgent({ ...newAgent, name: text })
                    }
                  />
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Email Address *</Text>
                <View style={styles.formInputContainer}>
                  <Ionicons name="mail-outline" size={18} color="#9ca3af" />
                  <TextInput
                    style={styles.formInput}
                    placeholder="agent@kontako.com"
                    placeholderTextColor="#9ca3af"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={newAgent.email}
                    onChangeText={(text) =>
                      setNewAgent({ ...newAgent, email: text })
                    }
                  />
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Operating Region *</Text>
                <View style={styles.formInputContainer}>
                  <Ionicons name="location-outline" size={18} color="#9ca3af" />
                  <TextInput
                    style={styles.formInput}
                    placeholder="e.g., Mumbai South, Bangalore East"
                    placeholderTextColor="#9ca3af"
                    value={newAgent.region}
                    onChangeText={(text) =>
                      setNewAgent({ ...newAgent, region: text })
                    }
                  />
                </View>
              </View>

              <View style={styles.formRow}>
                <View style={[styles.formGroup, { flex: 1 }]}>
                  <Text style={styles.formLabel}>Status</Text>
                  <View style={styles.statusSelector}>
                    {(["Active", "Pending", "Suspended"] as const).map(
                      (status) => (
                        <TouchableOpacity
                          key={status}
                          style={[
                            styles.statusOption,
                            newAgent.status === status &&
                              styles.statusOptionActive,
                          ]}
                          onPress={() => setNewAgent({ ...newAgent, status })}
                        >
                          <Text
                            style={[
                              styles.statusOptionText,
                              newAgent.status === status &&
                                styles.statusOptionTextActive,
                            ]}
                          >
                            {status}
                          </Text>
                        </TouchableOpacity>
                      ),
                    )}
                  </View>
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Permission Level</Text>
                <View style={styles.permissionSelector}>
                  {(
                    [
                      "Full Access",
                      "Standard",
                      "Restricted",
                      "No Access",
                    ] as const
                  ).map((perm) => (
                    <TouchableOpacity
                      key={perm}
                      style={[
                        styles.permissionOption,
                        newAgent.permissions === perm &&
                          styles.permissionOptionActive,
                      ]}
                      onPress={() =>
                        setNewAgent({ ...newAgent, permissions: perm })
                      }
                    >
                      <Text
                        style={[
                          styles.permissionOptionText,
                          newAgent.permissions === perm &&
                            styles.permissionOptionTextActive,
                        ]}
                      >
                        {perm}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => {
                  setIsAddModalOpen(false);
                  setNewAgent({
                    name: "",
                    email: "",
                    region: "",
                    status: "Active",
                    permissions: "Standard",
                  });
                }}
              >
                <Text style={styles.modalCancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalSaveButton}
                onPress={handleAddAgent}
              >
                <LinearGradient
                  colors={["#D95D29", "#c04e21"]}
                  style={styles.modalSaveGradient}
                >
                  <Text style={styles.modalSaveButtonText}>Add Agent</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </AdminLayout>
  );
}

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollContent: {
    padding: isWeb ? 24 : 14,
    paddingBottom: 40,
  },
  headerSection: {
    flexDirection: isWeb ? "row" : "column",
    justifyContent: "space-between",
    alignItems: isWeb ? "center" : "flex-start",
    marginBottom: isWeb ? 24 : 16,
    gap: isWeb ? 16 : 10,
  },
  pageTitle: {
    fontSize: isWeb ? 28 : 22,
    fontWeight: "900",
    color: "#111111",
  },
  pageSubtitle: {
    fontSize: isWeb ? 14 : 12,
    color: "#6b7280",
    marginTop: 2,
  },
  addButton: {
    borderRadius: 10,
    overflow: "hidden",
    width: isWeb ? "auto" : "100%",
  },
  addButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: isWeb ? 12 : 10,
  },
  addButtonText: {
    color: "white",
    fontSize: 13,
    fontWeight: "700",
  },
  metricsGrid: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 24,
  },
  metricCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    overflow: "hidden",
  },
  metricsCarousel: {
    marginBottom: 16,
    marginHorizontal: -14,
  },
  metricsCarouselContent: {
    paddingHorizontal: 14,
    gap: 10,
  },
  metricCarouselCard: {
    width: width * 0.44,
    borderRadius: 12,
    padding: 12,
  },
  metricHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  metricIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  metricIconContainerMobile: {
    width: 26,
    height: 26,
    borderRadius: 6,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "rgba(255,255,255,0.8)",
    letterSpacing: 0.5,
    flex: 1,
  },
  metricLabelMobile: {
    fontSize: 9,
    fontWeight: "700",
    color: "rgba(255,255,255,0.8)",
    flex: 1,
  },
  metricValue: {
    fontSize: 32,
    fontWeight: "900",
    color: "white",
    marginBottom: 4,
  },
  metricValueMobile: {
    fontSize: 20,
    fontWeight: "900",
    color: "white",
    marginBottom: 2,
  },
  metricSubtext: {
    fontSize: 11,
    color: "rgba(255,255,255,0.7)",
  },
  metricSubtextMobile: {
    fontSize: 10,
    color: "rgba(255,255,255,0.7)",
  },
  toolbarContainer: {
    flexDirection: isWeb ? "row" : "column",
    justifyContent: "space-between",
    alignItems: isWeb ? "center" : "stretch",
    gap: 12,
    marginBottom: 16,
  },
  searchSection: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    paddingHorizontal: 12,
    height: 40,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: "#111111",
    padding: 0,
  },
  filterSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  filterLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6b7280",
  },
  statusFiltersWrapper: {
    flexDirection: "row",
    gap: 6,
  },
  statusTabChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  statusTabChipActive: {
    backgroundColor: "#111111",
    borderColor: "#111111",
  },
  statusTabChipText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6b7280",
  },
  statusTabChipTextActive: {
    color: "#FFFFFF",
  },
  statusCount: {
    fontSize: 10.5,
    fontWeight: "400",
  },
  ledgerWrapperCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  mobileLedgerContainer: {
    backgroundColor: "transparent",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  ledgerHeading: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111111",
  },
  ledgerSubheading: {
    fontSize: 12,
    color: "#6b7280",
  },
  exportButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: "#fef3f0",
  },
  exportButtonText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#D95D29",
  },
  horizontalDivider: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginVertical: 12,
  },
  tableWrapper: {
    width: "100%",
  },
  tableHeaderRow: {
    flexDirection: "row",
    backgroundColor: "#f9fafb",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 8,
  },
  thCell: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6b7280",
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },
  tableDataRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#f3f4f6",
  },
  tdCell: {
    fontSize: 13.5,
    color: "#374151",
  },
  idHighlight: {
    fontWeight: "700",
    color: "#D95D29",
  },
  agentPrimaryName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111111",
  },
  agentSubEmail: {
    fontSize: 11,
    color: "#9ca3af",
    marginTop: 2,
  },
  permissionBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  permissionText: {
    fontSize: 11,
    fontWeight: "600",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: "700",
  },
  tableActionPort: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#f9fafb",
    justifyContent: "center",
    alignItems: "center",
  },
  mobileCardsStream: {
    gap: 10,
    marginTop: 8,
  },
  mobileAgentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 12,
  },
  cardHeaderRowMobile: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  mobileCardId: {
    fontSize: 12,
    fontWeight: "800",
    color: "#D95D29",
  },
  mobileCardName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111111",
  },
  mobileCardEmail: {
    fontSize: 11,
    color: "#6b7280",
    marginBottom: 8,
  },
  cardDetailsBoxMobile: {
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    padding: 10,
    gap: 10,
    marginBottom: 10,
  },
  detailRowMobile: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailFieldValueMobile: {
    fontSize: 12,
    color: "#374151",
    fontWeight: "500",
  },
  permissionBadgeMobile: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  permissionTextMobile: {
    fontSize: 10,
    fontWeight: "600",
  },
  statusBadgeMobile: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusBadgeTextMobile: {
    fontSize: 10,
    fontWeight: "700",
  },
  metricsSplitRowMobile: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 8,
  },
  metricItemMobile: {
    flex: 1,
    alignItems: "center",
  },
  metricCountLabelMobile: {
    fontSize: 10,
    color: "#6b7280",
    fontWeight: "500",
    marginBottom: 2,
  },
  metricCountValueMobileOrange: {
    fontSize: 14,
    fontWeight: "800",
    color: "#D95D29",
  },
  metricCountValueMobileGreen: {
    fontSize: 14,
    fontWeight: "800",
    color: "#10b981",
  },
  mobileCardActionsRow: {
    flexDirection: "row",
  },
  mobileEditButton: {
    flex: 1,
    backgroundColor: "#111111",
    flexDirection: "row",
    height: 36,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  mobileEditButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    overflow: "hidden",
    maxHeight: height * 0.82,
  },
  modalGradientHeader: {
    padding: 20,
  },
  modalHeadingTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "white",
  },
  modalSubheadingText: {
    fontSize: 13,
    color: "rgba(255,255,255,0.8)",
    marginTop: 4,
  },
  modalBody: {
    padding: 24,
  },
  modalFormScroll: {
    flex: undefined,
    maxHeight: height * 0.55,
  },
  modalFormScrollContent: {
    padding: 20,
    paddingBottom: 10,
  },
  selectedDossierBox: {
    backgroundColor: "#f9fafb",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  dossierHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  dossierInfo: {
    flex: 1,
  },
  dossierValueText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111111",
  },
  dossierSubText: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 2,
  },
  dossierIdText: {
    fontSize: 11,
    color: "#D95D29",
    fontWeight: "600",
    marginTop: 2,
  },
  actionPromptText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 12,
  },
  modalActionButtonsGrid: {
    gap: 10,
    marginBottom: 20,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    height: 48,
    borderRadius: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
  },
  btnActiveOverride: {
    backgroundColor: "rgba(16, 185, 129, 0.08)",
    borderColor: "rgba(16, 185, 129, 0.2)",
  },
  btnPendingOverride: {
    backgroundColor: "rgba(217, 93, 41, 0.08)",
    borderColor: "rgba(217, 93, 41, 0.2)",
  },
  btnSuspendOverride: {
    backgroundColor: "rgba(239, 68, 68, 0.08)",
    borderColor: "rgba(239, 68, 68, 0.2)",
  },
  actionBtnText: {
    fontSize: 14,
    fontWeight: "700",
    flex: 1,
  },
  modalFooter: {
    flexDirection: "row",
    gap: 12,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    backgroundColor: "#ffffff",
  },
  modalCancelButton: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCancelButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6b7280",
  },
  modalSaveButton: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    overflow: "hidden",
  },
  modalSaveGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalSaveButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
  },
  formGroup: {
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 8,
  },
  formInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingHorizontal: 14,
    height: 46,
    gap: 10,
  },
  formInput: {
    flex: 1,
    fontSize: 14,
    color: "#111111",
    padding: 0,
  },
  formRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
  },
  statusSelector: {
    flexDirection: "row",
    gap: 10,
  },
  statusOption: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    alignItems: "center",
    backgroundColor: "#f9fafb",
  },
  statusOptionActive: {
    backgroundColor: "#111111",
    borderColor: "#111111",
  },
  statusOptionText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6b7280",
  },
  statusOptionTextActive: {
    color: "white",
  },
  permissionSelector: {
    gap: 8,
  },
  permissionOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#f9fafb",
  },
  permissionOptionActive: {
    backgroundColor: "#111111",
    borderColor: "#111111",
  },
  permissionOptionText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6b7280",
  },
  permissionOptionTextActive: {
    color: "white",
  },
});
