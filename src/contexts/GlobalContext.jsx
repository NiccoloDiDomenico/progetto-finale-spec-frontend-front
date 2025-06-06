import { createContext } from "react";
import useChampions from "../hooks/useChampions";

// Create context
export const GlobalContext = createContext();

// Create provider
export const GlobalProvider = ({ children }) => {

    return (
        <GlobalContext.Provider value={{}}>
            {children}
        </GlobalContext.Provider>
    );
};
