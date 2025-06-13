import { createContext, useReducer, useState } from "react";

const maxCompare = 3

// Reducer
const compareReducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            if (state.some((c) => c.id === action.payload.id)) return state;
            if (state.length >= maxCompare) return state;
            return [...state, action.payload];
        case 'REMOVE':
            return state.filter((c) => c.id !== action.payload);
        case 'RESET':
            return [];
        default:
            break;
    }
}

// Context
export const CompareContext = createContext();

// Provider
export const CompareProvider = ({ children }) => {
    const [compareList, dispatch] = useReducer(compareReducer, []);
    const [compareLimitReached, setCompareLimitReached] = useState(false);

    const addToCompare = (champion) => {
        if (compareList.length >= 3) {
            setCompareLimitReached(true);
            setTimeout(() => setCompareLimitReached(false), 3000);
            return;
        }
        dispatch({ type: 'ADD', payload: champion });
    }

    const removeFromCompare = (championId) => {
        dispatch({ type: 'REMOVE', payload: championId });
    }

    const resetCompare = () => {
        dispatch({ type: 'RESET' });
    }

    const isCompare = (championId) => {
        return compareList.some((c) => c.id === championId);
    }

    const toggleCompare = (champion) => {
        isCompare(champion.id)
            ? removeFromCompare(champion.id)
            : addToCompare(champion);
    };

    const value = { compareList, addToCompare, removeFromCompare, resetCompare, isCompare, toggleCompare, compareLimitReached }

    return (
        <CompareContext.Provider value={value}>
            {children}
        </CompareContext.Provider>
    )
}