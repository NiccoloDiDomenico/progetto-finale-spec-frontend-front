import { createContext, useReducer } from "react";

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

    const addToCompare = (champion) => {
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

    const value = { compareList, addToCompare, removeFromCompare, resetCompare, isCompare }

    return (
        <CompareContext.Provider value={value}>
            {children}
        </CompareContext.Provider>
    )
}