import { createContext } from "react";
import useChampions from "../hooks/useChampions";

// Create context
export const GlobalContext = createContext();

// Create provider
export const GlobalProvider = ({ children }) => {
    const championsData = useChampions();

    return (
        <GlobalContext.Provider value={{ ...championsData }}>
            {children}
        </GlobalContext.Provider>
    );
};
