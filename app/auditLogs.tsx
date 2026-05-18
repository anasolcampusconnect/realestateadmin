import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
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

const { width } = Dimensions.get("window");
const isWeb = Platform.OS === "web" || width > 1024;

interface AuditLogEntry {
  id: string;
  action: string;
  operator: string;
  role: string;
  target: string;
  timestamp: string;
  ipAddress: string;
  status: "SUCCESS" | "WARNING" | "CRITICAL";
}

export default function SystemAuditLogs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "All" | "SUCCESS" | "WARNING" | "CRITICAL"
  >("All");
  const [selectedLog, setSelectedLog] = useState<AuditLogEntry | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState("Last 7 days");

  const logsData: AuditLogEntry[] = [
    {
      id: "LOG-9082",
      action: "USER_ROLE_MUTATION",
      operator: "Mahwish Khan",
      role: "Super Admin",
      target: "Agent ID #AGT-104 (Sneha Reddy)",
      timestamp: "18 May 2026, 10:14 AM",
      ipAddress: "192.168.1.45",
      status: "SUCCESS",
    },
    {
      id: "LOG-9081",
      action: "LEGAL_DOC_SIGN_OFF",
      operator: "Mahwish Khan",
      role: "Super Admin",
      target: "Asset ID #PRP-8832 Deeds",
      timestamp: "18 May 2026, 09:42 AM",
      ipAddress: "192.168.1.45",
      status: "SUCCESS",
    },
    {
      id: "LOG-9080",
      action: "PRICING_RULE_DELETION",
      operator: "Sub-Admin Console",
      role: "System Operator",
      target: "Surge Multiplier (Kukatpally Zone)",
      timestamp: "17 May 2026, 05:11 PM",
      ipAddress: "10.0.4.112",
      status: "WARNING",
    },
    {
      id: "LOG-9079",
      action: "BRUTE_FORCE_ATTEMPT",
      operator: "Unknown Guest Bypass",
      role: "Unauthenticated",
      target: "/api/v1/auth/admin-login",
      timestamp: "17 May 2026, 02:04 AM",
      ipAddress: "185.220.101.4",
      status: "CRITICAL",
    },
    {
      id: "LOG-9078",
      action: "PROPERTY_REJECTION",
      operator: "Vikram Malhotra",
      role: "Compliance Head",
      target: "Asset ID #PRP-5521 Commercial",
      timestamp: "16 May 2026, 03:22 PM",
      ipAddress: "192.168.2.19",
      status: "SUCCESS",
    },
  ];

  const filteredLogs = logsData.filter((log) => {
    const matchesSearch =
      log.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.operator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.target.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "All" || log.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return {
          bg: "rgba(16, 185, 129, 0.12)",
          text: "#10b981",
          icon: "checkmark-circle",
          label: "Success",
        };
      case "WARNING":
        return {
          bg: "rgba(245, 158, 11, 0.12)",
          text: "#f59e0b",
          icon: "warning",
          label: "Warning",
        };
      case "CRITICAL":
        return {
          bg: "rgba(239, 68, 68, 0.12)",
          text: "#ef4444",
          icon: "alert-circle",
          label: "Critical",
        };
      default:
        return {
          bg: "#f3f4f6",
          text: "#6b7280",
          icon: "help-circle",
          label: "Unknown",
        };
    }
  };

  const getActionIcon = (action: string) => {
    if (action.includes("USER") || action.includes("ROLE")) return "person";
    if (action.includes("DOC")) return "document-text";
    if (action.includes("PRICING")) return "pricetag";
    if (action.includes("BRUTE")) return "flash";
    if (action.includes("PROPERTY")) return "home";
    return "git-branch";
  };

  const handleViewDetails = (log: AuditLogEntry) => {
    setSelectedLog(log);
    setIsDetailModalOpen(true);
  };

  const metrics = {
    total: logsData.length,
    critical: logsData.filter((l) => l.status === "CRITICAL").length,
    warning: logsData.filter((l) => l.status === "WARNING").length,
    success: logsData.filter((l) => l.status === "SUCCESS").length,
  };

  return (
    <AdminLayout currentPageLabel="System Audit Logs">
      <ScrollView
        style={styles.pageWrapper}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Enhanced Header Section */}
        <View style={styles.headerSection}>
          <View style={styles.headerLeft}>
            <View style={styles.headerIconContainer}>
              <LinearGradient
                colors={["#D95D29", "#c04e21"]}
                style={styles.headerIconGradient}
              >
                <Ionicons name="shield-checkmark" size={24} color="white" />
              </LinearGradient>
            </View>
            <View>
              <Text style={styles.pageTitle}>Audit Logs</Text>
              <Text style={styles.pageSubtitle}>
                Monitor system activities and security events
              </Text>
            </View>
          </View>
          <View style={styles.headerStats}>
            <TouchableOpacity style={styles.dateRangeButton}>
              <Ionicons name="calendar" size={16} color="#6b7280" />
              <Text style={styles.dateRangeText}>{dateRange}</Text>
              <Ionicons name="chevron-down" size={16} color="#6b7280" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.exportHeaderButton}>
              <LinearGradient
                colors={["#D95D29", "#c04e21"]}
                style={styles.exportButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="download-outline" size={16} color="white" />
                <Text style={styles.exportHeaderText}>Export</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Enhanced Metrics Summary */}
        <View style={styles.metricsGrid}>
          <LinearGradient
            colors={["#ffffff", "#f9fafb"]}
            style={styles.metricSummaryCard}
          >
            <View
              style={[styles.metricIconCircle, { backgroundColor: "#eff6ff" }]}
            >
              <Ionicons name="document-text" size={24} color="#3b82f6" />
            </View>
            <View>
              <Text style={styles.metricSummaryValue}>{metrics.total}</Text>
              <Text style={styles.metricSummaryLabel}>Total Events</Text>
              <Text style={styles.metricTrend}>+12% this week</Text>
            </View>
          </LinearGradient>

          <LinearGradient
            colors={["#ffffff", "#f9fafb"]}
            style={styles.metricSummaryCard}
          >
            <View
              style={[
                styles.metricIconCircle,
                { backgroundColor: "rgba(16, 185, 129, 0.1)" },
              ]}
            >
              <Ionicons name="checkmark-circle" size={24} color="#10b981" />
            </View>
            <View>
              <Text style={styles.metricSummaryValue}>{metrics.success}</Text>
              <Text style={styles.metricSummaryLabel}>Successful</Text>
              <Text style={[styles.metricTrend, { color: "#10b981" }]}>
                +8%
              </Text>
            </View>
          </LinearGradient>

          <LinearGradient
            colors={["#ffffff", "#f9fafb"]}
            style={styles.metricSummaryCard}
          >
            <View
              style={[
                styles.metricIconCircle,
                { backgroundColor: "rgba(245, 158, 11, 0.1)" },
              ]}
            >
              <Ionicons name="warning" size={24} color="#f59e0b" />
            </View>
            <View>
              <Text style={styles.metricSummaryValue}>{metrics.warning}</Text>
              <Text style={styles.metricSummaryLabel}>Warnings</Text>
              <Text style={[styles.metricTrend, { color: "#f59e0b" }]}>
                -3%
              </Text>
            </View>
          </LinearGradient>

          <LinearGradient
            colors={["#ffffff", "#f9fafb"]}
            style={styles.metricSummaryCard}
          >
            <View
              style={[
                styles.metricIconCircle,
                { backgroundColor: "rgba(239, 68, 68, 0.1)" },
              ]}
            >
              <Ionicons name="alert-circle" size={24} color="#ef4444" />
            </View>
            <View>
              <Text style={styles.metricSummaryValue}>{metrics.critical}</Text>
              <Text style={styles.metricSummaryLabel}>Critical</Text>
              <Text style={[styles.metricTrend, { color: "#ef4444" }]}>+2</Text>
            </View>
          </LinearGradient>
        </View>

        {/* Enhanced Filter Section */}
        <View style={styles.filterShelfCard}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#9ca3af" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search logs by ID, action, operator, or target..."
              placeholderTextColor="#9ca3af"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity
                onPress={() => setSearchQuery("")}
                style={styles.clearButton}
              >
                <Ionicons name="close-circle" size={18} color="#9ca3af" />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>Filter by severity:</Text>
            <View style={styles.statusGroup}>
              {(["All", "SUCCESS", "WARNING", "CRITICAL"] as const).map(
                (status) => {
                  const statusConfig = getStatusConfig(
                    status === "All" ? "SUCCESS" : status,
                  );
                  return (
                    <TouchableOpacity
                      key={status}
                      style={[
                        styles.statusChip,
                        statusFilter === status && styles.statusChipActive,
                        statusFilter === status &&
                          status === "CRITICAL" &&
                          styles.statusChipActiveCritical,
                        statusFilter === status &&
                          status === "WARNING" &&
                          styles.statusChipActiveWarning,
                        statusFilter === status &&
                          status === "SUCCESS" &&
                          styles.statusChipActiveSuccess,
                      ]}
                      onPress={() => setStatusFilter(status)}
                    >
                      {status !== "All" && (
                        <Ionicons
                          name={statusConfig.icon as any}
                          size={12}
                          color={
                            statusFilter === status
                              ? "white"
                              : statusConfig.text
                          }
                        />
                      )}
                      <Text
                        style={[
                          styles.statusChipText,
                          statusFilter === status &&
                            styles.statusChipTextActive,
                        ]}
                      >
                        {status}
                      </Text>
                    </TouchableOpacity>
                  );
                },
              )}
            </View>
          </View>
        </View>

        {/* Enhanced Logs Table */}
        <View style={styles.ledgerWrapperCard}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.ledgerHeading}>Security Event Stream</Text>
              <Text style={styles.ledgerSubheading}>
                Showing {filteredLogs.length} of {logsData.length} events
              </Text>
            </View>
            <TouchableOpacity style={styles.refreshButton}>
              <Ionicons name="refresh" size={18} color="#D95D29" />
              <Text style={styles.refreshButtonText}>Refresh</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.horizontalDivider} />

          {isWeb ? (
            <View style={styles.tableWrapper}>
              <View style={styles.tableHeaderRow}>
                <Text style={[styles.thCell, { width: "8%" }]}>Log ID</Text>
                <Text style={[styles.thCell, { width: "18%" }]}>Action</Text>
                <Text style={[styles.thCell, { width: "18%" }]}>Operator</Text>
                <Text style={[styles.thCell, { width: "22%" }]}>Target</Text>
                <Text style={[styles.thCell, { width: "15%" }]}>Timestamp</Text>
                <Text style={[styles.thCell, { width: "9%" }]}>Severity</Text>
                <Text
                  style={[styles.thCell, { width: "10%", textAlign: "center" }]}
                >
                  Actions
                </Text>
              </View>

              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => {
                  const statusConfig = getStatusConfig(log.status);
                  const actionIcon = getActionIcon(log.action);
                  return (
                    <View key={log.id} style={styles.tableDataRow}>
                      <Text
                        style={[
                          styles.tdCell,
                          styles.idHighlight,
                          { width: "8%" },
                        ]}
                      >
                        {log.id}
                      </Text>
                      <View
                        style={{
                          width: "18%",
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <View style={styles.actionIconContainer}>
                          <Ionicons
                            name={actionIcon as any}
                            size={14}
                            color="#D95D29"
                          />
                        </View>
                        <Text
                          style={[styles.tdCell, styles.actionText]}
                          numberOfLines={1}
                        >
                          {log.action.replace(/_/g, " ")}
                        </Text>
                      </View>
                      <View style={{ width: "18%" }}>
                        <Text style={styles.operatorPrimaryName}>
                          {log.operator}
                        </Text>
                        <Text style={styles.operatorSubRole}>{log.role}</Text>
                      </View>
                      <View style={{ width: "22%" }}>
                        <Text
                          style={styles.targetPrimaryText}
                          numberOfLines={1}
                        >
                          {log.target}
                        </Text>
                        <View style={styles.targetSubIp}>
                          <Ionicons name="location" size={10} color="#9ca3af" />
                          <Text style={styles.ipText}>{log.ipAddress}</Text>
                        </View>
                      </View>
                      <Text
                        style={[
                          styles.tdCell,
                          { width: "15%", color: "#64748b", fontSize: 12 },
                        ]}
                      >
                        {log.timestamp}
                      </Text>
                      <View style={{ width: "9%" }}>
                        <View
                          style={[
                            styles.statusBadge,
                            { backgroundColor: statusConfig.bg },
                          ]}
                        >
                          <View
                            style={[
                              styles.statusDot,
                              { backgroundColor: statusConfig.text },
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
                      <View style={{ width: "10%", alignItems: "center" }}>
                        <TouchableOpacity
                          style={styles.detailButton}
                          onPress={() => handleViewDetails(log)}
                        >
                          <Ionicons name="eye" size={16} color="#D95D29" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })
              ) : (
                <View style={styles.emptyStateContainer}>
                  <View style={styles.emptyStateIcon}>
                    <Ionicons name="search" size={48} color="#d1d5db" />
                  </View>
                  <Text style={styles.emptyStateTitle}>
                    No matching logs found
                  </Text>
                  <Text style={styles.emptyStateSubtitle}>
                    Try adjusting your search or filter criteria
                  </Text>
                </View>
              )}
            </View>
          ) : (
            <View style={styles.mobileCardsStream}>
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => {
                  const statusConfig = getStatusConfig(log.status);
                  const actionIcon = getActionIcon(log.action);
                  return (
                    <TouchableOpacity
                      key={log.id}
                      style={styles.mobileLogCard}
                      onPress={() => handleViewDetails(log)}
                      activeOpacity={0.7}
                    >
                      <View style={styles.cardHeaderRow}>
                        <View style={styles.inlineRowGap}>
                          <Text style={styles.mobileCardId}>{log.id}</Text>
                          <View
                            style={[
                              styles.statusBadge,
                              {
                                backgroundColor: statusConfig.bg,
                                paddingHorizontal: 8,
                                paddingVertical: 2,
                              },
                            ]}
                          >
                            <View
                              style={[
                                styles.statusDot,
                                { backgroundColor: statusConfig.text },
                              ]}
                            />
                            <Text
                              style={[
                                styles.statusBadgeText,
                                { color: statusConfig.text, fontSize: 9 },
                              ]}
                            >
                              {statusConfig.label}
                            </Text>
                          </View>
                        </View>
                        <Ionicons
                          name="chevron-forward"
                          size={18}
                          color="#d1d5db"
                        />
                      </View>

                      <View style={styles.mobileActionRow}>
                        <View style={styles.mobileActionIcon}>
                          <Ionicons
                            name={actionIcon as any}
                            size={16}
                            color="#D95D29"
                          />
                        </View>
                        <Text style={styles.mobileActionTitle}>
                          {log.action.replace(/_/g, " ")}
                        </Text>
                      </View>

                      <View style={styles.cardDetailsBox}>
                        <View style={styles.mobileDetailRow}>
                          <Ionicons name="person" size={14} color="#9ca3af" />
                          <Text style={styles.mobileDetailText}>
                            <Text style={styles.boldFieldLabel}>
                              {log.operator}
                            </Text>{" "}
                            ({log.role})
                          </Text>
                        </View>
                        <View style={styles.mobileDetailRow}>
                          <Ionicons name="disc" size={14} color="#9ca3af" />
                          <Text
                            style={styles.mobileDetailText}
                            numberOfLines={2}
                          >
                            {log.target}
                          </Text>
                        </View>
                        <View style={styles.mobileDetailRow}>
                          <Ionicons name="time" size={14} color="#9ca3af" />
                          <Text style={styles.mobileDetailText}>
                            {log.timestamp}
                          </Text>
                        </View>
                        <View style={styles.mobileDetailRow}>
                          <Ionicons name="location" size={14} color="#9ca3af" />
                          <Text style={styles.mobileDetailText}>
                            {log.ipAddress}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })
              ) : (
                <View style={styles.emptyStateContainer}>
                  <Ionicons name="search" size={48} color="#d1d5db" />
                  <Text style={styles.emptyStateTitle}>
                    No matching logs found
                  </Text>
                  <Text style={styles.emptyStateSubtitle}>
                    Try adjusting your search or filter criteria
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Enhanced Log Detail Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isDetailModalOpen}
        onRequestClose={() => setIsDetailModalOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsDetailModalOpen(false)}
        >
          <View style={styles.modalContentCard}>
            <LinearGradient
              colors={["#D95D29", "#c04e21"]}
              style={styles.modalGradientHeader}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.modalHeaderRow}>
                <View>
                  <Text style={styles.modalHeadingTitle}>Event Details</Text>
                  <Text style={styles.modalSubheadingText}>
                    Complete audit trail information
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => setIsDetailModalOpen(false)}
                  style={styles.modalCloseIcon}
                >
                  <Ionicons name="close" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </LinearGradient>

            {selectedLog && (
              <View style={styles.modalBody}>
                <View style={styles.modalEventIdContainer}>
                  <Text style={styles.modalEventIdLabel}>Event ID</Text>
                  <Text style={styles.modalEventId}>{selectedLog.id}</Text>
                </View>

                <View style={styles.detailSection}>
                  <View style={styles.sectionHeader}>
                    <Ionicons
                      name="information-circle"
                      size={18}
                      color="#D95D29"
                    />
                    <Text style={styles.detailSectionTitle}>
                      Basic Information
                    </Text>
                  </View>
                  <View style={styles.detailGrid}>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Action Type</Text>
                      <View style={styles.actionTag}>
                        <Ionicons
                          name={getActionIcon(selectedLog.action) as any}
                          size={12}
                          color="#D95D29"
                        />
                        <Text style={styles.detailValue}>
                          {selectedLog.action.replace(/_/g, " ")}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Status</Text>
                      <View
                        style={[
                          styles.modalStatusBadge,
                          {
                            backgroundColor: getStatusConfig(selectedLog.status)
                              .bg,
                          },
                        ]}
                      >
                        <View
                          style={[
                            styles.statusDot,
                            {
                              backgroundColor: getStatusConfig(
                                selectedLog.status,
                              ).text,
                            },
                          ]}
                        />
                        <Text
                          style={[
                            styles.modalStatusText,
                            { color: getStatusConfig(selectedLog.status).text },
                          ]}
                        >
                          {getStatusConfig(selectedLog.status).label}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.detailSection}>
                  <View style={styles.sectionHeader}>
                    <Ionicons name="person" size={18} color="#D95D29" />
                    <Text style={styles.detailSectionTitle}>
                      Operator Details
                    </Text>
                  </View>
                  <View style={styles.detailGrid}>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Operator Name</Text>
                      <Text style={styles.detailValue}>
                        {selectedLog.operator}
                      </Text>
                    </View>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Role</Text>
                      <View style={styles.roleBadge}>
                        <Text style={styles.roleText}>{selectedLog.role}</Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.detailSection}>
                  <View style={styles.sectionHeader}>
                    <Ionicons name="disc" size={18} color="#D95D29" />
                    <Text style={styles.detailSectionTitle}>
                      Target Information
                    </Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Target Object</Text>
                    <View style={styles.targetBadge}>
                      <Text style={styles.detailValue}>
                        {selectedLog.target}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.detailSection}>
                  <View style={styles.sectionHeader}>
                    <Ionicons name="time" size={18} color="#D95D29" />
                    <Text style={styles.detailSectionTitle}>
                      Timestamp & Location
                    </Text>
                  </View>
                  <View style={styles.detailGrid}>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Timestamp</Text>
                      <Text style={styles.detailValue}>
                        {selectedLog.timestamp}
                      </Text>
                    </View>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>IP Address</Text>
                      <View style={styles.ipBadge}>
                        <Ionicons name="location" size={12} color="#6b7280" />
                        <Text style={styles.detailValue}>
                          {selectedLog.ipAddress}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            )}

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.modalCloseFooterButton}
                onPress={() => setIsDetailModalOpen(false)}
              >
                <Text style={styles.modalCloseFooterText}>Close</Text>
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
    padding: isWeb ? 24 : 16,
    paddingBottom: 40,
  },
  headerSection: {
    flexDirection: isWeb ? "row" : "column",
    justifyContent: "space-between",
    alignItems: isWeb ? "center" : "flex-start",
    marginBottom: 24,
    gap: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  headerIconContainer: {
    borderRadius: 14,
    overflow: "hidden",
  },
  headerIconGradient: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: "#111111",
  },
  pageSubtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 4,
  },
  headerStats: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  dateRangeButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  dateRangeText: {
    fontSize: 13,
    color: "#374151",
    fontWeight: "500",
  },
  exportHeaderButton: {
    borderRadius: 10,
    overflow: "hidden",
  },
  exportButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  exportHeaderText: {
    fontSize: 13,
    fontWeight: "600",
    color: "white",
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 24,
  },
  metricSummaryCard: {
    flex: 1,
    minWidth: isWeb ? 200 : "48%",
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 2,
    elevation: 1,
  },
  metricIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  metricSummaryValue: {
    fontSize: 24,
    fontWeight: "900",
    color: "#111111",
  },
  metricSummaryLabel: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "500",
    marginTop: 2,
  },
  metricTrend: {
    fontSize: 10,
    color: "#10b981",
    fontWeight: "600",
    marginTop: 2,
  },
  filterShelfCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginBottom: 24,
    gap: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 52,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#111111",
  },
  clearButton: {
    padding: 4,
  },
  filterRow: {
    flexDirection: isWeb ? "row" : "column",
    justifyContent: "space-between",
    alignItems: isWeb ? "center" : "flex-start",
    gap: 12,
  },
  filterLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6b7280",
  },
  statusGroup: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  statusChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  statusChipActive: {
    backgroundColor: "#111111",
    borderColor: "#111111",
  },
  statusChipActiveCritical: {
    backgroundColor: "#ef4444",
    borderColor: "#ef4444",
  },
  statusChipActiveWarning: {
    backgroundColor: "#f59e0b",
    borderColor: "#f59e0b",
  },
  statusChipActiveSuccess: {
    backgroundColor: "#10b981",
    borderColor: "#10b981",
  },
  statusChipText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6b7280",
  },
  statusChipTextActive: {
    color: "#FFFFFF",
  },
  ledgerWrapperCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: isWeb ? 24 : 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  ledgerHeading: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111111",
  },
  ledgerSubheading: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 2,
  },
  refreshButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: "#fef3f0",
  },
  refreshButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#D95D29",
  },
  horizontalDivider: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginVertical: 20,
  },
  tableWrapper: {
    width: "100%",
  },
  tableHeaderRow: {
    flexDirection: "row",
    backgroundColor: "#f9fafb",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  thCell: {
    fontSize: 11,
    fontWeight: "700",
    color: "#6b7280",
    letterSpacing: 0.5,
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
    fontSize: 13,
    color: "#374151",
  },
  idHighlight: {
    fontWeight: "700",
    color: "#D95D29",
  },
  actionIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "#fef3f0",
    justifyContent: "center",
    alignItems: "center",
  },
  actionText: {
    fontWeight: "600",
    color: "#111111",
    flex: 1,
  },
  operatorPrimaryName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111111",
  },
  operatorSubRole: {
    fontSize: 11,
    color: "#9ca3af",
    marginTop: 2,
  },
  targetPrimaryText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#374151",
  },
  targetSubIp: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2,
  },
  ipText: {
    fontSize: 10,
    color: "#9ca3af",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
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
  detailButton: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#fef3f0",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateContainer: {
    padding: 60,
    alignItems: "center",
    gap: 12,
  },
  emptyStateIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#374151",
  },
  emptyStateSubtitle: {
    fontSize: 13,
    color: "#9ca3af",
  },
  clearFiltersButton: {
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#fef3f0",
    borderRadius: 20,
  },
  clearFiltersText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#D95D29",
  },
  mobileCardsStream: {
    gap: 16,
  },
  mobileLogCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 16,
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  inlineRowGap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  mobileCardId: {
    fontSize: 12,
    fontWeight: "800",
    color: "#D95D29",
  },
  mobileActionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },
  mobileActionIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#fef3f0",
    justifyContent: "center",
    alignItems: "center",
  },
  mobileActionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111111",
    flex: 1,
  },
  cardDetailsBox: {
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    padding: 12,
    gap: 8,
  },
  mobileDetailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  mobileDetailText: {
    fontSize: 12,
    color: "#374151",
    flex: 1,
  },
  boldFieldLabel: {
    fontWeight: "700",
    color: "#111111",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContentCard: {
    backgroundColor: "#FFFFFF",
    width: isWeb ? 650 : "100%",
    borderRadius: 24,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.25,
    shadowRadius: 30,
    elevation: 10,
  },
  modalGradientHeader: {
    padding: 24,
  },
  modalHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  modalCloseIcon: {
    padding: 4,
  },
  modalHeadingTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "white",
  },
  modalSubheadingText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
    marginTop: 6,
  },
  modalBody: {
    padding: 24,
    gap: 24,
  },
  modalEventIdContainer: {
    backgroundColor: "#f9fafb",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  modalEventIdLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#9ca3af",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  modalEventId: {
    fontSize: 18,
    fontWeight: "800",
    color: "#D95D29",
    marginTop: 4,
  },
  detailSection: {
    gap: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  detailSectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#374151",
  },
  detailGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  detailItem: {
    flex: 1,
    minWidth: 200,
  },
  detailLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#9ca3af",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111111",
  },
  actionTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#fef3f0",
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  roleBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#eff6ff",
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  roleText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#3b82f6",
  },
  targetBadge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#f9fafb",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  ipBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  modalStatusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  modalStatusText: {
    fontSize: 12,
    fontWeight: "700",
  },
  modalFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    alignItems: "center",
  },
  modalCloseFooterButton: {
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#f3f4f6",
  },
  modalCloseFooterText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6b7280",
  },
});
