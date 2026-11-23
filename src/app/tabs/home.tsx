
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StatusBar,
  Alert,
  Modal,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

const TRENDING_REPORTS = [
  {
    id: "1",
    initials: "OM",
    name: "Aliya Comrad",
    detail: "Phone number reported",
    time: "Yesterday",
  },
  {
    id: "2",
    initials: "JD",
    name: "John Doe",
    detail: "Bank account reported",
    time: "Yesterday",
  },
  {
    id: "3",
    initials: "MK",
    name: "Michael K",
    detail: "Social handle reported",
    time: "2 days ago",
  },
  {
    id: "4",
    initials: "SA",
    name: "Samuel Adams",
    detail: "Phone number reported",
    time: "2 days ago",
  },
  {
    id: "5",
    initials: "AB",
    name: "Alex Brown",
    detail: "Bank account reported",
    time: "3 days ago",
  },
];

const TABS = ["Phone Number", "Bank Account", "Social Handle"];

const SOCIAL_PLATFORMS = [
  { name: "Instagram", icon: "logo-instagram" as const },
  { name: "Twitter", icon: "logo-twitter" as const },
  { name: "Facebook", icon: "logo-facebook" as const },
  { name: "LinkedIn", icon: "logo-linkedin" as const },
];

type ResultStatus = "safe" | "detected";

export default function HomeScreen() {
  const [selectedTab, setSelectedTab] = useState("Phone Number");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("Instagram");
  const [platformOpen, setPlatformOpen] = useState(false);

  const [resultVisible, setResultVisible] = useState(false);
  const [resultStatus, setResultStatus] = useState<ResultStatus>("safe");

  // MOBILE MENU STATE
  const [menuOpen, setMenuOpen] = useState(false);

  const getPlaceholder = () => {
    switch (selectedTab) {
      case "Bank Account":
        return "Type bank account number here";
      case "Social Handle":
        return "Paste social media profile link here";
      default:
        return "Type phone number here";
    }
  };

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
    setSearchQuery("");
    setPlatformOpen(false);
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      Alert.alert(
        "Search required",
        "Please enter a number, account or social media profile to check."
      );
      return;
    }

    Keyboard.dismiss();
    setPlatformOpen(false);

    /*
      DEMO ONLY:
      These sample values simulate a reported account.
      Replace this local check with your scam-checking backend API.
    */
    const demoReportedValues = [
      "08000000000",
      "1234567890",
      "@fakevendor",
    ];

    const normalizedQuery = searchQuery.trim().toLowerCase();

    const isDetected = demoReportedValues.some((value) =>
      normalizedizedQuery.includes(value.toLowerCase())
    );

    setResultStatus(isDetected ? "detected" : "safe");
    setResultVisible(true);
  };

  const handleReportScam = () => {
    setResultVisible(false);
    router.push("/tabs/report-scam" as never);
  };

  const handleSeeAll = () => {
    router.push("/tabs/report-scam" as never);
  };

  const closeResult = () => {
    setResultVisible(false);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <SafeAreaView
      className="flex-1 bg-[#F3F4F6]"
      edges={["top"]}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F3F4F6"
      />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 25 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* HEADER */}
        <View className="flex-row items-center justify-between px-5 pt-3">
          <Pressable
            onPress={() => setMenuOpen(true)}
            className="h-10 w-10 items-center justify-center rounded-xl bg-white"
          >
            <Ionicons
              name="menu-outline"
              size={23}
              color="#334155"
            />
          </Pressable>

          <Pressable
            onPress={() =>
              Alert.alert(
                "Notifications",
                "You don't have any new notifications."
              )
            }
            className="relative h-10 w-10 items-center justify-center rounded-xl bg-white"
          >
            <Ionicons
              name="notifications-outline"
              size={22}
              color="#334155"
            />
            <View className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          </Pressable>
        </View>

        {/* WELCOME */}
        <View className="mb-6 mt-5 px-5">
          <Text className="text-lg font-semibold text-[#172B45]">
            Welcome back, Ibrahim
          </Text>

          <Text className="mt-1 text-[11px] italic text-slate-500">
            Keeping you safe, one transaction at a time.
          </Text>
        </View>

        {/* SEARCH CARD */}
        <View className="mx-5 mb-7 rounded-xl bg-white p-4">
          {/* CATEGORY TABS */}
          <View className="mb-5 flex-row items-center justify-between">
            {TABS.map((tab) => {
              const isActive = selectedTab === tab;

              return (
                <Pressable
                  key={tab}
                  onPress={() => handleTabChange(tab)}
                  className={`rounded-md px-2.5 py-2 ${
                    isActive ? "bg-[#0B4A99]" : "bg-transparent"
                  }`}
                >
                  <Text
                    className={`text-[10px] font-medium ${
                      isActive ? "text-white" : "text-slate-700"
                    }`}
                  >
                    {tab}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* SOCIAL PLATFORM SELECTOR */}
          {selectedTab === "Social Handle" && (
            <View className="mb-3">
              <Pressable
                onPress={() => setPlatformOpen(!platformOpen)}
                className="h-10 flex-row items-center justify-between rounded-lg border border-slate-200 px-3"
              >
                <Text className="text-xs text-slate-500">
                  {selectedPlatform}
                </Text>

                <Ionicons
                  name={platformOpen ? "chevron-up" : "chevron-down"}
                  size={16}
                  color="#64748B"
                />
              </Pressable>

              {platformOpen && (
                <View className="mt-2 rounded-lg border border-slate-100 bg-white p-2">
                  {SOCIAL_PLATFORMS.map((platform) => {
                    const isSelected = selectedPlatform === platform.name;

                    return (
                      <Pressable
                        key={platform.name}
                        onPress={() => {
                          setSelectedPlatform(platform.name);
                          setPlatformOpen(false);
                        }}
                        className={`mb-1 flex-row items-center rounded-md px-3 py-2.5 ${
                          isSelected ? "bg-blue-50" : "bg-white"
                        }`}
                      >
                        <Ionicons
                          name={platform.icon}
                          size={16}
                          color="#0B4A99"
                        />

                        <Text className="ml-3 flex-1 text-xs text-slate-700">
                          {platform.name}
                        </Text>

                        {isSelected && (
                          <Ionicons
                            name="checkmark"
                            size={16}
                            color="#0B4A99"
                          />
                        )}
                      </Pressable>
                    );
                  })}
                </View>
              )}
            </View>
          )}

          {/* SEARCH INPUT */}
          <View className="mb-3 h-11 flex-row items-center rounded-lg border border-slate-200 px-3">
            <TextInput
              className="h-full flex-1 text-xs text-slate-800"
              placeholder={getPlaceholder()}
              placeholderTextColor="#94A3B8"
              value={searchQuery}
              onChangeText={setSearchQuery}
              keyboardType={
                selectedTab === "Social Handle" ? "default" : "numeric"
              }
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="search"
              onSubmitEditing={handleSearch}
            />

            {searchQuery.length > 0 && (
              <Pressable
                onPress={() => setSearchQuery("")}
                hitSlop={10}
              >
                <Ionicons
                  name="close-circle"
                  size={18}
                  color="#94A3B8"
                />
              </Pressable>
            )}
          </View>

          {/* CHECK SCAM BUTTON */}
          <Pressable
            onPress={handleSearch}
            disabled={!searchQuery.trim()}
            className={`h-11 flex-row items-center justify-center rounded-lg ${
              searchQuery.trim() ? "bg-[#0B4A99]" : "bg-[#CBD1D9]"
            }`}
          >
            <Text className="text-xs font-semibold text-white">
              Check Scam
            </Text>

            <Ionicons
              name="search-outline"
              size={16}
              color="white"
              style={{ marginLeft: 7 }}
            />
          </Pressable>
        </View>

        {/* TRENDING HEADER */}
        <View className="mb-4 flex-row items-center justify-between px-5">
          <Text className="text-base font-semibold text-[#172B45]">
            Trending scam report
          </Text>

          <Pressable onPress={handleSeeAll}>
            <Text className="text-xs font-semibold text-[#0B4A99]">
              See all
            </Text>
          </Pressable>
        </View>

        {/* TRENDING REPORTS */}
        <View className="mx-5 rounded-xl bg-white p-4">
          {TRENDING_REPORTS.map((item, index) => (
            <Pressable
              key={item.id}
              onPress={() =>
                Alert.alert(
                  item.name,
                  `${item.detail}\nReported: ${item.time}`
                )
              }
              className={`flex-row items-center ${
                index !== TRENDING_REPORTS.length - 1 ? "mb-4" : ""
              }`}
            >
              {/* AVATAR */}
              <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-[#E6F4EA]">
                <Text className="text-xs font-semibold text-[#172B45]">
                  {item.initials}
                </Text>
              </View>

              {/* DETAILS */}
              <View className="flex-1">
                <Text className="text-xs font-semibold text-[#172B45]">
                  {item.name}
                </Text>

                <Text className="mt-1 text-[10px] text-slate-400">
                  {item.detail}
                </Text>
              </View>

              <Text className="text-[10px] text-slate-400">
                {item.time}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* SAFETY MESSAGE */}
        <View className="mx-5 mt-6 flex-row items-center rounded-xl bg-[#0B4A99] p-4">
          <View className="mr-3 h-11 w-11 items-center justify-center rounded-xl bg-blue-800">
            <MaterialCommunityIcons
              name="shield-check"
              size={25}
              color="white"
            />
          </View>

          <View className="flex-1">
            <Text className="text-sm font-semibold text-white">
              Stay protected with Trustpadi
            </Text>

            <Text className="mt-1 text-[11px] leading-5 text-blue-100">
              Always verify suspicious accounts before making payments.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* SEARCH RESULT MODAL */}
      <Modal
        visible={resultVisible}
        transparent
        animationType="fade"
        onRequestClose={closeResult}
        statusBarTranslucent
      >
        <View className="flex-1 items-center justify-center bg-black/30 px-5">
          <View className="w-full rounded-xl bg-white px-5 pb-6 pt-5">
            {/* CLOSE BUTTON */}
            <View className="mb-6 items-end">
              <Pressable onPress={closeResult} hitSlop={12}>
                <Ionicons
                  name="close-outline"
                  size={27}
                  color="#334155"
                />
              </Pressable>
            </View>

            {/* RESULT ICON */}
            <View className="mb-4 items-center">
              {resultStatus === "safe" ? (
                <MaterialCommunityIcons
                  name="shield-check"
                  size={42}
                  color="#0B4A99"
                />
              ) : (
                <MaterialCommunityIcons
                  name="shield-alert"
                  size={42}
                  color="#FF4055"
                />
              )}
            </View>

            {/* RESULT TITLE */}
            <View className="mb-2 flex-row items-center justify-center">
              <Text
                className={`text-base font-bold ${
                  resultStatus === "safe" ? "text-slate-800" : "text-red-500"
                }`}
              >
                {resultStatus === "safe" ? "Scam free" : "Scam detected"}
              </Text>

              <Ionicons
                name={resultStatus === "safe" ? "checkmark-circle" : "alert-circle"}
                size={17}
                color={resultStatus === "safe" ? "#16A34A" : "#FF4055"}
                style={{ marginLeft: 5 }}
              />
            </View>

            {/* RESULT DESCRIPTION */}
            <Text className="mb-7 text-center text-[11px] leading-5 text-slate-400">
              {resultStatus === "safe"
                ? "No matching report was found in the demo records."
                : "This account matches a sample scam report in the demo records."}
            </Text>

            {/* REPORT BUTTON */}
            <Pressable
              onPress={handleReportScam}
              className="h-11 flex-row items-center justify-center rounded-lg border border-[#0B4A99]"
            >
              <Text className="text-xs font-semibold text-[#0B4A99]">
                Report Scam
              </Text>

              <Ionicons
                name="mail-outline"
                size={16}
                color="#0B4A99"
                style={{ marginLeft: 7 }}
              />
            </Pressable>

            {/* DEMO NOTICE */}
            <Text className="mt-3 text-center text-[9px] text-slate-400">
              Demo result only. Connect the verification API for real results.
            </Text>
          </View>
        </View>
      </Modal>

      {/* MOBILE MENU DRAWER */}
      <Modal
        visible={menuOpen}
        transparent
        animationType="fade"
        onRequestClose={closeMenu}
      >
        <View className="flex-1 flex-row bg-black/40">
          {/* OUTSIDE OVERLAY */}
          <Pressable onPress={closeMenu} className="flex-1" />

          {/* DRAWER */}
          <View className="absolute left-0 top-0 bottom-0 w-[280px] bg-white">
            <SafeAreaView className="flex-1">
              {/* DRAWER HEADER */}
              <View className="flex-row items-center justify-between border-b border-slate-100 px-5 py-5">
                <View className="flex-row items-center">
                  <MaterialCommunityIcons
                    name="shield-check"
                    size={28}
                    color="#0B4A99"
                  />

                  <Text className="ml-2 text-lg font-bold text-[#172B45]">
                    Trustpadi
                  </Text>
                </View>

                <Pressable
                  onPress={closeMenu}
                  className="h-9 w-9 items-center justify-center rounded-lg bg-slate-100"
                >
                  <Ionicons name="close" size={20} color="#475569" />
                </Pressable>
              </View>

              {/* MENU ITEMS */}
              <View className="flex-1 px-4 pt-5">




                 {/* DASHBOARD */}
                <Pressable
                  onPress={() => {
                    closeMenu();
                    Alert.alert(
                      "Dashboard",
                      "The dashboard hasn't been built yet."
                    );
                  }}
                  className="mb-2 flex-row items-center rounded-xl px-4 py-3.5 active:bg-blue-50"
                >
                  <Ionicons name="grid-outline" size={21} color="#64748B" />
                  <Text className="ml-4 text-sm font-medium text-slate-600">
                    Dashboard
                  </Text>
                </Pressable>


                

                {/* CHECK SCAM */}
                <Pressable
                  onPress={closeMenu}
                  className="mb-2 flex-row items-center rounded-xl px-4 py-3.5 active:bg-blue-50"
                >
                  <Ionicons
                    name="search-outline"
                    size={21}
                    color="#64748B"
                  />
                  <Text className="ml-4 text-sm font-medium text-slate-600">
                    Check Scam
                  </Text>
                </Pressable>

                {/* STORIES */}
                <Pressable
                  onPress={() => {
                    closeMenu();
                    Alert.alert("Stories", "Stories will be available soon.");
                  }}
                  className="mb-2 flex-row items-center rounded-xl px-4 py-3.5 active:bg-blue-50"
                >
                  <Ionicons name="book-outline" size={21} color="#64748B" />
                  <Text className="ml-4 text-sm font-medium text-slate-600">
                    Stories
                  </Text>
                </Pressable>

                {/* LEARN */}
                <Pressable
                  onPress={() => {
                    closeMenu();
                    Alert.alert("Learn", "The learning section is coming soon.");
                  }}
                  className="mb-2 flex-row items-center rounded-xl px-4 py-3.5 active:bg-blue-50"
                >
                  <Ionicons name="school-outline" size={21} color="#64748B" />
                  <Text className="ml-4 text-sm font-medium text-slate-600">
                    Learn
                  </Text>
                </Pressable>

                {/* DIVIDER */}
                <View className="my-4 border-t border-slate-200" />

               
                 
                {/* REPORTS */}
                <Pressable
                  onPress={() => {
                    closeMenu();
                    router.push("/tabs/report-scam" as never);
                  }}
                  className="mb-2 flex-row items-center rounded-xl px-4 py-3.5 active:bg-blue-50"
                >
                  <Ionicons
                    name="document-text-outline"
                    size={21}
                    color="#64748B"
                  />
                  <Text className="ml-4 text-sm font-medium text-slate-600">
                    Reports
                  </Text>
                </Pressable>






                {/* LOGOUT */}
               <View className="mt-auto border-t border-slate-100 pb-5 pt-4">
                <Pressable
                  onPress={() => {
                    closeMenu();
                    Alert.alert(
                      "Logout",
                      "Logout will be available when authentication is connected."
                    );
                  }}
                  className="flex-row items-center rounded-xl px-4 py-3.5 active:bg-red-50"
                >
                  <Ionicons name="log-out-outline" size={21} color="#64748B" />
                  <Text className="ml-4 text-sm font-medium text-slate-600">
                    Logout
                  </Text>
                </Pressable>
              </View>
              </View>
            </SafeAreaView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
