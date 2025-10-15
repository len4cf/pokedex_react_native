import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { fetchPokemonDetails } from "../services/pokeapi";
import { useFavorites } from "../context/FavoritesContext";
import { Ionicons } from "@expo/vector-icons";

export default function DetailsScreen({
  route,
}: NativeStackScreenProps<RootStackParamList, "Details">) {
  const { idOrName } = route.params;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetchPokemonDetails(idOrName);
        setData(res);
      } catch (e) {
        setError("Pokémon não encontrado.");
      } finally {
        setLoading(false);
      }
    })();
  }, [idOrName]);

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  if (error)
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  if (!data) return null;

  const artwork = data.sprites?.other?.["official-artwork"]?.front_default;
  const types = data.types?.map((t: any) => t.type.name).join(", ");
  const abilities = data.abilities
    ?.map((a: any) => a.ability.name)
    .join(", ");

  const fav = isFavorite(data.id);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: artwork }}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>
        #{data.id} {data.name}
      </Text>

      <Text style={styles.label}>
        Tipos: <Text style={styles.value}>{types}</Text>
      </Text>
      <Text style={styles.label}>
        Habilidades: <Text style={styles.value}>{abilities}</Text>
      </Text>

      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => toggleFavorite(data.id)}
        activeOpacity={0.7}
      >
        <Ionicons
          name={fav ? "heart" : "heart-outline"}
          size={40}
          color={fav ? "#e63946" : "#aaa"}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, alignItems: "center" },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  image: { width: 240, height: 240 },
  title: {
    fontSize: 22,
    fontWeight: "700",
    textTransform: "capitalize",
    marginTop: 8,
  },
  label: { marginTop: 10, fontSize: 16 },
  value: { textTransform: "capitalize", fontWeight: "600" },
  favoriteButton: {
    marginTop: 24,
    backgroundColor: "#f8f8f8",
    padding: 10,
    borderRadius: 50,
    elevation: 3, 
  },
});
