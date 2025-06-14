import { createContext, useEffect, useReducer, useState } from "react";

const maxCompare = 3

// Reducer
const compareReducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            if (state.includes(action.payload)) return state;
            if (state.length >= maxCompare) return state;
            return [...state, action.payload];
        case 'REMOVE':
            return state.filter((id) => id !== action.payload);
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
        dispatch({ type: 'ADD', payload: championId });
    }

    const removeFromCompare = (championId) => {
        dispatch({ type: 'REMOVE', payload: championId });
    }

    const resetCompare = () => {
        dispatch({ type: 'RESET' });
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