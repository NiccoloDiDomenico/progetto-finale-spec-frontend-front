import { createContext, useState, useEffect } from "react";
import { fetchChampions } from "../api/champions";

// Context
export const ChampionsContext = createContext();

// Provider
export const ChampionsProvider = ({ children }) => {
    const [champions, setChampions] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState("");
    const [error, setError] = useState(null);

    const categories = ["Fighter", "Mage", "Assassin", "Marksman", "Tank", "Support"]

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const data = await fetchChampions(search, category);
                setChampions(data);
            } catch (err) {
                console.error(err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, [search, category]);

    const value = {
        champions,
        search,
        setSearch,
        category,
        setCategory,
        loading,
        error,
        categories,
    }

    return (
        <ChampionsContext.Provider value={value}>
            {children}
        </ChampionsContext.Provider>
    );
};
