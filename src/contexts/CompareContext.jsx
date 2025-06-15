import { createContext, useEffect, useReducer, useState } from "react";

const maxCompare = 3

// Reducer
const compareReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_COMPARE':
            if (state.includes(action.payload)) return state;
            if (state.length >= maxCompare) return state;
            return [...state, action.payload];
        case 'REMOVE_COMPARE':
            return state.filter((id) => id !== action.payload);
        case 'RESET_COMPARE':
            return [];
        default:
            break;
    }
}

// Context
export const CompareContext = createContext();

// Provider
export const CompareProvider = ({ children }) => {
    const [compareLimitReached, setCompareLimitReached] = useState(false);
    const [compareList, dispatch] = useReducer(compareReducer, [], () => {
        const saved = sessionStorage.getItem("compareList");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        sessionStorage.setItem("compareList", JSON.stringify(compareList));
    }, [compareList]);

    const addToCompare = (championId) => {
        if (compareList.length >= 3) {
            setCompareLimitReached(true);
            setTimeout(() => setCompareLimitReached(false), 3000);
            return;
        }
        dispatch({ type: 'ADD_COMPARE', payload: championId });
    }

    const removeFromCompare = (championId) => {
        dispatch({ type: 'REMOVE_COMPARE', payload: championId });
    }

    const resetCompare = () => {
        dispatch({ type: 'RESET_COMPARE' });
    }

    const isCompare = (championId) => compareList.includes(championId);

    const toggleCompare = (champion) => {
        isCompare(champion.id)
            ? removeFromCompare(champion.id)
            : addToCompare(champion.id);
    };

    const value = { compareList, addToCompare, removeFromCompare, resetCompare, isCompare, toggleCompare, compareLimitReached }

    return (
        <CompareContext.Provider value={value}>
            {children}
        </CompareContext.Provider>
    )
}