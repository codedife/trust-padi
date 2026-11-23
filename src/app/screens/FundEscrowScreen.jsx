import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Modal,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons, Feather, FontAwesome5 } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';

const PROJECT_DATA = {
  status: 'Awaiting acceptance',
  date: 'Yesterday',
  title: 'Logo Design',
  budget: '₦ 50,000',
  duration: '1-2 Weeks',
  reviews: 3,
};

const COSTS = {
  amount: '₦50,000.00',
  fee: '₦1,000.00',
  vat: '₦75.00',
  total: '₦51,075',
};

export default function FundEscrowScreen() {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState('wallet'); // 'wallet', 'card', 'bank'
  
  // Modal State
  const [modalState, setModalState] = useState('none'); // 'none', 'confirm', 'loading', 'success'
  const [generatedLink, setGeneratedLink] = useState('');

  const handleFundEscrow = () => {
    setModalState('confirm');
  };

  const executePayment = () => {
    setModalState('loading');
    // Simulate network request
    setTimeout(() => {
      setGeneratedLink('xythsysusnthwujw');
      setModalState('success');
    }, 2000);
  };

  const handleCopy = async () => {
    await Clipboard.setStringAsync(generatedLink);
    Alert.alert('Copied!', 'Project link copied to clipboard.');
  };

  const handleShare = () => {
    // Add native Share logic here
    Alert.alert('Share', 'Native share sheet would open here.');
  };

  // --- Custom Radio Button Component ---
  const RadioButton = ({ label, value, children }) => {
    const isSelected = paymentMethod === value;
    return (
      <View style={styles.radioContainer}>
        <TouchableOpacity 
          style={styles.radioHeader} 
          onPress={() => setPaymentMethod(value)}
          activeOpacity={0.7}
        >
          <View style={[styles.radioCircle, isSelected && styles.radioCircleActive]}>
            {isSelected && <View style={styles.radioInnerCircle} />}
          </View>
          <Text style={[styles.radioLabel, isSelected && styles.radioLabelActive]}>{label}</Text>
        </TouchableOpacity>
        {isSelected && children}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={26} color="#292743" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Money to Escrow</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* Progress Bar (Simplified mockup) */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressLineActive} />
        <View style={styles.progressLineActive} />
        <View style={styles.progressLineInactive} />
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          {/* Top Project Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{PROJECT_DATA.status}</Text>
              </View>
              <Text style={styles.dateText}>{PROJECT_DATA.date}</Text>
            </View>
            <View style={styles.detailRow}><Text style={styles.detailLabel}>Project Title</Text><Text style={styles.detailValue}>{PROJECT_DATA.title}</Text></View>
            <View style={styles.detailRow}><Text style={styles.detailLabel}>Budget</Text><Text style={styles.detailValue}>{PROJECT_DATA.budget}</Text></View>
            <View style={styles.detailRow}><Text style={styles.detailLabel}>Duration</Text><Text style={styles.detailValue}>{PROJECT_DATA.duration}</Text></View>
            <View style={styles.detailRow}><Text style={styles.detailLabel}>No. of Reviews</Text><Text style={styles.detailValue}>{PROJECT_DATA.reviews}</Text></View>
          </View>

          {/* Payment Information Section */}
          <Text style={styles.sectionTitle}>Payment Information</Text>
          <View style={styles.card}>
            <Text style={styles.payWithText}>Pay With</Text>

            {/* 1. Trustpadi Wallet */}
            <RadioButton label="Trustpadi Wallet" value="wallet">
              <View style={styles.methodContent}>
                <Text style={styles.walletBalance}>Trustpadi Wallet balance: ₦0.00</Text>
                <Text style={styles.errorText}>You need ₦51,075 to fund your project</Text>
                <TouchableOpacity style={styles.topUpBtn}>
                  <Text style={styles.topUpText}>Top up wallet</Text>
                  <Feather name="arrow-right" size={14} color="#0A3678" />
                </TouchableOpacity>
              </View>
            </RadioButton>

            {/* 2. Debit or Credit Card */}
            <RadioButton label="Debit or Credit Card" value="card">
              <View style={styles.methodContent}>
                <Text style={styles.inputLabel}>Cardholder Name</Text>
                <TextInput style={styles.input} placeholder="Alexandra McPherson Grey" placeholderTextColor="#A0A0A0" />
                
                <Text style={styles.inputLabel}>Card Number</Text>
                <TextInput style={styles.input} placeholder="0001 2345 6789 1234" placeholderTextColor="#A0A0A0" keyboardType="numeric" />
                
                <View style={styles.rowInputs}>
                  <View style={{ flex: 1, marginRight: 10 }}>
                    <Text style={styles.inputLabel}>Expiry Date</Text>
                    <TextInput style={styles.input} placeholder="06/2024" placeholderTextColor="#A0A0A0" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.inputLabel}>CVV</Text>
                    <TextInput style={styles.input} placeholder="123" placeholderTextColor="#A0A0A0" keyboardType="numeric" secureTextEntry />
                  </View>
                </View>
              </View>
            </RadioButton>

            {/* 3. Bank Transfer */}
            <RadioButton label="Bank transfer" value="bank">
              <View style={styles.methodContent}>
                <Text style={styles.bankTitle}>Transfer to this account</Text>
                <View style={styles.detailRow}><Text style={styles.detailLabel}>Bank Name</Text><Text style={styles.detailValue}>Providus Bank</Text></View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Account Number</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[styles.detailValue, { marginRight: 8 }]}>2047563891</Text>
                    <Feather name="copy" size={14} color="#0A3678" />
                  </View>
                </View>
                <View style={styles.detailRow}><Text style={styles.detailLabel}>Account Name</Text><Text style={styles.detailValue}>TriPdi Escrow LTD</Text></View>
              </View>
            </RadioButton>
          </View>

          {/* Cost Breakdown */}
          <View style={styles.card}>
            <View style={styles.detailRow}><Text style={styles.detailLabel}>Project Amount</Text><Text style={styles.detailValue}>{COSTS.amount}</Text></View>
            <View style={styles.detailRow}><Text style={styles.detailLabel}>Escrow Fee</Text><Text style={styles.detailValue}>{COSTS.fee}</Text></View>
            <View style={styles.detailRow}><Text style={styles.detailLabel}>VAT</Text><Text style={styles.detailValue}>{COSTS.vat}</Text></View>
            <View style={[styles.detailRow, { marginTop: 10, borderTopWidth: 1, borderColor: '#EAEAEA', paddingTop: 15 }]}>
              <Text style={[styles.detailLabel, { fontWeight: 'bold', color: '#292743' }]}>Total</Text>
              <Text style={[styles.detailValue, { fontSize: 16 }]}>{COSTS.total}</Text>
            </View>

            <View style={styles.securityNote}>
              <Text style={styles.securityText}>Your funds are safely held in escrow until you approve delivery.</Text>
              <Ionicons name="shield-checkmark" size={24} color="#0A3678" />
            </View>
          </View>

          <TouchableOpacity style={styles.primaryButton} onPress={handleFundEscrow}>
            <Text style={styles.primaryButtonText}>Proceed</Text>
            <Feather name="arrow-right" size={18} color="#FFFFFF" style={{ marginLeft: 8 }} />
          </TouchableOpacity>

          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* --- MODALS --- */}
      
      {/* 1. Confirmation Modal */}
      <Modal transparent visible={modalState === 'confirm'} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="shield-checkmark" size={40} color="#0A3678" style={{ marginBottom: 15 }} />
            <Text style={styles.modalTitle}>Fund Escrow project?</Text>
            <Text style={styles.modalSubtitle}>Are you sure you want to fund this project? The money will be locked in your escrow account and released to the seller (talent) after delivery.</Text>
            <View style={styles.modalRow}>
              <TouchableOpacity style={styles.btnOutline} onPress={() => setModalState('none')}>
                <Ionicons name="close" size={16} color="#FF4D4F" />
                <Text style={[styles.btnOutlineText, { color: '#FF4D4F' }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnNavyHalf} onPress={executePayment}>
                <Text style={styles.btnText}>Fund Project</Text>
                <Feather name="check" size={14} color="#FFFFFF" style={{ marginLeft: 5 }} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* 2. Loading Modal */}
      <Modal transparent visible={modalState === 'loading'} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { paddingVertical: 40 }]}>
            <ActivityIndicator size="large" color="#0A3678" />
          </View>
        </View>
      </Modal>

      {/* 3. Success Modal */}
      <Modal transparent visible={modalState === 'success'} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="shield-checkmark" size={40} color="#0A3678" style={{ marginBottom: 15 }} />
            <Text style={styles.modalTitle}>Project Link generated</Text>
            <Text style={styles.modalSubtitle}>Copy and share link to your seller (talent)</Text>
            
            <Text style={[styles.inputLabel, { alignSelf: 'flex-start' }]}>Project link</Text>
            <View style={styles.linkRow}>
              <View style={styles.linkInputContainer}>
                <Text style={styles.linkText} numberOfLines={1}>{generatedLink}</Text>
              </View>
              <TouchableOpacity style={styles.copyButton} onPress={handleCopy}>
                <Text style={styles.copyText}>Copy</Text>
                <Feather name="copy" size={16} color="#0A3678" style={{ marginLeft: 6 }} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
              <Text style={styles.shareButtonText}>Share</Text>
              <Feather name="share-2" size={16} color="#0A3678" style={{ marginLeft: 8 }} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnNavy} onPress={() => router.push('/profile/change-password')}>
              <Text style={styles.btnText}>Go to Escrow Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#FFFFFF' },
  backButton: { width: 40, height: 40, justifyContent: 'center', marginLeft: -10 },
  headerTitle: { fontSize: 16, fontWeight: '600', color: '#292743' },
  
  // Progress Bar
  progressBarContainer: { flexDirection: 'row', height: 4, backgroundColor: '#E0E0E0', marginHorizontal: 20, marginBottom: 15, borderRadius: 2 },
  progressLineActive: { flex: 1, backgroundColor: '#0A3678' },
  progressLineInactive: { flex: 1, backgroundColor: '#E0E0E0' },

  scrollContent: { paddingHorizontal: 20, paddingBottom: 30 },
  card: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#EAEAEA', borderRadius: 12, padding: 16, marginBottom: 20 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  statusBadge: { backgroundColor: '#F0F4F8', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  statusText: { fontSize: 11, color: '#0A3678', fontWeight: '500' },
  dateText: { fontSize: 11, color: '#A0A0A0' },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  detailLabel: { fontSize: 13, color: '#666' },
  detailValue: { fontSize: 13, color: '#292743', fontWeight: '500' },

  // Payment Section
  sectionTitle: { fontSize: 15, fontWeight: '600', color: '#292743', marginBottom: 10, paddingLeft: 5 },
  payWithText: { fontSize: 14, fontWeight: '600', color: '#292743', marginBottom: 15 },
  radioContainer: { marginBottom: 15 },
  radioHeader: { flexDirection: 'row', alignItems: 'center' },
  radioCircle: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#D0D5DD', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  radioCircleActive: { borderColor: '#0A3678' },
  radioInnerCircle: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#0A3678' },
  radioLabel: { fontSize: 14, color: '#292743' },
  radioLabelActive: { fontWeight: '600' },
  methodContent: { marginTop: 12, marginLeft: 32, paddingBottom: 10 },

  // Wallet specific
  walletBalance: { fontSize: 12, color: '#666', marginBottom: 4 },
  errorText: { fontSize: 11, color: '#FF4D4F', marginBottom: 10 },
  topUpBtn: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#0A3678', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6, alignSelf: 'flex-start' },
  topUpText: { fontSize: 12, color: '#0A3678', fontWeight: '600', marginRight: 6 },

  // Card specific
  inputLabel: { fontSize: 12, color: '#292743', marginBottom: 6, fontWeight: '500' },
  input: { height: 45, borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8, paddingHorizontal: 12, fontSize: 14, color: '#292743', marginBottom: 12 },
  rowInputs: { flexDirection: 'row', justifyContent: 'space-between' },

  // Bank specific
  bankTitle: { fontSize: 13, fontWeight: '600', color: '#292743', marginBottom: 12 },

  // Security Note
  securityNote: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F9FA', padding: 12, borderRadius: 8, marginTop: 10 },
  securityText: { flex: 1, fontSize: 11, color: '#666', marginRight: 10, lineHeight: 16 },

  // Primary Button
  primaryButton: { height: 50, backgroundColor: '#0A3678', borderRadius: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  primaryButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },

  // Modal Styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { backgroundColor: '#FFFFFF', width: '100%', borderRadius: 16, padding: 25, alignItems: 'center' },
  modalTitle: { fontSize: 16, color: '#292743', fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  modalSubtitle: { fontSize: 13, color: '#666', textAlign: 'center', marginBottom: 20, lineHeight: 20 },
  modalRow: { flexDirection: 'row', gap: 10, width: '100%' },
  btnOutline: { flex: 1, borderWidth: 1, borderColor: '#EAEAEA', borderRadius: 8, padding: 12, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },
  btnOutlineText: { color: '#292743', fontWeight: '600', marginLeft: 5 },
  btnNavyHalf: { flex: 1, backgroundColor: '#0A3678', borderRadius: 8, padding: 12, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },
  btnNavy: { backgroundColor: '#0A3678', borderRadius: 8, padding: 15, alignItems: 'center', width: '100%', marginTop: 10 },
  btnText: { color: '#FFFFFF', fontSize: 15, fontWeight: '600' },

  // Link Input Styles (Success Modal)
  linkRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 10, width: '100%', marginBottom: 15 },
  linkInputContainer: { flex: 1, height: 45, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#EAEAEA', borderRadius: 8, paddingHorizontal: 15, justifyContent: 'center' },
  linkText: { fontSize: 13, color: '#666' },
  copyButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#0A3678', borderRadius: 8, paddingHorizontal: 15, height: 45 },
  copyText: { color: '#0A3678', fontSize: 13, fontWeight: '600' },
  shareButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#0A3678', borderRadius: 8, height: 45, width: '100%', marginBottom: 10 },
  shareButtonText: { color: '#0A3678', fontSize: 14, fontWeight: '600' },
});