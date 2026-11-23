import { Redirect } from 'expo-router';

export default function Index() {
  // This sends the app to the auth folder's index.jsx
  return <Redirect href="/auth" />; // Use "/(auth)" if your folder has parentheses
}