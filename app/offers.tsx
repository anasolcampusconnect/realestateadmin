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
  const [selectedCampaign, setSelectedCampaign] =
    useState<MarketingCampaign | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

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

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "Live":
        return {
          bg: "rgba(16, 185, 129, 0.12)",
          text: "#10b981",
          icon: "play-circle",
          label: "Live",
        };
      case "Scheduled":
        return {
          bg: "rgba(245, 158, 11, 0.12)",
          text: "#f59e0b",
          icon: "calendar",
          label: "Scheduled",
        };
      case "Expired":
        return {
          bg: "rgba(239, 68, 68, 0.12)",
          text: "#ef4444",
          icon: "time",
          label: "Expired",
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

  const handleCreateCampaign = () => {
    if (!offerTitle || !promoCode || !discountValue) {
      Alert.alert("Missing Fields", "Please fill in all campaign details");
      return;
    }
    Alert.alert(
      "Success",
      `Campaign "${offerTitle}" has been created successfully!`,
    );
    setOfferTitle("");
    setPromoCode("");
    setDiscountValue("");
  };

  const handleSendNotification = () => {
    if (!pushNotificationText) {
      Alert.alert("Missing Message", "Please enter notification text");
      return;
    }
    Alert.alert(
      "Notification Sent",
      "Broadcast notification has been sent to all users",
    );
    setPushNotificationText("");
  };

  const metrics = {
    total: activeCampaigns.length,
    live: activeCampaigns.filter((c) => c.status === "Live").length,
    scheduled: activeCampaigns.filter((c) => c.status === "Scheduled").length,
    expired: activeCampaigns.filter((c) => c.status === "Expired").length,
    totalReach: "6,470+",
  };

  return (
    <AdminLayout currentPageLabel="Marketing & Offers">
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
                <Ionicons name="megaphone" size={24} color="white" />
              </LinearGradient>
            </View>
            <View style={{ flex: isWeb ? undefined : 1 }}>
              <Text style={styles.mainTitleText}>Marketing & Offers</Text>
              <Text style={styles.subtitleText}>
                Create promotional campaigns, manage promo codes, and broadcast
                notifications
              </Text>
            </View>
          </View>
          <View style={styles.headerStats}>
            <View style={styles.headerStat}>
              <Ionicons name="rocket" size={14} color="#10b981" />
              <Text style={styles.headerStatText}>{metrics.live} Active</Text>
            </View>
            <View style={styles.headerStat}>
              <Ionicons name="calendar" size={14} color="#f59e0b" />
              <Text style={styles.headerStatText}>
                {metrics.scheduled} Scheduled
              </Text>
            </View>
          </View>
        </View>

        {/* Metrics Summary Row - Swappable carousel framework added for mobile layout logic */}
        {isWeb ? (
          <View style={styles.metricsGrid}>
            <LinearGradient
              colors={["#ffffff", "#f9fafb"]}
              style={styles.metricCard}
            >
              <View style={[styles.metricIcon, { backgroundColor: "#fef3f0" }]}>
                <Ionicons name="grid" size={22} color="#D95D29" />
              </View>
              <View>
                <Text style={styles.metricValue}>{metrics.total}</Text>
                <Text style={styles.metricLabel}>Total Campaigns</Text>
              </View>
            </LinearGradient>
            <LinearGradient
              colors={["#ffffff", "#f9fafb"]}
              style={styles.metricCard}
            >
              <View
                style={[
                  styles.metricIcon,
                  { backgroundColor: "rgba(16, 185, 129, 0.1)" },
                ]}
              >
                <Ionicons name="people" size={22} color="#10b981" />
              </View>
              <View>
                <Text style={styles.metricValue}>{metrics.totalReach}</Text>
                <Text style={styles.metricLabel}>Total Reach</Text>
              </View>
            </LinearGradient>
            <LinearGradient
              colors={["#ffffff", "#f9fafb"]}
              style={styles.metricCard}
            >
              <View
                style={[
                  styles.metricIcon,
                  { backgroundColor: "rgba(16, 185, 129, 0.1)" },
                ]}
              >
                <Ionicons name="trending-up" size={22} color="#10b981" />
              </View>
              <View>
                <Text style={styles.metricValue}>+24%</Text>
                <Text style={styles.metricLabel}>Engagement Rate</Text>
              </View>
            </LinearGradient>
          </View>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.metricsCarouselMobile}
            contentContainerStyle={styles.metricsCarouselContentMobile}
          >
            <View style={styles.metricCardMobile}>
              <View
                style={[
                  styles.metricIconMobile,
                  { backgroundColor: "#fef3f0" },
                ]}
              >
                <Ionicons name="grid" size={16} color="#D95D29" />
              </View>
              <View>
                <Text style={styles.metricValueMobile}>{metrics.total}</Text>
                <Text style={styles.metricLabelMobile}>Total</Text>
              </View>
            </View>
            <View style={styles.metricCardMobile}>
              <View
                style={[
                  styles.metricIconMobile,
                  { backgroundColor: "rgba(16, 185, 129, 0.1)" },
                ]}
              >
                <Ionicons name="people" size={16} color="#10b981" />
              </View>
              <View>
                <Text style={styles.metricValueMobile}>
                  {metrics.totalReach}
                </Text>
                <Text style={styles.metricLabelMobile}>Reach</Text>
              </View>
            </View>
            <View style={styles.metricCardMobile}>
              <View
                style={[
                  styles.metricIconMobile,
                  { backgroundColor: "rgba(16, 185, 129, 0.1)" },
                ]}
              >
                <Ionicons name="trending-up" size={16} color="#10b981" />
              </View>
              <View>
                <Text style={styles.metricValueMobile}>+24%</Text>
                <Text style={styles.metricLabelMobile}>Engage</Text>
              </View>
            </View>
          </ScrollView>
        )}

        <View
          style={[
            styles.workspaceSplitRow,
            isWeb ? styles.rowLayout : styles.columnLayout,
          ]}
        >
          {/* LEFT SECTION: Create Campaign & Broadcast */}
          <View
            style={[
              styles.leftFormColumn,
              isWeb ? { width: "38%" } : { width: "100%" },
            ]}
          >
            {/* Create Campaign Card */}
            <LinearGradient
              colors={["#ffffff", "#fefaf8"]}
              style={styles.controlFormCard}
            >
              <View style={styles.cardHeaderIcon}>
                <LinearGradient
                  colors={["#D95D29", "#c04e21"]}
                  style={styles.cardHeaderGradient}
                >
                  <Ionicons name="gift" size={18} color="white" />
                </LinearGradient>
                <Text style={styles.panelHeaderTitle}>Create Campaign</Text>
              </View>
              <View style={styles.miniColorAccentLine} />

              <View style={styles.formGroup}>
                <Text style={styles.inputLabelText}>
                  <Ionicons name="flag" size={12} color="#6b7280" /> Campaign
                  Title
                </Text>
                <View style={styles.inputFieldContainer}>
                  <Ionicons name="create-outline" size={18} color="#9ca3af" />
                  <TextInput
                    style={styles.fieldInput}
                    placeholder="e.g., Monsoon Premium Waiver"
                    placeholderTextColor="#9ca3af"
                    value={offerTitle}
                    onChangeText={setOfferTitle}
                  />
                </View>
              </View>

              <View style={styles.formRow}>
                <View style={[styles.formGroup, { flex: 1 }]}>
                  <Text style={styles.inputLabelText}>
                    <Ionicons name="pricetag" size={12} color="#6b7280" /> Promo
                    Code
                  </Text>
                  <View style={styles.inputFieldContainer}>
                    <Ionicons name="code" size={18} color="#9ca3af" />
                    <TextInput
                      style={[
                        styles.fieldInput,
                        { textTransform: "uppercase" },
                      ]}
                      placeholder="MONSOON10"
                      placeholderTextColor="#9ca3af"
                      value={promoCode}
                      onChangeText={setPromoCode}
                    />
                  </View>
                </View>

                <View style={[styles.formGroup, { flex: 1 }]}>
                  <Text style={styles.inputLabelText}>
                    <Ionicons name="cash" size={12} color="#6b7280" /> Discount
                    Value
                  </Text>
                  <View style={styles.inputFieldContainer}>
                    <Ionicons
                      name="pricetag-outline"
                      size={18}
                      color="#9ca3af"
                    />
                    <TextInput
                      style={styles.fieldInput}
                      placeholder="10% Off"
                      placeholderTextColor="#9ca3af"
                      value={discountValue}
                      onChangeText={setDiscountValue}
                    />
                  </View>
                </View>
              </View>

              <TouchableOpacity
                style={styles.primaryActionButton}
                onPress={handleCreateCampaign}
              >
                <LinearGradient
                  colors={["#D95D29", "#c04e21"]}
                  style={styles.buttonGradient}
                >
                  <Ionicons name="rocket" size={18} color="white" />
                  <Text style={styles.actionButtonText}>Launch Campaign</Text>
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>

            {/* Broadcast Notification Card */}
            <LinearGradient
              colors={["#ffffff", "#fefaf8"]}
              style={styles.controlFormCard}
            >
              <View style={styles.cardHeaderIcon}>
                <LinearGradient
                  colors={["#111111", "#1a1a2e"]}
                  style={styles.cardHeaderGradient}
                >
                  <Ionicons name="notifications" size={18} color="white" />
                </LinearGradient>
                <Text style={styles.panelHeaderTitle}>
                  Broadcast Notification
                </Text>
              </View>
              <View style={styles.miniColorAccentLine} />

              <View style={styles.formGroup}>
                <Text style={styles.inputLabelText}>
                  <Ionicons
                    name="chatbubble-ellipses"
                    size={12}
                    color="#6b7280"
                  />{" "}
                  Alert Message
                </Text>
                <View style={styles.textareaFieldContainer}>
                  <TextInput
                    style={styles.textareaInput}
                    multiline
                    numberOfLines={4}
                    placeholder="Compose real-time alert text to instantly broadcast to all users..."
                    placeholderTextColor="#9ca3af"
                    value={pushNotificationText}
                    onChangeText={setPushNotificationText}
                  />
                </View>
              </View>

              <TouchableOpacity
                style={[styles.primaryActionButton, styles.darkBroadcastBtn]}
                onPress={handleSendNotification}
              >
                <LinearGradient
                  colors={["#111111", "#1a1a2e"]}
                  style={styles.buttonGradient}
                >
                  <Ionicons name="send" size={18} color="white" />
                  <Text style={styles.actionButtonText}>Send Broadcast</Text>
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          {/* RIGHT SECTION: Campaigns Table */}
          <View
            style={[
              styles.rightLedgerColumn,
              isWeb ? { width: "59%" } : { width: "100%" },
            ]}
          >
            <View
              style={
                isWeb ? styles.ledgerWrapperCard : styles.mobileLedgerContainer
              }
            >
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.ledgerHeadingTitle}>
                    Active Campaigns
                  </Text>
                  <Text style={styles.ledgerSubheading}>
                    {activeCampaigns.length} total campaigns • {metrics.live}{" "}
                    active
                  </Text>
                </View>
                <TouchableOpacity style={styles.filterButton}>
                  <Ionicons name="funnel" size={14} color="#D95D29" />
                  <Text style={styles.filterButtonText}>Filter</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.horizontalDividerLine} />

              {isWeb ? (
                <View style={styles.tableElementContainer}>
                  <View style={styles.tableHeaderRow}>
                    <Text style={[styles.thCell, { width: "28%" }]}>
                      Campaign
                    </Text>
                    <Text style={[styles.thCell, { width: "14%" }]}>
                      Promo Code
                    </Text>
                    <Text style={[styles.thCell, { width: "18%" }]}>Scope</Text>
                    <Text style={[styles.thCell, { width: "14%" }]}>
                      Discount
                    </Text>
                    <Text style={[styles.thCell, { width: "12%" }]}>
                      Status
                    </Text>
                    <Text
                      style={[
                        styles.thCell,
                        { width: "14%", textAlign: "center" },
                      ]}
                    >
                      Actions
                    </Text>
                  </View>

                  {activeCampaigns.map((camp) => {
                    const statusConfig = getStatusConfig(camp.status);
                    return (
                      <View key={camp.id} style={styles.tableDataRow}>
                        <View style={{ width: "28%" }}>
                          <Text style={styles.campaignPrimaryTitle}>
                            {camp.title}
                          </Text>
                          <View style={styles.campaignMetaRow}>
                            <Ionicons name="time" size={10} color="#9ca3af" />
                            <Text style={styles.campaignMetaSub}>
                              Expires: {camp.expiryDate}
                            </Text>
                          </View>
                        </View>
                        <Text
                          style={[
                            styles.tdCell,
                            styles.tokenCodeHighlight,
                            { width: "14%" },
                          ]}
                        >
                          {camp.code}
                        </Text>
                        <Text
                          style={[
                            styles.tdCell,
                            { width: "18%", fontSize: 12 },
                          ]}
                        >
                          {camp.categoryScope}
                        </Text>
                        <Text
                          style={[
                            styles.tdCell,
                            {
                              width: "14%",
                              fontWeight: "700",
                              color: "#D95D29",
                            },
                          ]}
                        >
                          {camp.discount}
                        </Text>
                        <View style={{ width: "12%" }}>
                          <View
                            style={[
                              styles.statusLabelBadge,
                              { backgroundColor: statusConfig.bg },
                            ]}
                          >
                            <Ionicons
                              name={statusConfig.icon as any}
                              size={10}
                              color={statusConfig.text}
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
                        <View
                          style={{
                            width: "14%",
                            flexDirection: "row",
                            justifyContent: "center",
                            gap: 8,
                          }}
                        >
                          <TouchableOpacity
                            style={styles.actionButton}
                            onPress={() => {
                              setSelectedCampaign(camp);
                              setIsDetailModalOpen(true);
                            }}
                          >
                            <Ionicons name="eye" size={16} color="#D95D29" />
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.actionButton}>
                            <Ionicons
                              name="create-outline"
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
                <View style={styles.mobileCardsListStream}>
                  {activeCampaigns.map((camp) => {
                    const statusConfig = getStatusConfig(camp.status);
                    return (
                      <TouchableOpacity
                        key={camp.id}
                        style={styles.mobileCampaignCardItem}
                        onPress={() => {
                          setSelectedCampaign(camp);
                          setIsDetailModalOpen(true);
                        }}
                        activeOpacity={0.7}
                      >
                        <View style={styles.cardHeaderInlineSplit}>
                          <View style={styles.mobileTokenContainer}>
                            <LinearGradient
                              colors={["#fef3f0", "#fde8e0"]}
                              style={styles.mobileTokenBadge}
                            >
                              <Text style={styles.mobileTokenText}>
                                {camp.code}
                              </Text>
                            </LinearGradient>
                          </View>
                          <View
                            style={[
                              styles.statusLabelBadgeMobile,
                              { backgroundColor: statusConfig.bg },
                            ]}
                          >
                            <Text
                              style={[
                                styles.statusBadgeText,
                                { color: statusConfig.text, fontSize: 10 },
                              ]}
                            >
                              {statusConfig.label}
                            </Text>
                          </View>
                        </View>

                        <Text
                          style={styles.mobileCampaignTitle}
                          numberOfLines={1}
                        >
                          {camp.title}
                        </Text>
                        <Text style={styles.mobileCampaignSubtext}>
                          {camp.categoryScope} • {camp.discount}
                        </Text>

                        <View style={styles.mobileStatBadgeInlineRow}>
                          <View style={styles.mobileStatItem}>
                            <Ionicons name="people" size={12} color="#9ca3af" />
                            <Text style={styles.mobileStatMetricText}>
                              {camp.reachCount}
                            </Text>
                          </View>
                          <View style={styles.mobileStatItem}>
                            <Ionicons
                              name="calendar"
                              size={12}
                              color="#9ca3af"
                            />
                            <Text style={styles.mobileStatMetricText}>
                              Exp: {camp.expiryDate}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Campaign Detail Modal */}
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
            style={[styles.modalContentCard, { width: isWeb ? 550 : "92%" }]}
          >
            <LinearGradient
              colors={["#D95D29", "#c04e21"]}
              style={styles.modalGradientHeader}
            >
              <View style={styles.modalHeaderRow}>
                <Text style={styles.modalHeadingTitle}>Campaign Details</Text>
                <TouchableOpacity onPress={() => setIsDetailModalOpen(false)}>
                  <Ionicons name="close" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </LinearGradient>

            {selectedCampaign && (
              <ScrollView
                style={styles.modalBodyScroll}
                showsVerticalScrollIndicator={true}
              >
                <View style={styles.modalBodyContent}>
                  <View style={styles.modalCampaignHeader}>
                    <View style={styles.modalCampaignIcon}>
                      <Ionicons name="megaphone" size={30} color="#D95D29" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={styles.modalCampaignTitleText}
                        numberOfLines={1}
                      >
                        {selectedCampaign.title}
                      </Text>
                      <Text style={styles.modalCampaignId}>
                        {selectedCampaign.id}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.modalSection}>
                    <Text style={styles.modalSectionTitle}>
                      Promotional Details
                    </Text>
                    <View style={styles.modalDetailRow}>
                      <View style={styles.modalDetailItem}>
                        <Text style={styles.modalDetailLabel}>Promo Code</Text>
                        <View style={styles.modalCodeBadge}>
                          <Text style={styles.modalCodeText}>
                            {selectedCampaign.code}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.modalDetailItem}>
                        <Text style={styles.modalDetailLabel}>Discount</Text>
                        <Text style={styles.modalDetailValue}>
                          {selectedCampaign.discount}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.modalSection}>
                    <Text style={styles.modalSectionTitle}>
                      Target Audience
                    </Text>
                    <View style={styles.modalDetailRow}>
                      <View style={styles.modalDetailItem}>
                        <Text style={styles.modalDetailLabel}>
                          Category Scope
                        </Text>
                        <Text style={styles.modalDetailValue}>
                          {selectedCampaign.categoryScope}
                        </Text>
                      </View>
                      <View style={styles.modalDetailItem}>
                        <Text style={styles.modalDetailLabel}>
                          Estimated Reach
                        </Text>
                        <Text style={styles.modalDetailValue}>
                          {selectedCampaign.reachCount}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.modalSection}>
                    <Text style={styles.modalSectionTitle}>Timeline</Text>
                    <View style={styles.modalDetailRow}>
                      <View style={styles.modalDetailItem}>
                        <Text style={styles.modalDetailLabel}>Expiry Date</Text>
                        <Text style={styles.modalDetailValue}>
                          {selectedCampaign.expiryDate}
                        </Text>
                      </View>
                      <View style={styles.modalDetailItem}>
                        <Text style={styles.modalDetailLabel}>Status</Text>
                        <View
                          style={[
                            styles.modalStatusBadge,
                            {
                              backgroundColor: getStatusConfig(
                                selectedCampaign.status,
                              ).bg,
                            },
                          ]}
                        >
                          <Ionicons
                            name={
                              getStatusConfig(selectedCampaign.status)
                                .icon as any
                            }
                            size={12}
                            color={
                              getStatusConfig(selectedCampaign.status).text
                            }
                          />
                          <Text
                            style={[
                              styles.modalStatusText,
                              {
                                color: getStatusConfig(selectedCampaign.status)
                                  .text,
                              },
                            ]}
                          >
                            {getStatusConfig(selectedCampaign.status).label}
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
  headerStats: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: isWeb ? "auto" : "100%",
    marginTop: isWeb ? 0 : 4,
  },
  headerStat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  headerStatText: {
    fontSize: 11.5,
    color: "#374151",
    fontWeight: "500",
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 24,
  },
  metricCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 16,
    borderRadius: 16,
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
  metricCardMobile: {
    width: width * 0.42,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  metricIconMobile: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  metricValueMobile: {
    fontSize: 16,
    fontWeight: "900",
    color: "#111111",
  },
  metricLabelMobile: {
    fontSize: 10,
    color: "#6b7280",
    fontWeight: "500",
  },
  metricIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  metricValue: {
    fontSize: 24,
    fontWeight: "900",
    color: "#111111",
  },
  metricLabel: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "500",
  },
  workspaceSplitRow: {
    justifyContent: "space-between",
    gap: isWeb ? 24 : 14,
  },
  rowLayout: {
    flexDirection: "row",
  },
  columnLayout: {
    flexDirection: "column",
  },
  leftFormColumn: {
    gap: isWeb ? 20 : 14,
  },
  rightLedgerColumn: {
    gap: isWeb ? 20 : 14,
  },
  controlFormCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  cardHeaderIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  cardHeaderGradient: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  panelHeaderTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#111111",
  },
  miniColorAccentLine: {
    height: 2,
    backgroundColor: "#D95D29",
    width: 30,
    marginTop: 6,
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 14,
  },
  formRow: {
    flexDirection: "row",
    gap: 12,
  },
  inputLabelText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#6b7280",
    letterSpacing: 0.3,
    marginBottom: 6,
  },
  inputFieldContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
    gap: 8,
  },
  fieldInput: {
    flex: 1,
    fontSize: 13.5,
    color: "#111111",
    padding: 0,
  },
  primaryActionButton: {
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 4,
  },
  darkBroadcastBtn: {
    marginTop: 0,
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 44,
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 13.5,
    fontWeight: "700",
  },
  textareaFieldContainer: {
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    padding: 10,
  },
  textareaInput: {
    fontSize: 13.5,
    color: "#111111",
    height: 80,
    textAlignVertical: "top",
    padding: 0,
  },
  ledgerWrapperCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 24,
  },
  mobileLedgerContainer: {
    backgroundColor: "transparent",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  ledgerHeadingTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111111",
  },
  ledgerSubheading: {
    fontSize: 12,
    color: "#6b7280",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#fef3f0",
    borderRadius: 6,
  },
  filterButtonText: {
    fontSize: 11.5,
    fontWeight: "600",
    color: "#D95D29",
  },
  horizontalDividerLine: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginVertical: 12,
  },
  tableElementContainer: {
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
  campaignPrimaryTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111111",
  },
  campaignMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  campaignMetaSub: {
    fontSize: 11,
    color: "#9ca3af",
  },
  tokenCodeHighlight: {
    fontWeight: "800",
    color: "#D95D29",
  },
  statusLabelBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  statusLabelBadgeMobile: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: "700",
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#f9fafb",
    justifyContent: "center",
    alignItems: "center",
  },
  mobileCardsListStream: {
    gap: 10,
    marginTop: 8,
  },
  mobileCampaignCardItem: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    padding: 12,
  },
  cardHeaderInlineSplit: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  mobileTokenContainer: {
    borderRadius: 6,
    overflow: "hidden",
  },
  mobileTokenBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  mobileTokenText: {
    fontSize: 11.5,
    fontWeight: "800",
    color: "#D95D29",
  },
  mobileCampaignTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 4,
  },
  mobileCampaignSubtext: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 8,
  },
  mobileStatBadgeInlineRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    padding: 10,
    marginTop: 4,
  },
  mobileStatItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  mobileStatMetricText: {
    fontSize: 11.5,
    fontWeight: "500",
    color: "#6b7280",
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
  modalBodyScroll: {
    flex: undefined,
  },
  modalBodyContent: {
    padding: 20,
  },
  modalCampaignHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  modalCampaignIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#fef3f0",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCampaignTitleText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#111111",
  },
  modalCampaignId: {
    fontSize: 11.5,
    color: "#9ca3af",
    marginTop: 1,
  },
  modalSection: {
    marginBottom: 16,
  },
  modalSectionTitle: {
    fontSize: 12.5,
    fontWeight: "700",
    color: "#6b7280",
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  modalDetailRow: {
    flexDirection: "row",
    gap: 14,
  },
  modalDetailItem: {
    flex: 1,
  },
  modalDetailLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#9ca3af",
    marginBottom: 4,
  },
  modalDetailValue: {
    fontSize: 13.5,
    fontWeight: "600",
    color: "#111111",
  },
  modalCodeBadge: {
    backgroundColor: "#fef3f0",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  modalCodeText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#D95D29",
  },
  modalStatusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  modalStatusText: {
    fontSize: 11.5,
    fontWeight: "700",
  },
  modalFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    backgroundColor: "#ffffff",
    alignItems: "center",
  },
  modalCloseButton: {
    height: 38,
    borderRadius: 8,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  modalCloseText: {
    fontSize: 13.5,
    fontWeight: "600",
    color: "#6b7280",
  },
});
