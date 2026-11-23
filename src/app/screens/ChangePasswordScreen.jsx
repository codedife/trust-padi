import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../theme'; // Adjust path

export default function ChangePasswordScreen({ navigation }) {
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [errors, setErrors] = useState({ old: false, confirm: false });
  const [successModal, setSuccessModal] = useState(false);

  // Example integration logic. Replace with your API call
  const handleSave = async () => {
    let hasError = false;
    let newErrors = { old: false, confirm: false };

    // Basic validation - replace with your actual API response handling
    if (oldPass.length < 5) { // Dummy check
      newErrors.old = true;
      hasError = true;
    }
    if (newPass !== confirmPass) {
      newErrors.confirm = true;
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      // Simulate API Call
      // await api.changePassword(oldPass, newPass);
      setSuccessModal(true);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { marginLeft: 15 }]}>Change password</Text>
      </View>

      <ScrollView style={styles.formContent}>
        {/* Old Password */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Old Password</Text>
          <View style={[styles.inputWrapper, errors.old && styles.inputError]}>
            <TextInput
              style={styles.input}
              placeholder="Enter Old Password"
              secureTextEntry={!showOld}
              value={oldPass}
              onChangeText={setOldPass}
            />
            <TouchableOpacity onPress={() => setShowOld(!showOld)}>
              <Feather name={showOld ? "eye" : "eye-off"} size={18} color={COLORS.textMuted} />
            </TouchableOpacity>
          </View>
          {errors.old && <Text style={styles.errorText}>Old password incorrect</Text>}
        </View>

        {/* New Password */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>New Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter New Password"
              secureTextEntry={!showNew}
              value={newPass}
              onChangeText={setNewPass}
            />
            <TouchableOpacity onPress={() => setShowNew(!showNew)}>
              <Feather name={showNew ? "eye" : "eye-off"} size={18} color={COLORS.textMuted} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Confirm Password */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Confirm Password</Text>
          <View style={[styles.inputWrapper, errors.confirm && styles.inputError]}>
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry={!showConfirm}
              value={confirmPass}
              onChangeText={setConfirmPass}
            />
            <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
              <Feather name={showConfirm ? "eye" : "eye-off"} size={18} color={COLORS.textMuted} />
            </TouchableOpacity>
          </View>
          {errors.confirm && <Text style={styles.errorText}>The two password field does not match</Text>}
        </View>

        <TouchableOpacity style={styles.btnNavy} onPress={handleSave}>
          <Text style={styles.btnText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Success Modal */}
      <Modal transparent visible={successModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <FontAwesome5 name="shield-alt" size={40} color={COLORS.primaryNavy} style={styles.modalIcon} />
            <Text style={styles.modalTitle}>Password changed succefully</Text>
            <TouchableOpacity 
              style={[styles.btnNavy, { width: '100%' }]} 
              onPress={() => {
                setSuccessModal(false);
                navigation.navigate('Profile'); // Return to home
              }}
            >
              <Text style={styles.btnText}>Ok & home page  <Feather name="chevron-right" size={14} /></Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  header: { backgroundColor: COLORS.primaryNavy, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15 },
  headerTitle: { color: COLORS.white, fontSize: 16, fontWeight: '500' },
  formContent: { padding: 20 },
  formGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 8, color: COLORS.textMain },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, paddingHorizontal: 15 },
  inputError: { borderColor: COLORS.errorRed },
  input: { flex: 1, paddingVertical: 12, fontSize: 14 },
  errorText: { color: COLORS.errorRed, fontSize: 12, marginTop: 5 },
  btnNavy: { backgroundColor: COLORS.primaryNavy, borderRadius: 8, padding: 15, alignItems: 'center', marginTop: 10, flexDirection: 'row', justifyContent: 'center' },
  btnText: { color: COLORS.white, fontSize: 16, fontWeight: '600' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { backgroundColor: COLORS.white, width: '100%', borderRadius: 16, padding: 25, alignItems: 'center' },
  modalIcon: { marginBottom: 15 },
  modalTitle: { fontSize: 16, color: COLORS.textMain, textAlign: 'center', marginBottom: 20, lineHeight: 22 },
});