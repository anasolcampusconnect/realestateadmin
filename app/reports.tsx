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
    TouchableOpacity,
    View,
} from "react-native";
import AdminLayout from "../components/AdminLayout";

const { width, height } = Dimensions.get("window");
const isWeb = Platform.OS === "web" || width > 1024;

interface TransactionRecord {
  txId: string;
  property: string;
  type: "Payout" | "Platform Fee" | "Escrow Release";
  amount: string;
  date: string;
  status: "Settled" | "Processing" | "Hold";
}

export default function FinancialReports() {
  const [activeDuration, setActiveDuration] = useState<
    "Q1" | "Q2" | "Q3" | "Q4"
  >("Q2");
  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionRecord | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const financialSummaries = [
    {
      label: "GROSS VOLUME PROCESSED",
      value: "₹4.26 Cr",
      fullValue: "₹4,25,60,000",
      change: "+12.4%",
      positive: true,
      icon: "trending-up",
    },
    {
      label: "NET COMMISSION REVENUE",
      value: "₹38.4 L",
      fullValue: "₹38,42,500",
      change: "+8.2%",
      positive: true,
      icon: "cash",
    },
    {
      label: "FUNDS IN ESCROW HOLD",
      value: "₹1.12 Cr",
      fullValue: "₹1,12,00,000",
      change: "+14.1%",
      positive: false,
      icon: "lock-closed",
    },
    {
      label: "AGENT PAYOUTS DISBURSED",
      value: "₹2.74 Cr",
      fullValue: "₹2,74,15,000",
      change: "+6.8%",
      positive: true,
      icon: "people",
    },
  ];

  const internalLedger: TransactionRecord[] = [
    {
      txId: "TXN-90412",
      property: "Skyline Luxury Penthouse",
      type: "Platform Fee",
      amount: "+₹8,54,300",
      date: "18 May 2026",
      status: "Settled",
    },
    {
      txId: "TXN-90411",
      property: "Villa in Cooper Square",
      type: "Escrow Release",
      amount: "-₹1,24,00,000",
      date: "17 May 2026",
      status: "Settled",
    },
    {
      txId: "TXN-90410",
      property: "Modernist Eco-Glass Cabin",
      type: "Payout",
      amount: "-₹35,12,000",
      date: "16 May 2026",
      status: "Processing",
    },
    {
      txId: "TXN-90409",
      property: "Vanguard Commercial Complex",
      type: "Platform Fee",
      amount: "+₹18,60,000",
      date: "14 May 2026",
      status: "Hold",
    },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "Settled":
        return {
          bg: "rgba(16, 185, 129, 0.12)",
          text: "#10b981",
          icon: "checkmark-circle",
          label: "Settled",
        };
      case "Processing":
        return {
          bg: "rgba(245, 158, 11, 0.12)",
          text: "#f59e0b",
          icon: "time",
          label: "Processing",
        };
      case "Hold":
        return {
          bg: "rgba(239, 68, 68, 0.12)",
          text: "#ef4444",
          icon: "pause-circle",
          label: "On Hold",
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Platform Fee":
        return "trending-up";
      case "Payout":
        return "arrow-down";
      case "Escrow Release":
        return "lock-open";
      default:
        return "cash";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Platform Fee":
        return "#10b981";
      case "Payout":
        return "#ef4444";
      case "Escrow Release":
        return "#f59e0b";
      default:
        return "#6b7280";
    }
  };

  const totalVolume = financialSummaries[0].fullValue;
  const totalFees = financialSummaries[1].fullValue;

  const handleViewDetails = (transaction: TransactionRecord) => {
    setSelectedTransaction(transaction);
    setIsDetailModalOpen(true);
  };

  return (
    <AdminLayout currentPageLabel="Financial Reports">
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
                <Ionicons name="trending-up" size={24} color="white" />
              </LinearGradient>
            </View>
            <View style={{ flex: isWeb ? undefined : 1 }}>
              <Text style={styles.mainTitleText}>Financial Reports</Text>
              <Text style={styles.subtitleText}>
                Monitor transactions, escrow status, and commission statements
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.exportLedgerButton}>
            <LinearGradient
              colors={["#111111", "#1a1a2e"]}
              style={styles.exportButtonGradient}
            >
              <Ionicons name="download" size={16} color="white" />
              <Text style={styles.exportBtnText}>Export CSV</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Enhanced Metrics Row - Carousel swipe framework added for mobile layout logic */}
        {isWeb ? (
          <View style={styles.metricsGridRow}>
            {financialSummaries.map((card, idx) => (
              <LinearGradient
                key={idx}
                colors={["#ffffff", "#f9fafb"]}
                style={[styles.statBoxCard, { overflow: "hidden" }]}
              >
                <View style={styles.statCardHeader}>
                  <View
                    style={[
                      styles.statIconCircle,
                      {
                        backgroundColor: card.positive
                          ? "rgba(16, 185, 129, 0.1)"
                          : "rgba(245, 158, 11, 0.1)",
                      },
                    ]}
                  >
                    <Ionicons
                      name={card.icon as any}
                      size={20}
                      color={card.positive ? "#10b981" : "#f59e0b"}
                    />
                  </View>
                  <View
                    style={[
                      styles.trendBadge,
                      {
                        backgroundColor: card.positive
                          ? "rgba(16, 185, 129, 0.1)"
                          : "rgba(245, 158, 11, 0.1)",
                      },
                    ]}
                  >
                    <Ionicons
                      name={card.positive ? "arrow-up" : "arrow-down"}
                      size={10}
                      color={card.positive ? "#10b981" : "#f59e0b"}
                    />
                    <Text
                      style={[
                        styles.trendText,
                        { color: card.positive ? "#10b981" : "#f59e0b" },
                      ]}
                    >
                      {card.change}
                    </Text>
                  </View>
                </View>
                <Text style={styles.statBoxLabel}>{card.label}</Text>
                <Text style={styles.statBoxValue}>{card.value}</Text>
                <Text style={styles.statBoxFullValue}>{card.fullValue}</Text>
              </LinearGradient>
            ))}
          </View>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.metricsCarouselMobile}
            contentContainerStyle={styles.metricsCarouselContentMobile}
          >
            {financialSummaries.map((card, idx) => (
              <View key={idx} style={styles.statBoxCardMobile}>
                <View style={styles.statCardHeader}>
                  <View
                    style={[
                      styles.statIconCircleMobile,
                      {
                        backgroundColor: card.positive
                          ? "rgba(16, 185, 129, 0.1)"
                          : "rgba(245, 158, 11, 0.1)",
                      },
                    ]}
                  >
                    <Ionicons
                      name={card.icon as any}
                      size={16}
                      color={card.positive ? "#10b981" : "#f59e0b"}
                    />
                  </View>
                  <View
                    style={[
                      styles.trendBadgeMobile,
                      {
                        backgroundColor: card.positive
                          ? "rgba(16, 185, 129, 0.1)"
                          : "rgba(239, 68, 68, 0.1)",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.trendTextMobile,
                        { color: card.positive ? "#10b981" : "#ef4444" },
                      ]}
                    >
                      {card.change}
                    </Text>
                  </View>
                </View>
                <Text style={styles.statBoxLabelMobile} numberOfLines={1}>
                  {card.label}
                </Text>
                <Text style={styles.statBoxValueMobile}>{card.value}</Text>
                <Text style={styles.statBoxFullValueMobile}>
                  {card.fullValue}
                </Text>
              </View>
            ))}
          </ScrollView>
        )}

        {/* Quick Stats Row */}
        <View style={isWeb ? styles.quickStatsRow : styles.quickStatsRowMobile}>
          <View style={styles.quickStatItem}>
            <Ionicons name="calendar" size={14} color="#D95D29" />
            <Text style={styles.quickStatLabel}>Q2 2026</Text>
            <Text style={styles.quickStatValue}>Apr - Jun</Text>
          </View>
          <View style={styles.quickStatDivider} />
          <View style={styles.quickStatItem}>
            <Ionicons name="cash" size={14} color="#D95D29" />
            <Text style={styles.quickStatLabel}>Volume</Text>
            <Text style={styles.quickStatValue}>{totalVolume}</Text>
          </View>
          <View style={styles.quickStatDivider} />
          <View style={styles.quickStatItem}>
            <Ionicons name="trending-up" size={14} color="#D95D29" />
            <Text style={styles.quickStatLabel}>Commission</Text>
            <Text style={styles.quickStatValue}>{totalFees}</Text>
          </View>
        </View>

        {/* Enhanced Transaction Ledger */}
        <View
          style={
            isWeb ? styles.ledgerCardSection : styles.mobileLedgerContainer
          }
        >
          <View style={styles.ledgerHeaderBlock}>
            <View>
              <Text style={styles.ledgerHeadingText}>Transaction Ledger</Text>
              <Text style={styles.ledgerSubtext}>
                Recent platform transactions
              </Text>
            </View>
            <View
              style={
                isWeb ? styles.durationTabsRow : styles.durationTabsRowMobile
              }
            >
              <ScrollView
                horizontal={!isWeb}
                showsHorizontalScrollIndicator={false}
              >
                {(["Q1", "Q2", "Q3", "Q4"] as const).map((q) => (
                  <TouchableOpacity
                    key={q}
                    style={[
                      styles.quarterTab,
                      activeDuration === q && styles.quarterTabActive,
                    ]}
                    onPress={() => setActiveDuration(q)}
                  >
                    <Text
                      style={[
                        styles.quarterTabText,
                        activeDuration === q && styles.quarterTabTextActive,
                      ]}
                    >
                      {q}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>

          <View style={styles.horizontalLineDivider} />

          {isWeb ? (
            <View style={styles.tableElementWrapper}>
              <View style={styles.tableHeaderRow}>
                <Text style={[styles.thCell, { width: "12%" }]}>TX ID</Text>
                <Text style={[styles.thCell, { width: "28%" }]}>Property</Text>
                <Text style={[styles.thCell, { width: "15%" }]}>Type</Text>
                <Text style={[styles.thCell, { width: "15%" }]}>Date</Text>
                <Text
                  style={[styles.thCell, { width: "15%", textAlign: "right" }]}
                >
                  Amount
                </Text>
                <Text
                  style={[styles.thCell, { width: "10%", textAlign: "center" }]}
                >
                  Status
                </Text>
                <Text
                  style={[styles.thCell, { width: "5%", textAlign: "center" }]}
                ></Text>
              </View>

              {internalLedger.map((tx) => {
                const statusConfig = getStatusConfig(tx.status);
                const typeIcon = getTypeIcon(tx.type);
                const typeColor = getTypeColor(tx.type);
                return (
                  <View key={tx.txId} style={styles.tableDataRow}>
                    <Text
                      style={[
                        styles.tdCell,
                        styles.idCodeHighlight,
                        { width: "12%" },
                      ]}
                    >
                      {tx.txId}
                    </Text>
                    <Text
                      style={[
                        styles.tdCell,
                        { width: "28%", fontWeight: "600" },
                      ]}
                      numberOfLines={1}
                    >
                      {tx.property}
                    </Text>
                    <View style={{ width: "15%" }}>
                      <View
                        style={[
                          styles.typeBadge,
                          { backgroundColor: `${typeColor}15` },
                        ]}
                      >
                        <Ionicons
                          name={typeIcon as any}
                          size={10}
                          color={typeColor}
                        />
                        <Text
                          style={[styles.typeBadgeText, { color: typeColor }]}
                        >
                          {tx.type}
                        </Text>
                      </View>
                    </View>
                    <Text
                      style={[
                        styles.tdCell,
                        { width: "15%", color: "#64748b", fontSize: 12 },
                      ]}
                    >
                      {tx.date}
                    </Text>
                    <Text
                      style={[
                        styles.tdCell,
                        {
                          width: "15%",
                          textAlign: "right",
                          fontWeight: "800",
                          color: tx.amount.startsWith("+")
                            ? "#10b981"
                            : "#ef4444",
                        },
                      ]}
                    >
                      {tx.amount}
                    </Text>
                    <View style={{ width: "10%", alignItems: "center" }}>
                      <View
                        style={[
                          styles.statusIndicatorBadge,
                          { backgroundColor: statusConfig.bg },
                        ]}
                      >
                        <Ionicons
                          name={statusConfig.icon as any}
                          size={8}
                          color={statusConfig.text}
                        />
                        <Text
                          style={[
                            styles.badgeText,
                            { color: statusConfig.text },
                          ]}
                        >
                          {statusConfig.label}
                        </Text>
                      </View>
                    </View>
                    <View style={{ width: "5%", alignItems: "center" }}>
                      <TouchableOpacity
                        style={styles.viewButton}
                        onPress={() => handleViewDetails(tx)}
                      >
                        <Ionicons name="eye" size={14} color="#D95D29" />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </View>
          ) : (
            <View style={styles.mobileStripsContainer}>
              {internalLedger.map((tx) => {
                const statusConfig = getStatusConfig(tx.status);
                const typeIcon = getTypeIcon(tx.type);
                const typeColor = getTypeColor(tx.type);
                return (
                  <TouchableOpacity
                    key={tx.txId}
                    style={styles.mobileTxStripCard}
                    onPress={() => handleViewDetails(tx)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.stripHeaderRow}>
                      <View style={styles.stripHeaderLeft}>
                        <Text style={styles.mobileTxIdText}>{tx.txId}</Text>
                        <View
                          style={[
                            styles.statusIndicatorBadgeMobile,
                            { backgroundColor: statusConfig.bg },
                          ]}
                        >
                          <Text
                            style={[
                              styles.badgeTextMobile,
                              { color: statusConfig.text },
                            ]}
                          >
                            {statusConfig.label}
                          </Text>
                        </View>
                      </View>
                      <Ionicons
                        name="chevron-forward"
                        size={16}
                        color="#d1d5db"
                      />
                    </View>

                    <Text style={styles.mobilePropertyTitle} numberOfLines={1}>
                      {tx.property}
                    </Text>

                    <View style={styles.mobileMetaRow}>
                      <View
                        style={[
                          styles.typeBadgeMobile,
                          { backgroundColor: `${typeColor}15` },
                        ]}
                      >
                        <Ionicons
                          name={typeIcon as any}
                          size={10}
                          color={typeColor}
                        />
                        <Text
                          style={[
                            styles.typeBadgeTextMobile,
                            { color: typeColor },
                          ]}
                        >
                          {tx.type}
                        </Text>
                      </View>
                      <Text style={styles.mobileDateText}>{tx.date}</Text>
                    </View>

                    <View style={styles.mobileAmountContainer}>
                      <Text style={styles.mobileAmountLabel}>Amount</Text>
                      <Text
                        style={[
                          styles.mobileAmountValue,
                          {
                            color: tx.amount.startsWith("+")
                              ? "#10b981"
                              : "#ef4444",
                          },
                        ]}
                      >
                        {tx.amount}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Transaction Detail Modal */}
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
          <View
            style={[styles.modalContentCard, { width: isWeb ? 500 : "92%" }]}
          >
            <LinearGradient
              colors={["#D95D29", "#c04e21"]}
              style={styles.modalGradientHeader}
            >
              <View style={styles.modalHeaderRow}>
                <Text style={styles.modalHeadingTitle}>
                  Transaction Details
                </Text>
                <TouchableOpacity onPress={() => setIsDetailModalOpen(false)}>
                  <Ionicons name="close" size={24} color="white" />
                </TouchableOpacity>
              </View>
              <Text style={styles.modalSubheading}>
                Complete transaction information
              </Text>
            </LinearGradient>

            {selectedTransaction && (
              <ScrollView
                style={styles.modalBodyScroll}
                showsVerticalScrollIndicator={true}
              >
                <View style={styles.modalBodyContent}>
                  <View style={styles.modalTransactionId}>
                    <Text style={styles.modalTxLabel}>Transaction ID</Text>
                    <Text style={styles.modalTxValue}>
                      {selectedTransaction.txId}
                    </Text>
                  </View>

                  <View style={styles.modalSection}>
                    <Text style={styles.modalSectionTitle}>
                      <Ionicons name="business" size={14} color="#D95D29" />{" "}
                      Property Details
                    </Text>
                    <View style={styles.modalDetailCard}>
                      <Text style={styles.modalPropertyName}>
                        {selectedTransaction.property}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.modalSection}>
                    <Text style={styles.modalSectionTitle}>
                      <Ionicons name="cash" size={14} color="#D95D29" />{" "}
                      Financial Information
                    </Text>
                    <View style={styles.modalDetailRow}>
                      <View style={styles.modalDetailItem}>
                        <Text style={styles.modalDetailLabel}>Type</Text>
                        <View
                          style={[
                            styles.typeBadge,
                            {
                              backgroundColor: `${getTypeColor(selectedTransaction.type)}15`,
                              alignSelf: "flex-start",
                            },
                          ]}
                        >
                          <Ionicons
                            name={getTypeIcon(selectedTransaction.type) as any}
                            size={12}
                            color={getTypeColor(selectedTransaction.type)}
                          />
                          <Text
                            style={[
                              styles.typeBadgeText,
                              { color: getTypeColor(selectedTransaction.type) },
                            ]}
                          >
                            {selectedTransaction.type}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.modalDetailItem}>
                        <Text style={styles.modalDetailLabel}>Amount</Text>
                        <Text
                          style={[
                            styles.modalAmount,
                            {
                              color: selectedTransaction.amount.startsWith("+")
                                ? "#10b981"
                                : "#ef4444",
                            },
                          ]}
                        >
                          {selectedTransaction.amount}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.modalSection}>
                    <Text style={styles.modalSectionTitle}>
                      <Ionicons name="calendar" size={14} color="#D95D29" />{" "}
                      Timeline
                    </Text>
                    <View style={styles.modalDetailRow}>
                      <View style={styles.modalDetailItem}>
                        <Text style={styles.modalDetailLabel}>Date</Text>
                        <Text style={styles.modalDetailValue}>
                          {selectedTransaction.date}
                        </Text>
                      </View>
                      <View style={styles.modalDetailItem}>
                        <Text style={styles.modalDetailLabel}>Status</Text>
                        <View
                          style={[
                            styles.statusIndicatorBadge,
                            {
                              backgroundColor: getStatusConfig(
                                selectedTransaction.status,
                              ).bg,
                              alignSelf: "flex-start",
                            },
                          ]}
                        >
                          <Ionicons
                            name={
                              getStatusConfig(selectedTransaction.status)
                                .icon as any
                            }
                            size={10}
                            color={
                              getStatusConfig(selectedTransaction.status).text
                            }
                          />
                          <Text
                            style={[
                              styles.badgeText,
                              {
                                color: getStatusConfig(
                                  selectedTransaction.status,
                                ).text,
                              },
                            ]}
                          >
                            {getStatusConfig(selectedTransaction.status).label}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </ScrollView>
            )}

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setIsDetailModalOpen(false)}
              >
                <Text style={styles.modalCloseText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalDownloadButton}>
                <LinearGradient
                  colors={["#D95D29", "#c04e21"]}
                  style={styles.modalDownloadGradient}
                >
                  <Ionicons name="download" size={16} color="white" />
                  <Text style={styles.modalDownloadText}>Receipt</Text>
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
    gap: isWeb ? 16 : 12,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: isWeb ? 16 : 12,
  },
  headerIconContainer: {
    borderRadius: 14,
    overflow: "hidden",
  },
  headerIconGradient: {
    width: isWeb ? 52 : 44,
    height: isWeb ? 52 : 44,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  mainTitleText: {
    fontSize: isWeb ? 28 : 20,
    fontWeight: "900",
    color: "#111111",
  },
  subtitleText: {
    fontSize: isWeb ? 14 : 12,
    color: "#6b7280",
    marginTop: 2,
  },
  exportLedgerButton: {
    borderRadius: 10,
    overflow: "hidden",
    width: isWeb ? "auto" : "100%",
  },
  exportButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: isWeb ? 12 : 10,
  },
  exportBtnText: {
    color: "white",
    fontSize: 13,
    fontWeight: "700",
  },
  metricsGridRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 24,
  },
  statBoxCard: {
    flex: 1,
    minWidth: 200,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  metricsCarouselMobile: {
    marginBottom: 16,
    marginHorizontal: -14,
  },
  metricsCarouselContentMobile: {
    paddingHorizontal: 14,
    gap: 10,
  },
  statBoxCardMobile: {
    width: width * 0.44,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  statIconCircleMobile: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  trendBadgeMobile: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  trendTextMobile: {
    fontSize: 9.5,
    fontWeight: "700",
  },
  statBoxLabelMobile: {
    fontSize: 9.5,
    fontWeight: "700",
    color: "#6b7280",
    marginTop: 8,
  },
  statBoxValueMobile: {
    fontSize: 18,
    fontWeight: "900",
    color: "#111111",
    marginTop: 2,
  },
  statBoxFullValueMobile: {
    fontSize: 10,
    color: "#9ca3af",
    marginTop: 1,
  },
  statCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  statIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  trendBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  trendText: {
    fontSize: 10,
    fontWeight: "700",
  },
  statBoxLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#6b7280",
    letterSpacing: 0.5,
  },
  statBoxValue: {
    fontSize: 24,
    fontWeight: "900",
    color: "#111111",
    marginTop: 4,
  },
  statBoxFullValue: {
    fontSize: 11,
    color: "#9ca3af",
    marginTop: 4,
  },
  quickStatsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  quickStatsRowMobile: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  quickStatItem: {
    flex: 1,
    alignItems: "center",
    gap: 2,
  },
  quickStatLabel: {
    fontSize: 9,
    fontWeight: "600",
    color: "#9ca3af",
    textTransform: "uppercase",
  },
  quickStatValue: {
    fontSize: 12,
    fontWeight: "700",
    color: "#111111",
  },
  quickStatDivider: {
    width: 1,
    height: 24,
    backgroundColor: "#e5e7eb",
  },
  ledgerCardSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  mobileLedgerContainer: {
    backgroundColor: "transparent",
  },
  ledgerHeaderBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 12,
  },
  ledgerHeadingText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111111",
  },
  ledgerSubtext: {
    fontSize: 12,
    color: "#6b7280",
  },
  durationTabsRow: {
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
    padding: 4,
    borderRadius: 10,
  },
  durationTabsRowMobile: {
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
    padding: 2,
    borderRadius: 8,
    width: "100%",
  },
  quarterTab: {
    paddingHorizontal: isWeb ? 16 : 22,
    paddingVertical: 6,
    borderRadius: 8,
  },
  quarterTabActive: {
    backgroundColor: "#FFFFFF",
    ...Platform.select({
      web: { boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)" },
      default: { elevation: 1 },
    }),
  },
  quarterTabText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6b7280",
  },
  quarterTabTextActive: {
    color: "#D95D29",
    fontWeight: "700",
  },
  horizontalLineDivider: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginVertical: 12,
  },
  tableElementWrapper: {
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
  idCodeHighlight: {
    fontWeight: "700",
    color: "#D95D29",
  },
  typeBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  typeBadgeMobile: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  typeBadgeText: {
    fontSize: 10,
    fontWeight: "600",
  },
  typeBadgeTextMobile: {
    fontSize: 10,
    fontWeight: "600",
  },
  statusIndicatorBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusIndicatorBadgeMobile: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: "700",
  },
  badgeTextMobile: {
    fontSize: 9.5,
    fontWeight: "700",
  },
  viewButton: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: "#fef3f0",
    justifyContent: "center",
    alignItems: "center",
  },
  mobileStripsContainer: {
    gap: 10,
    marginTop: 8,
  },
  mobileTxStripCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    padding: 12,
  },
  stripHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  stripHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  mobileTxIdText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#D95D29",
  },
  mobilePropertyTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 4,
  },
  mobileMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 6,
  },
  mobileDateText: {
    fontSize: 11,
    color: "#9ca3af",
  },
  mobileAmountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    padding: 10,
    marginTop: 4,
  },
  mobileAmountLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: "#9ca3af",
  },
  mobileAmountValue: {
    fontSize: 15,
    fontWeight: "800",
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
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.25)",
    elevation: 10,
    maxHeight: height * 0.82,
  },
  modalGradientHeader: {
    padding: 20,
  },
  modalHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalHeadingTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "white",
  },
  modalSubheading: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
    marginTop: 4,
  },
  modalBodyScroll: {
    flex: undefined, // FIXED: Removes target layout structural adapter collapse issues on Android view engines
  },
  modalBodyContent: {
    padding: 20,
  },
  modalTransactionId: {
    backgroundColor: "#f9fafb",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 16,
  },
  modalTxLabel: {
    fontSize: 10.5,
    fontWeight: "600",
    color: "#9ca3af",
    textTransform: "uppercase",
  },
  modalTxValue: {
    fontSize: 15,
    fontWeight: "800",
    color: "#D95D29",
    marginTop: 2,
  },
  modalSection: {
    marginBottom: 16,
  },
  modalSectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 10,
  },
  modalDetailCard: {
    backgroundColor: "#f9fafb",
    borderRadius: 10,
    padding: 12,
  },
  modalPropertyName: {
    fontSize: 13.5,
    fontWeight: "700",
    color: "#111111",
  },
  modalDetailRow: {
    flexDirection: "row",
    gap: 14,
  },
  modalDetailItem: {
    flex: 1,
  },
  modalDetailLabel: {
    fontSize: 10.5,
    fontWeight: "600",
    color: "#9ca3af",
    marginBottom: 4,
  },
  modalDetailValue: {
    fontSize: 13.5,
    fontWeight: "600",
    color: "#111111",
  },
  modalAmount: {
    fontSize: 16,
    fontWeight: "800",
  },
  modalFooter: {
    flexDirection: "row",
    gap: 12,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    backgroundColor: "#ffffff",
  },
  modalCloseButton: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCloseText: {
    fontSize: 13.5,
    fontWeight: "600",
    color: "#6b7280",
  },
  modalDownloadButton: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    overflow: "hidden",
  },
  modalDownloadGradient: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  modalDownloadText: {
    color: "white",
    fontSize: 13.5,
    fontWeight: "700",
  },
});
