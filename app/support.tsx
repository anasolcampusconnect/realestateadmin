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
import AdminLayout from "../components/AdminLayout"; // Shared layout engine component import

const { width } = Dimensions.get("window");
const isWeb = Platform.OS === "web" || width > 1024;

interface SupportTicket {
  ticketId: string;
  customerName: string;
  category: string;
  issueSummary: string;
  priority: "CRITICAL" | "HIGH" | "STANDARD";
  status: "Open" | "In Progress" | "Resolved";
  timestamp: string;
}

export default function ComplaintsSupport() {
  const [activeTicketId, setActiveTicketId] = useState("TK-4029");
  const [resolutionMessage, setResolutionMessage] = useState("");

  // Mock real estate complaint tickets matching enterprise workflows
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

  // Simulated chat messages thread for the currently selected active ticket
  const ticketChatThread = [
    {
      id: 1,
      sender: "Customer",
      message:
        "I transferred the ₹5,00,000 token advance over 3 hours ago. The transaction status ID is TXN-77192. Please unlock my booking deed.",
      time: "11:02 AM",
    },
    {
      id: 2,
      sender: "System Bot",
      message:
        "Automated statement query initiated. Waiting for banking node handshake verification confirmation...",
      time: "11:03 AM",
    },
    {
      id: 3,
      sender: "Customer",
      message:
        "Can an administrator manually cross-check the reference hook? The auction window closes shortly.",
      time: "11:15 AM",
    },
  ];

  const currentTicket =
    supportTickets.find((t) => t.ticketId === activeTicketId) ||
    supportTickets[0];

  return (
    <AdminLayout currentPageLabel="Complaints & Support">
      <ScrollView
        style={styles.pageWrapper}
        showsVerticalScrollIndicator={false}
      >
        {/* --- MODULE SUMMARY BREADCRUMB --- */}
        <View style={styles.breadcrumbHeader}>
          <View>
            <Text style={styles.mainTitleText}>
              Customer Grievance & Support Management
            </Text>
            <Text style={styles.subtitleText}>
              Address customer complaints, investigate agent non-compliance
              reports, and coordinate platform escalations.
            </Text>
          </View>
        </View>

        {/* --- CONTENT SEGMENT GRID WORKSPACE --- */}
        <View
          style={[
            styles.workspaceSplitRow,
            isWeb ? styles.rowLayout : styles.columnLayout,
          ]}
        >
          {/* ================= LEFT CONTAINER: INCIDENT ESCALATIONS LEDGER ================= */}
          <View
            style={[
              styles.leftLedgerColumn,
              isWeb ? { width: "48%" } : { width: "100%" },
            ]}
          >
            <Text style={styles.sectionHeadingTitle}>
              Incoming Escalation Stream
            </Text>
            <View style={styles.ticketsStack}>
              {supportTickets.map((ticket) => {
                const isActive = ticket.ticketId === activeTicketId;
                return (
                  <TouchableOpacity
                    key={ticket.ticketId}
                    style={[
                      styles.ticketRowItemCard,
                      isActive && styles.ticketCardActive,
                    ]}
                    activeOpacity={0.8}
                    onPress={() => setActiveTicketId(ticket.ticketId)}
                  >
                    <View style={styles.cardInlineHeaderRow}>
                      <Text
                        style={[
                          styles.ticketIdText,
                          isActive && styles.textOrangeTheme,
                        ]}
                      >
                        {ticket.ticketId}
                      </Text>
                      <View
                        style={[
                          styles.priorityLabelBadge,
                          ticket.priority === "CRITICAL"
                            ? styles.bgRed
                            : ticket.priority === "HIGH"
                              ? styles.bgOrange
                              : styles.bgGrey,
                        ]}
                      >
                        <Text style={styles.priorityBadgeText}>
                          {ticket.priority}
                        </Text>
                      </View>
                    </View>

                    <Text style={styles.ticketCategoryLabel}>
                      {ticket.category}
                    </Text>
                    <Text style={styles.ticketDescSummary} numberOfLines={2}>
                      {ticket.issueSummary}
                    </Text>

                    <View style={styles.horizontalLineDivider} />

                    <View style={styles.cardInlineFooterRow}>
                      <Text style={styles.customerNameText}>
                        User: {ticket.customerName}
                      </Text>
                      <Text style={styles.timestampText}>
                        {ticket.timestamp}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* ================= RIGHT CONTAINER: LIVE RESOLUTION CONSOLE ================= */}
          <View
            style={[
              styles.rightChatColumn,
              isWeb ? { width: "49%" } : { width: "100%" },
            ]}
          >
            <View style={styles.chatTerminalCard}>
              <View style={styles.chatHeaderRow}>
                <View>
                  <Text style={styles.chatHeaderTitle}>
                    Ticket Workbench — File {currentTicket.ticketId}
                  </Text>
                  <Text style={styles.chatHeaderSubtitle}>
                    Client: {currentTicket.customerName} • Scope:{" "}
                    {currentTicket.category}
                  </Text>
                </View>
                <View style={styles.statusGroupBadgeWrapper}>
                  <Text style={styles.statusLabelIndicatorText}>
                    Status:{" "}
                    <Text style={styles.boldStatusValue}>
                      {currentTicket.status}
                    </Text>
                  </Text>
                </View>
              </View>

              <View style={styles.horizontalLineDivider} />

              {/* Simulated Workspace Chat Transcript Stream Area */}
              <ScrollView
                style={styles.chatTranscriptPort}
                nestedScrollEnabled
                showsVerticalScrollIndicator={true}
              >
                {ticketChatThread.map((chat) => {
                  const isUser = chat.sender === "Customer";
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
                          isUser ? styles.bgBubbleLeft : styles.bgBubbleRight,
                        ]}
                      >
                        <Text style={styles.senderIdentityLabel}>
                          {chat.sender}
                        </Text>
                        <Text
                          style={[
                            styles.messageText,
                            isUser ? styles.textDark : styles.textLight,
                          ]}
                        >
                          {chat.message}
                        </Text>
                        <Text
                          style={[
                            styles.messageTimeText,
                            isUser ? styles.textGreySub : styles.textMutedLight,
                          ]}
                        >
                          {chat.time}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </ScrollView>

              <View style={styles.horizontalLineDivider} />

              {/* Interactive Response Dispatcher Form Area */}
              <Text style={styles.textareaFieldLabel}>
                MANUAL PROTOCOL DISPATCH MESSAGE
              </Text>
              <View style={styles.chatInputTextareaContainer}>
                <TextInput
                  style={styles.terminalTextareaInput}
                  multiline
                  numberOfLines={3}
                  placeholder="Compose response statement, notify manual bank draft approval unlock timestamp, or log resolution notes..."
                  placeholderTextColor="#888888"
                  value={resolutionMessage}
                  onChangeText={setResolutionMessage}
                />
              </View>

              <View style={styles.terminalActionToolbarRow}>
                <TouchableOpacity style={styles.markResolvedButton}>
                  <Text style={styles.resolvedBtnText}>✓ Mark as Resolved</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dispatchMessageButton}>
                  <Text style={styles.dispatchBtnText}>Send Message ➔</Text>
                </TouchableOpacity>
              </View>
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
  leftLedgerColumn: {
    gap: 16,
  },
  rightChatColumn: {
    gap: 16,
  },
  sectionHeadingTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#111111",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  ticketsStack: {
    gap: 12,
  },
  ticketRowItemCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  ticketCardActive: {
    borderColor: "#D95D29",
    borderWidth: 1.5,
    backgroundColor: "rgba(217, 93, 41, 0.01)",
  },
  cardInlineHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ticketIdText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#4B5563",
  },
  textOrangeTheme: {
    color: "#D95D29",
  },
  priorityLabelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  bgRed: {
    backgroundColor: "rgba(239, 68, 68, 0.12)",
  },
  bgOrange: {
    backgroundColor: "rgba(245, 158, 11, 0.12)",
  },
  bgGrey: {
    backgroundColor: "rgba(107, 114, 128, 0.12)",
  },
  priorityBadgeText: {
    fontSize: 9.5,
    fontWeight: "800",
    color: "#111111",
  },
  ticketCategoryLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111111",
    marginTop: 8,
  },
  ticketDescSummary: {
    fontSize: 12.5,
    color: "#4B5563",
    lineHeight: 18,
    marginTop: 4,
  },
  horizontalLineDivider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 12,
  },
  cardInlineFooterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  customerNameText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#111111",
  },
  timestampText: {
    fontSize: 11.5,
    color: "#9CA3AF",
  },
  chatTerminalCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 20,
  },
  chatHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: 12,
  },
  chatHeaderTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#111111",
  },
  chatHeaderSubtitle: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
  statusGroupBadgeWrapper: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusLabelIndicatorText: {
    fontSize: 11.5,
    color: "#4B5563",
  },
  boldStatusValue: {
    fontWeight: "800",
    color: "#111111",
  },
  chatTranscriptPort: {
    height: 240,
    paddingRight: 4,
  },
  messageBubbleFrame: {
    flexDirection: "row",
    marginBottom: 14,
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
    borderRadius: 12,
    padding: 12,
  },
  bgBubbleLeft: {
    backgroundColor: "#F3F4F6",
    borderTopLeftRadius: 2,
  },
  bgBubbleRight: {
    backgroundColor: "#111111",
    borderTopRightRadius: 2,
  },
  senderIdentityLabel: {
    fontSize: 9,
    fontWeight: "800",
    color: "#9CA3AF",
    letterSpacing: 0.3,
    marginBottom: 4,
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
  messageTimeText: {
    fontSize: 9.5,
    textAlign: "right",
    marginTop: 6,
  },
  textGreySub: {
    color: "#9CA3AF",
  },
  textMutedLight: {
    color: "#64748b",
  },
  textareaFieldLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: "#6B7280",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  chatInputTextareaContainer: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  terminalTextareaInput: {
    fontSize: 13,
    color: "#111111",
    height: 65,
    textAlignVertical: "top",
  },
  terminalActionToolbarRow: {
    flexDirection: "row",
    gap: 12,
  },
  markResolvedButton: {
    flex: 1,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  resolvedBtnText: {
    color: "#374151",
    fontSize: 12.5,
    fontWeight: "600",
  },
  dispatchMessageButton: {
    flex: 1.2,
    backgroundColor: "#D95D29",
    height: 44,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  dispatchBtnText: {
    color: "#FFFFFF",
    fontSize: 12.5,
    fontWeight: "700",
  },
});
