
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StatusBar,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

type Report = {
  id: string;
  name: string;
  account: string;
  description: string;
  date: string;
  status: "Under review" | "Resolved";
};

export default function ReportScamScreen() {
  const [scammerName, setScammerName] = useState("");
  const [scammerAccount, setScammerAccount] = useState("");
  const [scamDescription, setScamDescription] = useState("");
  const [hasEvidence, setHasEvidence] = useState(false);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const [reports, setReports] = useState<Report[]>([]);

  const wordCount = scamDescription.trim()
    ? scamDescription.trim().split(/\s+/).length
    : 0;

  const canSubmit =
    scammerName.trim().length > 0 &&
    scamDescription.trim().length > 0 &&
    wordCount <= 500;

  const handleReportSubmit = () => {
    if (!scammerName.trim()) {
      Alert.alert(
        "Missing information",
        "Please enter the scammer's name or identifier."
      );
      return;
    }

    if (!scamDescription.trim()) {
      Alert.alert(
        "Description required",
        "Please explain what happened before submitting."
      );
      return;
    }

    if (wordCount > 500) {
      Alert.alert(
        "Description too long",
        "Your description must not exceed 500 words."
      );
      return;
    }

    const newReport: Report = {
      id: Date.now().toString(),
      name: scammerName.trim(),
      account: scammerAccount.trim(),
      description: scamDescription.trim(),
      date: "Just now",
      status: "Under review",
    };

    setReports((previous) => [newReport, ...previous]);
    setShowSuccessModal(true);
  };

  const resetForm = () => {
    setScammerName("");
    setScammerAccount("");
    setScamDescription("");
    setHasEvidence(false);
  };

  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
    resetForm();
    setShowHistory(true);
  };

  const handleWithdraw = (id: string) => {
    Alert.alert(
      "Withdraw report",
      "Are you sure you want to withdraw this report?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Withdraw",
          style: "destructive",
          onPress: () => {
            setReports((previous) =>
              previous.filter((report) => report.id !== id)
            );
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView
      className="flex-1 bg-[#F8FAFC]"
      edges={["top"]}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F8FAFC"
      />

      {/* HEADER */}
      <View className="flex-row items-center justify-between border-b border-slate-100 bg-[#F8FAFC] px-5 py-3">
        <Pressable
          onPress={() => {
            if (showHistory) {
              setShowHistory(false);
            } else {
              router.replace("/tabs/home");
            }
          }}
          className="h-11 w-11 items-center justify-center rounded-xl bg-white"
        >
          <Ionicons
            name="chevron-back"
            size={23}
            color="#1E293B"
          />
        </Pressable>

        <Text className="text-base font-bold text-slate-800">
          {showHistory ? "My reports" : "Scam report"}
        </Text>

        <Pressable
          onPress={() => setShowHistory((previous) => !previous)}
          className="h-11 w-11 items-center justify-center rounded-xl bg-white"
        >
          <MaterialCommunityIcons
            name="file-document-multiple-outline"
            size={22}
            color="#1E293B"
          />
        </Pressable>
      </View>

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: 40,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {!showHistory ? (
            <>
              {/* INTRODUCTION */}
              <View className="mb-6">
                <View className="mb-3 h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
                  <MaterialCommunityIcons
                    name="shield-alert-outline"
                    size={30}
                    color="#0B4A99"
                  />
                </View>

                <Text className="text-2xl font-bold text-slate-900">
                  Report a scam
                </Text>

                <Text className="mt-2 text-sm leading-6 text-slate-500">
                  Help protect others by reporting suspicious people,
                  accounts or transactions. Every report makes our
                  community safer.
                </Text>
              </View>

              {/* INFORMATION NOTICE */}
              <View className="mb-5 flex-row items-start rounded-xl border border-blue-100 bg-blue-50 p-3">
                <Ionicons
                  name="information-circle-outline"
                  size={21}
                  color="#0B4A99"
                />

                <Text className="ml-2 flex-1 text-xs leading-5 text-blue-900">
                  Please provide accurate information. Our team will
                  review submitted reports before taking action.
                </Text>
              </View>

              {/* FORM CARD */}
              <View className="rounded-2xl border border-slate-100 bg-white p-4">
                <View className="mb-5">
                  <Text className="text-lg font-bold text-slate-800">
                    Scam details
                  </Text>

                  <Text className="mt-1 text-xs leading-5 text-slate-500">
                    Fill in the details below to submit your report.
                  </Text>
                </View>

                {/* SCAMMER NAME */}
                <View className="mb-5">
                  <Text className="mb-2 text-sm font-semibold text-slate-700">
                    Scammer name / identifier
                    <Text className="text-red-500"> *</Text>
                  </Text>

                  <TextInput
                    className="min-h-[52px] rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800"
                    placeholder="Enter name, business or username"
                    placeholderTextColor="#94A3B8"
                    value={scammerName}
                    onChangeText={setScammerName}
                    autoCapitalize="none"
                  />

                  <Text className="mt-1.5 text-xs text-slate-400">
                    Example: John Doe or @suspicious_user
                  </Text>
                </View>

                {/* ACCOUNT DETAILS */}
                <View className="mb-5">
                  <Text className="mb-2 text-sm font-semibold text-slate-700">
                    Scammer account / contact
                  </Text>

                  <TextInput
                    className="min-h-[52px] rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800"
                    placeholder="Phone number, bank account or social handle"
                    placeholderTextColor="#94A3B8"
                    value={scammerAccount}
                    onChangeText={setScammerAccount}
                    autoCapitalize="none"
                  />

                  <Text className="mt-1.5 text-xs text-slate-400">
                    Add any contact or account details you have.
                  </Text>
                </View>

                {/* EVIDENCE */}
                <View className="mb-5">
                  <Text className="mb-2 text-sm font-semibold text-slate-700">
                    Attach evidence
                    <Text className="ml-1 font-normal text-slate-400">
                      (Optional)
                    </Text>
                  </Text>

                  <Pressable
                    onPress={() =>
                      Alert.alert(
                        "Evidence upload",
                        "The evidence upload interface is ready. Connect Expo Document Picker or Image Picker to allow users to select real files."
                      )
                    }
                    className="items-center justify-center rounded-xl border border-dashed border-blue-300 bg-blue-50/60 px-4 py-6"
                  >
                    <View className="mb-2 h-11 w-11 items-center justify-center rounded-full bg-blue-100">
                      <Ionicons
                        name="cloud-upload-outline"
                        size={23}
                        color="#0B4A99"
                      />
                    </View>

                    <Text className="text-sm font-semibold text-[#0B4A99]">
                      Upload evidence
                    </Text>

                    <Text className="mt-1 text-center text-xs text-slate-500">
                      Screenshots, receipts or other supporting files
                    </Text>
                  </Pressable>
                </View>

                {/* DESCRIPTION */}
                <View className="mb-5">
                  <Text className="mb-2 text-sm font-semibold text-slate-700">
                    Scam description
                    <Text className="text-red-500"> *</Text>
                  </Text>

                  <TextInput
                    className="min-h-[140px] rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-800"
                    placeholder="Tell us what happened. Include details such as how you were contacted, what was promised and how the scam happened..."
                    placeholderTextColor="#94A3B8"
                    multiline
                    textAlignVertical="top"
                    value={scamDescription}
                    onChangeText={setScamDescription}
                  />

                  <View className="mt-2 flex-row items-center justify-between">
                    <Text className="text-xs text-slate-400">
                      Maximum 500 words
                    </Text>

                    <Text
                      className={`text-xs ${
                        wordCount > 500
                          ? "font-semibold text-red-500"
                          : "text-slate-400"
                      }`}
                    >
                      {wordCount}/500 words
                    </Text>
                  </View>
                </View>

                {/* SUBMIT BUTTON */}
                <Pressable
                  onPress={handleReportSubmit}
                  disabled={!canSubmit}
                  className={`h-14 flex-row items-center justify-center rounded-xl ${
                    canSubmit
                      ? "bg-[#0B4A99] active:bg-blue-900"
                      : "bg-slate-300"
                  }`}
                >
                  <Text className="text-sm font-bold text-white">
                    Submit report
                  </Text>

                  <Ionicons
                    name="arrow-forward"
                    size={18}
                    color="#FFFFFF"
                    style={{ marginLeft: 9 }}
                  />
                </Pressable>

                <View className="mt-4 flex-row items-center justify-center">
                  <Ionicons
                    name="lock-closed-outline"
                    size={13}
                    color="#94A3B8"
                  />

                  <Text className="ml-1.5 text-center text-xs text-slate-400">
                    Your report will be handled carefully.
                  </Text>
                </View>
              </View>

              {/* BOTTOM INFORMATION */}
              <View className="mt-5 flex-row items-center rounded-xl bg-[#EAF2FC] p-4">
                <MaterialCommunityIcons
                  name="shield-check-outline"
                  size={26}
                  color="#0B4A99"
                />

                <View className="ml-3 flex-1">
                  <Text className="text-sm font-bold text-slate-800">
                    Together, we stop scams.
                  </Text>

                  <Text className="mt-1 text-xs leading-5 text-slate-500">
                    Your report could help prevent someone else from
                    losing their money.
                  </Text>
                </View>
              </View>
            </>
          ) : (
            <>
              {/* REPORT HISTORY HEADER */}
              <View className="mb-5">
                <Text className="text-2xl font-bold text-slate-900">
                  My reports
                </Text>

                <Text className="mt-2 text-sm text-slate-500">
                  Keep track of the scam reports you have submitted.
                </Text>
              </View>

              {reports.length === 0 ? (
                <View className="mt-10 items-center rounded-2xl border border-slate-100 bg-white px-6 py-10">
                  <View className="mb-4 h-20 w-20 items-center justify-center rounded-full bg-blue-50">
                    <MaterialCommunityIcons
                      name="folder-open-outline"
                      size={40}
                      color="#0B4A99"
                    />
                  </View>

                  <Text className="text-lg font-bold text-slate-800">
                    No reports yet
                  </Text>

                  <Text className="mt-2 text-center text-sm leading-6 text-slate-500">
                    You haven't submitted any scam reports. Your
                    submitted reports will appear here.
                  </Text>

                  <Pressable
                    onPress={() => setShowHistory(false)}
                    className="mt-6 rounded-xl bg-[#0B4A99] px-7 py-3.5"
                  >
                    <Text className="text-sm font-semibold text-white">
                      Report a scam
                    </Text>
                  </Pressable>
                </View>
              ) : (
                <>
                  <View className="mb-4 flex-row items-center justify-between">
                    <Text className="text-sm font-semibold text-slate-700">
                      Submitted reports
                    </Text>

                    <Text className="text-xs text-slate-400">
                      {reports.length} report(s)
                    </Text>
                  </View>

                  {reports.map((report) => (
                    <View
                      key={report.id}
                      className="mb-3 rounded-2xl border border-slate-100 bg-white p-4"
                    >
                      <View className="flex-row items-start">
                        <View className="h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                          <MaterialCommunityIcons
                            name="shield-alert-outline"
                            size={23}
                            color="#0B4A99"
                          />
                        </View>

                        <View className="ml-3 flex-1">
                          <Text
                            className="text-sm font-bold text-slate-800"
                            numberOfLines={1}
                          >
                            {report.name}
                          </Text>

                          <Text className="mt-1 text-xs text-slate-400">
                            {report.account || "No contact details provided"}
                          </Text>
                        </View>

                        <View className="rounded-full bg-amber-50 px-2.5 py-1">
                          <Text className="text-[10px] font-semibold text-amber-700">
                            {report.status}
                          </Text>
                        </View>
                      </View>

                      <Text
                        className="mt-4 text-xs leading-5 text-slate-500"
                        numberOfLines={3}
                      >
                        {report.description}
                      </Text>

                      <View className="mt-4 flex-row items-center justify-between border-t border-slate-100 pt-3">
                        <Text className="text-xs text-slate-400">
                          {report.date}
                        </Text>

                        <Pressable
                          onPress={() => handleWithdraw(report.id)}
                          className="rounded-lg border border-red-200 px-3 py-2"
                        >
                          <Text className="text-xs font-semibold text-red-500">
                            Withdraw
                          </Text>
                        </Pressable>
                      </View>
                    </View>
                  ))}

                  <Pressable
                    onPress={() => setShowHistory(false)}
                    className="mt-3 h-12 items-center justify-center rounded-xl bg-[#0B4A99]"
                  >
                    <Text className="text-sm font-semibold text-white">
                      Submit another report
                    </Text>
                  </Pressable>
                </>
              )}
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      {/* SUCCESS MODAL */}
      <Modal
        visible={showSuccessModal}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setShowSuccessModal(false)}
      >
        <View className="flex-1 items-center justify-center bg-black/50 px-6">
          <View className="w-full max-w-[360px] items-center rounded-3xl bg-white px-6 py-8">
            <View className="mb-5 h-20 w-20 items-center justify-center rounded-full bg-green-50">
              <Ionicons
                name="shield-checkmark"
                size={43}
                color="#16A34A"
              />
            </View>

            <Text className="text-center text-xl font-bold text-slate-900">
              Report submitted!
            </Text>

            <Text className="mt-3 text-center text-sm leading-6 text-slate-500">
              Thank you for helping protect the community. Your report
              has been added to your local report history.
            </Text>

            <Pressable
              onPress={handleCloseSuccess}
              className="mt-7 h-13 w-full flex-row items-center justify-center rounded-xl bg-[#0B4A99] py-4"
            >
              <Text className="text-sm font-bold text-white">
                View my reports
              </Text>

              <Ionicons
                name="arrow-forward"
                size={17}
                color="#FFFFFF"
                style={{ marginLeft: 8 }}
              />
            </Pressable>

            <Pressable
              onPress={() => {
                setShowSuccessModal(false);
                resetForm();
              }}
              className="mt-4 py-2"
            >
              <Text className="text-sm font-semibold text-slate-500">
                Submit another later
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
