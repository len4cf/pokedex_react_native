import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { fetchPokemonPage } from "../services/pokeapi";
import { PokemonCard } from "../components/PokemonCard";
import { PokemonListItem } from "../types";
import { Ionicons } from "@expo/vector-icons";
import { useFavorites } from "../context/FavoritesContext"; 

export default function HomeScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Home">) {
  const [list, setList] = useState<PokemonListItem[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const { favorites } = useFavorites();
  const hasFavs = Object.values(favorites).some(Boolean);

  const loadPage = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const page = await fetchPokemonPage(offset, 20);

      setList((prev) => {
        const combined = [...prev, ...page];
        const unique = combined.filter(
          (item, index, self) => index === self.findIndex((p) => p.id === item.id)
        );
        return unique;
      });
    } catch (e) {
      setError("Falha ao carregar Pokémon. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }, [offset]);

  useEffect(() => {
    loadPage();
  }, [loadPage]);

  const onLoadMore = () => {
    if (!loading) setOffset((prev) => prev + 20);
  };

  const onSearch = () => {
    const trimmed = query.trim();
    if (!trimmed) return Alert.alert("Busca", "Digite um nome ou número");
    navigation.navigate("Details", { idOrName: trimmed });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("Favorites")}
          style={{
            height: 40,
            width: 40,
            alignItems: "center",
            justifyContent: "center", 
            borderRadius: 20,
          }}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name={hasFavs ? "heart" : "heart-outline"}
            size={26}
            color={hasFavs ? "#e63946" : "#666"}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, hasFavs]);


  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          placeholder="Nome ou número"
          autoCapitalize="none"
          value={query}
          onChangeText={setQuery}
          returnKeyType="search"
          onSubmitEditing={onSearch}
        />
        <Button title="Buscar" onPress={onSearch} />
      </View>

      <FlatList
        data={list}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        renderItem={({ item }) => (
          <PokemonCard
            item={item}
            onPress={() =>
              navigation.navigate("Details", { idOrName: String(item.id) })
            }
          />
        )}
        contentContainerStyle={{ padding: 8 }}
        ListFooterComponent={
          <View style={{ paddingVertical: 16 }}>
            {loading ? (
              <ActivityIndicator size="large" />
            ) : (
              <Button title="Carregar mais" onPress={onLoadMore} />
            )}
          </View>
        }
      />

      {error && (
        <View style={styles.error}>
          <Button
            title={error + " – Tentar novamente"}
            onPress={loadPage}
            color="#e63946"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchRow: { flexDirection: "row", gap: 8, padding: 12, alignItems: "center" },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  error: {
    position: "absolute",
    bottom: 90,
    left: 12,
    right: 12,
  },
});
