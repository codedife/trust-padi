import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, ScrollView, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';

const PROJECT_DATA = {
  title: 'Logo Design', budget: 'N 50,000', duration: '1-2 Weeks', reviews: 3,
  description: `We're looking for an experienced web developer to create a modern, responsive e-commerce website. The project includes:\n\n• Custom design implementation\n• Product catalog with search and filters\n• Shopping cart and checkout system\n• Payment gateway integration\n• Admin dashboard for inventory management\n• Mobile-responsive design\n• SEO optimization`,
};

const TIMELINE_STEPS = [
  { title: 'Escrow project created', status: 'Created', time: '5 min ago', isCompleted: true },
  { title: 'Awaiting Acceptance', status: 'Accepted', time: '5 min ago', isCompleted: true },
  { title: 'Awaiting Delivery', status: 'Pending', time: '', isCompleted: false },
  { title: 'Payment Released', status: 'Pending', time: '', isCompleted: false },
];

export default function BuyerDetailsScreen() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  
  // State to toggle between "Submitting" and "Delivered" views
  const [isDelivered, setIsDelivered] = useState(false);

  const handleConfirmSend = () => {
    setModalVisible(false);
    setIsDelivered(true); // Switch to the final delivered view
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={26} color="#292743" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Buyer Notification</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* --- DELIVERED STATE (Shows after clicking Send Files) --- */}
        {isDelivered && (
          <View style={[styles.card, { borderColor: '#0A3678', borderWidth: 1 }]}>
            <Text style={styles.cardTitle}>2 Files delivered</Text>
            <Text style={styles.deliverySubtext}>View the files. If you are okay with it, click delivered, this means the buyer will be paid and you are okay with the services, or you can click review.</Text>
            
            <View style={styles.reviewBox}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewTitle}>3 Reviews available</Text>
              </View>
              <View style={styles.fileRow}><Text style={styles.fileText}>1 Image</Text><View style={styles.fileActions}><Text style={styles.actionText}>View</Text><Text style={styles.downloadText}>Download</Text></View></View>
              <View style={styles.fileRow}><Text style={styles.fileText}>1 VIDEO</Text><View style={styles.fileActions}><Text style={styles.actionText}>View</Text><Text style={styles.downloadText}>Download</Text></View></View>
              <View style={styles.fileRow}><Text style={styles.fileText}>1 PDF</Text><View style={styles.fileActions}><Text style={styles.actionText}>View</Text><Text style={styles.downloadText}>Download</Text></View></View>
            </View>

            <TouchableOpacity style={styles.acceptButton} onPress={() => setIsDelivered(false)}>
              <Text style={styles.acceptText}>I'm okay with it</Text>
              <Feather name="check" size={18} color="#FFFFFF" style={{ marginLeft: 8 }} />
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.rejectButton, { marginTop: 10 }]}>
              <Feather name="refresh-cw" size={16} color="#0A3678" style={{ marginRight: 8 }} />
              <Text style={styles.rejectText}>1 of 3 Review</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* --- PROJECT TIMELINE --- */}
        <View style={[styles.card, !isDelivered && styles.timelineCard]}>
          <Text style={styles.cardTitle}>Project Timeline</Text>
          <View style={styles.timelineContainer}>
            {TIMELINE_STEPS.map((step, index) => {
              const isLast = index === TIMELINE_STEPS.length - 1;
              // Adjust timeline completion based on state
              const isStepCompleted = isDelivered ? (index < 2) : step.isCompleted;
              const isStepActive = isDelivered ? (index === 2) : (index === 1);

              return (
                <View key={index} style={styles.timelineRow}>
                  <View style={styles.timelineIconCol}>
                    <View style={[styles.timelineDot, isStepActive && styles.timelineDotActive, isStepCompleted && !isStepActive && styles.timelineDotCompleted]}>
                      {isStepActive && <View style={styles.timelineDotInner} />}
                    </View>
                    {!isLast && <View style={[styles.timelineLine, isStepCompleted && styles.timelineLineCompleted]} />}
                  </View>
                  <View style={styles.timelineContent}>
                    <Text style={[styles.timelineTitle, isStepActive && styles.textActive]}>{step.title}</Text>
                    <View style={styles.timelineStatusRow}>
                      <Text style={[styles.timelineStatusText, isStepActive && { color: '#0A3678' }]}>{step.status}</Text>
                      {step.time ? <Text style={styles.timelineTimeText}>{step.time}</Text> : null}
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* --- PROJECT DESCRIPTION --- */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Project description</Text>
          <View style={styles.innerCard}>
            <View style={styles.cardHeader}>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{isDelivered ? 'Delivered' : 'Awaiting Delivery'}</Text>
              </View>
              <Text style={styles.dateText}>Yesterday</Text>
            </View>
            <View style={styles.detailRow}><Text style={styles.detailLabel}>Project Title</Text><Text style={styles.detailValue}>{PROJECT_DATA.title}</Text></View>
            <View style={styles.detailRow}><Text style={styles.detailLabel}>Budget</Text><Text style={styles.detailValue}>{PROJECT_DATA.budget}</Text></View>
            <View style={styles.detailRow}><Text style={styles.detailLabel}>Duration</Text><Text style={styles.detailValue}>{PROJECT_DATA.duration}</Text></View>
            <View style={styles.detailRow}><Text style={styles.detailLabel}>No. of Reviews</Text><Text style={styles.detailValue}>{PROJECT_DATA.reviews}</Text></View>
          </View>
          <Text style={styles.descriptionText}>{PROJECT_DATA.description}</Text>
        </View>

        {/* --- SUBMIT PROJECT (Shows only if not delivered) --- */}
        {!isDelivered && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Submit project</Text>
            <TouchableOpacity style={styles.uploadBox} activeOpacity={0.7}>
              <Feather name="upload-cloud" size={24} color="#666" />
              <Text style={styles.uploadText}>Click to upload or drag and drop</Text>
              <Text style={styles.uploadSubtext}>PNG, JPG or GIF (max. 800x400px)</Text>
            </TouchableOpacity>

            <View style={styles.fileList}>
              <View style={styles.fileRow}><Text style={styles.fileName}>1 image</Text><Ionicons name="close" size={18} color="#FF4D4F" /></View>
              <View style={styles.fileRow}><Text style={styles.fileName}>1 audio</Text><Ionicons name="close" size={18} color="#FF4D4F" /></View>
            </View>

            <View style={styles.warningRow}>
              <Text style={styles.warningText}>Client won't be able to download your work, until after payment</Text>
              <Ionicons name="shield-checkmark-outline" size={20} color="#0A3678" />
            </View>

            <TouchableOpacity style={styles.acceptButton} onPress={() => setModalVisible(true)}>
              <Text style={styles.acceptText}>Send files to the client</Text>
              <Feather name="check" size={18} color="#FFFFFF" style={{ marginLeft: 8 }} />
            </TouchableOpacity>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* --- CONFIRMATION MODAL --- */}
      <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalIconContainer}>
              <Ionicons name="shield-checkmark" size={40} color="#0A3678" />
            </View>
            <Text style={styles.modalTitle}>Send files to the client?</Text>
            <Text style={styles.modalSubtitle}>You are sending 2 files: 1 image, 1 video</Text>
            <View style={styles.modalButtonRow}>
              <TouchableOpacity style={styles.modalNoButton} onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={16} color="#FF4D4F" />
                <Text style={styles.modalNoText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalYesButton} onPress={handleConfirmSend}>
                <Text style={styles.modalYesText}>Yes</Text>
                <Feather name="check" size={16} color="#FFFFFF" style={{ marginLeft: 4 }} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 15 },
  backButton: { width: 40, height: 40, justifyContent: 'center', marginLeft: -10 },
  headerTitle: { fontSize: 16, fontWeight: '600', color: '#292743' },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 30 },
  card: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#EAEAEA', borderRadius: 12, padding: 16, marginBottom: 20 },
  timelineCard: { borderTopWidth: 3, borderTopColor: '#0A3678' },
  cardTitle: { fontSize: 14, fontWeight: '600', color: '#292743', marginBottom: 16 },
  timelineContainer: { paddingLeft: 5 },
  timelineRow: { flexDirection: 'row', marginBottom: 0 },
  timelineIconCol: { alignItems: 'center', width: 24, marginRight: 12 },
  timelineDot: { width: 14, height: 14, borderRadius: 7, borderWidth: 2, borderColor: '#D0D5DD', backgroundColor: '#FFFFFF', zIndex: 2, marginTop: 4 },
  timelineDotActive: { borderColor: '#0A3678', backgroundColor: '#FFFFFF' },
  timelineDotCompleted: { borderColor: '#D0D5DD', backgroundColor: '#D0D5DD' },
  timelineDotInner: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#0A3678', position: 'absolute', top: 2, left: 2 },
  timelineLine: { width: 1.5, flex: 1, backgroundColor: '#EAEAEA', marginTop: 4, marginBottom: 4 },
  timelineLineCompleted: { backgroundColor: '#D0D5DD' },
  timelineContent: { flex: 1, paddingBottom: 24 },
  timelineTitle: { fontSize: 13, fontWeight: '500', color: '#666', marginBottom: 4 },
  textActive: { color: '#0A3678', fontWeight: '600' },
  timelineStatusRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  timelineStatusText: { fontSize: 12, color: '#A0A0A0' },
  timelineTimeText: { fontSize: 11, color: '#A0A0A0' },
  innerCard: { borderWidth: 1, borderColor: '#EAEAEA', borderRadius: 8, padding: 12, marginBottom: 16 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  statusBadge: { backgroundColor: '#E3F0FF', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  statusText: { fontSize: 11, color: '#0A3678', fontWeight: '500' },
  dateText: { fontSize: 11, color: '#A0A0A0' },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  detailLabel: { fontSize: 13, color: '#666' },
  detailValue: { fontSize: 13, color: '#292743', fontWeight: '500' },
  descriptionText: { fontSize: 13, color: '#666', lineHeight: 22, paddingHorizontal: 4 },
  uploadBox: { borderWidth: 1, borderColor: '#D0D5DD', borderStyle: 'dashed', borderRadius: 8, padding: 24, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAFAFA', marginBottom: 16 },
  uploadText: { fontSize: 13, color: '#292743', fontWeight: '500', marginTop: 8 },
  uploadSubtext: { fontSize: 11, color: '#A0A0A0', marginTop: 4 },
  fileList: { marginBottom: 16 },
  fileRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  fileName: { fontSize: 13, color: '#292743' },
  warningRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingRight: 10 },
  warningText: { fontSize: 11, color: '#666', flex: 1, marginRight: 10 },
  acceptButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0A3678', borderRadius: 8, height: 50 },
  acceptText: { color: '#FFFFFF', fontSize: 15, fontWeight: '600' },
  rejectButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#0A3678', borderRadius: 8, height: 50 },
  rejectText: { color: '#0A3678', fontSize: 15, fontWeight: '600' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.4)', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  modalContent: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 24, width: '100%', alignItems: 'center' },
  modalIconContainer: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#F0F4F8', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  modalTitle: { fontSize: 18, fontWeight: '700', color: '#292743', marginBottom: 8, textAlign: 'center' },
  modalSubtitle: { fontSize: 13, color: '#666', textAlign: 'center', marginBottom: 24 },
  modalButtonRow: { flexDirection: 'row', gap: 12, width: '100%' },
  modalNoButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#EAEAEA', borderRadius: 8, height: 45 },
  modalNoText: { color: '#FF4D4F', fontSize: 14, fontWeight: '600', marginLeft: 4 },
  modalYesButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0A3678', borderRadius: 8, height: 45 },
  modalYesText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
  deliverySubtext: { fontSize: 11, color: '#666', lineHeight: 18, marginBottom: 16 },
  reviewBox: { borderWidth: 1, borderColor: '#EAEAEA', borderRadius: 8, padding: 12, marginBottom: 16 },
  reviewHeader: { marginBottom: 12 },
  reviewTitle: { fontSize: 12, fontWeight: '600', color: '#292743' },
  fileText: { fontSize: 12, color: '#292743' },
  fileActions: { flexDirection: 'row', gap: 12 },
  actionText: { fontSize: 11, color: '#0A3678', fontWeight: '500' },
  downloadText: { fontSize: 11, color: '#A0A0A0' },
});