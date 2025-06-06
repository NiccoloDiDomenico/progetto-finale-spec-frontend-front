import { useState, useEffect } from 'react';
const API_URL = import.meta.env.VITE_API_URL;

export default function useChampions() {
    const [champions, setChampions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChampions = async () => {
            try {
                const res = await fetch(`${API_URL}/champions`);
                if (!res.ok) throw new Error("Failed to fetch champions");
                const data = await res.json();
                setChampions(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchChampions();
    }, []);

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

    return { champions, loading, error, getChampionDetailById };
}