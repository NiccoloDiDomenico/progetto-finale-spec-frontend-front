import { createContext, useReducer, useEffect } from 'react';

// Reducer
const favoritesReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_FAVORITE':
            return [...state, action.payload];
        case 'REMOVE_FAVORITE':
            return state.filter(id => id !== action.payload);
        case 'RESET_FAVORITES':
            return [];
        default:
            return state;
    }
};

// Context
export const FavoritesContext = createContext();

// Provider
export function FavoritesProvider({ children }) {
    const [favorites, dispatch] = useReducer(favoritesReducer, [], () => {
        const saved = localStorage.getItem("favorites");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const addToFavorite = (championId) => {
        dispatch({ type: 'ADD_FAVORITE', payload: championId });
    }

    const removeFromFavorite = (championId) => {
        dispatch({ type: 'REMOVE_FAVORITE', payload: championId });
    }

    const resetFavorites = () => {
        dispatch({ type: 'RESET_FAVORITES' });
    }

    const isFavorite = (id) => favorites.includes(id);

    const toggleFavorite = (champion) => {
        isFavorite(champion.id)
            ? removeFromFavorite(champion.id)
            : addToFavorite(champion.id);
    };


    const value = {
        favorites,
        addToFavorite,
        removeFromFavorite,
        resetFavorites,
        toggleFavorite,
        isFavorite
    };

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
}


