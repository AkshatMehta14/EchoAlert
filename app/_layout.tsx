import { UserProvider } from "@/context/userContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <UserProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Echo Alert" }} />
      </Stack>
    </UserProvider>
  );
}
