import { createContext, useState } from "react";

// Context
export const FavoritesContext = createContext();

// Provider
export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    const isFavorite = (championId) => {
        return favorites.some((c) => c.id === championId)
    };

    const toggleFavorite = (champion) => {
        setFavorites((prev) => {
            if (isFavorite(champion.id)) {
                return prev.filter((c) => c.id !== champion.id)
            } else {
                return [...prev, champion]
            }
        });
    };

    const value = { favorites, isFavorite, toggleFavorite }

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    )
}


