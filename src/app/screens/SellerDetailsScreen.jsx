import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';

const PROJECT_DATA = {
  status: 'Awaiting acceptance', date: 'Yesterday', title: 'Logo Design',
  budget: 'N 50,000', duration: '1-2 Weeks', reviews: 3,
  description: `We're looking for an experienced web developer to create a modern, responsive e-commerce website. The project includes:\n\n• Custom design implementation\n• Product catalog with search and filters\n• Shopping cart and checkout system\n• Payment gateway integration\n• Admin dashboard for inventory management\n• Mobile-responsive design\n• SEO optimization`,
};

export default function SellerDetailsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={26} color="#292743" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Project description</Text>
          
          <View style={styles.innerCard}>
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

          <Text style={styles.descriptionText}>{PROJECT_DATA.description}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.acceptButton} onPress={() => router.back()}>
            <Text style={styles.acceptText}>Accept</Text>
            <Feather name="check" size={18} color="#FFFFFF" style={{ marginLeft: 8 }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.rejectButton} onPress={() => router.back()}>
            <Ionicons name="close" size={18} color="#FF4D4F" style={{ marginRight: 8 }} />
            <Text style={styles.rejectText}>Reject</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { paddingHorizontal: 20, paddingVertical: 15 },
  backButton: { width: 40, height: 40, justifyContent: 'center', marginLeft: -10 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 30 },
  card: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#EAEAEA', borderRadius: 12, padding: 16, marginBottom: 20 },
  cardTitle: { fontSize: 14, fontWeight: '600', color: '#292743', marginBottom: 16 },
  innerCard: { borderWidth: 1, borderColor: '#EAEAEA', borderRadius: 8, padding: 12, marginBottom: 16 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  statusBadge: { backgroundColor: '#E3F0FF', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  statusText: { fontSize: 11, color: '#0A3678', fontWeight: '500' },
  dateText: { fontSize: 11, color: '#A0A0A0' },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  detailLabel: { fontSize: 13, color: '#666' },
  detailValue: { fontSize: 13, color: '#292743', fontWeight: '500' },
  descriptionText: { fontSize: 13, color: '#666', lineHeight: 22, paddingHorizontal: 4 },
  buttonContainer: { gap: 12 },
  acceptButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0A3678', borderRadius: 8, height: 50 },
  acceptText: { color: '#FFFFFF', fontSize: 15, fontWeight: '600' },
  rejectButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#0A3678', borderRadius: 8, height: 50 },
  rejectText: { color: '#292743', fontSize: 15, fontWeight: '600' },
});