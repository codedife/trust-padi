import React, { useState, useMemo } from 'react';
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

const CATEGORIES = ['All', 'Awaiting acceptance', 'Awaiting Delivery', 'Delivered', 'Disputed'];

// Mock Data
const MOCK_PROJECTS = [
  { id: '1', title: 'Logo Design', budget: 'N 50,000', duration: '1-2 Weeks', reviews: 3, status: 'Awaiting acceptance', date: 'Yesterday' },
  { id: '2', title: 'Website Redesign', budget: 'N 150,000', duration: '3-4 Weeks', reviews: 0, status: 'Awaiting Delivery', date: '2 days ago' },
  { id: '3', title: 'SEO Optimization', budget: 'N 30,000', duration: '1 Week', reviews: 5, status: 'Delivered', date: 'Last week' },
];

export default function ProjectsScreen() {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Logic to filter projects safely
  const filteredProjects = useMemo(() => {
    return MOCK_PROJECTS.filter((project) => {
      const safeSearchQuery = (searchQuery || '').toLowerCase();
      const safeProjectTitle = (project.title || '').toLowerCase();
      
      const matchesSearch = safeProjectTitle.includes(safeSearchQuery);
      const matchesCategory = selectedCategory === 'All' || project.status === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Working Share Button
  const onShare = async (project) => {
    try {
      await Share.share({
        message: `Check out this project on Trustpadi!\n\nTitle: ${project.title}\nBudget: ${project.budget}\nStatus: ${project.status}`,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#292743" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My project</Text>
        <View style={{ width: 24 }} /> {/* Spacer */}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        
        {/* Search and Date Row */}
        <View style={styles.searchRow}>
          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={18} color="#A0A0A0" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search here..."
              placeholderTextColor="#A0A0A0"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity 
            style={styles.dateButton}
            onPress={() => Alert.alert('Date Picker', 'Date filter will go here!')}
          >
            <Feather name="calendar" size={16} color="#292743" />
            <Text style={styles.dateButtonText}>Select dates</Text>
          </TouchableOpacity>
        </View>

        {/* Project Category Dropdown */}
        <Text style={styles.label}>Project category</Text>
        
        <TouchableOpacity 
          style={[styles.dropdownTrigger, dropdownOpen && styles.dropdownTriggerActive]} 
          onPress={() => setDropdownOpen(!dropdownOpen)}
          activeOpacity={0.8}
        >
          <Text style={[styles.dropdownText, selectedCategory !== 'All' && { color: '#292743', fontWeight: '500' }]}>
            {selectedCategory}
          </Text>
          <Ionicons name={dropdownOpen ? "chevron-up" : "chevron-down"} size={20} color="#292743" />
        </TouchableOpacity>

        {/* Dropdown Options */}
        {dropdownOpen && (
          <View style={styles.dropdownMenu}>
            {CATEGORIES.map((cat, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.dropdownItem}
                onPress={() => {
                  setSelectedCategory(cat);
                  setDropdownOpen(false);
                }}
              >
                <Text style={[
                  styles.dropdownItemText, 
                  selectedCategory === cat && styles.dropdownItemTextActive
                ]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* --- DYNAMIC PROJECT LIST --- */}
        {filteredProjects.length > 0 ? (
          <View style={{ marginTop: 20 }}>
            {filteredProjects.map((project) => (
              // UPDATED: Changed View to TouchableOpacity and added onPress
              <TouchableOpacity 
                key={project.id} 
                style={styles.projectCard}
                activeOpacity={0.7}
                onPress={() => router.push('/projects/project-details')}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>{project.status}</Text>
                  </View>
                  <Text style={styles.dateText}>{project.date}</Text>
                </View>

                <View style={styles.cardRow}>
                  <Text style={styles.cardLabel}>Project Title</Text>
                  <Text style={styles.cardValue}>{project.title}</Text>
                </View>
                <View style={styles.cardRow}>
                  <Text style={styles.cardLabel}>Budget</Text>
                  <Text style={styles.cardValue}>{project.budget}</Text>
                </View>
                <View style={styles.cardRow}>
                  <Text style={styles.cardLabel}>Duration</Text>
                  <Text style={styles.cardValue}>{project.duration}</Text>
                </View>
                <View style={styles.cardRow}>
                  <Text style={styles.cardLabel}>No. of Reviews</Text>
                  <Text style={styles.cardValue}>{project.reviews}</Text>
                </View>

                {/* Share button inside the card */}
                <TouchableOpacity style={styles.shareButton} onPress={() => onShare(project)}>
                  <Text style={styles.shareButtonText}>Share</Text>
                  <Feather name="link" size={16} color="#0A3678" style={{ marginLeft: 8 }} />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          /* --- EMPTY STATE --- */
          <View style={styles.emptyState}>
            <View style={styles.emptyIconContainer}>
              <Ionicons name="document-text-outline" size={60} color="#D0D5DD" />
            </View>
            <Text style={styles.emptyTitle}>No project found</Text>
            <Text style={styles.emptySubtitle}>
              Click "create new project" button to get started in adding your first product to your store
            </Text>
            <TouchableOpacity 
              style={styles.createButton}
              // UPDATED: Prevents crash since route doesn't exist yet
              onPress={() => Alert.alert('Coming Soon', 'Create project screen will be implemented here.')} 
            >
              <Ionicons name="add" size={20} color="#FFFFFF" />
              <Text style={styles.createButtonText}>Create new project</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
  },
  backButton: { padding: 5, marginLeft: -5 },
  headerTitle: { fontSize: 16, fontWeight: '600', color: '#666' },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },
  
  // Search Row
  searchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 25,
    gap: 10,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 45,
  },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 14, color: '#292743' },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 45,
  },
  dateButtonText: { marginLeft: 8, fontSize: 14, color: '#292743', fontWeight: '500' },

  // Dropdown
  label: { fontSize: 14, color: '#292743', marginBottom: 8 },
  dropdownTrigger: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 45,
    zIndex: 2,
  },
  dropdownTriggerActive: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: 0,
  },
  dropdownText: { fontSize: 14, color: '#A0A0A0' },
  dropdownMenu: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderTopWidth: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    position: 'absolute',
    top: 165, 
    left: 20,
    right: 20,
    zIndex: 10, 
    paddingVertical: 10,
    elevation: 4, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dropdownItem: { paddingVertical: 12, paddingHorizontal: 15 },
  dropdownItemText: { fontSize: 14, color: '#292743' },
  dropdownItemTextActive: { fontWeight: '600', color: '#0A3678' },

  // Project Card
  projectCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  statusBadge: {
    backgroundColor: '#F0F4F8',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: { fontSize: 11, color: '#0A3678', fontWeight: '500' },
  dateText: { fontSize: 11, color: '#A0A0A0' },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cardLabel: { fontSize: 13, color: '#666' },
  cardValue: { fontSize: 13, color: '#292743', fontWeight: '500' },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#0A3678',
    borderRadius: 8,
    height: 40,
    marginTop: 10,
  },
  shareButtonText: { color: '#0A3678', fontSize: 14, fontWeight: '600' },

  // Empty State
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
    paddingHorizontal: 20,
  },
  emptyIconContainer: {
    width: 100,
    height: 100,
    backgroundColor: '#F4F6F9',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#292743',
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 30,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0A3678',
    paddingHorizontal: 20,
    height: 45,
    borderRadius: 8,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
});