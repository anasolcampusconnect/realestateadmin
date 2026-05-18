import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import {
    Dimensions,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import AdminLayout from "../components/AdminLayout";

const { width } = Dimensions.get("window");
const isWeb = Platform.OS === "web" || width > 1024;

export default function RealEstateDashboard() {
  const monthlyRevenueData = [
    { month: "Jan", lastMonth: 820000, runningMonth: 480000 },
    { month: "Feb", lastMonth: 710000, runningMonth: 380000 },
    { month: "Mar", lastMonth: 780000, runningMonth: 540000 },
    { month: "Apr", lastMonth: 390000, runningMonth: 440000 },
    { month: "May", lastMonth: 640000, runningMonth: 190000 },
    { month: "Jun", lastMonth: 760000, runningMonth: 600000 },
    { month: "Jul", lastMonth: 410000, runningMonth: 270000 },
  ];

  // Two detailed listings for the board
  const listings = [
    {
      id: 1,
      title: "Villa in Cooper Square",
      location: "New York, NY",
      price: "$2,568,000",
      beds: 6,
      baths: 4,
      sqft: 5200,
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80",
      type: "Luxury Villa",
      status: "Hot Deal",
      agent: "Sarah Johnson",
      rating: 4.9,
    },
    {
      id: 2,
      title: "Beachfront Paradise",
      location: "Malibu, CA",
      price: "$3,890,000",
      beds: 5,
      baths: 6,
      sqft: 4800,
      image:
        "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=600&q=80",
      type: "Ocean View",
      status: "New Listing",
      agent: "Michael Chen",
      rating: 5.0,
    },
  ];

  const activities = [
    {
      id: 1,
      user: "Sarah Johnson",
      action: "Purchased",
      property: "Sunset Villa",
      amount: "$2.5M",
      time: "2 min ago",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      id: 2,
      user: "Michael Chen",
      action: "Listed",
      property: "Downtown Loft",
      amount: "$890K",
      time: "15 min ago",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      id: 3,
      user: "Emma Davis",
      action: "Booked",
      property: "Beachfront Resort",
      amount: "$1.2M",
      time: "1 hour ago",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    },
  ];

  return (
    <AdminLayout currentPageLabel="Dashboard">
      <ScrollView
        style={styles.mainScroll}
        contentContainerStyle={styles.scrollContentLayout}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.contentLayout,
            isWeb ? styles.rowLayout : styles.columnLayout,
          ]}
        >
          {/* Left Container */}
          <View
            style={[
              styles.analyticsContainer,
              isWeb ? { width: "68%" } : { width: "100%" },
            ]}
          >
            {/* Stats Grid - Modern Gradient Cards */}
            <View style={styles.statsGrid}>
              <LinearGradient
                colors={["#667eea", "#764ba2"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.statGradientCard}
              >
                <View style={styles.statIconContainer}>
                  <Ionicons name="business-outline" size={24} color="white" />
                </View>
                <Text style={styles.statGradientLabel}>Completed Deals</Text>
                <Text style={styles.statGradientValue}>6,825</Text>
                <Text style={styles.statTrend}>↑ 23.5% vs last month</Text>
              </LinearGradient>

              <LinearGradient
                colors={["#f093fb", "#f5576c"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.statGradientCard}
              >
                <View style={styles.statIconContainer}>
                  <Ionicons name="eye-outline" size={24} color="white" />
                </View>
                <Text style={styles.statGradientLabel}>Property Viewers</Text>
                <Text style={styles.statGradientValue}>45.6%</Text>
                <Text style={styles.statTrend}>↑ 12.1% conversion</Text>
              </LinearGradient>

              <LinearGradient
                colors={["#4facfe", "#00f2fe"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.statGradientCard}
              >
                <View style={styles.statIconContainer}>
                  <Ionicons name="people-outline" size={24} color="white" />
                </View>
                <Text style={styles.statGradientLabel}>Total Agents</Text>
                <Text style={styles.statGradientValue}>265</Text>
                <Text style={styles.statTrend}>+12 new this month</Text>
              </LinearGradient>

              <LinearGradient
                colors={["#fa709a", "#fee140"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.statGradientCard}
              >
                <View style={styles.statIconContainer}>
                  <Ionicons name="home-outline" size={24} color="white" />
                </View>
                <Text style={styles.statGradientLabel}>Total Projects</Text>
                <Text style={styles.statGradientValue}>356</Text>
                <Text style={styles.statTrend}>18 active developments</Text>
              </LinearGradient>
            </View>

            {/* Featured Property */}
            <View style={styles.featuredCard}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
                }}
                style={styles.featuredImage}
                resizeMode="cover"
              />
              <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.9)"]}
                style={styles.featuredOverlay}
              >
                <Text style={styles.featuredBadge}>FEATURED PROPERTY</Text>
                <Text style={styles.featuredTitle}>
                  Luxury Waterfront Estate
                </Text>
                <Text style={styles.featuredPrice}>$4,250,000</Text>
                <View style={styles.featuredSpecs}>
                  <View style={styles.specItem}>
                    <Ionicons name="bed-outline" size={16} color="#FFD700" />
                    <Text style={styles.specText}>6 Beds</Text>
                  </View>
                  <View style={styles.specItem}>
                    <Ionicons name="water-outline" size={16} color="#FFD700" />
                    <Text style={styles.specText}>4 Baths</Text>
                  </View>
                  <View style={styles.specItem}>
                    <Ionicons name="resize-outline" size={16} color="#FFD700" />
                    <Text style={styles.specText}>5,200 sqft</Text>
                  </View>
                </View>
              </LinearGradient>
            </View>

            {/* Revenue Chart - Enhanced */}
            <View style={styles.chartWrapperCard}>
              <View style={styles.chartHeaderRow}>
                <View>
                  <Text style={styles.chartTitle}>Revenue Overview</Text>
                  <Text style={styles.chartValue}>
                    $236,528 <Text style={styles.deltaGreen}>↑ 12.5%</Text>
                  </Text>
                  <Text style={styles.chartSubtitle}>vs previous period</Text>
                </View>
                <View style={styles.chartActions}>
                  <TouchableOpacity style={styles.chartButton}>
                    <Text style={styles.chartButtonText}>Week</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.chartButton, styles.chartButtonActive]}
                  >
                    <Text
                      style={[
                        styles.chartButtonText,
                        styles.chartButtonTextActive,
                      ]}
                    >
                      Month
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.chartButton}>
                    <Text style={styles.chartButtonText}>Year</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.barGraphVisualArea}>
                {monthlyRevenueData.map((data, idx) => (
                  <View key={idx} style={styles.graphColumn}>
                    <View style={styles.barsContainerContainer}>
                      <View
                        style={[
                          styles.graphBar,
                          {
                            height: (data.lastMonth / 900000) * 140,
                            backgroundColor: "#D95D29",
                          },
                        ]}
                      />
                      <View
                        style={[
                          styles.graphBar,
                          {
                            height: (data.runningMonth / 900000) * 140,
                            backgroundColor: "#2C2C2C",
                          },
                        ]}
                      />
                    </View>
                    <Text style={styles.graphAxisLabel}>{data.month}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.legendRow}>
                <View style={styles.legendItem}>
                  <View
                    style={[
                      styles.legendIndicator,
                      { backgroundColor: "#D95D29" },
                    ]}
                  />
                  <Text style={styles.legendText}>Last Month</Text>
                </View>
                <View style={styles.legendItem}>
                  <View
                    style={[
                      styles.legendIndicator,
                      { backgroundColor: "#2C2C2C" },
                    ]}
                  />
                  <Text style={styles.legendText}>Current Month</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Right Sidebar - Enhanced with 2 Detailed Listings */}
          <View
            style={[
              styles.listingBoardColumn,
              isWeb ? { width: "29%" } : { width: "100%" },
            ]}
          >
            <View style={styles.sidebarHeader}>
              <Text style={styles.boardHeading}>Listing Board</Text>
              <TouchableOpacity onPress={() => router.push("/properties")}>
                <Text style={styles.viewAllText}>View All (12)</Text>
              </TouchableOpacity>
            </View>

            {/* Two Detailed Listings */}
            {listings.map((listing) => (
              <TouchableOpacity key={listing.id} style={styles.listingCard}>
                <View style={styles.listingImageContainer}>
                  <Image
                    source={{ uri: listing.image }}
                    style={styles.listingImage}
                  />
                  <View style={styles.listingStatusBadge}>
                    <Text style={styles.listingStatusText}>
                      {listing.status}
                    </Text>
                  </View>
                  <View style={styles.listingRatingBadge}>
                    <Ionicons name="star" size={12} color="#FFD700" />
                    <Text style={styles.listingRatingText}>
                      {listing.rating}
                    </Text>
                  </View>
                </View>

                <View style={styles.listingBody}>
                  <View style={styles.listingHeader}>
                    <Text style={styles.listingPrice}>{listing.price}</Text>
                    <TouchableOpacity style={styles.listingFavorite}>
                      <Ionicons
                        name="heart-outline"
                        size={18}
                        color="#D95D29"
                      />
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.listingTitle}>{listing.title}</Text>
                  <View style={styles.listingLocation}>
                    <Ionicons name="location-outline" size={12} color="#999" />
                    <Text style={styles.listingLocationText}>
                      {listing.location}
                    </Text>
                  </View>

                  <View style={styles.listingSpecs}>
                    <View style={styles.listingSpec}>
                      <Ionicons name="bed-outline" size={14} color="#666" />
                      <Text style={styles.listingSpecText}>
                        {listing.beds} beds
                      </Text>
                    </View>
                    <View style={styles.listingSpec}>
                      <Ionicons name="water-outline" size={14} color="#666" />
                      <Text style={styles.listingSpecText}>
                        {listing.baths} baths
                      </Text>
                    </View>
                    <View style={styles.listingSpec}>
                      <Ionicons name="resize-outline" size={14} color="#666" />
                      <Text style={styles.listingSpecText}>
                        {listing.sqft} sqft
                      </Text>
                    </View>
                  </View>

                  <View style={styles.listingAgent}>
                    <View style={styles.listingAgentInfo}>
                      <Ionicons
                        name="person-circle-outline"
                        size={16}
                        color="#D95D29"
                      />
                      <Text style={styles.listingAgentName}>
                        {listing.agent}
                      </Text>
                    </View>
                    <Text style={styles.listingType}>{listing.type}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}

            <View style={styles.divider} />

            <Text style={styles.sidebarSubheading}>Recent Activity</Text>

            {activities.map((activity) => (
              <View key={activity.id} style={styles.activityItem}>
                <Image
                  source={{ uri: activity.avatar }}
                  style={styles.activityAvatar}
                />
                <View style={styles.activityContent}>
                  <Text style={styles.activityText}>
                    <Text style={styles.activityUser}>{activity.user}</Text>{" "}
                    {activity.action}{" "}
                    <Text style={styles.activityProperty}>
                      {activity.property}
                    </Text>
                  </Text>
                  <Text style={styles.activityAmount}>{activity.amount}</Text>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
              </View>
            ))}

            <TouchableOpacity style={styles.viewMoreButton}>
              <Text style={styles.viewMoreText}>View All Activity</Text>
              <Ionicons name="arrow-forward" size={14} color="#D95D29" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Enhanced Footer */}
        <LinearGradient
          colors={["#1a1a2e", "#16213e"]}
          style={styles.dashboardFooter}
        >
          <View style={styles.footerPrimaryRow}>
            <View>
              <Text style={styles.footerBrandTitle}>
                🏢 Spacezant Systems Console
              </Text>
              <Text style={styles.footerTagline}>
                Enterprise Real Estate Management
              </Text>
            </View>
            <View style={styles.footerLinks}>
              <Text style={styles.footerLink}>About</Text>
              <Text style={styles.footerLink}>Privacy</Text>
              <Text style={styles.footerLink}>Terms</Text>
              <Text style={styles.footerLink}>Support</Text>
            </View>
          </View>
          <View style={styles.footerHorizontalLine} />
          <View style={styles.footerMetadataRow}>
            <Text style={styles.footerSecurityStatus}>
              🔒 SSL Encrypted | Secure Pipeline Active
            </Text>
            <Text style={styles.footerCopyright}>
              © 2026 Spacezant • All Rights Reserved
            </Text>
          </View>
        </LinearGradient>
      </ScrollView>
    </AdminLayout>
  );
}

const styles = StyleSheet.create({
  mainScroll: { flex: 1, backgroundColor: "#f8f9fa" },
  scrollContentLayout: { flexGrow: 1, justifyContent: "space-between" },
  contentLayout: { padding: 24, justifyContent: "space-between", gap: 24 },
  rowLayout: { flexDirection: "row" },
  columnLayout: { flexDirection: "column" },
  analyticsContainer: { gap: 24 },

  // Stats Grid
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    justifyContent: "space-between",
  },
  statGradientCard: {
    flex: 1,
    minWidth: Platform.OS === "web" ? "22%" : "45%",
    padding: 20,
    borderRadius: 20,
    overflow: "hidden",
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  statGradientLabel: {
    fontSize: 13,
    color: "rgba(255,255,255,0.8)",
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  statGradientValue: {
    fontSize: 28,
    fontWeight: "900",
    color: "white",
    marginTop: 4,
  },
  statTrend: {
    fontSize: 11,
    color: "rgba(255,255,255,0.7)",
    marginTop: 8,
  },

  // Featured Property
  featuredCard: {
    borderRadius: 20,
    overflow: "hidden",
    height: 280,
    position: "relative",
  },
  featuredImage: {
    width: "100%",
    height: "100%",
  },
  featuredOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  featuredBadge: {
    color: "#FFD700",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 8,
  },
  featuredTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 4,
  },
  featuredPrice: {
    color: "#FFD700",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 12,
  },
  featuredSpecs: {
    flexDirection: "row",
    gap: 16,
  },
  specItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  specText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },

  // Chart
  chartWrapperCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  chartHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
    flexWrap: "wrap",
    gap: 12,
  },
  chartTitle: {
    fontSize: 14,
    color: "#666",
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  chartValue: {
    fontSize: 32,
    fontWeight: "900",
    color: "#111111",
    marginTop: 4,
  },
  chartSubtitle: {
    fontSize: 11,
    color: "#999",
    marginTop: 2,
  },
  deltaGreen: { fontSize: 14, color: "#10b981", fontWeight: "700" },
  chartActions: {
    flexDirection: "row",
    gap: 8,
  },
  chartButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
  },
  chartButtonActive: {
    backgroundColor: "#D95D29",
  },
  chartButtonText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "600",
  },
  chartButtonTextActive: {
    color: "white",
  },
  legendRow: {
    flexDirection: "row",
    gap: 24,
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 8 },
  legendIndicator: { width: 12, height: 12, borderRadius: 6 },
  legendText: { fontSize: 12, color: "#888", fontWeight: "600" },
  barGraphVisualArea: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 170,
    paddingTop: 10,
  },
  graphColumn: { alignItems: "center", flex: 1 },
  barsContainerContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 6,
    height: 140,
    marginBottom: 8,
  },
  graphBar: { width: 10, borderRadius: 6 },
  graphAxisLabel: {
    fontSize: 11,
    color: "#999",
    fontWeight: "700",
    marginTop: 4,
  },

  // Listing Board with 2 Detailed Cards
  listingBoardColumn: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    gap: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  sidebarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  boardHeading: {
    fontSize: 18,
    fontWeight: "900",
    color: "#111111",
  },
  viewAllText: {
    fontSize: 12,
    color: "#D95D29",
    fontWeight: "600",
  },

  // Enhanced Listing Card
  listingCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#f0f0f0",
    marginBottom: 4,
  },
  listingImageContainer: {
    position: "relative",
    height: 160,
  },
  listingImage: {
    width: "100%",
    height: "100%",
  },
  listingStatusBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "#D95D29",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  listingStatusText: {
    color: "white",
    fontSize: 10,
    fontWeight: "700",
  },
  listingRatingBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(0,0,0,0.7)",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  listingRatingText: {
    color: "white",
    fontSize: 11,
    fontWeight: "600",
  },
  listingBody: {
    padding: 14,
  },
  listingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  listingPrice: {
    fontSize: 20,
    fontWeight: "900",
    color: "#D95D29",
  },
  listingFavorite: {
    padding: 4,
  },
  listingTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111",
    marginBottom: 4,
  },
  listingLocation: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 12,
  },
  listingLocationText: {
    fontSize: 11,
    color: "#999",
  },
  listingSpecs: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#f5f5f5",
  },
  listingSpec: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  listingSpecText: {
    fontSize: 11,
    color: "#666",
    fontWeight: "500",
  },
  listingAgent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#f5f5f5",
  },
  listingAgentInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  listingAgentName: {
    fontSize: 11,
    color: "#D95D29",
    fontWeight: "600",
  },
  listingType: {
    fontSize: 10,
    color: "#999",
    fontWeight: "600",
    textTransform: "uppercase",
  },

  divider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginVertical: 4,
  },
  sidebarSubheading: {
    fontSize: 14,
    fontWeight: "800",
    color: "#333",
    marginBottom: 8,
  },
  activityItem: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  activityAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 12,
    color: "#333",
  },
  activityUser: {
    fontWeight: "800",
    color: "#000",
  },
  activityProperty: {
    fontWeight: "700",
    color: "#D95D29",
  },
  activityAmount: {
    fontSize: 11,
    fontWeight: "700",
    color: "#111",
    marginTop: 2,
  },
  activityTime: {
    fontSize: 9,
    color: "#999",
    marginTop: 2,
  },
  viewMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    backgroundColor: "#fafafa",
    borderRadius: 12,
    marginTop: 8,
  },
  viewMoreText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#D95D29",
  },

  // Footer
  dashboardFooter: {
    paddingHorizontal: 24,
    paddingVertical: 28,
    marginTop: 32,
    borderRadius: 16,
  },
  footerPrimaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 16,
  },
  footerBrandTitle: {
    color: "#94a3b8",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 4,
  },
  footerTagline: { color: "#475569", fontSize: 11, fontWeight: "500" },
  footerLinks: {
    flexDirection: "row",
    gap: 24,
  },
  footerLink: {
    color: "#64748b",
    fontSize: 12,
    fontWeight: "500",
  },
  footerHorizontalLine: {
    height: 1,
    backgroundColor: "#1e293b",
    marginVertical: 20,
  },
  footerMetadataRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 12,
  },
  footerSecurityStatus: { color: "#475569", fontSize: 11, fontWeight: "500" },
  footerCopyright: { color: "#334155", fontSize: 11, fontWeight: "500" },
});
