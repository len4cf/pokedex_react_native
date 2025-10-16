// types used in the app

export type RootStackParamList = {
    Home: undefined;
    Details: { idOrName: string };
    Favorites: undefined;
};

export interface PokemonListItem {
    id: number;
    name: string;
    image: string; 
}

export interface PokemonDetails {
    id: number;
    name: string;
    sprites: { other?: { [k: string]: { front_default?: string } } };
    types: { slot: number; type: { name: string } }[];
    abilities: { ability: { name: string } }[];
}