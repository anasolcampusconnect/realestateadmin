import React, { useState } from "react";
import {
    Dimensions,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import AdminLayout from "../components/AdminLayout"; // Shared layout component import

const { width } = Dimensions.get("window");
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

  // Mock enterprise metrics matching real estate accounting requirements
  const financialSummaries = [
    {
      label: "GROSS VOLUME PROCESSED",
      value: "₹4,25,60,000",
      change: "+12.4%",
      positive: true,
    },
    {
      label: "NET COMMISSION REVENUE",
      value: "₹38,42,500",
      change: "+8.2%",
      positive: true,
    },
    {
      label: "FUNDS IN ESCROW HOLD",
      value: "₹1,12,00,000",
      change: "+14.1%",
      positive: false,
    },
    {
      label: "AGENT PAYOUTS DISBURSED",
      value: "₹2,74,15,000",
      change: "+6.8%",
      positive: true,
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

  return (
    <AdminLayout currentPageLabel="Financial Reports">
      <ScrollView
        style={styles.pageWrapper}
        showsVerticalScrollIndicator={false}
      >
        {/* --- MODULE SUMMARY BREADCRUMB --- */}
        <View style={styles.breadcrumbHeader}>
          <View>
            <Text style={styles.mainTitleText}>Financial Reporting Hub</Text>
            <Text style={styles.subtitleText}>
              Monitor cross-platform micro-transactions, escrow status maps, and
              commission statements.
            </Text>
          </View>
          <TouchableOpacity style={styles.exportLedgerButton}>
            <Text style={styles.exportBtnText}>📥 Export Ledger (CSV)</Text>
          </TouchableOpacity>
        </View>

        {/* --- FINANCIAL SUMMARIES METRIC GRID --- */}
        <View
          style={[
            styles.metricsGridRow,
            isWeb ? styles.rowLayout : styles.columnLayout,
          ]}
        >
          {financialSummaries.map((card, idx) => (
            <View
              key={idx}
              style={[
                styles.statBoxCard,
                isWeb ? { flex: 1 } : { width: "100%" },
              ]}
            >
              <Text style={styles.statBoxLabel}>{card.label}</Text>
              <Text style={styles.statBoxValue}>{card.value}</Text>
              <Text
                style={[
                  styles.statBoxDelta,
                  { color: card.positive ? "#10b981" : "#f59e0b" },
                ]}
              >
                {card.change} vs previous quarter
              </Text>
            </View>
          ))}
        </View>

        {/* --- REVENUE STREAM WORKSPACE TRAIL --- */}
        <View style={styles.ledgerCardSection}>
          <View style={styles.ledgerHeaderBlock}>
            <Text style={styles.ledgerHeadingText}>
              Platform Transaction Ledger
            </Text>
            <View style={styles.durationTabsRow}>
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
            </View>
          </View>

          <View style={styles.horizontalLineDivider} />

          {isWeb ? (
            /* --- DESKTOP VIEWPORT LAYOUT: HIGH-DENSITY BALANCES TABLE --- */
            <View style={styles.tableElementWrapper}>
              <View style={styles.tableHeaderRow}>
                <Text style={[styles.thCell, { width: "15%" }]}>
                  TRANSACTION ID
                </Text>
                <Text style={[styles.thCell, { width: "30%" }]}>
                  PROPERTY ASSET CONTEXT
                </Text>
                <Text style={[styles.thCell, { width: "18%" }]}>
                  TRANSACTION TYPE
                </Text>
                <Text style={[styles.thCell, { width: "15%" }]}>
                  EXECUTION DATE
                </Text>
                <Text
                  style={[styles.thCell, { width: "12%", textAlign: "right" }]}
                >
                  AMOUNT
                </Text>
                <Text
                  style={[styles.thCell, { width: "10%", textAlign: "right" }]}
                >
                  STATUS
                </Text>
              </View>

              {internalLedger.map((tx) => (
                <View key={tx.txId} style={styles.tableDataRow}>
                  <Text
                    style={[
                      styles.tdCell,
                      styles.idCodeHighlight,
                      { width: "15%" },
                    ]}
                  >
                    {tx.txId}
                  </Text>
                  <Text
                    style={[styles.tdCell, { width: "30%", fontWeight: "700" }]}
                  >
                    {tx.property}
                  </Text>
                  <Text
                    style={[styles.tdCell, { width: "18%", color: "#475569" }]}
                  >
                    ⚙️ {tx.type}
                  </Text>
                  <Text
                    style={[styles.tdCell, { width: "15%", color: "#64748b" }]}
                  >
                    {tx.date}
                  </Text>
                  <Text
                    style={[
                      styles.tdCell,
                      {
                        width: "12%",
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
                  <View
                    style={{
                      width: "10%",
                      maxWidth: "10%",
                      alignItems: "flex-end",
                    }}
                  >
                    <View
                      style={[
                        styles.statusIndicatorBadge,
                        tx.status === "Settled"
                          ? styles.badgeGreen
                          : tx.status === "Processing"
                            ? styles.badgeOrange
                            : styles.badgeRed,
                      ]}
                    >
                      <Text style={styles.badgeText}>{tx.status}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            /* --- MOBILE VIEWPORT LAYOUT: LIST STRIPS --- */
            <View style={styles.mobileStripsContainer}>
              {internalLedger.map((tx) => (
                <View key={tx.txId} style={styles.mobileTxStripCard}>
                  <View style={styles.stripHeaderRow}>
                    <Text style={styles.mobileTxIdText}>{tx.txId}</Text>
                    <View
                      style={[
                        styles.statusIndicatorBadge,
                        tx.status === "Settled"
                          ? styles.badgeGreen
                          : tx.status === "Processing"
                            ? styles.badgeOrange
                            : styles.badgeRed,
                      ]}
                    >
                      <Text style={styles.badgeText}>{tx.status}</Text>
                    </View>
                  </View>

                  <Text style={styles.mobilePropertyTitle}>{tx.property}</Text>
                  <Text style={styles.mobileMetaDetails}>
                    Type: {tx.type} • Dated: {tx.date}
                  </Text>

                  <View style={styles.mobileAmountContainer}>
                    <Text style={styles.mobileAmountLabel}>
                      VALUE TRANSACTED
                    </Text>
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
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </AdminLayout>
  );
}

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
    backgroundColor: "#F3F3F3",
    padding: isWeb ? 24 : 14,
  },
  rowLayout: {
    flexDirection: "row",
  },
  columnLayout: {
    flexDirection: "column",
  },
  breadcrumbHeader: {
    flexDirection: isWeb ? "row" : "column",
    justifyContent: "space-between",
    alignItems: isWeb ? "center" : "flex-start",
    gap: 16,
    marginBottom: 24,
  },
  mainTitleText: {
    fontSize: isWeb ? 26 : 20,
    fontWeight: "900",
    color: "#111111",
  },
  subtitleText: {
    fontSize: 13,
    color: "#666666",
    marginTop: 4,
  },
  exportLedgerButton: {
    backgroundColor: "#111111",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  exportBtnText: {
    color: "#FFFFFF",
    fontSize: 12.5,
    fontWeight: "700",
  },
  metricsGridRow: {
    justifyContent: "space-between",
    gap: 16,
    marginBottom: 24,
  },
  statBoxCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  statBoxLabel: {
    fontSize: 10.5,
    fontWeight: "700",
    color: "#6B7280",
    letterSpacing: 0.5,
  },
  statBoxValue: {
    fontSize: 24,
    fontWeight: "900",
    color: "#111111",
    marginVertical: 8,
  },
  statBoxDelta: {
    fontSize: 12,
    fontWeight: "600",
  },
  ledgerCardSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: isWeb ? 24 : 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 40,
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
  durationTabsRow: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    padding: 3,
    borderRadius: 8,
  },
  quarterTab: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 6,
  },
  quarterTabActive: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  quarterTabText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4B5563",
  },
  quarterTabTextActive: {
    color: "#D95D29",
    fontWeight: "700",
  },
  horizontalLineDivider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 18,
  },
  tableElementWrapper: {
    width: "100%",
  },
  tableHeaderRow: {
    flexDirection: "row",
    backgroundColor: "#F9FAFB",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginBottom: 6,
  },
  thCell: {
    fontSize: 12,
    fontWeight: "700",
    color: "#4B5563",
    letterSpacing: 0.3,
  },
  tableDataRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#F3F4F6",
  },
  tdCell: {
    fontSize: 13.5,
    color: "#1F2937",
  },
  idCodeHighlight: {
    fontWeight: "700",
    color: "#D95D29",
  },
  statusIndicatorBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeGreen: {
    backgroundColor: "rgba(16, 185, 129, 0.12)",
  },
  badgeOrange: {
    backgroundColor: "rgba(245, 158, 11, 0.12)",
  },
  badgeRed: {
    backgroundColor: "rgba(239, 68, 68, 0.12)",
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
    color: "#111111",
  },
  mobileStripsContainer: {
    gap: 12,
  },
  mobileTxStripCard: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 14,
  },
  stripHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mobileTxIdText: {
    fontSize: 12.5,
    fontWeight: "800",
    color: "#D95D29",
  },
  mobilePropertyTitle: {
    fontSize: 14.5,
    fontWeight: "700",
    color: "#111111",
    marginTop: 8,
  },
  mobileMetaDetails: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 3,
  },
  mobileAmountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    padding: 10,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  mobileAmountLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#9CA3AF",
  },
  mobileAmountValue: {
    fontSize: 14,
    fontWeight: "900",
  },
});
