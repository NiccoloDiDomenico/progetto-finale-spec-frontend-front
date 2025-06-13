import { createContext, useState } from "react";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    const toggleFavorite = (champion) => {
        setFavorites((prev) => {
            const alreadyInFavorites = prev.find((c) => c.id === champion.id);
            if (alreadyInFavorites) {
                return prev.filter((c) => c.id !== champion.id)
            } else {
                return [...prev, champion]
            }
        });
    };

    const isFavorite = (championId) => {
        return favorites.some((c) => c.id === championId)
    };

    const value = { favorites, toggleFavorite, isFavorite }

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    )
}


