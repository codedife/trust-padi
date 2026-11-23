import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; 
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
// Import the Slide animations and ReduceMotion
import Animated, { 
  SlideInRight, 
  SlideOutLeft, 
  SlideInLeft, 
  SlideOutRight,
  ReduceMotion 
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const ONBOARDING_DATA = [
  {
    id: '1',
    title: 'Escrow',
    description: 'Every transaction deserves trust. Safer transactions start with verified identities and real transparency.',
    image: require('../../../assets/images/escrow.png'),
  },
  {
    id: '2',
    title: 'Check Scam',
    description: 'Instantly find out if an account, number, or profile has been reported.',
    image: require('../../../assets/images/checkscam.png'),
  },
  {
    id: '3',
    title: 'Report Scam',
    description: 'Instantly report an account, number, or profile if you find anything suspicious.',
    image: require('../../../assets/images/reportscam.png'),
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  // Track the direction of navigation
  const [direction, setDirection] = useState('forward');

  const handleNext = () => {
    if (currentIndex < ONBOARDING_DATA.length - 1) {
      setDirection('forward');
      setCurrentIndex(currentIndex + 1);
    } else {
        router.replace('/auth/signin'); // <-- UPDATED // Navigate to SignIn screen after the last onboarding screen
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setDirection('backward');
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSkip = () => {
      router.replace('/auth/signin'); // <-- UPDATED// Navigate to SignIn screen when skipping
  };

  const currentData = ONBOARDING_DATA[currentIndex];

  // Determine which animation to play. 
  // We use .duration(400) for speed, and .reduceMotion(ReduceMotion.Never) to ignore device settings.
  const enteringAnimation = direction === 'forward' 
    ? SlideInRight.duration(400).reduceMotion(ReduceMotion.Never) 
    : SlideInLeft.duration(400).reduceMotion(ReduceMotion.Never);
    
  const exitingAnimation = direction === 'forward' 
    ? SlideOutLeft.duration(400).reduceMotion(ReduceMotion.Never) 
    : SlideOutRight.duration(400).reduceMotion(ReduceMotion.Never);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Top Image */}
      <View style={styles.imageContainer}>
        <Animated.View
          key={currentIndex} 
          entering={enteringAnimation}
          exiting={exitingAnimation}
          style={styles.imageWrapper}
        >
          <Image
            source={currentData.image}
            style={styles.image}
            resizeMode="contain"
          />
        </Animated.View>
      </View>

      {/* Pagination Dots */}
      <View style={styles.paginationContainer}>
        {ONBOARDING_DATA.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>

      {/* Text Content */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{currentData.title}</Text>
        <Text style={styles.description}>{currentData.description}</Text>
      </View>

      {/* Bottom Buttons */}
      <View style={styles.buttonContainer}>
        {currentIndex === 0 ? (
          <View style={styles.rowButtons}>
            <TouchableOpacity onPress={handleNext} style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Next</Text>
              <Ionicons name="arrow-forward" size={18} color="#FFFFFF" style={{ marginLeft: 8 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSkip} style={styles.textButton}>
              <Text style={styles.textButtonText}>Skip</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.rowButtons}>
            <TouchableOpacity onPress={handleBack} style={styles.textButton}>
              <Text style={styles.textButtonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNext} style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Next</Text>
              <Ionicons name="arrow-forward" size={18} color="#FFFFFF" style={{ marginLeft: 8 }} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    position: 'relative',
  },
  imageWrapper: {
    width: width * 0.7,
    height: width * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  dot: {
    height: 4,
    borderRadius: 2,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 24,
    backgroundColor: '#0A3678',
  },
  inactiveDot: {
    width: 24,
    backgroundColor: '#E0E0E0',
  },
  textContainer: {
    paddingHorizontal: 30,
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#292743',
    marginBottom: 15,
  },
  description: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonContainer: {
    paddingHorizontal: 25,
  },
  rowButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 15,
  },
  primaryButton: {
    flex: 1,
    height: 55,
    backgroundColor: '#0A3678',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  textButton: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  textButtonText: {
    color: '#292743',
    fontSize: 16,
    fontWeight: '600',
  },
});