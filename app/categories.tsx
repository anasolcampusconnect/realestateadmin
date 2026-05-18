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

export default function CategoriesManagement() {
  const [activeSegment, setActiveSegment] = useState<
    "Categories" | "Locations" | "Pricing"
  >("Categories");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [modalType, setModalType] = useState<
    "category" | "location" | "pricing"
  >("category");

  const categoriesData = [
    {
      code: "CAT-RES",
      name: "Residential",
      types: ["Villa", "Penthouse", "Apartment", "Studio"],
      activeListings: 412,
      priority: "High",
      trend: "+12%",
      icon: "home",
    },
    {
      code: "CAT-COM",
      name: "Commercial",
      types: ["Office Space", "Retail Shop", "Tech Park Space"],
      activeListings: 184,
      priority: "Critical",
      trend: "+8%",
      icon: "business",
    },
    {
      code: "CAT-IND",
      name: "Industrial",
      types: ["Warehouse", "Manufacturing Plant"],
      activeListings: 42,
      priority: "Medium",
      trend: "-3%",
      icon: "construct",
    },
    {
      code: "CAT-AGR",
      name: "Agricultural",
      types: ["Farmland", "Ecolodge Grounds"],
      activeListings: 19,
      priority: "Standard",
      trend: "+5%",
      icon: "leaf",
    },
  ];

  const locationsData = [
    {
      id: "LOC-01",
      sector: "HITEC City",
      city: "Hyderabad",
      listings: 214,
      baseTaxRate: "2.4%",
      surgeMultiplier: "x1.25",
      growth: "+18%",
      icon: "location",
    },
    {
      id: "LOC-02",
      sector: "Gachibowli",
      city: "Hyderabad",
      listings: 145,
      baseTaxRate: "2.1%",
      surgeMultiplier: "x1.10",
      growth: "+12%",
      icon: "location",
    },
    {
      id: "LOC-03",
      sector: "Jubilee Hills",
      city: "Hyderabad",
      listings: 98,
      baseTaxRate: "3.5%",
      surgeMultiplier: "x1.40",
      growth: "+25%",
      icon: "location",
    },
    {
      id: "LOC-04",
      sector: "Kukatpally",
      city: "Hyderabad",
      listings: 124,
      baseTaxRate: "1.8%",
      surgeMultiplier: "x1.00",
      growth: "+5%",
      icon: "location",
    },
  ];

  const pricingRules = [
    {
      ruleId: "PRC-FTR",
      ruleName: "Featured Listing Boost",
      description:
        "Applies premium position placement surcharge fee for enhanced visibility",
      delta: "+15% Platform Surcharge",
      status: "Active",
      icon: "trending-up",
    },
    {
      ruleId: "PRC-SEA",
      ruleName: "High Demand Season Factor",
      description:
        "Dynamic escalation modifier applied during high traction calendar cycles",
      delta: "+8% Base Escalation",
      status: "Active",
      icon: "calendar",
    },
    {
      ruleId: "PRC-NEW",
      ruleName: "First-Time Agent Discount",
      description:
        "Introductory deduction modifier applied to direct onboarding pipelines",
      delta: "-5% Onboarding Relief",
      status: "Active",
      icon: "gift",
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "#ef4444";
      case "High":
        return "#f59e0b";
      case "Medium":
        return "#3b82f6";
      default:
        return "#10b981";
    }
  };

  const getTrendIcon = (trend: string) => {
    if (trend.startsWith("+")) return "arrow-up";
    if (trend.startsWith("-")) return "arrow-down";
    return "remove";
  };

  const getTrendColor = (trend: string) => {
    if (trend.startsWith("+")) return "#10b981";
    if (trend.startsWith("-")) return "#ef4444";
    return "#6b7280";
  };

  return (
    <AdminLayout currentPageLabel="Location & Categories">
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
                <Ionicons name="apps" size={24} color="white" />
              </LinearGradient>
            </View>
            <View>
              <Text style={styles.mainTitleText}>System Configuration</Text>
              <Text style={styles.subtitleText}>
                Manage property classifications, regional zones, and pricing
                rules
              </Text>
            </View>
          </View>
        </View>

        {/* Enhanced Segmented Tabs */}
        <View style={styles.segmentedTabRow}>
          {(["Categories", "Locations", "Pricing"] as const).map((segment) => (
            <TouchableOpacity
              key={segment}
              style={[
                styles.segmentBtn,
                activeSegment === segment && styles.segmentBtnActive,
              ]}
              onPress={() => setActiveSegment(segment)}
            >
              <LinearGradient
                colors={
                  activeSegment === segment
                    ? ["#D95D29", "#c04e21"]
                    : ["transparent", "transparent"]
                }
                style={styles.segmentGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Ionicons
                  name={
                    segment === "Categories"
                      ? "grid"
                      : segment === "Locations"
                        ? "location"
                        : "pricetag"
                  }
                  size={18}
                  color={activeSegment === segment ? "white" : "#6b7280"}
                />
                <Text
                  style={[
                    styles.segmentBtnText,
                    activeSegment === segment && styles.segmentBtnTextActive,
                  ]}
                >
                  {segment}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        {/* Content Section */}
        <View style={styles.ledgerWrapperCard}>
          {/* Categories Section */}
          {activeSegment === "Categories" && (
            <View>
              <View style={styles.sectionHeaderRow}>
                <View>
                  <Text style={styles.ledgerHeading}>Property Sectors</Text>
                  <Text style={styles.ledgerSubheading}>
                    {categoriesData.length} categories configured
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.accentActionButton}
                  onPress={() => {
                    setModalType("category");
                    setIsAddModalOpen(true);
                  }}
                >
                  <LinearGradient
                    colors={["#D95D29", "#c04e21"]}
                    style={styles.addButtonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Ionicons name="add" size={18} color="white" />
                    <Text style={styles.btnActionText}>New Category</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              <View style={styles.horizontalDivider} />

              {isWeb ? (
                <View style={styles.tableWrapper}>
                  <View style={styles.tableHeaderRow}>
                    <Text style={[styles.thCell, { width: "12%" }]}>Code</Text>
                    <Text style={[styles.thCell, { width: "18%" }]}>
                      Category
                    </Text>
                    <Text style={[styles.thCell, { width: "35%" }]}>
                      Property Types
                    </Text>
                    <Text
                      style={[
                        styles.thCell,
                        { width: "12%", textAlign: "center" },
                      ]}
                    >
                      Listings
                    </Text>
                    <Text
                      style={[
                        styles.thCell,
                        { width: "12%", textAlign: "center" },
                      ]}
                    >
                      Priority
                    </Text>
                    <Text
                      style={[
                        styles.thCell,
                        { width: "11%", textAlign: "center" },
                      ]}
                    >
                      Actions
                    </Text>
                  </View>
                  {categoriesData.map((cat) => (
                    <View key={cat.code} style={styles.tableDataRow}>
                      <Text
                        style={[
                          styles.tdCell,
                          styles.codeHighlight,
                          { width: "12%" },
                        ]}
                      >
                        {cat.code}
                      </Text>
                      <View
                        style={{
                          width: "18%",
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <View style={styles.categoryIcon}>
                          <Ionicons
                            name={cat.icon as any}
                            size={14}
                            color="#D95D29"
                          />
                        </View>
                        <Text style={[styles.tdCell, { fontWeight: "700" }]}>
                          {cat.name}
                        </Text>
                      </View>
                      <Text
                        style={[
                          styles.tdCell,
                          { width: "35%", color: "#6b7280" },
                        ]}
                        numberOfLines={1}
                      >
                        {cat.types.join(" • ")}
                      </Text>
                      <Text
                        style={[
                          styles.tdCell,
                          {
                            width: "12%",
                            textAlign: "center",
                            fontWeight: "700",
                            color: "#D95D29",
                          },
                        ]}
                      >
                        {cat.activeListings}
                      </Text>
                      <View style={{ width: "12%", alignItems: "center" }}>
                        <View
                          style={[
                            styles.priorityBadge,
                            {
                              backgroundColor: `${getPriorityColor(cat.priority)}15`,
                            },
                          ]}
                        >
                          <View
                            style={[
                              styles.priorityDot,
                              {
                                backgroundColor: getPriorityColor(cat.priority),
                              },
                            ]}
                          />
                          <Text
                            style={[
                              styles.priorityText,
                              { color: getPriorityColor(cat.priority) },
                            ]}
                          >
                            {cat.priority}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          width: "11%",
                          flexDirection: "row",
                          justifyContent: "center",
                          gap: 8,
                        }}
                      >
                        <TouchableOpacity style={styles.actionIconButton}>
                          <Ionicons
                            name="create-outline"
                            size={16}
                            color="#D95D29"
                          />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionIconButton}>
                          <Ionicons
                            name="trash-outline"
                            size={16}
                            color="#ef4444"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </View>
              ) : (
                <View style={styles.mobileCardsStream}>
                  {categoriesData.map((cat) => (
                    <View key={cat.code} style={styles.mobileConfigCard}>
                      <View style={styles.cardHeaderRow}>
                        <View style={styles.cardHeaderLeft}>
                          <View style={styles.mobileIconContainer}>
                            <Ionicons
                              name={cat.icon as any}
                              size={20}
                              color="#D95D29"
                            />
                          </View>
                          <Text style={styles.mobileCardCode}>{cat.code}</Text>
                        </View>
                        <View
                          style={[
                            styles.priorityBadge,
                            {
                              backgroundColor: `${getPriorityColor(cat.priority)}15`,
                            },
                          ]}
                        >
                          <View
                            style={[
                              styles.priorityDot,
                              {
                                backgroundColor: getPriorityColor(cat.priority),
                              },
                            ]}
                          />
                          <Text
                            style={[
                              styles.priorityText,
                              {
                                color: getPriorityColor(cat.priority),
                                fontSize: 10,
                              },
                            ]}
                          >
                            {cat.priority}
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.mobileCardName}>{cat.name}</Text>
                      <Text style={styles.mobileCardSubtext}>
                        Types: {cat.types.join(", ")}
                      </Text>
                      <View style={styles.mobileStatsRow}>
                        <View style={styles.mobileStat}>
                          <Ionicons
                            name="home-outline"
                            size={14}
                            color="#9ca3af"
                          />
                          <Text style={styles.mobileStatValue}>
                            {cat.activeListings} listings
                          </Text>
                        </View>
                        <View
                          style={[
                            styles.mobileStat,
                            {
                              flexDirection: "row",
                              alignItems: "center",
                              gap: 4,
                            },
                          ]}
                        >
                          <Ionicons
                            name={getTrendIcon(cat.trend)}
                            size={12}
                            color={getTrendColor(cat.trend)}
                          />
                          <Text
                            style={[
                              styles.mobileTrend,
                              { color: getTrendColor(cat.trend) },
                            ]}
                          >
                            {cat.trend}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>
          )}

          {/* Locations Section */}
          {activeSegment === "Locations" && (
            <View>
              <View style={styles.sectionHeaderRow}>
                <View>
                  <Text style={styles.ledgerHeading}>Operational Zones</Text>
                  <Text style={styles.ledgerSubheading}>
                    {locationsData.length} locations configured
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.accentActionButton}
                  onPress={() => {
                    setModalType("location");
                    setIsAddModalOpen(true);
                  }}
                >
                  <LinearGradient
                    colors={["#D95D29", "#c04e21"]}
                    style={styles.addButtonGradient}
                  >
                    <Ionicons name="add" size={18} color="white" />
                    <Text style={styles.btnActionText}>Add Location</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              <View style={styles.horizontalDivider} />

              {isWeb ? (
                <View style={styles.tableWrapper}>
                  <View style={styles.tableHeaderRow}>
                    <Text style={[styles.thCell, { width: "10%" }]}>
                      Zone ID
                    </Text>
                    <Text style={[styles.thCell, { width: "25%" }]}>
                      Sector
                    </Text>
                    <Text style={[styles.thCell, { width: "20%" }]}>City</Text>
                    <Text
                      style={[
                        styles.thCell,
                        { width: "12%", textAlign: "center" },
                      ]}
                    >
                      Listings
                    </Text>
                    <Text
                      style={[
                        styles.thCell,
                        { width: "15%", textAlign: "center" },
                      ]}
                    >
                      Tax Rate
                    </Text>
                    <Text
                      style={[
                        styles.thCell,
                        { width: "18%", textAlign: "center" },
                      ]}
                    >
                      Surge Multiplier
                    </Text>
                  </View>
                  {locationsData.map((loc) => (
                    <View key={loc.id} style={styles.tableDataRow}>
                      <Text
                        style={[
                          styles.tdCell,
                          styles.codeHighlight,
                          { width: "10%" },
                        ]}
                      >
                        {loc.id}
                      </Text>
                      <View
                        style={{
                          width: "25%",
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <Ionicons
                          name="business-outline"
                          size={14}
                          color="#D95D29"
                        />
                        <Text style={[styles.tdCell, { fontWeight: "700" }]}>
                          {loc.sector}
                        </Text>
                      </View>
                      <Text style={[styles.tdCell, { width: "20%" }]}>
                        {loc.city}
                      </Text>
                      <Text
                        style={[
                          styles.tdCell,
                          {
                            width: "12%",
                            textAlign: "center",
                            fontWeight: "700",
                            color: "#D95D29",
                          },
                        ]}
                      >
                        {loc.listings}
                      </Text>
                      <Text
                        style={[
                          styles.tdCell,
                          { width: "15%", textAlign: "center" },
                        ]}
                      >
                        {loc.baseTaxRate}
                      </Text>
                      <Text
                        style={[
                          styles.tdCell,
                          {
                            width: "18%",
                            textAlign: "center",
                            fontWeight: "800",
                            color: "#10b981",
                          },
                        ]}
                      >
                        {loc.surgeMultiplier}
                      </Text>
                    </View>
                  ))}
                </View>
              ) : (
                <View style={styles.mobileCardsStream}>
                  {locationsData.map((loc) => (
                    <View key={loc.id} style={styles.mobileConfigCard}>
                      <View style={styles.cardHeaderRow}>
                        <View style={styles.cardHeaderLeft}>
                          <View style={styles.mobileIconContainer}>
                            <Ionicons
                              name="location"
                              size={20}
                              color="#D95D29"
                            />
                          </View>
                          <Text style={styles.mobileCardCode}>{loc.id}</Text>
                        </View>
                        <Text style={styles.mobileSurgeText}>
                          {loc.surgeMultiplier}
                        </Text>
                      </View>
                      <Text style={styles.mobileCardName}>{loc.sector}</Text>
                      <Text style={styles.mobileCardSubtext}>{loc.city}</Text>
                      <View style={styles.mobileStatsRow}>
                        <View style={styles.mobileStat}>
                          <Ionicons
                            name="home-outline"
                            size={14}
                            color="#9ca3af"
                          />
                          <Text style={styles.mobileStatValue}>
                            {loc.listings} properties
                          </Text>
                        </View>
                        <View style={styles.mobileStat}>
                          <Ionicons
                            name="cash-outline"
                            size={14}
                            color="#9ca3af"
                          />
                          <Text style={styles.mobileStatValue}>
                            Tax: {loc.baseTaxRate}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>
          )}

          {/* Pricing Section */}
          {activeSegment === "Pricing" && (
            <View>
              <View style={styles.sectionHeaderRow}>
                <View>
                  <Text style={styles.ledgerHeading}>Pricing Rules Engine</Text>
                  <Text style={styles.ledgerSubheading}>
                    {pricingRules.length} active rules
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.accentActionButton}
                  onPress={() => {
                    setModalType("pricing");
                    setIsAddModalOpen(true);
                  }}
                >
                  <LinearGradient
                    colors={["#D95D29", "#c04e21"]}
                    style={styles.addButtonGradient}
                  >
                    <Ionicons name="add" size={18} color="white" />
                    <Text style={styles.btnActionText}>Add Rule</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              <View style={styles.horizontalDivider} />

              <View
                style={[
                  styles.pricingRulesLayout,
                  isWeb ? styles.rowLayout : styles.columnLayout,
                ]}
              >
                {pricingRules.map((rule) => (
                  <LinearGradient
                    key={rule.ruleId}
                    colors={["#ffffff", "#f9fafb"]}
                    style={[
                      styles.pricingRuleCard,
                      isWeb ? { width: "31.5%" } : { width: "100%" },
                    ]}
                  >
                    <View style={styles.pricingCardHeader}>
                      <View style={styles.pricingIconContainer}>
                        <Ionicons
                          name={rule.icon as any}
                          size={22}
                          color="#D95D29"
                        />
                      </View>
                      <View style={styles.pricingStatusBadge}>
                        <View style={styles.statusDotActive} />
                        <Text style={styles.pricingStatusText}>
                          {rule.status}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.ruleBadgeId}>{rule.ruleId}</Text>
                    <Text style={styles.ruleTitleText}>{rule.ruleName}</Text>
                    <Text style={styles.ruleDescText}>{rule.description}</Text>
                    <View style={styles.deltaValueBox}>
                      <LinearGradient
                        colors={
                          rule.delta.startsWith("+")
                            ? ["#10b981", "#059669"]
                            : ["#ef4444", "#dc2626"]
                        }
                        style={styles.deltaGradient}
                      >
                        <Ionicons
                          name={
                            rule.delta.startsWith("+")
                              ? "trending-up"
                              : "trending-down"
                          }
                          size={14}
                          color="white"
                        />
                        <Text style={styles.deltaValueText}>{rule.delta}</Text>
                      </LinearGradient>
                    </View>
                  </LinearGradient>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Add Item Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isAddModalOpen}
        onRequestClose={() => setIsAddModalOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsAddModalOpen(false)}
        >
          <View style={styles.modalContentCard}>
            <LinearGradient
              colors={["#D95D29", "#c04e21"]}
              style={styles.modalGradientHeader}
            >
              <View style={styles.modalHeaderRow}>
                <Text style={styles.modalHeadingTitle}>
                  Add New{" "}
                  {modalType === "category"
                    ? "Category"
                    : modalType === "location"
                      ? "Location"
                      : "Pricing Rule"}
                </Text>
                <TouchableOpacity onPress={() => setIsAddModalOpen(false)}>
                  <Ionicons name="close" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </LinearGradient>

            <View style={styles.modalBody}>
              {modalType === "category" && (
                <>
                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Category Name</Text>
                    <TextInput
                      style={styles.formInput}
                      placeholder="e.g., Residential"
                    />
                  </View>
                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Category Code</Text>
                    <TextInput
                      style={styles.formInput}
                      placeholder="e.g., CAT-RES"
                    />
                  </View>
                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Property Types</Text>
                    <TextInput
                      style={styles.formInput}
                      placeholder="e.g., Villa, Apartment"
                    />
                  </View>
                </>
              )}

              {modalType === "location" && (
                <>
                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Sector Name</Text>
                    <TextInput
                      style={styles.formInput}
                      placeholder="e.g., HITEC City"
                    />
                  </View>
                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>City</Text>
                    <TextInput
                      style={styles.formInput}
                      placeholder="e.g., Hyderabad"
                    />
                  </View>
                  <View style={styles.formRow}>
                    <View style={[styles.formGroup, { flex: 1 }]}>
                      <Text style={styles.formLabel}>Tax Rate</Text>
                      <TextInput
                        style={styles.formInput}
                        placeholder="e.g., 2.4%"
                      />
                    </View>
                    <View style={[styles.formGroup, { flex: 1 }]}>
                      <Text style={styles.formLabel}>Surge Multiplier</Text>
                      <TextInput
                        style={styles.formInput}
                        placeholder="e.g., x1.25"
                      />
                    </View>
                  </View>
                </>
              )}

              {modalType === "pricing" && (
                <>
                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Rule Name</Text>
                    <TextInput
                      style={styles.formInput}
                      placeholder="e.g., Featured Listing Boost"
                    />
                  </View>
                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Description</Text>
                    <TextInput
                      style={[styles.formInput, styles.textArea]}
                      multiline
                      numberOfLines={3}
                      placeholder="Describe the rule..."
                    />
                  </View>
                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Delta / Adjustment</Text>
                    <TextInput
                      style={styles.formInput}
                      placeholder="e.g., +15%"
                    />
                  </View>
                </>
              )}
            </View>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => setIsAddModalOpen(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalSaveButton}
                onPress={() => setIsAddModalOpen(false)}
              >
                <LinearGradient
                  colors={["#D95D29", "#c04e21"]}
                  style={styles.modalSaveGradient}
                >
                  <Text style={styles.modalSaveText}>Add Item</Text>
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
    padding: isWeb ? 24 : 16,
    paddingBottom: 40,
  },
  headerSection: {
    marginBottom: 24,
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
    width: 52,
    height: 52,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  mainTitleText: {
    fontSize: isWeb ? 28 : 22,
    fontWeight: "900",
    color: "#111111",
  },
  subtitleText: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 4,
  },
  segmentedTabRow: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    padding: 4,
    borderRadius: 14,
    marginBottom: 24,
    gap: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  segmentBtn: {
    flex: 1,
    borderRadius: 10,
    overflow: "hidden",
  },
  segmentGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
  },
  segmentBtnActive: {
    shadowColor: "#D95D29",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  segmentBtnText: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "600",
  },
  segmentBtnTextActive: {
    color: "white",
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
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
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
  accentActionButton: {
    borderRadius: 10,
    overflow: "hidden",
  },
  addButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  btnActionText: {
    color: "white",
    fontSize: 13,
    fontWeight: "700",
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
    paddingVertical: 12,
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
  codeHighlight: {
    fontWeight: "700",
    color: "#D95D29",
  },
  categoryIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "#fef3f0",
    justifyContent: "center",
    alignItems: "center",
  },
  priorityBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  priorityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  priorityText: {
    fontSize: 11,
    fontWeight: "700",
  },
  actionIconButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#f9fafb",
    justifyContent: "center",
    alignItems: "center",
  },
  mobileCardsStream: {
    gap: 14,
  },
  mobileConfigCard: {
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
  cardHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  mobileIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#fef3f0",
    justifyContent: "center",
    alignItems: "center",
  },
  mobileCardCode: {
    fontSize: 12,
    fontWeight: "800",
    color: "#D95D29",
  },
  mobileCardName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 4,
  },
  mobileCardSubtext: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 12,
  },
  mobileStatsRow: {
    flexDirection: "row",
    gap: 16,
    marginTop: 4,
  },
  mobileStat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  mobileStatValue: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "500",
  },
  mobileTrend: {
    fontSize: 11,
    fontWeight: "700",
  },
  mobileSurgeText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#10b981",
  },
  pricingRulesLayout: {
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: 20,
  },
  rowLayout: {
    flexDirection: "row",
  },
  columnLayout: {
    flexDirection: "column",
  },
  pricingRuleCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 2,
    elevation: 1,
  },
  pricingCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  pricingIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#fef3f0",
    justifyContent: "center",
    alignItems: "center",
  },
  pricingStatusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    borderRadius: 20,
  },
  statusDotActive: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#10b981",
  },
  pricingStatusText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#10b981",
  },
  ruleBadgeId: {
    fontSize: 11,
    fontWeight: "800",
    color: "#D95D29",
    marginBottom: 8,
  },
  ruleTitleText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 6,
  },
  ruleDescText: {
    fontSize: 12,
    color: "#6b7280",
    lineHeight: 18,
    marginBottom: 16,
  },
  deltaValueBox: {
    borderRadius: 10,
    overflow: "hidden",
  },
  deltaGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 10,
  },
  deltaValueText: {
    color: "white",
    fontSize: 13,
    fontWeight: "800",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContentCard: {
    backgroundColor: "#FFFFFF",
    width: isWeb ? 500 : "100%",
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  modalGradientHeader: {
    padding: 24,
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
  modalBody: {
    padding: 24,
  },
  formGroup: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 8,
  },
  formInput: {
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: "#111111",
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  formRow: {
    flexDirection: "row",
    gap: 16,
  },
  modalFooter: {
    flexDirection: "row",
    gap: 12,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
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
  modalCancelText: {
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
  modalSaveText: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
  },
});
