import React, { useState } from "react";
import {
    Dimensions,
    Image,
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

// Type definition for properties structures
interface PropertyItem {
  id: string;
  title: string;
  location: string;
  price: string;
  type: "Villa" | "Penthouse" | "Apartment" | "Commercial";
  status: "Approved" | "Pending" | "Rejected";
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  agent: string;
}

export default function PropertiesDirectory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTypeFilter, setActiveTypeFilter] = useState<string>("All");
  const [activeStatusFilter, setActiveStatusFilter] = useState<string>("All");

  // Premium cross-platform mockup datasets
  const propertiesData: PropertyItem[] = [
    {
      id: "PRP-4021",
      title: "Skyline Luxury Penthouse",
      location: "Kukatpally, Hyderabad",
      price: "$569,535.00",
      type: "Penthouse",
      status: "Approved",
      beds: 5,
      baths: 4,
      sqft: 5200,
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
      agent: "Steaven Grant",
    },
    {
      id: "PRP-8832",
      title: "Villa in Cooper Square",
      location: "Gachibowli, Hyderabad",
      price: "$236,528.00",
      type: "Villa",
      status: "Pending",
      beds: 6,
      baths: 4,
      sqft: 4800,
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80",
      agent: "Rohan Sharma",
    },
    {
      id: "PRP-1094",
      title: "Modernist Eco-Glass Cabin",
      location: "Jubilee Hills, Hyderabad",
      price: "$450,000.00",
      type: "Villa",
      status: "Approved",
      beds: 4,
      baths: 3,
      sqft: 4100,
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80",
      agent: "Ananya Iyer",
    },
    {
      id: "PRP-5521",
      title: "Vanguard Commercial Complex",
      location: "HITEC City, Hyderabad",
      price: "$1,240,000.00",
      type: "Commercial",
      status: "Rejected",
      beds: 0,
      baths: 12,
      sqft: 14500,
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
      agent: "Vikram Malhotra",
    },
    {
      id: "PRP-3029",
      title: "Serene Meadows Apartment",
      location: "Banjara Hills, Hyderabad",
      price: "185,000.00",
      type: "Apartment",
      status: "Pending",
      beds: 3,
      baths: 2,
      sqft: 1950,
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80",
      agent: "Sneha Reddy",
    },
  ];

  // Structural dynamic processing pipeline filters
  const filteredProperties = propertiesData.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType =
      activeTypeFilter === "All" || item.type === activeTypeFilter;
    const matchesStatus =
      activeStatusFilter === "All" || item.status === activeStatusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <AdminLayout currentPageLabel="Property Approvals">
      <ScrollView
        style={styles.windowContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* --- DASHBOARD SUB-HEADER BREADCRUMB --- */}
        <View style={styles.breadcrumbHeader}>
          <View>
            <Text style={styles.mainTitleText}>
              Real Estate Assets Pipeline
            </Text>
            <Text style={styles.subtitleText}>
              Manage, audit, and approve real estate listings across all
              sectors.
            </Text>
          </View>
          {isWeb && (
            <TouchableOpacity style={styles.addPropertyButton}>
              <Text style={styles.addBtnText}>＋ Add Direct Asset</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* --- REAL-TIME DATA QUERY FILTER SHELF --- */}
        <View style={styles.filterShelfCard}>
          <View style={styles.searchRow}>
            <TextInput
              style={styles.searchFieldInput}
              placeholder="Search listings by unique token id, title keyword, or location region..."
              placeholderTextColor="#888888"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <View style={styles.filterButtonsSplitRow}>
            {/* Category Type Filter List Segment */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterGroup}
            >
              {["All", "Villa", "Penthouse", "Apartment", "Commercial"].map(
                (type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.chipButton,
                      activeTypeFilter === type && styles.chipActive,
                    ]}
                    onPress={() => setActiveTypeFilter(type)}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        activeTypeFilter === type && styles.chipTextActive,
                      ]}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                ),
              )}
            </ScrollView>

            {/* Verification Lifecycle Status Filters */}
            <View style={styles.statusGroup}>
              {["All", "Approved", "Pending", "Rejected"].map((status) => (
                <TouchableOpacity
                  key={status}
                  style={[
                    styles.statusChip,
                    activeStatusFilter === status && styles.statusChipActive,
                  ]}
                  onPress={() => setActiveStatusFilter(status)}
                >
                  <Text
                    style={[
                      styles.statusChipText,
                      activeStatusFilter === status &&
                        styles.statusChipTextActive,
                    ]}
                  >
                    {status}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* --- RESPONSIVE DATA RENDERING MATRIX --- */}
        <View
          style={[
            styles.assetsGridContainer,
            isWeb ? styles.rowLayout : styles.columnLayout,
          ]}
        >
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <View
                key={property.id}
                style={[
                  styles.propertyCardFrame,
                  isWeb ? { width: "31.5%" } : { width: "100%" },
                ]}
              >
                {/* Media Block Anchor */}
                <View style={styles.cardImageContainer}>
                  <Image
                    source={{ uri: property.image }}
                    style={styles.assetVisualImage}
                  />
                  <View style={styles.floatingIdBadge}>
                    <Text style={styles.badgeIdText}>{property.id}</Text>
                  </View>
                  <View
                    style={[
                      styles.lifecycleBadge,
                      property.status === "Approved"
                        ? styles.badgeGreen
                        : property.status === "Pending"
                          ? styles.badgeOrange
                          : styles.badgeRed,
                    ]}
                  >
                    <Text style={styles.lifecycleStatusText}>
                      {property.status}
                    </Text>
                  </View>
                </View>

                {/* Text Description Segment Area */}
                <View style={styles.cardDetailsPortion}>
                  <Text style={styles.propertyPriceText}>{property.price}</Text>
                  <Text style={styles.propertyTitleText} numberOfLines={1}>
                    {property.title}
                  </Text>
                  <Text style={styles.propertyLocationText}>
                    {property.location}
                  </Text>

                  <View style={styles.structuralSpecsRow}>
                    <Text style={styles.specMetricElement}>
                      🛏️ {property.beds} Bed
                    </Text>
                    <Text style={styles.specMetricElement}>
                      🛁 {property.baths} Bath
                    </Text>
                    <Text style={styles.specMetricElement}>
                      📐 {property.sqft} sqft
                    </Text>
                  </View>

                  <View style={styles.horizontalCardLine} />

                  <View style={styles.cardActionFooterRow}>
                    <View>
                      <Text style={styles.agentSubLabel}>SUBMITTING AGENT</Text>
                      <Text style={styles.agentValueText}>
                        {property.agent}
                      </Text>
                    </View>
                    <TouchableOpacity style={styles.auditTriggerButton}>
                      <Text style={styles.auditBtnText}>Audit File</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyStateFallbackView}>
              <Text style={styles.fallbackPrimaryText}>
                No Real Estate Records Located
              </Text>
              <Text style={styles.fallbackSecondaryText}>
                Modify your filter strings to view listing logs.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </AdminLayout>
  );
}

const styles = StyleSheet.create({
  windowContainer: {
    flex: 1,
    backgroundColor: "#F3F3F3",
    padding: isWeb ? 32 : 16,
  },
  breadcrumbHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  addPropertyButton: {
    backgroundColor: "#D95D29",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addBtnText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 13,
  },
  filterShelfCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 24,
    gap: 16,
  },
  searchRow: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 14,
    height: 46,
    justifyContent: "center",
  },
  searchFieldInput: {
    fontSize: 14,
    color: "#111111",
  },
  filterButtonsSplitRow: {
    flexDirection: isWeb ? "row" : "column",
    justifyContent: "space-between",
    alignItems: isWeb ? "center" : "stretch",
    gap: 16,
  },
  filterGroup: {
    flexDirection: "row",
    gap: 8,
  },
  chipButton: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  chipActive: {
    backgroundColor: "#111111",
    borderColor: "#111111",
  },
  chipText: {
    fontSize: 12.5,
    fontWeight: "600",
    color: "#4B5563",
  },
  chipTextActive: {
    color: "#FFFFFF",
  },
  statusGroup: {
    flexDirection: "row",
    gap: 6,
    justifyContent: "flex-end",
  },
  statusChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  statusChipActive: {
    borderColor: "#D95D29",
    backgroundColor: "rgba(217, 93, 41, 0.05)",
  },
  statusChipText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
  },
  statusChipTextActive: {
    color: "#D95D29",
  },
  assetsGridContainer: {
    justifyContent: "flex-start",
    flexWrap: "wrap",
    gap: 24,
    paddingBottom: 60,
  },
  rowLayout: {
    flexDirection: "row",
  },
  columnLayout: {
    flexDirection: "column",
  },
  propertyCardFrame: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  cardImageContainer: {
    width: "100%",
    height: 200,
    position: "relative",
  },
  assetVisualImage: {
    width: "100%",
    height: "100%",
  },
  floatingIdBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "rgba(17, 17, 17, 0.75)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeIdText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },
  lifecycleBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeGreen: {
    backgroundColor: "#10B981",
  },
  badgeOrange: {
    backgroundColor: "#F59E0B",
  },
  badgeRed: {
    backgroundColor: "#EF4444",
  },
  lifecycleStatusText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  cardDetailsPortion: {
    padding: 18,
  },
  propertyPriceText: {
    fontSize: 20,
    fontWeight: "900",
    color: "#D95D29",
  },
  propertyTitleText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111111",
    marginTop: 6,
  },
  propertyLocationText: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
  structuralSpecsRow: {
    flexDirection: "row",
    gap: 14,
    marginTop: 14,
  },
  specMetricElement: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4B5563",
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  horizontalCardLine: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 14,
  },
  cardActionFooterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  agentSubLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#9CA3AF",
    letterSpacing: 0.3,
  },
  agentValueText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111111",
    marginTop: 1,
  },
  auditTriggerButton: {
    backgroundColor: "#111111",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
  },
  auditBtnText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  emptyStateFallbackView: {
    width: "100%",
    padding: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackPrimaryText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#374151",
  },
  fallbackSecondaryText: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
  },
});
