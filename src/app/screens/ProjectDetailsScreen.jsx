import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Share,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';

// Mock Project Data
const PROJECT_DATA = {
  status: 'Awaiting acceptance',
  date: 'Yesterday',
  title: 'Logo Design',
  budget: 'N 50,000',
  duration: '1-2 Weeks',
  reviews: 3,
  link: 'xythsysusnthwujw',
  description: `We're looking for an experienced web developer to create a modern, responsive e-commerce website. The project includes:
  
• Custom design implementation
• Product catalog with search and filters
• Shopping cart and checkout system
• Payment gateway integration
• Admin dashboard for inventory management
• Mobile-responsive design
• SEO optimization`,
};

const TIMELINE_STEPS = [
  { title: 'Escrow project created', status: 'Created', time: '5 min ago', isCompleted: true, isActive: true },
  { title: 'Awaiting Acceptance', status: 'Pending', time: '5 min ago', isCompleted: true, isActive: false },
  { title: 'Awaiting Delivery', status: 'Pending', time: '', isCompleted: false, isActive: false },
  { title: 'Payment Released', status: 'Pending', time: '', isCompleted: false, isActive: false },
];

export default function ProjectDetailsScreen() {
  const router = useRouter();

  const handleCopy = async () => {
    await Clipboard.setStringAsync(PROJECT_DATA.link);
    Alert.alert('Copied!', 'Project link copied to clipboard.');
  };

  const onShare = async () => {
    try {
      await Share.share({
        message: `Check out this project on Trustpadi!\n\nLink: ${PROJECT_DATA.link}`,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={26} color="#292743" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* --- PROJECT TIMELINE --- */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Project Timeline</Text>
          
          <View style={styles.timelineContainer}>
            {TIMELINE_STEPS.map((step, index) => {
              const isLast = index === TIMELINE_STEPS.length - 1;
              
              return (
                <View key={index} style={styles.timelineRow}>
                  {/* Left side: Icon and Line */}
                  <View style={styles.timelineIconCol}>
                    <View style={[
                      styles.timelineDot, 
                      step.isActive && styles.timelineDotActive,
                      step.isCompleted && !step.isActive && styles.timelineDotCompleted
                    ]}>
                      {step.isActive && <View style={styles.timelineDotInner} />}
                    </View>
                    {!isLast && <View style={styles.timelineLine} />}
                  </View>

                  {/* Right side: Text */}
                  <View style={styles.timelineContent}>
                    <Text style={[styles.timelineTitle, step.isActive && styles.textActive]}>
                      {step.title}
                    </Text>
                    <View style={styles.timelineStatusRow}>
                      <Text style={[styles.timelineStatusText, step.isActive && { color: '#0A3678' }]}>
                        {step.status}
                      </Text>
                      {step.time ? (
                        <Text style={styles.timelineTimeText}>{step.time}</Text>
                      ) : null}
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
                <Text style={styles.statusText}>{PROJECT_DATA.status}</Text>
              </View>
              <Text style={styles.dateText}>{PROJECT_DATA.date}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Project Title</Text>
              <Text style={styles.detailValue}>{PROJECT_DATA.title}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Budget</Text>
              <Text style={styles.detailValue}>{PROJECT_DATA.budget}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Duration</Text>
              <Text style={styles.detailValue}>{PROJECT_DATA.duration}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>No. of Reviews</Text>
              <Text style={styles.detailValue}>{PROJECT_DATA.reviews}</Text>
            </View>
          </View>

          <View style={styles.descriptionBox}>
            <Text style={styles.descriptionText}>{PROJECT_DATA.description}</Text>
          </View>
        </View>

        {/* --- PROJECT LINK --- */}
        <View style={styles.linkSection}>
          <Text style={styles.linkLabel}>Project link</Text>
          <View style={styles.linkRow}>
            <View style={styles.linkInputContainer}>
              <Text style={styles.linkText} numberOfLines={1}>{PROJECT_DATA.link}</Text>
            </View>
            <TouchableOpacity style={styles.copyButton} onPress={handleCopy}>
              <Text style={styles.copyText}>Copy</Text>
              <Feather name="link" size={16} color="#0A3678" style={{ marginLeft: 6 }} />
            </TouchableOpacity>
          </View>
        </View>

        {/* --- SHARE BUTTON --- */}
        <TouchableOpacity style={styles.shareButton} onPress={onShare}>
          <Text style={styles.shareButtonText}>Share</Text>
          <Feather name="link" size={18} color="#0A3678" style={{ marginLeft: 8 }} />
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginLeft: -10,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#292743',
    marginBottom: 16,
  },

  // Timeline Styles
  timelineContainer: {
    paddingLeft: 5,
  },
  timelineRow: {
    flexDirection: 'row',
    marginBottom: 0, // Handled by content padding
  },
  timelineIconCol: {
    alignItems: 'center',
    width: 24,
    marginRight: 12,
  },
  timelineDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#D0D5DD',
    backgroundColor: '#FFFFFF',
    zIndex: 2,
    marginTop: 4,
  },
  timelineDotActive: {
    borderColor: '#0A3678',
    backgroundColor: '#FFFFFF',
  },
  timelineDotCompleted: {
    borderColor: '#A0A0A0',
    backgroundColor: '#A0A0A0',
  },
  timelineDotInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#0A3678',
    position: 'absolute',
    top: 2,
    left: 2,
  },
  timelineLine: {
    width: 1.5,
    flex: 1,
    backgroundColor: '#EAEAEA',
    marginTop: 4,
    marginBottom: 4,
  },
  timelineContent: {
    flex: 1,
    paddingBottom: 24,
  },
  timelineTitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#666',
    marginBottom: 4,
  },
  textActive: {
    color: '#0A3678',
    fontWeight: '600',
  },
  timelineStatusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timelineStatusText: {
    fontSize: 12,
    color: '#A0A0A0',
  },
  timelineTimeText: {
    fontSize: 11,
    color: '#A0A0A0',
  },

  // Description Styles
  innerCard: {
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusBadge: {
    backgroundColor: '#F0F4F8',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    color: '#0A3678',
    fontWeight: '500',
  },
  dateText: {
    fontSize: 11,
    color: '#A0A0A0',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 13,
    color: '#666',
  },
  detailValue: {
    fontSize: 13,
    color: '#292743',
    fontWeight: '500',
  },
  descriptionBox: {
    paddingHorizontal: 4,
  },
  descriptionText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 22,
  },

  // Link Styles
  linkSection: {
    marginBottom: 24,
  },
  linkLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#292743',
    marginBottom: 10,
  },
  linkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  linkInputContainer: {
    flex: 1,
    height: 45,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 8,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  linkText: {
    fontSize: 13,
    color: '#666',
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#0A3678',
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 45,
  },
  copyText: {
    color: '#0A3678',
    fontSize: 13,
    fontWeight: '600',
  },

  // Share Button
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#0A3678',
    borderRadius: 8,
    height: 50,
  },
  shareButtonText: {
    color: '#0A3678',
    fontSize: 15,
    fontWeight: '600',
  },
});