import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useRef, useState } from "react";
import {
    Alert,
    Animated,
    Dimensions,
    Keyboard,
    KeyboardAvoidingView,
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

const { width } = Dimensions.get("window");
const isWeb = Platform.OS === "web" || width > 1024;
const isAndroid = Platform.OS === "android";

interface SupportTicket {
  ticketId: string;
  customerName: string;
  category: string;
  issueSummary: string;
  priority: "CRITICAL" | "HIGH" | "STANDARD";
  status: "Open" | "In Progress" | "Resolved";
  timestamp: string;
}

interface ChatMessage {
  id: number;
  sender: string;
  message: string;
  time: string;
}

export default function ComplaintsSupport() {
  const [activeTicketId, setActiveTicketId] = useState("TK-4029");
  const [resolutionMessage, setResolutionMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: "Rahul Dravid",
      message:
        "I transferred the ₹5,00,000 token advance over 3 hours ago. The transaction status ID is TXN-77192. Please unlock my booking deed.",
      time: "11:02 AM",
    },
    {
      id: 2,
      sender: "Support Bot",
      message:
        "Automated statement query initiated. Waiting for banking node handshake verification confirmation...",
      time: "11:03 AM",
    },
    {
      id: 3,
      sender: "Rahul Dravid",
      message:
        "Can an administrator manually cross-check the reference hook? The auction window closes shortly.",
      time: "11:15 AM",
    },
  ]);

  const scrollViewRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const supportTickets: SupportTicket[] = [
    {
      ticketId: "TK-4029",
      customerName: "Rahul Dravid",
      category: "Escrow Discrepancy",
      issueSummary:
        "Token deposit amount cleared bank statement but platform ledger still reflects pending verification loops.",
      priority: "CRITICAL",
      status: "Open",
      timestamp: "18 May 2026, 11:02 AM",
    },
    {
      ticketId: "TK-3984",
      customerName: "Priya Sharma",
      category: "Agent Non-Compliance",
      issueSummary:
        "Agent uploaded misleading boundary coordinates for property asset card PRP-1094 during physical walkthrough check.",
      priority: "HIGH",
      status: "In Progress",
      timestamp: "17 May 2026, 04:15 PM",
    },
    {
      ticketId: "TK-3951",
      customerName: "Amit Patel",
      category: "KYC Verification",
      issueSummary:
        "Adhaar lookup API timing out consistently during onboarding registration submission step.",
      priority: "STANDARD",
      status: "Resolved",
      timestamp: "16 May 2026, 02:30 PM",
    },
  ];

  const currentTicket =
    supportTickets.find((t) => t.ticketId === activeTicketId) ||
    supportTickets[0];

  const getPriorityColors = (priority: string) => {
    switch (priority) {
      case "CRITICAL":
        return {
          bg: "#FEE2E2",
          text: "#DC2626",
          icon: "alert-circle",
          label: "Critical",
        };
      case "HIGH":
        return {
          bg: "#FEF3C7",
          text: "#D97706",
          icon: "warning",
          label: "High",
        };
      default:
        return {
          bg: "#F3F4F6",
          text: "#6B7280",
          icon: "information-circle",
          label: "Standard",
        };
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "Open":
        return { bg: "#FEE2E2", text: "#DC2626", icon: "time", label: "Open" };
      case "In Progress":
        return {
          bg: "#FEF3C7",
          text: "#D97706",
          icon: "sync",
          label: "In Progress",
        };
      default:
        return {
          bg: "#D1FAE5",
          text: "#059669",
          icon: "checkmark-circle",
          label: "Resolved",
        };
    }
  };

  const handleSendMessage = () => {
    if (!resolutionMessage.trim()) {
      Alert.alert("Info", "Please enter a message before sending");
      return;
    }

    const newMessage: ChatMessage = {
      id: chatMessages.length + 1,
      sender: "Support Agent",
      message: resolutionMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setChatMessages([...chatMessages, newMessage]);
    setResolutionMessage("");

    // Scroll to bottom
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleResolveTicket = () => {
    Alert.alert(
      "Resolve Ticket",
      `Are you sure you want to mark ticket ${currentTicket.ticketId} as resolved?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Resolve",
          onPress: () => {
            Alert.alert(
              "Success",
              `Ticket ${currentTicket.ticketId} has been resolved`,
            );
          },
        },
      ],
    );
  };

  // Animate on mount
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <AdminLayout currentPageLabel="Complaints & Support">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            style={styles.pageWrapper}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Enhanced Header Section */}
            <Animated.View
              style={[styles.headerSection, { opacity: fadeAnim }]}
            >
              <View style={styles.headerLeft}>
                <LinearGradient
                  colors={["#D95D29", "#c04e21"]}
                  style={styles.headerIconGradient}
                >
                  <Ionicons name="chatbubbles" size={24} color="white" />
                </LinearGradient>
                <View>
                  <Text style={styles.mainTitleText}>Customer Support</Text>
                  <Text style={styles.subtitleText}>
                    Manage complaints, resolve issues, and assist customers
                  </Text>
                </View>
              </View>
              <View style={styles.headerStats}>
                <View style={styles.headerStat}>
                  <Ionicons name="alert-circle" size={16} color="#DC2626" />
                  <Text style={styles.headerStatText}>
                    {
                      supportTickets.filter((t) => t.priority === "CRITICAL")
                        .length
                    }{" "}
                    Critical
                  </Text>
                </View>
                <View style={styles.headerStat}>
                  <Ionicons name="time" size={16} color="#D97706" />
                  <Text style={styles.headerStatText}>
                    {supportTickets.filter((t) => t.status === "Open").length}{" "}
                    Open
                  </Text>
                </View>
              </View>
            </Animated.View>

            {/* Content Grid */}
            <View
              style={[
                styles.workspaceSplitRow,
                isWeb ? styles.rowLayout : styles.columnLayout,
              ]}
            >
              {/* LEFT: Tickets List */}
              <View
                style={[
                  styles.leftLedgerColumn,
                  isWeb ? { width: "48%" } : { width: "100%" },
                ]}
              >
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionHeadingTitle}>
                    Support Tickets
                  </Text>
                  <TouchableOpacity style={styles.filterButton}>
                    <Ionicons name="filter" size={16} color="#D95D29" />
                    <Text style={styles.filterButtonText}>Filter</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.ticketsStack}>
                  {supportTickets.map((ticket, index) => {
                    const isActive = ticket.ticketId === activeTicketId;
                    const priorityColors = getPriorityColors(ticket.priority);
                    const statusConfig = getStatusConfig(ticket.status);

                    return (
                      <Animated.View
                        key={ticket.ticketId}
                        style={{
                          opacity: fadeAnim,
                          transform: [
                            {
                              translateX: fadeAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [-20, 0],
                              }),
                            },
                          ],
                        }}
                      >
                        <TouchableOpacity
                          style={[
                            styles.ticketRowItemCard,
                            isActive && styles.ticketCardActive,
                            isAndroid && styles.ticketAndroid,
                          ]}
                          activeOpacity={0.7}
                          onPress={() => setActiveTicketId(ticket.ticketId)}
                        >
                          <View style={styles.cardInlineHeaderRow}>
                            <View style={styles.ticketHeaderLeft}>
                              <LinearGradient
                                colors={
                                  isActive
                                    ? ["#D95D29", "#c04e21"]
                                    : ["#9CA3AF", "#6B7280"]
                                }
                                style={styles.ticketBadge}
                              >
                                <Text style={styles.ticketBadgeText}>
                                  {ticket.ticketId}
                                </Text>
                              </LinearGradient>
                              <View
                                style={[
                                  styles.priorityLabelBadge,
                                  { backgroundColor: priorityColors.bg },
                                ]}
                              >
                                <Ionicons
                                  name={priorityColors.icon as any}
                                  size={10}
                                  color={priorityColors.text}
                                />
                                <Text
                                  style={[
                                    styles.priorityBadgeText,
                                    { color: priorityColors.text },
                                  ]}
                                >
                                  {priorityColors.label}
                                </Text>
                              </View>
                            </View>
                            <View
                              style={[
                                styles.statusDot,
                                { backgroundColor: statusConfig.text },
                              ]}
                            />
                          </View>

                          <Text style={styles.ticketCategoryLabel}>
                            {ticket.category}
                          </Text>
                          <Text
                            style={styles.ticketDescSummary}
                            numberOfLines={2}
                          >
                            {ticket.issueSummary}
                          </Text>

                          <View style={styles.ticketFooter}>
                            <View style={styles.customerInfo}>
                              <Ionicons
                                name="person-circle"
                                size={14}
                                color="#9CA3AF"
                              />
                              <Text style={styles.customerNameText}>
                                {ticket.customerName}
                              </Text>
                            </View>
                            <View style={styles.timeInfo}>
                              <Ionicons name="time" size={12} color="#9CA3AF" />
                              <Text style={styles.timestampText}>
                                {ticket.timestamp.split(",")[0]}
                              </Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      </Animated.View>
                    );
                  })}
                </View>
              </View>

              {/* RIGHT: Chat Interface */}
              <View
                style={[
                  styles.rightChatColumn,
                  isWeb ? { width: "49%" } : { width: "100%" },
                ]}
              >
                <Animated.View
                  style={[styles.chatTerminalCard, { opacity: fadeAnim }]}
                >
                  {/* Chat Header */}
                  <View style={styles.chatHeaderRow}>
                    <View style={styles.chatHeaderInfo}>
                      <Text style={styles.chatHeaderTitle}>
                        {currentTicket.ticketId}
                      </Text>
                      <View style={styles.chatHeaderMeta}>
                        <View style={styles.metaItem}>
                          <Ionicons name="person" size={12} color="#9CA3AF" />
                          <Text style={styles.chatHeaderSubtitle}>
                            {currentTicket.customerName}
                          </Text>
                        </View>
                        <View style={styles.metaDivider} />
                        <View style={styles.metaItem}>
                          <Ionicons name="folder" size={12} color="#9CA3AF" />
                          <Text style={styles.chatHeaderSubtitle}>
                            {currentTicket.category}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View
                      style={[
                        styles.statusBadge,
                        {
                          backgroundColor: getStatusConfig(currentTicket.status)
                            .bg,
                        },
                      ]}
                    >
                      <Ionicons
                        name={getStatusConfig(currentTicket.status).icon as any}
                        size={12}
                        color={getStatusConfig(currentTicket.status).text}
                      />
                      <Text
                        style={[
                          styles.statusText,
                          { color: getStatusConfig(currentTicket.status).text },
                        ]}
                      >
                        {getStatusConfig(currentTicket.status).label}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.horizontalLineDivider} />

                  {/* Chat Messages */}
                  <ScrollView
                    ref={scrollViewRef}
                    style={styles.chatTranscriptPort}
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={true}
                    onContentSizeChange={() =>
                      scrollViewRef.current?.scrollToEnd({ animated: true })
                    }
                  >
                    {chatMessages.map((chat) => {
                      const isUser = chat.sender === currentTicket.customerName;
                      return (
                        <View
                          key={chat.id}
                          style={[
                            styles.messageBubbleFrame,
                            isUser ? styles.bubbleLeft : styles.bubbleRight,
                          ]}
                        >
                          <View
                            style={[
                              styles.messageBubble,
                              isUser
                                ? styles.bgBubbleLeft
                                : styles.bgBubbleRight,
                              isAndroid && { elevation: 1 },
                            ]}
                          >
                            <View style={styles.messageHeader}>
                              <Text style={styles.senderIdentityLabel}>
                                {chat.sender}
                              </Text>
                              <Text style={styles.messageTimeText}>
                                {chat.time}
                              </Text>
                            </View>
                            <Text
                              style={[
                                styles.messageText,
                                isUser ? styles.textDark : styles.textLight,
                              ]}
                            >
                              {chat.message}
                            </Text>
                          </View>
                        </View>
                      );
                    })}
                  </ScrollView>

                  <View style={styles.horizontalLineDivider} />

                  {/* Input Area */}
                  <View style={styles.inputSection}>
                    <Text style={styles.textareaFieldLabel}>
                      <Ionicons
                        name="chatbubble-ellipses"
                        size={12}
                        color="#6B7280"
                      />{" "}
                      Response Message
                    </Text>
                    <View style={styles.chatInputTextareaContainer}>
                      <TextInput
                        style={[
                          styles.terminalTextareaInput,
                          isAndroid && { paddingVertical: 12 },
                        ]}
                        multiline={true}
                        numberOfLines={3}
                        placeholder="Type your response here..."
                        placeholderTextColor="#9CA3AF"
                        value={resolutionMessage}
                        onChangeText={setResolutionMessage}
                      />
                    </View>

                    <View style={styles.terminalActionToolbarRow}>
                      <TouchableOpacity
                        style={styles.markResolvedButton}
                        onPress={handleResolveTicket}
                      >
                        <Ionicons
                          name="checkmark-circle"
                          size={18}
                          color="#059669"
                        />
                        <Text style={styles.resolvedBtnText}>Resolve</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.dispatchMessageButton}
                        onPress={handleSendMessage}
                      >
                        <LinearGradient
                          colors={["#D95D29", "#c04e21"]}
                          style={styles.dispatchGradient}
                        >
                          <Text style={styles.dispatchBtnText}>
                            Send Message
                          </Text>
                          <Ionicons name="send" size={16} color="white" />
                        </LinearGradient>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Animated.View>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </AdminLayout>
  );
}

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollContent: {
    padding: isWeb ? 24 : 16,
    paddingBottom: isAndroid ? 80 : 40,
  },
  rowLayout: {
    flexDirection: "row",
  },
  columnLayout: {
    flexDirection: "column",
  },
  headerSection: {
    flexDirection: isWeb ? "row" : "column",
    justifyContent: "space-between",
    alignItems: isWeb ? "center" : "flex-start",
    marginBottom: 24,
    gap: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
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
    color: "#111827",
  },
  subtitleText: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
  headerStats: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
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
    borderColor: "#E5E7EB",
  },
  headerStatText: {
    fontSize: 12,
    color: "#374151",
    fontWeight: "500",
  },
  workspaceSplitRow: {
    justifyContent: "space-between",
    gap: isWeb ? 24 : 16,
  },
  leftLedgerColumn: {
    gap: 12,
  },
  rightChatColumn: {
    gap: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionHeadingTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111827",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#FEF3F0",
    borderRadius: 8,
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#D95D29",
  },
  ticketsStack: {
    gap: 12,
  },
  ticketRowItemCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  ticketAndroid: {
    elevation: 2,
  },
  ticketCardActive: {
    borderColor: "#D95D29",
    borderWidth: 2,
    backgroundColor: "#FEFAF8",
  },
  cardInlineHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  ticketHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  ticketBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ticketBadgeText: {
    fontSize: 11,
    fontWeight: "800",
    color: "white",
  },
  priorityLabelBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  priorityBadgeText: {
    fontSize: 10,
    fontWeight: "700",
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  ticketCategoryLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
  },
  ticketDescSummary: {
    fontSize: 12,
    color: "#6B7280",
    lineHeight: 18,
    marginBottom: 12,
  },
  ticketFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  customerInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  customerNameText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#374151",
  },
  timeInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  timestampText: {
    fontSize: 11,
    color: "#9CA3AF",
  },
  chatTerminalCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: isWeb ? 20 : 16,
    overflow: "hidden",
  },
  chatHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    marginBottom: 8,
  },
  chatHeaderInfo: {
    flex: 1,
  },
  chatHeaderTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 4,
  },
  chatHeaderMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaDivider: {
    width: 1,
    height: 12,
    backgroundColor: "#E5E7EB",
  },
  chatHeaderSubtitle: {
    fontSize: 12,
    color: "#6B7280",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "700",
  },
  horizontalLineDivider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 16,
  },
  chatTranscriptPort: {
    height: isWeb ? 280 : 320,
  },
  messageBubbleFrame: {
    flexDirection: "row",
    marginBottom: 12,
    width: "100%",
  },
  bubbleLeft: {
    justifyContent: "flex-start",
  },
  bubbleRight: {
    justifyContent: "flex-end",
  },
  messageBubble: {
    maxWidth: "85%",
    borderRadius: 16,
    padding: 12,
  },
  bgBubbleLeft: {
    backgroundColor: "#F3F4F6",
    borderBottomLeftRadius: 4,
  },
  bgBubbleRight: {
    backgroundColor: "#D95D29",
    borderBottomRightRadius: 4,
  },
  messageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  senderIdentityLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#9CA3AF",
  },
  messageTimeText: {
    fontSize: 9,
    color: "#9CA3AF",
  },
  messageText: {
    fontSize: 13,
    lineHeight: 18,
  },
  textDark: {
    color: "#1F2937",
  },
  textLight: {
    color: "#FFFFFF",
  },
  inputSection: {
    marginTop: 4,
  },
  textareaFieldLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#6B7280",
    marginBottom: 8,
  },
  chatInputTextareaContainer: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  terminalTextareaInput: {
    fontSize: 14,
    color: "#111827",
    minHeight: 70,
    textAlignVertical: "top",
  },
  terminalActionToolbarRow: {
    flexDirection: "row",
    gap: 12,
  },
  markResolvedButton: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    gap: 6,
  },
  resolvedBtnText: {
    color: "#059669",
    fontSize: 13,
    fontWeight: "700",
  },
  dispatchMessageButton: {
    flex: 1.2,
    borderRadius: 10,
    overflow: "hidden",
  },
  dispatchGradient: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    height: 44,
  },
  dispatchBtnText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
});
