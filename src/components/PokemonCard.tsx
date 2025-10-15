import { memo } from "react";
import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { PokemonListItem } from "../types";

interface Props {
item: PokemonListItem;
onPress: () => void;
}

function PokemonCardBase({ item, onPress }: Props) {
return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
        <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
);
}

export const PokemonCard = memo(PokemonCardBase);

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        margin: 8,
        borderRadius: 12,
        paddingVertical: 12,
        alignItems: "center",
    },
    image: { width: 100, height: 100 },
    name: { marginTop: 8, textTransform: "capitalize", fontWeight: "600" },
});