import { useMemo } from "react";
import { Button, FlatList, Text, View } from "react-native";
import { useFavorites } from "../context/FavoritesContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { PokemonCard } from "../components/PokemonCard";


export default function FavoritesScreen({ navigation }: NativeStackScreenProps<RootStackParamList, "Favorites">) {

    const { favorites } = useFavorites();

    // usememo to get favorite ids
    const favoriteIds = useMemo(() => Object.keys(favorites).filter((id) => favorites[Number(id)]).map(Number), [favorites]);

    //no favorites case
    if (favoriteIds.length === 0) {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 12, backgroundColor: "#CBDCEB" }}>
                <Text>Nenhum favorito ainda.</Text>
                <Button title="Voltar para a Pokédex" onPress={() => navigation.navigate("Home")} />
            </View>
        );
    }

    // data for FlatList
    const data = favoriteIds.map((id) => ({ id, name: `#${id}`, image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png` }));


    return (
        // list of favorite pokemons
        <FlatList
            data={data}
            keyExtractor={(item) => String(item.id)}
            numColumns={2}
            contentContainerStyle={{ padding: 8, backgroundColor: "#CBDCEB" }}
            renderItem={({ item }) => (
                <PokemonCard item={{ id: item.id, name: item.name, image: item.image }} onPress={() => navigation.navigate("Details", { idOrName: String(item.id) })} />
            )}
        />
    );
}