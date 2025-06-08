import { useState, useEffect } from 'react';
const API_URL = import.meta.env.VITE_API_URL;

export default function useChampions() {
    const [champions, setChampions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");

    const categories = ["Fighter", "Mage", "Assassin", "Marksman", "Tank", "Support"]

    useEffect(() => {
        const fetchChampions = async () => {
            try {
                let url = `${API_URL}/champions?`
                // Add search query if present
                if (searchQuery) {
                    url += `search=${searchQuery}&`
                }
                // Add category filter if present
                if (categoryFilter) {
                    url += `category=${categoryFilter}`
                }
                const res = await fetch(url);
                if (!res.ok) throw new Error("Failed to fetch champions");
                const data = await res.json();
                setChampions(data)
            } catch (err) {
                console.error(err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchChampions();
    }, [searchQuery, categoryFilter]);

    const getChampionDetailById = async (id) => {
        try {
            const res = await fetch(`${API_URL}/champions/${id}`);
            if (!res.ok) throw new Error("Failed to fetch champion details");
            const data = await res.json();
            return data.champion;
        } catch (err) {
            console.error(err);
            throw new Error(err.message);
        }
    };

    return {
        champions,
        loading,
        error,
        setSearchQuery,
        setCategoryFilter,
        categories,
        getChampionDetailById
    };
}