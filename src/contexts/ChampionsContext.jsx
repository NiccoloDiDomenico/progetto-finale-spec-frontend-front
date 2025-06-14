import { createContext, useState, useEffect, useCallback } from "react";
import { fetchChampions } from "../api/champions";
import { debounce } from "../utils/debounce";

// Context
export const ChampionsContext = createContext();

export const ChampionsProvider = ({ children }) => {
    const [championsList, setChampionsList] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState("");
    const [error, setError] = useState(null);

    const categories = ["Fighter", "Mage", "Assassin", "Marksman", "Tank", "Support"];

    const getData = useCallback(async (searchValue, categoryValue) => {
        setLoading(true);
        try {
            const data = await fetchChampions(searchValue, categoryValue);
            setChampionsList(data);
            setError(false);
        } catch (err) {
            console.error(err);
            setError(true);
            setChampionsList([]);
        } finally {
            setLoading(false);
        }
    }, []);

    const debouncedGetData = useCallback(
        debounce((searchValue, categoryValue) => {
            getData(searchValue, categoryValue);
        }, 300),
        [getData]
    );

    useEffect(() => {
        debouncedGetData(search, category);
    }, [search]);

    useEffect(() => {
        getData(search, category);
    }, [category]);

    const value = {
        championsList,
        search,
        setSearch,
        category,
        setCategory,
        loading,
        error,
        categories,
    };

    return (
        <ChampionsContext.Provider value={value}>
            {children}
        </ChampionsContext.Provider>
    );
};