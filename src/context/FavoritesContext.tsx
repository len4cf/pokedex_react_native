import { createContext, useContext, useMemo, useState, ReactNode } from "react";


export interface FavoriteMap { [id: number]: boolean }


// context format 
interface FavoritesCtx {
    favorites: FavoriteMap;
    toggleFavorite: (id: number) => void;
    isFavorite: (id: number) => boolean;
}

// initial context value null
const Ctx = createContext<FavoritesCtx | null>(null);

// stores favorite pokemons
export function FavoritesProvider({ children }: { children: ReactNode }) {
    const [favorites, setFavorites] = useState<FavoriteMap>({});


    const value = useMemo(() => ({
        favorites,
        toggleFavorite: (id: number) => setFavorites(prev => ({ ...prev, [id]: !prev[id] })),
        isFavorite: (id: number) => !!favorites[id],
}), [favorites]);

// provides context to children
return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

// hook to use favorites context
export function useFavorites() {
    const ctx = useContext(Ctx);
    if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
    return ctx;
}