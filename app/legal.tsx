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

const { width } = Dimensions.get("window");
const isWeb = Platform.OS === "web" || width > 1024;

interface LegalDocument {
  docId: string;
  docType: string;
  fileName: string;
  uploadedDate: string;
  verificationStatus: "Verified" | "Under Review" | "Flagged";
}

interface ComplianceCheckItem {
  key: string;
  label: string;
  checked: boolean;
}

export default function LegalVerification() {
  const [adminComments, setAdminComments] = useState("");
  const [selectedDocument, setSelectedDocument] =
    useState<LegalDocument | null>(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isSignOffModalOpen, setIsSignOffModalOpen] = useState(false);

  const [complianceChecklist, setComplianceChecklist] = useState<
    ComplianceCheckItem[]
  >([
    {
      key: "chk1",
      label: "Matches current land registry records exactly",
      checked: true,
    },
    {
      key: "chk2",
      label: "No active litigation history flagged on asset location",
      checked: true,
    },
    {
      key: "chk3",
      label: "Encumbrance Certificate confirms clean history",
      checked: false,
    },
    {
      key: "chk4",
      label: "Signatures match authorized agent corporate credentials",
      checked: false,
    },
  ]);

  const targetAsset = {
    assetId: "PRP-8832",
    title: "Villa in Cooper Square",
    owner: "Karan Johar Ltd.",
    location: "Gachibowli, Hyderabad",
    registryValue: "₹2,36,52,800",
    submittingAgent: "Rohan Sharma",
    propertyType: "Luxury Villa",
    area: "5,200 sq.ft",
    yearBuilt: "2020",
  };

  const legalDocuments: LegalDocument[] = [
    {
      docId: "DOC-TITLE-01",
      docType: "Land Title Deed",
      fileName: "title_deed_gachibowli.pdf",
      uploadedDate: "14 May 2026",
      verificationStatus: "Under Review",
    },
    {
      docId: "DOC-RERA-02",
      docType: "RERA Registration Certificate",
      fileName: "rera_hyderabad_approved.pdf",
      uploadedDate: "14 May 2026",
      verificationStatus: "Verified",
    },
    {
      docId: "DOC-TAX-03",
      docType: "Municipal Property Tax Receipt",
      fileName: "tax_clearance_2025_26.pdf",
      uploadedDate: "15 May 2026",
      verificationStatus: "Under Review",
    },
    {
      docId: "DOC-NOC-04",
      docType: "Fire & Environmental NOC",
      fileName: "fire_safety_clearance.pdf",
      uploadedDate: "15 May 2026",
      verificationStatus: "Flagged",
    },
  ];

  const handleToggleChecklist = (key: string) => {
    setComplianceChecklist((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, checked: !item.checked } : item,
      ),
    );
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "Verified":
        return {
          bg: "rgba(16, 185, 129, 0.12)",
          text: "#10b981",
          icon: "checkmark-circle",
          label: "Verified",
        };
      case "Under Review":
        return {
          bg: "rgba(245, 158, 11, 0.12)",
          text: "#f59e0b",
          icon: "time",
          label: "Under Review",
        };
      case "Flagged":
        return {
          bg: "rgba(239, 68, 68, 0.12)",
          text: "#ef4444",
          icon: "alert-circle",
          label: "Flagged",
        };
      default:
        return {
          bg: "#f3f4f6",
          text: "#6b7280",
          icon: "help",
          label: "Unknown",
        };
    }
  };

  const complianceProgress =
    (complianceChecklist.filter((item) => item.checked).length /
      complianceChecklist.length) *
    100;

  const handleSignOff = () => {
    Alert.alert(
      "Deed Sign-off",
      "Are you sure you want to digitally sign off this deed? This action is legally binding and cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm Sign-off",
          onPress: () => {
            setIsSignOffModalOpen(false);
            Alert.alert(
              "Success",
              "Deed has been successfully signed off and recorded.",
            );
          },
        },
      ],
    );
  };

  return (
    <AdminLayout currentPageLabel="Legal Verification">
      <ScrollView
        style={styles.pageWrapper}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Responsive Header Section */}
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
            <View style={styles.headerTitleWrap}>
              <Text style={styles.mainTitleText}>Legal Verification</Text>
              <Text style={styles.subtitleText}>
                Validate ownership deeds, execute digital sign-offs, and monitor
                compliance
              </Text>
            </View>
          </View>
          <View style={styles.headerStats}>
            <View style={styles.headerStat}>
              <Ionicons name="document-text" size={16} color="#10b981" />
              <Text style={styles.headerStatText}>4 Documents</Text>
            </View>
            <View style={styles.headerStat}>
              <Ionicons name="checkmark-circle" size={16} color="#f59e0b" />
              <Text style={styles.headerStatText}>2 Verified</Text>
            </View>
          </View>
        </View>

        <View
          style={[
            styles.workspaceSplitRow,
            isWeb ? styles.rowLayout : styles.columnLayout,
          ]}
        >
          {/* LEFT SECTION: Asset Dossier & Documents */}
          <View style={isWeb ? styles.leftColumnWeb : styles.fullWidthColumn}>
            {/* Asset Dossier Card */}
            <LinearGradient
              colors={["#ffffff", "#fefaf8"]}
              style={styles.dossierCard}
            >
              <View style={styles.dossierHeader}>
                <View style={styles.dossierBadgeContainer}>
                  <LinearGradient
                    colors={["#D95D29", "#c04e21"]}
                    style={styles.dossierBadge}
                  >
                    <Text style={styles.dossierBadgeId}>
                      {targetAsset.assetId}
                    </Text>
                  </LinearGradient>
                </View>
                <View style={styles.dossierDateContainer}>
                  <Ionicons name="calendar" size={12} color="#9ca3af" />
                  <Text style={styles.dossierDate}>
                    Verification Cycle: May 2026
                  </Text>
                </View>
              </View>

              <Text style={styles.dossierTitle}>{targetAsset.title}</Text>
              <View style={styles.locationRow}>
                <Ionicons name="location" size={14} color="#D95D29" />
                <Text style={styles.dossierSub}>{targetAsset.location}</Text>
              </View>

              <View style={styles.horizontalDivider} />

              <View style={styles.metadataGridRow}>
                <View style={styles.metaDataBlock}>
                  <View style={styles.metaIconContainer}>
                    <Ionicons name="business" size={12} color="#9ca3af" />
                  </View>
                  <Text style={styles.metaLabel}>Declared Owner</Text>
                  <Text style={styles.metaValue}>{targetAsset.owner}</Text>
                </View>
                <View style={styles.metaDataBlock}>
                  <View style={styles.metaIconContainer}>
                    <Ionicons name="cash" size={12} color="#9ca3af" />
                  </View>
                  <Text style={styles.metaLabel}>Registry Valuation</Text>
                  <Text style={[styles.metaValue, { color: "#D95D29" }]}>
                    {targetAsset.registryValue}
                  </Text>
                </View>
                <View style={styles.metaDataBlock}>
                  <View style={styles.metaIconContainer}>
                    <Ionicons name="person" size={12} color="#9ca3af" />
                  </View>
                  <Text style={styles.metaLabel}>Assigned Auditor</Text>
                  <Text style={styles.metaValue}>
                    {targetAsset.submittingAgent}
                  </Text>
                </View>
              </View>

              <View style={styles.additionalMetadata}>
                <View style={styles.metaChip}>
                  <Ionicons name="home" size={12} color="#D95D29" />
                  <Text style={styles.metaChipText}>
                    {targetAsset.propertyType}
                  </Text>
                </View>
                <View style={styles.metaChip}>
                  <Ionicons name="resize" size={12} color="#D95D29" />
                  <Text style={styles.metaChipText}>{targetAsset.area}</Text>
                </View>
                <View style={styles.metaChip}>
                  <Ionicons name="calendar" size={12} color="#D95D29" />
                  <Text style={styles.metaChipText}>
                    Built: {targetAsset.yearBuilt}
                  </Text>
                </View>
              </View>
            </LinearGradient>

            {/* Documents Section Heading */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeading}>Legal Documents</Text>
              <TouchableOpacity style={styles.uploadButton}>
                <Ionicons name="cloud-upload" size={16} color="#D95D29" />
                <Text style={styles.uploadButtonText}>Upload New</Text>
              </TouchableOpacity>
            </View>

            {/* Documents List */}
            <View style={styles.documentsListCard}>
              {legalDocuments.map((doc, index) => {
                const statusConfig = getStatusConfig(doc.verificationStatus);
                return (
                  <View
                    key={doc.docId}
                    style={[
                      styles.documentRowItem,
                      index === legalDocuments.length - 1 &&
                        styles.lastDocumentRow,
                    ]}
                  >
                    <View style={styles.docLeftRowBlock}>
                      <View style={styles.docIconContainer}>
                        <LinearGradient
                          colors={["#fef3f0", "#fde8e0"]}
                          style={styles.docIconGradient}
                        >
                          <Ionicons
                            name="document-text"
                            size={20}
                            color="#D95D29"
                          />
                        </LinearGradient>
                      </View>
                      <View style={styles.docMetaColumn}>
                        <View style={styles.docHeaderRow}>
                          <Text style={styles.docIdText}>{doc.docId}</Text>
                          <View
                            style={[
                              styles.statusBadge,
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
                        <Text style={styles.docTypeText}>{doc.docType}</Text>
                        <Text style={styles.docFileName}>{doc.fileName}</Text>
                        <View style={styles.docDateRow}>
                          <Ionicons name="time" size={10} color="#9ca3af" />
                          <Text style={styles.docDateLabel}>
                            Uploaded: {doc.uploadedDate}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={styles.previewButton}
                      onPress={() => {
                        setSelectedDocument(doc);
                        setIsPreviewModalOpen(true);
                      }}
                    >
                      <Ionicons name="eye" size={18} color="#D95D29" />
                      <Text style={styles.previewLinkText}>Preview</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>

          {/* RIGHT SECTION: Compliance Checkbox, Remarks & Sign-off Pipeline */}
          <View style={isWeb ? styles.rightColumnWeb : styles.fullWidthColumn}>
            <LinearGradient
              colors={["#ffffff", "#f9fafb"]}
              style={styles.complianceCard}
            >
              <View style={styles.complianceHeader}>
                <Text style={styles.panelHeaderTitle}>Compliance Status</Text>
                <View style={styles.progressContainer}>
                  <View style={styles.progressBarBg}>
                    <View
                      style={[
                        styles.progressBarFill,
                        { width: `${complianceProgress}%` },
                      ]}
                    />
                  </View>
                  <Text style={styles.progressText}>
                    {Math.round(complianceProgress)}%
                  </Text>
                </View>
              </View>

              <View style={styles.miniHorizontalLine} />

              {complianceChecklist.map((item) => (
                <TouchableOpacity
                  key={item.key}
                  style={styles.checklistRow}
                  onPress={() => handleToggleChecklist(item.key)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.checkboxBox,
                      item.checked && styles.checkboxBoxChecked,
                    ]}
                  >
                    {item.checked && (
                      <Ionicons name="checkmark" size={12} color="white" />
                    )}
                  </View>
                  <Text
                    style={[
                      styles.checklistLabelText,
                      item.checked && styles.checklistLabelChecked,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}

              <View style={styles.dividerLight} />

              <Text style={styles.textareaLabel}>
                <Ionicons
                  name="chatbubble-ellipses"
                  size={12}
                  color="#6b7280"
                />{" "}
                Auditor Legal Remarks
              </Text>
              <View style={styles.commentsInputContainer}>
                <TextInput
                  style={styles.textareaInput}
                  multiline
                  numberOfLines={4}
                  placeholder="Append official title registry notes, certificate lookup timestamps, or flagged compliance discrepancy references..."
                  placeholderTextColor="#9ca3af"
                  value={adminComments}
                  onChangeText={setAdminComments}
                />
              </View>

              <View style={styles.actionPipelineRow}>
                <TouchableOpacity
                  style={styles.flagRejectButton}
                  onPress={() =>
                    Alert.alert(
                      "Flag Discrepancy",
                      "Please provide details about the discrepancy.",
                    )
                  }
                >
                  <Ionicons name="flag" size={16} color="#ef4444" />
                  <Text style={styles.flagButtonText}>Flag Issue</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.approveSignoffButton}
                  onPress={() => setIsSignOffModalOpen(true)}
                >
                  <LinearGradient
                    colors={["#D95D29", "#c04e21"]}
                    style={styles.signoffGradient}
                  >
                    <Ionicons name="create" size={16} color="white" />
                    <Text style={styles.signoffButtonText}>
                      Digital Sign-off
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </LinearGradient>

            {/* Quick Summary Tracker Metrics Card */}
            <LinearGradient
              colors={["#111111", "#1a1a2e"]}
              style={styles.statsCard}
            >
              <Text style={styles.statsCardTitle}>Verification Summary</Text>
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>4</Text>
                  <Text style={styles.statLabel}>Total Docs</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={[styles.statNumber, { color: "#10b981" }]}>
                    2
                  </Text>
                  <Text style={styles.statLabel}>Verified</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={[styles.statNumber, { color: "#f59e0b" }]}>
                    1
                  </Text>
                  <Text style={styles.statLabel}>Review</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={[styles.statNumber, { color: "#ef4444" }]}>
                    1
                  </Text>
                  <Text style={styles.statLabel}>Flagged</Text>
                </View>
              </View>
            </LinearGradient>
          </View>
        </View>
      </ScrollView>

      {/* Document Preview Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isPreviewModalOpen}
        onRequestClose={() => setIsPreviewModalOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsPreviewModalOpen(false)}
        >
          <View
            style={[
              styles.modalContentCard,
              !isWeb && styles.modalMobileAdaptive,
            ]}
          >
            <LinearGradient
              colors={["#D95D29", "#c04e21"]}
              style={styles.modalGradientHeader}
            >
              <View style={styles.modalHeaderRow}>
                <Text style={styles.modalHeadingTitle}>Document Preview</Text>
                <TouchableOpacity onPress={() => setIsPreviewModalOpen(false)}>
                  <Ionicons name="close" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </LinearGradient>

            {selectedDocument && (
              <View style={styles.modalBody}>
                <View style={styles.previewIconContainer}>
                  <Ionicons name="document-text" size={64} color="#D95D29" />
                </View>
                <Text style={styles.previewTitle}>
                  {selectedDocument.docType}
                </Text>
                <Text style={styles.previewSubtitle}>
                  {selectedDocument.docId}
                </Text>
                <Text style={styles.previewFilename}>
                  {selectedDocument.fileName}
                </Text>
                <View style={styles.previewMeta}>
                  <View style={styles.previewMetaItem}>
                    <Ionicons name="time" size={14} color="#9ca3af" />
                    <Text style={styles.previewMetaText}>
                      Uploaded: {selectedDocument.uploadedDate}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.downloadButton}>
                  <LinearGradient
                    colors={["#D95D29", "#c04e21"]}
                    style={styles.downloadGradient}
                  >
                    <Ionicons name="download" size={18} color="white" />
                    <Text style={styles.downloadButtonText}>
                      Download Document
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Sign-off Confirmation Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isSignOffModalOpen}
        onRequestClose={() => setIsSignOffModalOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsSignOffModalOpen(false)}
        >
          <View
            style={[
              styles.modalContentCard,
              isWeb ? { width: 450 } : styles.modalMobileAdaptive,
            ]}
          >
            <LinearGradient
              colors={["#D95D29", "#c04e21"]}
              style={styles.modalGradientHeader}
            >
              <Text style={styles.modalHeadingTitle}>Digital Sign-off</Text>
            </LinearGradient>

            <View style={styles.modalBody}>
              <View style={styles.signoffIconContainer}>
                <Ionicons name="create" size={48} color="#D95D29" />
              </View>
              <Text style={styles.signoffTitle}>Confirm Legal Sign-off</Text>
              <Text style={styles.signoffDescription}>
                By signing off, you confirm that all legal documents have been
                reviewed and verified. This action is legally binding and will
                be recorded in the audit trail.
              </Text>
              <View style={styles.signoffDetails}>
                <View style={styles.signoffDetailRow}>
                  <Text style={styles.signoffDetailLabel}>Asset ID:</Text>
                  <Text style={styles.signoffDetailValue}>
                    {targetAsset.assetId}
                  </Text>
                </View>
                <View style={styles.signoffDetailRow}>
                  <Text style={styles.signoffDetailLabel}>Property:</Text>
                  <Text style={styles.signoffDetailValue}>
                    {targetAsset.title}
                  </Text>
                </View>
                <View style={styles.signoffDetailRow}>
                  <Text style={styles.signoffDetailLabel}>Owner:</Text>
                  <Text style={styles.signoffDetailValue}>
                    {targetAsset.owner}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => setIsSignOffModalOpen(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalConfirmButton}
                onPress={handleSignOff}
              >
                <LinearGradient
                  colors={["#D95D29", "#c04e21"]}
                  style={styles.modalConfirmGradient}
                >
                  <Text style={styles.modalConfirmText}>Confirm Sign-off</Text>
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
    flexDirection: isWeb ? "row" : "column",
    justifyContent: "space-between",
    alignItems: isWeb ? "center" : "stretch",
    marginBottom: 24,
    gap: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    flex: 1,
  },
  headerTitleWrap: {
    flex: 1,
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
  headerStats: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    alignSelf: isWeb ? "auto" : "flex-start",
  },
  headerStat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  headerStatText: {
    fontSize: 12,
    color: "#374151",
    fontWeight: "500",
  },
  workspaceSplitRow: {
    justifyContent: "space-between",
    gap: 24,
  },
  rowLayout: {
    flexDirection: "row",
  },
  columnLayout: {
    flexDirection: "column",
  },
  leftColumnWeb: {
    flex: 1.8,
    gap: 20,
  },
  rightColumnWeb: {
    flex: 1,
    gap: 20,
  },
  fullWidthColumn: {
    width: "100%",
    gap: 20,
  },
  dossierCard: {
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  dossierHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    flexWrap: "wrap",
    gap: 8,
  },
  dossierBadgeContainer: {
    borderRadius: 8,
    overflow: "hidden",
  },
  dossierBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  dossierBadgeId: {
    fontSize: 11,
    fontWeight: "800",
    color: "white",
  },
  dossierDateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dossierDate: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "500",
  },
  dossierTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111111",
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 16,
  },
  dossierSub: {
    fontSize: 13,
    color: "#6b7280",
  },
  horizontalDivider: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginVertical: 20,
  },
  metadataGridRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 16,
  },
  metaDataBlock: {
    flex: 1,
    minWidth: isWeb ? 140 : "45%",
  },
  metaIconContainer: {
    marginBottom: 6,
  },
  metaLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#9ca3af",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  metaValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111111",
    marginTop: 4,
  },
  additionalMetadata: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 8,
  },
  metaChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#fef3f0",
    borderRadius: 20,
  },
  metaChipText: {
    fontSize: 11,
    fontWeight: "500",
    color: "#D95D29",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    marginTop: 8,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111111",
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#fef3f0",
    borderRadius: 8,
  },
  uploadButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#D95D29",
  },
  documentsListCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    overflow: "hidden",
  },
  documentRowItem: {
    flexDirection: isWeb ? "row" : "column",
    alignItems: isWeb ? "center" : "stretch",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
    gap: 14,
  },
  docLeftRowBlock: {
    flexDirection: "row",
    flex: 1,
    alignItems: "flex-start",
  },
  lastDocumentRow: {
    borderBottomWidth: 0,
  },
  docIconContainer: {
    marginRight: 14,
  },
  docIconGradient: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  docMetaColumn: {
    flex: 1,
  },
  docHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 6,
    flexWrap: "wrap",
  },
  docIdText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#9ca3af",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  statusBadgeText: {
    fontSize: 9,
    fontWeight: "700",
  },
  docTypeText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 2,
  },
  docFileName: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 4,
  },
  docDateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  docDateLabel: {
    fontSize: 10,
    color: "#9ca3af",
  },
  previewButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#fef3f0",
    borderRadius: 8,
    alignSelf: isWeb ? "auto" : "flex-end",
  },
  previewLinkText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#D95D29",
  },
  complianceCard: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  complianceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  panelHeaderTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111111",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  progressBarBg: {
    width: 60,
    height: 4,
    backgroundColor: "#e5e7eb",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#D95D29",
    borderRadius: 2,
  },
  progressText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#D95D29",
  },
  miniHorizontalLine: {
    height: 2,
    backgroundColor: "#D95D29",
    width: 40,
    marginBottom: 20,
  },
  checklistRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 14,
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#d1d5db",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxBoxChecked: {
    backgroundColor: "#D95D29",
    borderColor: "#D95D29",
  },
  checklistLabelText: {
    flex: 1,
    fontSize: 13,
    color: "#374151",
    fontWeight: "500",
    lineHeight: 18,
  },
  checklistLabelChecked: {
    color: "#9ca3af",
    textDecorationLine: "line-through",
  },
  dividerLight: {
    height: 1,
    backgroundColor: "#f3f4f6",
    marginVertical: 16,
  },
  textareaLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#6b7280",
    marginBottom: 8,
  },
  commentsInputContainer: {
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    padding: 12,
  },
  textareaInput: {
    fontSize: 13,
    color: "#111111",
    height: 90,
    textAlignVertical: "top",
  },
  actionPipelineRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
    flexWrap: isWeb ? "nowrap" : "wrap",
  },
  flagRejectButton: {
    flex: 1,
    minWidth: 120,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ef4444",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
    backgroundColor: "white",
  },
  flagButtonText: {
    color: "#ef4444",
    fontSize: 13,
    fontWeight: "700",
  },
  approveSignoffButton: {
    flex: 1.3,
    minWidth: 140,
    borderRadius: 10,
    overflow: "hidden",
  },
  signoffGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    height: 44,
  },
  signoffButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
  statsCard: {
    borderRadius: 16,
    padding: 20,
  },
  statsCardTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "white",
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 22,
    fontWeight: "900",
    color: "white",
  },
  statLabel: {
    fontSize: 10,
    color: "rgba(255,255,255,0.6)",
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: "rgba(255,255,255,0.2)",
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
  modalMobileAdaptive: {
    width: "100%",
    maxWidth: 380,
    borderRadius: 16,
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
    padding: 24,
    alignItems: "center",
  },
  previewIconContainer: {
    marginBottom: 16,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 4,
    textAlign: "center",
  },
  previewSubtitle: {
    fontSize: 12,
    color: "#9ca3af",
    marginBottom: 8,
  },
  previewFilename: {
    fontSize: 13,
    color: "#D95D29",
    fontWeight: "500",
    marginBottom: 12,
    textAlign: "center",
  },
  previewMeta: {
    marginBottom: 20,
  },
  previewMetaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  previewMetaText: {
    fontSize: 12,
    color: "#6b7280",
  },
  downloadButton: {
    borderRadius: 10,
    overflow: "hidden",
    width: "100%",
  },
  downloadGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
  },
  downloadButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
  },
  signoffIconContainer: {
    marginBottom: 16,
  },
  signoffTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111111",
    marginBottom: 12,
  },
  signoffDescription: {
    fontSize: 13,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 20,
  },
  signoffDetails: {
    width: "100%",
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    padding: 16,
    gap: 10,
  },
  signoffDetailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  signoffDetailLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6b7280",
  },
  signoffDetailValue: {
    fontSize: 12,
    fontWeight: "700",
    color: "#111111",
    textAlign: "right",
    flex: 1,
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
  modalConfirmButton: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    overflow: "hidden",
  },
  modalConfirmGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalConfirmText: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
  },
});
