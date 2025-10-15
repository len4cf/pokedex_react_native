import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { FavoritesProvider } from "./src/context/FavoritesContext";
import { RootNavigator } from "./src/navigation";
import { View, StyleSheet } from "react-native";

export default function App() {
return (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <FavoritesProvider>
    <View style={styles.container}>
      <StatusBar style="auto" />
      <RootNavigator />
    </View>
    </FavoritesProvider>
  </GestureHandlerRootView>
);
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
});