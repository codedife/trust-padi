import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function NotificationListScreen() {
  const router = useRouter();
  const [hasNotifications, setHasNotifications] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={26} color="#292743" />
        </TouchableOpacity>
        {/* Tap title to toggle Empty state for testing */}
        <TouchableOpacity onPress={() => setHasNotifications(!hasNotifications)}>
          <Text style={styles.headerTitle}>Notification</Text>
        </TouchableOpacity>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {hasNotifications ? (
          <View style={{ gap: 12 }}>
            {/* Seller Notification */}
            <TouchableOpacity 
              style={styles.card} 
              onPress={() => router.push('/notifications/seller-details')}
            >
              <View style={styles.cardTop}>
                <View style={styles.titleRow}>
                  <View style={styles.blueDot} />
                  <Text style={styles.title}>Logo Design project proposal</Text>
                </View>
                <Text style={styles.viewText}>View</Text>
              </View>
              <View style={styles.cardBottom}>
                <Text style={styles.subtitle}>Ibrahim invited you to a project</Text>
                <Text style={styles.time}>5 mins ago</Text>
              </View>
            </TouchableOpacity>

            {/* Buyer Notification */}
            <TouchableOpacity 
              style={styles.card} 
              onPress={() => router.push('/notifications/buyer-details')}
            >
              <View style={styles.cardTop}>
                <View style={styles.titleRow}>
                  <View style={styles.blueDot} />
                  <Text style={styles.title}>Logo Design project accepted</Text>
                </View>
                <Text style={styles.viewText}>View</Text>
              </View>
              <View style={styles.cardBottom}>
                <Text style={styles.subtitle}>Ibrahim invited you to a project</Text>
                <Text style={styles.time}>5 mins ago</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          /* Empty State */
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Ionicons name="document-text-outline" size={60} color="#D0D5DD" />
            </View>
            <Text style={styles.emptyText}>No notification yet</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 15 },
  backButton: { width: 40, height: 40, justifyContent: 'center', marginLeft: -10 },
  headerTitle: { fontSize: 16, fontWeight: '600', color: '#292743' },
  scrollContent: { paddingHorizontal: 20, paddingTop: 10 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#EAEAEA' },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  titleRow: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  blueDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#3B82F6', marginRight: 8 },
  title: { fontSize: 13, fontWeight: '600', color: '#0A3678' },
  viewText: { fontSize: 12, color: '#0A3678' },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 16 },
  subtitle: { fontSize: 12, color: '#666', flex: 1 },
  time: { fontSize: 11, color: '#A0A0A0' },
  emptyState: { alignItems: 'center', justifyContent: 'center', marginTop: 100 },
  emptyIcon: { width: 100, height: 100, backgroundColor: '#F4F6F9', borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  emptyText: { fontSize: 16, fontWeight: '500', color: '#292743' },
});