import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo, useState } from "react";
import {
  Dimensions,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import AdminLayout from "../components/AdminLayout";

const { width, height } = Dimensions.get("window");
const isWeb = Platform.OS === "web" || width > 1024;

interface CategoryItem {
  code: string;
  name: string;
  types: string[];
  activeListings: number;
  priority: string; // 🔹 FIX: Changed to open string to match style dynamic evaluation loops
  trend: string;
  icon: string;
}

interface LocationItem {
  id: string;
  sector: string;
  city: string;
  listings: number;
  baseTaxRate: string;
  surgeMultiplier: string;
  growth: string;
  icon: string;
}

export default function CategoriesManagement() {
  const [activeSegment, setActiveSegment] = useState<
    "Categories" | "Locations"
  >("Categories");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"category" | "location">(
    "category",
  );

  // Advanced Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [trendFilter, setTrendFilter] = useState<
    "All" | "Positive" | "High Volume"
  >("All");

  const categoriesData: CategoryItem[] = [
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

  const locationsData: LocationItem[] = [
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

  // Advanced Filter Evaluation Loops
  const filteredCategories = useMemo(() => {
    return categoriesData.filter((cat) => {
      const matchesSearch =
        cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.code.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTrend =
        trendFilter === "All"
          ? true
          : trendFilter === "Positive"
            ? cat.trend.startsWith("+")
            : cat.activeListings >= 100;

      return matchesSearch && matchesTrend;
    });
  }, [searchQuery, trendFilter]);

  const filteredLocations = useMemo(() => {
    return locationsData.filter((loc) => {
      const matchesSearch =
        loc.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTrend =
        trendFilter === "All"
          ? true
          : trendFilter === "Positive"
            ? loc.growth.startsWith("+")
            : loc.listings >= 100;

      return matchesSearch && matchesTrend;
    });
  }, [searchQuery, trendFilter]);

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
            <View style={{ flex: isWeb ? undefined : 1 }}>
              <Text style={styles.mainTitleText}>System Configuration</Text>
              <Text style={styles.subtitleText}>
                Manage property classifications and regional operational zones
              </Text>
            </View>
          </View>
        </View>

        {/* Segmented Tabs */}
        <View
          style={isWeb ? styles.segmentedTabRow : styles.segmentedTabRowMobile}
        >
          {(["Categories", "Locations"] as const).map((segment) => (
            <TouchableOpacity
              key={segment}
              style={[
                isWeb ? styles.segmentBtn : styles.segmentBtnMobile,
                activeSegment === segment && styles.segmentBtnActive,
              ]}
              onPress={() => {
                setActiveSegment(segment);
                setSearchQuery("");
              }}
            >
              <LinearGradient
                colors={
                  activeSegment === segment
                    ? ["#D95D29", "#c04e21"]
                    : ["transparent", "transparent"]
                }
                style={
                  isWeb ? styles.segmentGradient : styles.segmentGradientMobile
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Ionicons
                  name={segment === "Categories" ? "grid" : "location"}
                  size={16}
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

        {/* Filter Toolbar Shelf */}
        <View style={styles.filterShelfCard}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={18} color="#9ca3af" />
            <TextInput
              style={styles.searchInput}
              placeholder={`Search across active ${activeSegment.toLowerCase()}...`}
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

          <View style={styles.filterInlineRow}>
            <Text style={styles.filterShelfLabel}>Growth/Volume:</Text>
            <View style={styles.filterGroup}>
              {(["All", "Positive", "High Volume"] as const).map((mode) => (
                <TouchableOpacity
                  key={mode}
                  style={[
                    styles.chipButton,
                    trendFilter === mode && styles.chipActive,
                  ]}
                  onPress={() => setTrendFilter(mode)}
                >
                  <Text
                    style={[
                      styles.chipText,
                      trendFilter === mode && styles.chipTextActive,
                    ]}
                  >
                    {mode}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Content Section */}
        <View
          style={
            isWeb ? styles.ledgerWrapperCard : styles.mobileLedgerContainer
          }
        >
          {/* Categories Segment Layout view */}
          {activeSegment === "Categories" && (
            <View>
              <View style={styles.sectionHeaderRow}>
                <View>
                  <Text style={styles.ledgerHeading}>Property Sectors</Text>
                  <Text style={styles.ledgerSubheading}>
                    {filteredCategories.length} classifications shown
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
                    <Text style={[styles.thCell, { width: "20%" }]}>
                      Category
                    </Text>
                    <Text style={[styles.thCell, { width: "33%" }]}>
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
                  {filteredCategories.map((cat) => (
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
                          width: "20%",
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <View style={styles.categoryIcon}>
                          <Ionicons
                            name={(cat.icon || "grid") as any}
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
                          { width: "33%", color: "#6b7280" },
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
                  {filteredCategories.map((cat) => (
                    <View key={cat.code} style={styles.mobileConfigCard}>
                      <View style={styles.cardHeaderRow}>
                        <View style={styles.cardHeaderLeft}>
                          <View style={styles.mobileIconContainer}>
                            <Ionicons
                              name={(cat.icon || "grid") as any}
                              size={16}
                              color="#D95D29"
                            />
                          </View>
                          <Text style={styles.mobileCardCode}>{cat.code}</Text>
                          <Text style={styles.mobileCardNameInline}>
                            {cat.name}
                          </Text>
                        </View>
                        <View
                          style={[
                            styles.priorityBadgeMobile,
                            {
                              backgroundColor: `${getPriorityColor(cat.priority)}15`,
                            },
                          ]}
                        >
                          <Text
                            style={[
                              styles.priorityTextMobile,
                              { color: getPriorityColor(cat.priority) },
                            ]}
                          >
                            {cat.priority}
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.mobileCardSubtext} numberOfLines={1}>
                        Types: {cat.types.join(", ")}
                      </Text>
                      <View style={styles.mobileStatsRow}>
                        <View style={styles.mobileStat}>
                          <Ionicons
                            name="home-outline"
                            size={12}
                            color="#6b7280"
                          />
                          <Text style={styles.mobileStatValue}>
                            {cat.activeListings} listings
                          </Text>
                        </View>
                        <View style={styles.mobileStat}>
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
                            {cat.trend} Activity
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>
          )}

          {/* Locations Segment Layout view */}
          {activeSegment === "Locations" && (
            <View>
              <View style={styles.sectionHeaderRow}>
                <View>
                  <Text style={styles.ledgerHeading}>Operational Zones</Text>
                  <Text style={styles.ledgerSubheading}>
                    {filteredLocations.length} regional sectors mapped
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
                  {filteredLocations.map((loc) => (
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
                          name="location-outline"
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
                  {filteredLocations.map((loc) => (
                    <View key={loc.id} style={styles.mobileConfigCard}>
                      <View style={styles.cardHeaderRow}>
                        <View style={styles.cardHeaderLeft}>
                          <View style={styles.mobileIconContainer}>
                            <Ionicons
                              name="location"
                              size={16}
                              color="#D95D29"
                            />
                          </View>
                          <Text style={styles.mobileCardCode}>{loc.id}</Text>
                          <Text style={styles.mobileCardNameInline}>
                            {loc.sector}
                          </Text>
                        </View>
                        <Text style={styles.mobileSurgeText}>
                          {loc.surgeMultiplier}
                        </Text>
                      </View>
                      <Text style={styles.mobileCardSubtext}>{loc.city}</Text>
                      <View style={styles.mobileStatsRow}>
                        <View style={styles.mobileStat}>
                          <Ionicons
                            name="home-outline"
                            size={12}
                            color="#6b7280"
                          />
                          <Text style={styles.mobileStatValue}>
                            {loc.listings} units
                          </Text>
                        </View>
                        <View style={styles.mobileStat}>
                          <Ionicons
                            name="cash-outline"
                            size={12}
                            color="#6b7280"
                          />
                          <Text style={styles.mobileStatValue}>
                            Tax Rate: {loc.baseTaxRate}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Add Item Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isAddModalOpen}
        onRequestClose={() => setIsAddModalOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={() => setIsAddModalOpen(false)}>
            <View style={StyleSheet.absoluteFillObject} />
          </TouchableWithoutFeedback>

          <View
            style={[styles.modalContentCard, { width: isWeb ? 500 : "92%" }]}
          >
            <LinearGradient
              colors={["#D95D29", "#c04e21"]}
              style={styles.modalGradientHeader}
            >
              <View style={styles.modalHeaderRow}>
                <Text style={styles.modalHeadingTitle}>
                  Add New {modalType === "category" ? "Category" : "Location"}
                </Text>
                <TouchableOpacity onPress={() => setIsAddModalOpen(false)}>
                  <Ionicons name="close" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </LinearGradient>

            <ScrollView
              style={styles.modalFormScroll}
              contentContainerStyle={styles.modalFormScrollContent}
              showsVerticalScrollIndicator={true}
              keyboardShouldPersistTaps="handled"
            >
              {modalType === "category" && (
                <>
                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Category Name</Text>
                    <TextInput
                      style={styles.formInput}
                      placeholder="e.g., Residential"
                      placeholderTextColor="#9ca3af"
                    />
                  </View>
                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Category Code</Text>
                    <TextInput
                      style={styles.formInput}
                      placeholder="e.g., CAT-RES"
                      placeholderTextColor="#9ca3af"
                    />
                  </View>
                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Property Types</Text>
                    <TextInput
                      style={styles.formInput}
                      placeholder="e.g., Villa, Apartment"
                      placeholderTextColor="#9ca3af"
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
                      placeholderTextColor="#9ca3af"
                    />
                  </View>
                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>City</Text>
                    <TextInput
                      style={styles.formInput}
                      placeholder="e.g., Hyderabad"
                      placeholderTextColor="#9ca3af"
                    />
                  </View>
                  <View style={styles.formRow}>
                    <View style={[styles.formGroup, { flex: 1 }]}>
                      <Text style={styles.formLabel}>Tax Rate</Text>
                      <TextInput
                        style={styles.formInput}
                        placeholder="e.g., 2.4%"
                        placeholderTextColor="#9ca3af"
                      />
                    </View>
                    <View style={[styles.formGroup, { flex: 1 }]}>
                      <Text style={styles.formLabel}>Surge Multiplier</Text>
                      <TextInput
                        style={styles.formInput}
                        placeholder="e.g., x1.25"
                        placeholderTextColor="#9ca3af"
                      />
                    </View>
                  </View>
                </>
              )}
            </ScrollView>

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
        </View>
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
    marginBottom: isWeb ? 24 : 16,
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
  segmentedTabRow: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    padding: 4,
    borderRadius: 14,
    marginBottom: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  segmentedTabRowMobile: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    padding: 4,
    borderRadius: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  segmentBtn: {
    flex: 1,
    borderRadius: 10,
    overflow: "hidden",
  },
  segmentBtnMobile: {
    flex: 1,
    borderRadius: 8,
    overflow: "hidden",
  },
  segmentGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
  },
  segmentGradientMobile: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 8,
  },
  segmentBtnActive: {
    ...Platform.select({
      web: { boxShadow: "0px 2px 4px rgba(217, 93, 41, 0.2)" },
      default: { elevation: 2 },
    }),
  },
  segmentBtnText: {
    fontSize: isWeb ? 14 : 12,
    color: "#6b7280",
    fontWeight: "600",
  },
  segmentBtnTextActive: {
    color: "white",
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
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  ledgerHeading: {
    fontSize: isWeb ? 18 : 16,
    fontWeight: "800",
    color: "#111111",
  },
  ledgerSubheading: {
    fontSize: 12,
    color: "#6b7280",
  },
  accentActionButton: {
    borderRadius: 8,
    overflow: "hidden",
  },
  addButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  btnActionText: {
    color: "white",
    fontSize: 12,
    fontWeight: "700",
  },
  horizontalDivider: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginVertical: isWeb ? 20 : 12,
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
  priorityBadgeMobile: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
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
  priorityTextMobile: {
    fontSize: 10,
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
    gap: 10,
    marginTop: 8,
  },
  mobileConfigCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 12,
  },
  // 🔹 FIX: Added missing dynamic style keys mapping
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  cardHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  mobileIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: "#fef3f0",
    justifyContent: "center",
    alignItems: "center",
  },
  mobileCardCode: {
    fontSize: 11.5,
    fontWeight: "800",
    color: "#D95D29",
  },
  mobileCardNameInline: {
    fontSize: 13.5,
    fontWeight: "700",
    color: "#111111",
  },
  mobileCardSubtext: {
    fontSize: 11.5,
    color: "#6b7280",
    marginBottom: 8,
    paddingLeft: 2,
  },
  mobileStatsRow: {
    flexDirection: "row",
    gap: 14,
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
    paddingTop: 8,
  },
  mobileStat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  mobileStatValue: {
    fontSize: 11.5,
    color: "#6b7280",
    fontWeight: "500",
  },
  mobileTrend: {
    fontSize: 11.5,
    fontWeight: "600",
  },
  mobileSurgeText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#10b981",
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
  modalFormScroll: {
    flex: undefined,
    maxHeight: height * 0.55,
  },
  modalFormScrollContent: {
    padding: 20,
    paddingBottom: 10,
  },
  formGroup: {
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 6,
  },
  formInput: {
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingHorizontal: 14,
    height: 46,
    fontSize: 14,
    color: "#111111",
    padding: 0,
    width: "100%",
  },
  formRow: {
    flexDirection: "row",
    gap: 16,
  },
  modalFooter: {
    flexDirection: "row",
    gap: 12,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    backgroundColor: "#ffffff",
  },
  modalCancelButton: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCancelText: {
    fontSize: 13.5,
    fontWeight: "600",
    color: "#6b7280",
  },
  modalSaveButton: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    overflow: "hidden",
  },
  modalSaveGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalSaveText: {
    color: "white",
    fontSize: 13.5,
    fontWeight: "700",
  },
  filterShelfCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginBottom: 16,
    gap: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
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
  filterInlineRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 2,
  },
  filterShelfLabel: {
    fontSize: 12.5,
    fontWeight: "700",
    color: "#4b5563",
  },
  filterGroup: {
    flexDirection: "row",
    gap: 6,
  },
  chipButton: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
    backgroundColor: "#f3f4f6",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  chipActive: {
    backgroundColor: "#111111",
    borderColor: "#111111",
  },
  chipText: {
    fontSize: 11.5,
    fontWeight: "600",
    color: "#4b5563",
  },
  chipTextActive: {
    color: "#FFFFFF",
  },
});
