import { Feather, FontAwesome5 } from '@expo/vector-icons'; // Swap with react-native-vector-icons if needed
import { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../theme'; // Adjust path

export default function ProfileScreen({ navigation }) {
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [logoutSuccessVisible, setLogoutSuccessVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <Feather name="x" size={20} color={COLORS.white} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <FontAwesome5 name="user-alt" size={40} color={COLORS.white} />
          </View>
          
          <View style={styles.infoRow}>
            <Feather name="user" size={16} color={COLORS.textMuted} style={styles.infoIcon} />
            <Text style={styles.infoLabel}>Name</Text>
            <Text style={styles.infoValue}>Ibrahim Ahmed</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Feather name="mail" size={16} color={COLORS.textMuted} style={styles.infoIcon} />
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>test@mail.com</Text>
          </View>

          <TouchableOpacity style={styles.editBtn}>
            <Feather name="edit-2" size={14} color={COLORS.primaryBlue} />
            <Text style={styles.editBtnText}> Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menuList}>
          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => navigation.navigate('ChangePassword')} // Integrates with your stack
          >
            <Text style={styles.menuText}>Change Password</Text>
            <Feather name="chevron-right" size={20} color={COLORS.textMuted} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.menuItem, { borderBottomWidth: 0 }]} 
            onPress={() => setLogoutModalVisible(true)}
          >
            <Text style={[styles.menuText, { color: COLORS.errorRed }]}>Log Out</Text>
            <Feather name="log-out" size={20} color={COLORS.errorRed} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Logout Confirmation Modal */}
      <Modal transparent visible={logoutModalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <FontAwesome5 name="shield-alt" size={40} color={COLORS.primaryNavy} style={styles.modalIcon} />
            <Text style={styles.modalTitle}>Are you sure you want to log out?</Text>
            <View style={styles.modalRow}>
              <TouchableOpacity style={styles.btnOutline} onPress={() => setLogoutModalVisible(false)}>
                <Text style={styles.btnOutlineText}>Discard</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnNavyHalf} onPress={() => {
                setLogoutModalVisible(false);
                setLogoutSuccessVisible(true);
              }}>
                <Text style={styles.btnText}>Yes <Feather name="chevron-right" size={14} /></Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Logout Success Modal */}
      <Modal transparent visible={logoutSuccessVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <FontAwesome5 name="shield-alt" size={40} color={COLORS.primaryNavy} style={styles.modalIcon} />
            <Text style={styles.modalTitle}>You are now logged out looking forward to seeing you again</Text>
            <TouchableOpacity 
              style={styles.btnNavy} 
              onPress={() => {
                setLogoutSuccessVisible(false);
                // Add your navigation logic here (e.g., navigation.replace('Login'))
              }}
            >
              <Text style={styles.btnText}>Log back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  header: { backgroundColor: COLORS.primaryNavy, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15, justifyContent: 'space-between' },
  headerTitle: { color: COLORS.white, fontSize: 16, fontWeight: '500' },
  content: { padding: 20 },
  profileCard: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 12, padding: 20, alignItems: 'center', marginBottom: 20 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  infoRow: { flexDirection: 'row', width: '100%', alignItems: 'center', marginBottom: 12 },
  infoIcon: { width: 24 },
  infoLabel: { width: 60, color: COLORS.textMuted, fontSize: 14 },
  infoValue: { fontWeight: '500', fontSize: 14, color: COLORS.textMain },
  editBtn: { flexDirection: 'row', alignItems: 'center', marginTop: 10, padding: 5 },
  editBtnText: { color: COLORS.primaryBlue, fontWeight: '600', fontSize: 14 },
  menuList: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, overflow: 'hidden' },
  menuItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  menuText: { fontSize: 14, fontWeight: '500', color: COLORS.textMain },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { backgroundColor: COLORS.white, width: '100%', borderRadius: 16, padding: 25, alignItems: 'center' },
  modalIcon: { marginBottom: 15 },
  modalTitle: { fontSize: 16, color: COLORS.textMain, textAlign: 'center', marginBottom: 20, lineHeight: 22 },
  modalRow: { flexDirection: 'row', gap: 10 },
  btnOutline: { flex: 1, borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, padding: 12, alignItems: 'center' },
  btnOutlineText: { color: COLORS.textMain, fontWeight: '600' },
  btnNavyHalf: { flex: 1, backgroundColor: COLORS.primaryNavy, borderRadius: 8, padding: 12, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },
  btnNavy: { backgroundColor: COLORS.primaryNavy, borderRadius: 8, padding: 15, alignItems: 'center', width: '100%', marginTop: 10 },
  btnText: { color: COLORS.white, fontSize: 16, fontWeight: '600' },
});