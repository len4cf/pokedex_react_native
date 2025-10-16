import axios from "axios";
import { PokemonDetails, PokemonListItem } from "../types";

// create axios instance
const api = axios.create({ baseURL: "https://pokeapi.co/api/v2" });

// fetch a page of pokemons
export async function fetchPokemonPage(offset = 0, limit = 20): Promise<PokemonListItem[]> {
    const { data } = await api.get(`/pokemon?offset=${offset}&limit=${limit}`);
    return data.results.map((p: { name: string; url: string }) => {
    const id = parseInt(p.url.split("/").filter(Boolean).pop()!, 10);
    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
    return { id, name: p.name, image } as PokemonListItem;
});
}

// fetch detailed info about a pokemon
export async function fetchPokemonDetails(idOrName: string): Promise<PokemonDetails> {
    const { data } = await api.get(`/pokemon/${idOrName.toLowerCase()}`);
    return data as PokemonDetails;
}