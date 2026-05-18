import React, { useState } from "react";
import {
    Dimensions,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import AdminLayout from "../components/AdminLayout"; // Shared shell layout component import

const { width } = Dimensions.get("window");
const isWeb = Platform.OS === "web" || width > 1024;

interface MarketingCampaign {
  id: string;
  title: string;
  code: string;
  discount: string;
  categoryScope: string;
  expiryDate: string;
  status: "Live" | "Scheduled" | "Expired";
  reachCount: string;
}

export default function MarketingOffers() {
  const [offerTitle, setOfferTitle] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [discountValue, setDiscountValue] = useState("");
  const [pushNotificationText, setPushNotificationText] = useState("");

  // Mock enterprise marketing data logs matching your business rules
  const activeCampaigns: MarketingCampaign[] = [
    {
      id: "MKT-801",
      title: "Monsoon Premium Waiver",
      code: "MONSOON10",
      discount: "10% Off Fees",
      categoryScope: "Luxury Villas",
      expiryDate: "30 Jun 2026",
      status: "Live",
      reachCount: "1,240 Agents",
    },
    {
      id: "MKT-802",
      title: "HITEC Commercial Launch Boost",
      code: "HITECZEST",
      discount: "₹50,000 Flat Waiver",
      categoryScope: "Commercial Parks",
      expiryDate: "15 Jul 2026",
      status: "Scheduled",
      reachCount: "450 Builders",
    },
    {
      id: "MKT-803",
      title: "First-Time Onboarding Token",
      code: "WELCOMEPROP",
      discount: "Free Featured Slot",
      categoryScope: "All Categories",
      expiryDate: "31 Dec 2026",
      status: "Live",
      reachCount: "3,890 Users",
    },
    {
      id: "MKT-804",
      title: "Gachibowli Quarter Clearance",
      code: "GACHI5",
      discount: "5% Off Platform Escrow",
      categoryScope: "Apartments",
      expiryDate: "30 Apr 2026",
      status: "Expired",
      reachCount: "890 Agents",
    },
  ];

  return (
    <AdminLayout currentPageLabel="Marketing & Offers">
      <ScrollView
        style={styles.pageWrapper}
        showsVerticalScrollIndicator={false}
      >
        {/* --- MODULE SUMMARY BREADCRUMB --- */}
        <View style={styles.breadcrumbHeader}>
          <View>
            <Text style={styles.mainTitleText}>
              Marketing, Push Notifications & Offers Engine
            </Text>
            <Text style={styles.subtitleText}>
              Formulate targeted promo codes, broadcast real-time push alerts,
              and evaluate active outreach campaigns.
            </Text>
          </View>
        </View>

        {/* --- CONTENT SEGMENT COMBINATOR MATRIX --- */}
        <View
          style={[
            styles.workspaceSplitRow,
            isWeb ? styles.rowLayout : styles.columnLayout,
          ]}
        >
          {/* ================= LEFT SECTION: FORMULATE OFFERS & ALERTS ================= */}
          <View
            style={[
              styles.leftFormColumn,
              isWeb ? { width: "38%" } : { width: "100%" },
            ]}
          >
            {/* Promo Code Builder Frame */}
            <View style={styles.controlFormCard}>
              <Text style={styles.panelHeaderTitle}>
                Configure Promotional Offer
              </Text>
              <View style={styles.miniColorAccentLine} />

              <Text style={styles.inputLabelText}>CAMPAIGN TITLE</Text>
              <View style={styles.inputFieldContainer}>
                <TextInput
                  style={styles.fieldInput}
                  placeholder="e.g., Kukatpally Premium Launch Boost"
                  placeholderTextColor="#888888"
                  value={offerTitle}
                  onChangeText={setOfferTitle}
                />
              </View>

              <View style={[styles.inlineFieldsRow, { gap: 12 }]}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.inputLabelText}>PROMO CODE</Text>
                  <View style={styles.inputFieldContainer}>
                    <TextInput
                      style={[
                        styles.fieldInput,
                        { textTransform: "uppercase" },
                      ]}
                      placeholder="KUKAT15"
                      placeholderTextColor="#888888"
                      value={promoCode}
                      onChangeText={setPromoCode}
                    />
                  </View>
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.inputLabelText}>VALUE VALUE</Text>
                  <View style={styles.inputFieldContainer}>
                    <TextInput
                      style={styles.fieldInput}
                      placeholder="15% Off or ₹25000"
                      placeholderTextColor="#888888"
                      value={discountValue}
                      onChangeText={setDiscountValue}
                    />
                  </View>
                </View>
              </View>

              <TouchableOpacity style={styles.primaryActionButton}>
                <Text style={styles.actionButtonText}>
                  🚀 Initialize Campaign
                </Text>
              </TouchableOpacity>
            </View>

            {/* Global Broadcast Hub Box */}
            <View style={styles.controlFormCard}>
              <Text style={styles.panelHeaderTitle}>
                Broadcast Real-Time System Notification
              </Text>
              <View style={styles.miniColorAccentLine} />

              <Text style={styles.inputLabelText}>ALERT MESSAGE TEXT</Text>
              <View style={styles.textareaFieldContainer}>
                <TextInput
                  style={styles.textareaInput}
                  multiline
                  numberOfLines={3}
                  placeholder="Compose real-time alert text to instantly broadcast to matching application portals..."
                  placeholderTextColor="#888888"
                  value={pushNotificationText}
                  onChangeText={setPushNotificationText}
                />
              </View>

              <TouchableOpacity
                style={[styles.primaryActionButton, styles.darkBroadcastBtn]}
              >
                <Text style={styles.actionButtonText}>
                  📢 Dispatch Broadcast Notification
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* ================= RIGHT SECTION: LIVE TRACKING CAMPAIGNS LEDGER ================= */}
          <View
            style={[
              styles.rightLedgerColumn,
              isWeb ? { width: "59%" } : { width: "100%" },
            ]}
          >
            <View style={styles.ledgerWrapperCard}>
              <Text style={styles.ledgerHeadingTitle}>
                Active Platform Outreach Programs
              </Text>
              <View style={styles.horizontalDividerLine} />

              {isWeb ? (
                /* DESKTOP MATRIX TABLE VIEWPORT */
                <View style={styles.tableElementContainer}>
                  <View style={styles.tableHeaderRow}>
                    <Text style={[styles.thCell, { width: "30%" }]}>
                      CAMPAIGN CONTEXT
                    </Text>
                    <Text style={[styles.thCell, { width: "15%" }]}>
                      TOKEN CODE
                    </Text>
                    <Text style={[styles.thCell, { width: "20%" }]}>
                      APPLICABLE SCOPE
                    </Text>
                    <Text style={[styles.thCell, { width: "15%" }]}>
                      METRIC IMPACT
                    </Text>
                    <Text
                      style={[
                        styles.thCell,
                        { width: "10%", textAlign: "right" },
                      ]}
                    >
                      STATUS
                    </Text>
                  </View>

                  {activeCampaigns.map((camp) => (
                    <View key={camp.id} style={styles.tableDataRow}>
                      <View style={{ width: "30%", paddingRight: 8 }}>
                        <Text style={styles.campaignPrimaryTitle}>
                          {camp.title}
                        </Text>
                        <Text style={styles.campaignMetaSub}>
                          ID: {camp.id} • Exp: {camp.expiryDate}
                        </Text>
                      </View>
                      <Text
                        style={[
                          styles.tdCell,
                          styles.tokenCodeHighlight,
                          { width: "15%" },
                        ]}
                      >
                        {camp.code}
                      </Text>
                      <View style={{ width: "20%" }}>
                        <Text style={styles.scopePrimaryText}>
                          {camp.categoryScope}
                        </Text>
                        <Text style={styles.scopeSecondaryText}>
                          {camp.discount}
                        </Text>
                      </View>
                      <Text
                        style={[
                          styles.tdCell,
                          { width: "15%", fontWeight: "600", color: "#475569" },
                        ]}
                      >
                        📈 {camp.reachCount}
                      </Text>
                      <View style={{ width: "10%", alignItems: "flex-end" }}>
                        <View
                          style={[
                            styles.statusLabelBadge,
                            camp.status === "Live"
                              ? styles.bgLive
                              : camp.status === "Scheduled"
                                ? styles.bgScheduled
                                : styles.bgExpired,
                          ]}
                        >
                          <Text style={styles.statusBadgeText}>
                            {camp.status}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              ) : (
                /* MOBILE SCROLL CARD BLOCKS VIEWPORT */
                <View style={styles.mobileCardsListStream}>
                  {activeCampaigns.map((camp) => (
                    <View key={camp.id} style={styles.mobileCampaignCardItem}>
                      <View style={styles.cardHeaderInlineSplit}>
                        <Text style={styles.mobileTokenText}>{camp.code}</Text>
                        <View
                          style={[
                            styles.statusLabelBadge,
                            camp.status === "Live"
                              ? styles.bgLive
                              : camp.status === "Scheduled"
                                ? styles.bgScheduled
                                : styles.bgExpired,
                          ]}
                        >
                          <Text style={styles.statusBadgeText}>
                            {camp.status}
                          </Text>
                        </View>
                      </View>

                      <Text style={styles.mobileCampaignTitle}>
                        {camp.title}
                      </Text>
                      <Text style={styles.mobileCampaignSubtext}>
                        Scope Target: {camp.categoryScope} ({camp.discount})
                      </Text>

                      <View style={styles.mobileStatBadgeInlineRow}>
                        <Text style={styles.mobileStatMetricText}>
                          Impact Reach: {camp.reachCount}
                        </Text>
                        <Text style={styles.mobileStatMetricText}>
                          Expires: {camp.expiryDate}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
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
  workspaceSplitRow: {
    justifyContent: "space-between",
    gap: 24,
    paddingBottom: 60,
  },
  leftFormColumn: {
    gap: 20,
  },
  rightLedgerColumn: {
    gap: 20,
  },
  controlFormCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  panelHeaderTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#111111",
  },
  miniColorAccentLine: {
    height: 2,
    backgroundColor: "#111111",
    width: 40,
    marginTop: 8,
    marginBottom: 20,
  },
  inputLabelText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#6B7280",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  inputFieldContainer: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    justifyContent: "center",
    marginBottom: 16,
  },
  fieldInput: {
    fontSize: 13.5,
    color: "#111111",
  },
  inlineFieldsRow: {
    flexDirection: "row",
    width: "100%",
  },
  primaryActionButton: {
    backgroundColor: "#D95D29",
    height: 46,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  darkBroadcastBtn: {
    backgroundColor: "#111111",
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
  textareaFieldContainer: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  textareaInput: {
    fontSize: 13.5,
    color: "#111111",
    height: 70,
    textAlignVertical: "top",
  },
  ledgerWrapperCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: isWeb ? 24 : 16,
  },
  ledgerHeadingTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111111",
  },
  horizontalDividerLine: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 18,
  },
  tableElementContainer: {
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
  campaignPrimaryTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111111",
  },
  campaignMetaSub: {
    fontSize: 11.5,
    color: "#6B7280",
    marginTop: 2,
  },
  tokenCodeHighlight: {
    fontWeight: "800",
    color: "#D95D29",
  },
  scopePrimaryText: {
    fontSize: 13.5,
    fontWeight: "600",
    color: "#1F2937",
  },
  scopeSecondaryText: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 1,
  },
  statusLabelBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  bgLive: {
    backgroundColor: "rgba(16, 185, 129, 0.12)",
  },
  bgScheduled: {
    backgroundColor: "rgba(245, 158, 11, 0.12)",
  },
  bgExpired: {
    backgroundColor: "rgba(239, 68, 68, 0.12)",
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
    color: "#111111",
  },
  mobileCardsListStream: {
    gap: 12,
  },
  mobileCampaignCardItem: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 14,
  },
  cardHeaderInlineSplit: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  mobileTokenText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#D95D29",
    letterSpacing: 0.5,
  },
  mobileCampaignTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111111",
  },
  mobileCampaignSubtext: {
    fontSize: 12.5,
    color: "#4B5563",
    marginTop: 3,
  },
  mobileStatBadgeInlineRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    padding: 8,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  mobileStatMetricText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#6B7280",
  },
});
