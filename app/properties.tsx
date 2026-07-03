import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
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
  const [selectedProperty, setSelectedProperty] = useState<PropertyItem | null>(
    null,
  );
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Success / Update Status Modal States
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [processedProperty, setProcessedProperty] =
    useState<PropertyItem | null>(null);

  // Form State for dynamic new listing configurations
  const [newProperty, setNewProperty] = useState({
    title: "",
    location: "",
    price: "",
    type: "Apartment" as "Villa" | "Penthouse" | "Apartment" | "Commercial",
    beds: "",
    baths: "",
    sqft: "",
    agent: "",
    image: "",
  });

  const [propertiesData, setPropertiesData] = useState<PropertyItem[]>([
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
      price: "$185,000.00",
      type: "Apartment",
      status: "Pending",
      beds: 3,
      baths: 2,
      sqft: 1950,
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80",
      agent: "Sneha Reddy",
    },
  ]);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "Approved":
        return {
          bg: "rgba(16, 185, 129, 0.12)",
          text: "#10b981",
          icon: "checkmark-circle",
          label: "Approved",
        };
      case "Pending":
        return {
          bg: "rgba(245, 158, 11, 0.12)",
          text: "#f59e0b",
          icon: "time",
          label: "Pending",
        };
      case "Rejected":
        return {
          bg: "rgba(239, 68, 68, 0.12)",
          text: "#ef4444",
          icon: "close-circle",
          label: "Rejected",
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
      case "Villa":
        return "home";
      case "Penthouse":
        return "business";
      case "Apartment":
        return "business";
      case "Commercial":
        return "storefront";
      default:
        return "home";
    }
  };

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

  const metrics = useMemo(() => {
    return {
      total: propertiesData.length,
      approved: propertiesData.filter((p) => p.status === "Approved").length,
      pending: propertiesData.filter((p) => p.status === "Pending").length,
      rejected: propertiesData.filter((p) => p.status === "Rejected").length,
      totalValue: "$2.68M",
    };
  }, [propertiesData]);

  const handleAudit = (property: PropertyItem) => {
    setSelectedProperty(property);
    setIsDetailModalOpen(true);
  };

  const handleApproveProperty = () => {
    if (!selectedProperty) return;

    setPropertiesData((prev) =>
      prev.map((p) =>
        p.id === selectedProperty.id ? { ...p, status: "Approved" } : p,
      ),
    );

    setProcessedProperty({ ...selectedProperty, status: "Approved" });
    setIsDetailModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  const handleRejectProperty = () => {
    if (!selectedProperty) return;

    setPropertiesData((prev) =>
      prev.map((p) =>
        p.id === selectedProperty.id ? { ...p, status: "Rejected" } : p,
      ),
    );

    setProcessedProperty({ ...selectedProperty, status: "Rejected" });
    setIsDetailModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Required",
        "Please allow camera roll access to upload property photos.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setNewProperty({ ...newProperty, image: result.assets[0].uri });
    }
  };

  const handleCreateProperty = () => {
    if (
      !newProperty.title.trim() ||
      !newProperty.location.trim() ||
      !newProperty.price.trim() ||
      !newProperty.agent.trim()
    ) {
      Alert.alert(
        "Error",
        "Please fill in all required operational profile fields.",
      );
      return;
    }

    const newId = `PRP-${Math.floor(Math.random() * 9000) + 1000}`;
    const defaultFallbackImage =
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80";

    const propertyToAdd: PropertyItem = {
      id: newId,
      title: newProperty.title,
      location: newProperty.location,
      price: newProperty.price.startsWith("$")
        ? newProperty.price
        : `$${newProperty.price}`,
      type: newProperty.type,
      status: "Pending",
      beds: parseInt(newProperty.beds) || 0,
      baths: parseInt(newProperty.baths) || 0,
      sqft: parseInt(newProperty.sqft) || 0,
      image: newProperty.image || defaultFallbackImage,
      agent: newProperty.agent,
    };

    setPropertiesData((prev) => [propertyToAdd, ...prev]);
    setIsAddModalOpen(false);

    setNewProperty({
      title: "",
      location: "",
      price: "",
      type: "Apartment",
      beds: "",
      baths: "",
      sqft: "",
      agent: "",
      image: "",
    });

    Alert.alert(
      "Success",
      `Property asset ${newId} has been queued for verification loops successfully.`,
    );
  };

  return (
    <AdminLayout currentPageLabel="Property Approvals">
      <ScrollView
        style={styles.windowContainer}
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
                <Ionicons name="business" size={24} color="white" />
              </LinearGradient>
            </View>
            <View style={{ flex: isWeb ? undefined : 1 }}>
              <Text style={styles.mainTitleText}>Properties Directory</Text>
              <Text style={styles.subtitleText}>
                Manage, audit, and approve real estate listings across all
                sectors
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.addPropertyButton}
            onPress={() => setIsAddModalOpen(true)}
          >
            <LinearGradient
              colors={["#D95D29", "#c04e21"]}
              style={styles.addButtonGradient}
            >
              <Ionicons name="add" size={18} color="white" />
              <Text style={styles.addBtnText}>Add Property</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Metrics Summary Row */}
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
                <Text style={styles.metricLabel}>Total Properties</Text>
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
                <Ionicons name="checkmark-circle" size={22} color="#10b981" />
              </View>
              <View>
                <Text style={styles.metricValue}>{metrics.approved}</Text>
                <Text style={styles.metricLabel}>Approved</Text>
              </View>
            </LinearGradient>
            <LinearGradient
              colors={["#ffffff", "#f9fafb"]}
              style={styles.metricCard}
            >
              <View
                style={[
                  styles.metricIcon,
                  { backgroundColor: "rgba(245, 158, 11, 0.1)" },
                ]}
              >
                <Ionicons name="time" size={22} color="#f59e0b" />
              </View>
              <View>
                <Text style={styles.metricValue}>{metrics.pending}</Text>
                <Text style={styles.metricLabel}>Pending Review</Text>
              </View>
            </LinearGradient>
            <LinearGradient
              colors={["#ffffff", "#f9fafb"]}
              style={styles.metricCard}
            >
              <View
                style={[
                  styles.metricIcon,
                  { backgroundColor: "rgba(239, 68, 68, 0.1)" },
                ]}
              >
                <Ionicons name="close-circle" size={22} color="#ef4444" />
              </View>
              <View>
                <Text style={styles.metricValue}>{metrics.rejected}</Text>
                <Text style={styles.metricLabel}>Rejected</Text>
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
                <Ionicons name="checkmark-circle" size={16} color="#10b981" />
              </View>
              <View>
                <Text style={styles.metricValueMobile}>{metrics.approved}</Text>
                <Text style={styles.metricLabelMobile}>Approved</Text>
              </View>
            </View>
            <View style={styles.metricCardMobile}>
              <View
                style={[
                  styles.metricIconMobile,
                  { backgroundColor: "rgba(245, 158, 11, 0.1)" },
                ]}
              >
                <Ionicons name="time" size={16} color="#f59e0b" />
              </View>
              <View>
                <Text style={styles.metricValueMobile}>{metrics.pending}</Text>
                <Text style={styles.metricLabelMobile}>Pending</Text>
              </View>
            </View>
            <View style={styles.metricCardMobile}>
              <View
                style={[
                  styles.metricIconMobile,
                  { backgroundColor: "rgba(239, 68, 68, 0.1)" },
                ]}
              >
                <Ionicons name="close-circle" size={16} color="#ef4444" />
              </View>
              <View>
                <Text style={styles.metricValueMobile}>{metrics.rejected}</Text>
                <Text style={styles.metricLabelMobile}>Rejected</Text>
              </View>
            </View>
          </ScrollView>
        )}

        {/* Enhanced Filter Section */}
        <View style={styles.filterShelfCard}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#9ca3af" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by ID, title, or location..."
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

          <View style={styles.filterRow}>
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
                    {type !== "All" && (
                      <Ionicons
                        name={getTypeIcon(type) as any}
                        size={12}
                        color={activeTypeFilter === type ? "white" : "#6b7280"}
                      />
                    )}
                    <Text
                      style={[
                        styles.chipText,
                        activeTypeFilter === type && styles.chipActive,
                      ]}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                ),
              )}
            </ScrollView>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.statusGroup}
            >
              {["All", "Approved", "Pending", "Rejected"].map((status) => {
                const statusConfig = getStatusConfig(status);
                return (
                  <TouchableOpacity
                    key={status}
                    style={[
                      styles.statusChip,
                      activeStatusFilter === status && styles.statusChipActive,
                      activeStatusFilter === status &&
                        status === "Approved" &&
                        styles.statusChipActiveApproved,
                      activeStatusFilter === status &&
                        status === "Pending" &&
                        styles.statusChipActivePending,
                      activeStatusFilter === status &&
                        status === "Rejected" &&
                        styles.statusChipActiveRejected,
                    ]}
                    onPress={() => setActiveStatusFilter(status)}
                  >
                    {status !== "All" && (
                      <Ionicons
                        name={statusConfig.icon as any}
                        size={10}
                        color={
                          activeStatusFilter === status
                            ? "white"
                            : statusConfig.text
                        }
                      />
                    )}
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
                );
              })}
            </ScrollView>
          </View>
        </View>

        {/* Properties Grid */}
        <View
          style={[
            styles.assetsGridContainer,
            isWeb ? styles.rowLayout : styles.columnLayout,
          ]}
        >
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => {
              const statusConfig = getStatusConfig(property.status);
              const typeIcon = getTypeIcon(property.type);
              return (
                <View
                  key={property.id}
                  style={[
                    styles.propertyCardFrame,
                    isWeb ? { width: "31.5%" } : { width: "100%" },
                  ]}
                >
                  <View style={styles.cardImageContainer}>
                    <Image
                      source={{ uri: property.image }}
                      style={styles.assetVisualImage}
                    />
                    <View style={styles.imageOverlay} />
                    <View style={styles.floatingIdBadge}>
                      <Ionicons name="pricetag" size={10} color="white" />
                      <Text style={styles.badgeIdText}>{property.id}</Text>
                    </View>
                    <View
                      style={[
                        styles.lifecycleBadge,
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
                          styles.lifecycleStatusText,
                          { color: statusConfig.text },
                        ]}
                      >
                        {statusConfig.label}
                      </Text>
                    </View>
                    <View style={styles.typeBadge}>
                      <Ionicons
                        name={typeIcon as any}
                        size={10}
                        color="white"
                      />
                      <Text style={styles.typeBadgeText}>{property.type}</Text>
                    </View>
                  </View>

                  <View style={styles.cardDetailsPortion}>
                    <View style={styles.priceRow}>
                      <Text style={styles.propertyPriceText}>
                        {property.price}
                      </Text>
                      <View style={styles.ratingBadge}>
                        <Ionicons name="star" size={12} color="#FFD700" />
                        <Text style={styles.ratingText}>4.8</Text>
                      </View>
                    </View>
                    <Text style={styles.propertyTitleText} numberOfLines={1}>
                      {property.title}
                    </Text>
                    <View style={styles.locationRow}>
                      <Ionicons name="location" size={12} color="#9ca3af" />
                      <Text
                        style={styles.propertyLocationText}
                        numberOfLines={1}
                      >
                        {property.location}
                      </Text>
                    </View>

                    <View style={styles.structuralSpecsRow}>
                      <View style={styles.specItem}>
                        <Ionicons name="bed" size={12} color="#D95D29" />
                        <Text style={styles.specMetricElement}>
                          {property.beds} Beds
                        </Text>
                      </View>
                      <View style={styles.specItem}>
                        <Ionicons name="water" size={12} color="#D95D29" />
                        <Text style={styles.specMetricElement}>
                          {property.baths} Baths
                        </Text>
                      </View>
                      <View style={styles.specItem}>
                        <Ionicons name="resize" size={12} color="#D95D29" />
                        <Text style={styles.specMetricElement}>
                          {property.sqft} sqft
                        </Text>
                      </View>
                    </View>

                    <View style={styles.horizontalCardLine} />

                    <View style={styles.cardActionFooterRow}>
                      <View style={styles.agentInfo}>
                        <View style={styles.agentAvatar}>
                          <Text style={styles.agentInitial}>
                            {property.agent.charAt(0)}
                          </Text>
                        </View>
                        <View
                          style={{ maxWidth: isWeb ? undefined : width * 0.35 }}
                        >
                          <Text style={styles.agentSubLabel}>
                            Listing Agent
                          </Text>
                          <Text style={styles.agentValueText} numberOfLines={1}>
                            {property.agent}
                          </Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        style={styles.auditTriggerButton}
                        onPress={() => handleAudit(property)}
                      >
                        <LinearGradient
                          colors={["#111111", "#1a1a2e"]}
                          style={styles.auditButtonGradient}
                        >
                          <Ionicons name="eye" size={14} color="white" />
                          <Text style={styles.auditBtnText}>Audit</Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })
          ) : (
            <View style={styles.emptyStateFallbackView}>
              <View style={styles.emptyStateIcon}>
                <Ionicons name="business" size={48} color="#d1d5db" />
              </View>
              <Text style={styles.fallbackPrimaryText}>
                No Properties Found
              </Text>
              <Text style={styles.fallbackSecondaryText}>
                Try adjusting your search or filter criteria
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Property Detail Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isDetailModalOpen}
        onRequestClose={() => setIsDetailModalOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={() => setIsDetailModalOpen(false)}>
            <View style={StyleSheet.absoluteFillObject} />
          </TouchableWithoutFeedback>

          <View
            style={[styles.modalContentCard, { width: isWeb ? 600 : "92%" }]}
          >
            <LinearGradient
              colors={["#D95D29", "#c04e21"]}
              style={styles.modalGradientHeader}
            >
              <View style={styles.modalHeaderRow}>
                <Text style={styles.modalHeadingTitle}>Property Details</Text>
                <TouchableOpacity onPress={() => setIsDetailModalOpen(false)}>
                  <Ionicons name="close" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </LinearGradient>

            {selectedProperty && (
              <ScrollView
                style={styles.modalBody}
                showsVerticalScrollIndicator={true}
              >
                <Image
                  source={{ uri: selectedProperty.image }}
                  style={styles.modalImage}
                />

                <View style={styles.modalContentInner}>
                  <View style={styles.modalHeaderInfo}>
                    <View style={{ flex: 1, paddingRight: 8 }}>
                      <Text style={styles.modalPropertyTitle}>
                        {selectedProperty.title}
                      </Text>
                      <View style={styles.modalLocationRow}>
                        <Ionicons name="location" size={14} color="#9ca3af" />
                        <Text style={styles.modalLocation}>
                          {selectedProperty.location}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.modalPrice}>
                      {selectedProperty.price}
                    </Text>
                  </View>

                  <View style={styles.modalDivider} />

                  <View style={styles.modalSection}>
                    <Text style={styles.modalSectionTitle}>
                      Property Details
                    </Text>
                    <View style={styles.modalSpecsGrid}>
                      <View style={styles.modalSpecItem}>
                        <Ionicons name="bed" size={18} color="#D95D29" />
                        <Text style={styles.modalSpecLabel}>Bedrooms</Text>
                        <Text style={styles.modalSpecValue}>
                          {selectedProperty.beds}
                        </Text>
                      </View>
                      <View style={styles.modalSpecItem}>
                        <Ionicons name="water" size={18} color="#D95D29" />
                        <Text style={styles.modalSpecLabel}>Bathrooms</Text>
                        <Text style={styles.modalSpecValue}>
                          {selectedProperty.baths}
                        </Text>
                      </View>
                      <View style={styles.modalSpecItem}>
                        <Ionicons name="resize" size={18} color="#D95D29" />
                        <Text style={styles.modalSpecLabel}>Area</Text>
                        <Text style={styles.modalSpecValue}>
                          {selectedProperty.sqft} sqft
                        </Text>
                      </View>
                      <View style={styles.modalSpecItem}>
                        <Ionicons name="pricetag" size={18} color="#D95D29" />
                        <Text style={styles.modalSpecLabel}>Property ID</Text>
                        <Text style={styles.modalSpecValue}>
                          {selectedProperty.id}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.modalSection}>
                    <Text style={styles.modalSectionTitle}>
                      Agent Information
                    </Text>
                    <View style={styles.modalAgentCard}>
                      <View style={styles.modalAgentAvatar}>
                        <Text style={styles.modalAgentInitial}>
                          {selectedProperty.agent.charAt(0)}
                        </Text>
                      </View>
                      <View>
                        <Text style={styles.modalAgentName}>
                          {selectedProperty.agent}
                        </Text>
                        <Text style={styles.modalAgentRole}>Listing Agent</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.modalSection}>
                    <Text style={styles.modalSectionTitle}>
                      Verification Status
                    </Text>
                    <View
                      style={[
                        styles.modalStatusBadge,
                        {
                          backgroundColor: getStatusConfig(
                            selectedProperty.status,
                          ).bg,
                          alignSelf: "flex-start",
                        },
                      ]}
                    >
                      <Ionicons
                        name={
                          getStatusConfig(selectedProperty.status).icon as any
                        }
                        size={14}
                        color={getStatusConfig(selectedProperty.status).text}
                      />
                      <Text
                        style={[
                          styles.modalStatusText,
                          {
                            color: getStatusConfig(selectedProperty.status)
                              .text,
                          },
                        ]}
                      >
                        {getStatusConfig(selectedProperty.status).label}
                      </Text>
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

              {/* Reject Button */}
              <TouchableOpacity
                style={[styles.modalActionButton, { marginRight: 8 }]}
                onPress={handleRejectProperty}
              >
                <LinearGradient
                  colors={["#ef4444", "#dc2626"]}
                  style={styles.modalActionGradient}
                >
                  <Text style={styles.modalActionText}>Reject</Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* Approved Button */}
              <TouchableOpacity
                style={styles.modalActionButton}
                onPress={handleApproveProperty}
              >
                <LinearGradient
                  colors={["#10b981", "#059669"]}
                  style={styles.modalActionGradient}
                >
                  <Text style={styles.modalActionText}>Approved</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Add New Property Modal Container Component */}
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
            style={[styles.modalContentCard, { width: isWeb ? 540 : "92%" }]}
          >
            <LinearGradient
              colors={["#D95D29", "#c04e21"]}
              style={styles.modalGradientHeader}
            >
              <View style={styles.modalHeaderRow}>
                <Text style={styles.modalHeadingTitle}>
                  Create Listing Profile
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
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Property Image</Text>
                <TouchableOpacity
                  style={styles.imagePickerBox}
                  onPress={pickImage}
                >
                  {newProperty.image ? (
                    <Image
                      source={{ uri: newProperty.image }}
                      style={styles.imagePickerPreview}
                    />
                  ) : (
                    <View style={styles.imagePickerPlaceholder}>
                      <Ionicons
                        name="camera-outline"
                        size={28}
                        color="#9ca3af"
                      />
                      <Text style={styles.imagePickerText}>
                        Upload Property Photo
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Property Title *</Text>
                <View style={styles.formInputContainer}>
                  <Ionicons name="business-outline" size={18} color="#9ca3af" />
                  <TextInput
                    style={styles.formInput}
                    placeholder="e.g., Skyline Luxury Penthouse"
                    placeholderTextColor="#9ca3af"
                    value={newProperty.title}
                    onChangeText={(text) =>
                      setNewProperty({ ...newProperty, title: text })
                    }
                  />
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Location Area *</Text>
                <View style={styles.formInputContainer}>
                  <Ionicons name="location-outline" size={18} color="#9ca3af" />
                  <TextInput
                    style={styles.formInput}
                    placeholder="e.g., Kukatpally, Hyderabad"
                    placeholderTextColor="#9ca3af"
                    value={newProperty.location}
                    onChangeText={(text) =>
                      setNewProperty({ ...newProperty, location: text })
                    }
                  />
                </View>
              </View>

              <View style={styles.formRow}>
                <View style={[styles.formGroup, { flex: 1 }]}>
                  <Text style={styles.formLabel}>Price (USD) *</Text>
                  <View style={styles.formInputContainer}>
                    <Ionicons name="logo-usd" size={16} color="#9ca3af" />
                    <TextInput
                      style={styles.formInput}
                      placeholder="550,000"
                      placeholderTextColor="#9ca3af"
                      keyboardType="numeric"
                      value={newProperty.price}
                      onChangeText={(text) =>
                        setNewProperty({ ...newProperty, price: text })
                      }
                    />
                  </View>
                </View>
                <View style={[styles.formGroup, { flex: 1 }]}>
                  <Text style={styles.formLabel}>Total Area (Sqft)</Text>
                  <View style={styles.formInputContainer}>
                    <Ionicons name="resize-outline" size={16} color="#9ca3af" />
                    <TextInput
                      style={styles.formInput}
                      placeholder="3500"
                      placeholderTextColor="#9ca3af"
                      keyboardType="numeric"
                      value={newProperty.sqft}
                      onChangeText={(text) =>
                        setNewProperty({ ...newProperty, sqft: text })
                      }
                    />
                  </View>
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Sector Classification Type</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.typeSelectorRow}
                >
                  {["Apartment", "Villa", "Penthouse", "Commercial"].map(
                    (t) => (
                      <TouchableOpacity
                        key={t}
                        style={[
                          styles.typeOptionCard,
                          newProperty.type === t && styles.typeOptionCardActive,
                        ]}
                        onPress={() =>
                          setNewProperty({ ...newProperty, type: t as any })
                        }
                      >
                        <Text
                          style={[
                            styles.typeOptionText,
                            newProperty.type === t &&
                              styles.typeOptionTextActive,
                          ]}
                        >
                          {t}
                        </Text>
                      </TouchableOpacity>
                    ),
                  )}
                </ScrollView>
              </View>

              <View style={styles.formRow}>
                <View style={[styles.formGroup, { flex: 1 }]}>
                  <Text style={styles.formLabel}>Beds</Text>
                  <View style={styles.formInputContainer}>
                    <TextInput
                      style={styles.formInput}
                      placeholder="3"
                      placeholderTextColor="#9ca3af"
                      keyboardType="numeric"
                      value={newProperty.beds}
                      onChangeText={(text) =>
                        setNewProperty({ ...newProperty, beds: text })
                      }
                    />
                  </View>
                </View>
                <View style={[styles.formGroup, { flex: 1 }]}>
                  <Text style={styles.formLabel}>Baths</Text>
                  <View style={styles.formInputContainer}>
                    <TextInput
                      style={styles.formInput}
                      placeholder="2"
                      placeholderTextColor="#9ca3af"
                      keyboardType="numeric"
                      value={newProperty.baths}
                      onChangeText={(text) =>
                        setNewProperty({ ...newProperty, baths: text })
                      }
                    />
                  </View>
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Assigned Agent Name *</Text>
                <View style={styles.formInputContainer}>
                  <Ionicons name="person-outline" size={18} color="#9ca3af" />
                  <TextInput
                    style={styles.formInput}
                    placeholder="Enter agent's name"
                    placeholderTextColor="#9ca3af"
                    value={newProperty.agent}
                    onChangeText={(text) =>
                      setNewProperty({ ...newProperty, agent: text })
                    }
                  />
                </View>
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setIsAddModalOpen(false)}
              >
                <Text style={styles.modalCloseText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalSaveButton}
                onPress={handleCreateProperty}
              >
                <LinearGradient
                  colors={["#D95D29", "#c04e21"]}
                  style={styles.modalActionGradient}
                >
                  <Text style={styles.modalActionText}>Queue Listing</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* 🔹 Success Modal for Audited Properties 🔹 */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isSuccessModalOpen}
        onRequestClose={() => setIsSuccessModalOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback
            onPress={() => setIsSuccessModalOpen(false)}
          >
            <View style={StyleSheet.absoluteFillObject} />
          </TouchableWithoutFeedback>

          <View
            style={[styles.modalContentCard, { width: isWeb ? 450 : "88%" }]}
          >
            <View style={{ padding: 24, alignItems: "center" }}>
              <View
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  backgroundColor:
                    processedProperty?.status === "Approved" // 🔹 FIX: Changed parameter lookup from lifecycleStatus to status
                      ? "rgba(16, 185, 129, 0.12)"
                      : "rgba(239, 68, 68, 0.12)",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <Ionicons
                  name={
                    processedProperty?.status === "Approved"
                      ? "checkmark-circle"
                      : "close-circle"
                  }
                  size={36}
                  color={
                    processedProperty?.status === "Approved"
                      ? "#10b981"
                      : "#ef4444"
                  }
                />
              </View>

              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "900",
                  color: "#111111",
                  textAlign: "center",
                }}
              >
                Listing {processedProperty?.status}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: "#6b7280",
                  textAlign: "center",
                  marginTop: 4,
                  marginBottom: 20,
                }}
              >
                {processedProperty?.status === "Approved"
                  ? "The real estate asset has been verified and published to the public portal directory."
                  : "The real estate asset listing request has been rejected and archived."}
              </Text>

              <View
                style={{
                  backgroundColor: "#f9fafb",
                  borderRadius: 12,
                  padding: 14,
                  width: "100%",
                  borderWidth: 1,
                  borderColor: "#e5e7eb",
                  gap: 6,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#6b7280",
                      fontWeight: "600",
                    }}
                  >
                    Property ID
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#D95D29",
                      fontWeight: "700",
                    }}
                  >
                    {processedProperty?.id}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#6b7280",
                      fontWeight: "600",
                    }}
                  >
                    Title
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#111111",
                      fontWeight: "700",
                      flex: 1,
                      textAlign: "right",
                      marginLeft: 16,
                    }}
                    numberOfLines={1}
                  >
                    {processedProperty?.title}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#6b7280",
                      fontWeight: "600",
                    }}
                  >
                    Price
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color:
                        processedProperty?.status === "Approved"
                          ? "#10b981"
                          : "#ef4444",
                      fontWeight: "700",
                    }}
                  >
                    {processedProperty?.price}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#6b7280",
                      fontWeight: "600",
                    }}
                  >
                    Agent
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#374151",
                      fontWeight: "600",
                    }}
                  >
                    {processedProperty?.agent}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={{
                  backgroundColor: "#111111",
                  width: "100%",
                  height: 44,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                }}
                onPress={() => setIsSuccessModalOpen(false)}
              >
                <Text
                  style={{ color: "#FFFFFF", fontSize: 14, fontWeight: "700" }}
                >
                  Return to Directory
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </AdminLayout>
  );
}

const styles = StyleSheet.create({
  windowContainer: {
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
  addPropertyButton: {
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
  addBtnText: {
    color: "white",
    fontSize: 13,
    fontWeight: "700",
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
    width: width * 0.38,
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
  filterShelfCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: isWeb ? 20 : 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginBottom: 16,
    gap: 12,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 42,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: "#111111",
    padding: 0,
  },
  filterRow: {
    flexDirection: isWeb ? "row" : "column",
    justifyContent: "space-between",
    alignItems: isWeb ? "center" : "stretch",
    gap: 12,
  },
  filterGroup: {
    flexDirection: "row",
    gap: 6,
  },
  chipButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  chipActive: {
    backgroundColor: "#111111",
    borderColor: "#111111",
  },
  chipText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4b5563",
  },
  chipTextActive: {
    color: "#FFFFFF",
  },
  statusGroup: {
    flexDirection: "row",
    gap: 6,
  },
  statusChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  statusChipActive: {
    backgroundColor: "#111111",
    borderColor: "#111111",
  },
  statusChipActiveApproved: {
    backgroundColor: "#10b981",
    borderColor: "#10b981",
  },
  statusChipActivePending: {
    backgroundColor: "#f59e0b",
    borderColor: "#f59e0b",
  },
  statusChipActiveRejected: {
    backgroundColor: "#ef4444",
    borderColor: "#ef4444",
  },
  statusChipText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6b7280",
  },
  statusChipTextActive: {
    color: "#FFFFFF",
  },
  assetsGridContainer: {
    justifyContent: "flex-start",
    flexWrap: "wrap",
    gap: isWeb ? 24 : 14,
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
    borderColor: "#e5e7eb",
    overflow: "hidden",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.04)",
    elevation: 2,
  },
  cardImageContainer: {
    width: "100%",
    height: isWeb ? 200 : 170,
    position: "relative",
  },
  assetVisualImage: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.15)",
  },
  floatingIdBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "rgba(0,0,0,0.7)",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeIdText: {
    color: "#FFFFFF",
    fontSize: 10.5,
    fontWeight: "700",
  },
  lifecycleBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  lifecycleStatusText: {
    fontSize: 10.5,
    fontWeight: "700",
  },
  typeBadge: {
    position: "absolute",
    bottom: 10,
    left: 10,
    backgroundColor: "rgba(217, 93, 41, 0.9)",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  typeBadgeText: {
    color: "white",
    fontSize: 10.5,
    fontWeight: "700",
  },
  cardDetailsPortion: {
    padding: isWeb ? 16 : 12,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  propertyPriceText: {
    fontSize: isWeb ? 20 : 17,
    fontWeight: "900",
    color: "#D95D29",
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#fef3f0",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 10,
  },
  ratingText: {
    fontSize: 10.5,
    fontWeight: "700",
    color: "#D95D29",
  },
  propertyTitleText: {
    fontSize: isWeb ? 16 : 14,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 10,
  },
  propertyLocationText: {
    fontSize: 12,
    color: "#6b7280",
    flex: 1,
  },
  structuralSpecsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  specItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  specMetricElement: {
    fontSize: 11.5,
    fontWeight: "600",
    color: "#4b5563",
  },
  horizontalCardLine: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginVertical: 10,
  },
  cardActionFooterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  agentInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  agentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#fef3f0",
    justifyContent: "center",
    alignItems: "center",
  },
  agentInitial: {
    fontSize: 13,
    fontWeight: "700",
    color: "#D95D29",
  },
  agentSubLabel: {
    fontSize: 9,
    fontWeight: "700",
    color: "#9ca3af",
    letterSpacing: 0.3,
  },
  agentValueText: {
    fontSize: 11.5,
    fontWeight: "700",
    color: "#111111",
  },
  auditTriggerButton: {
    borderRadius: 6,
    overflow: "hidden",
  },
  auditButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  auditBtnText: {
    color: "#FFFFFF",
    fontSize: 11.5,
    fontWeight: "700",
  },
  emptyStateFallbackView: {
    width: "100%",
    padding: 60,
    justifyContent: "center",
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
  fallbackPrimaryText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#374151",
  },
  fallbackSecondaryText: {
    fontSize: 13,
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
  modalBody: {
    flex: undefined,
  },
  modalImage: {
    width: "100%",
    height: 180,
  },
  modalContentInner: {
    padding: 16,
  },
  modalHeaderInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 14,
  },
  modalPropertyTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111111",
    marginBottom: 4,
  },
  modalLocationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  modalLocation: {
    fontSize: 12,
    color: "#6b7280",
  },
  modalPrice: {
    fontSize: 18,
    fontWeight: "900",
    color: "#D95D29",
  },
  modalDivider: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginVertical: 14,
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
  modalSpecsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  modalSpecItem: {
    flex: 1,
    minWidth: "45%",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f9fafb",
    borderRadius: 10,
  },
  modalSpecLabel: {
    fontSize: 10.5,
    color: "#9ca3af",
    marginTop: 4,
  },
  modalSpecValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111111",
    marginTop: 2,
  },
  modalAgentCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 10,
    backgroundColor: "#f9fafb",
    borderRadius: 10,
  },
  modalAgentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fef3f0",
    justifyContent: "center",
    alignItems: "center",
  },
  modalAgentInitial: {
    fontSize: 16,
    fontWeight: "800",
    color: "#D95D29",
  },
  modalAgentName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111111",
  },
  modalAgentRole: {
    fontSize: 11,
    color: "#6b7280",
  },
  modalStatusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
  },
  modalStatusText: {
    fontSize: 11.5,
    fontWeight: "700",
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
  modalActionButton: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    overflow: "hidden",
  },
  modalActionGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalActionText: {
    color: "white",
    fontSize: 13.5,
    fontWeight: "700",
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
  },
  typeSelectorRow: {
    flexDirection: "row",
    gap: 8,
    paddingVertical: 4,
  },
  typeOptionCard: {
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  typeOptionCardActive: {
    backgroundColor: "#111111",
    borderColor: "#111111",
  },
  typeOptionText: {
    fontSize: 12.5,
    fontWeight: "600",
    color: "#4b5563",
  },
  typeOptionTextActive: {
    color: "#FFFFFF",
  },
  modalSaveButton: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    overflow: "hidden",
  },
  imagePickerBox: {
    width: "100%",
    height: 140,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderStyle: "dashed",
    backgroundColor: "#f9fafb",
    overflow: "hidden",
  },
  imagePickerPlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  imagePickerText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6b7280",
  },
  imagePickerPreview: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
