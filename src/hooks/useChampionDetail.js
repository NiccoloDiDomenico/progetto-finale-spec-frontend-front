import { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

export default function useChampionDetail(id) {
    const [champion, setChampion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!id) return;
        const fetchChampion = async () => {
            try {
                const res = await fetch(`${API_URL}/champions/${id}`);
                if (!res.ok) throw new Error("Failed to fetch");
                const data = await res.json();
                setChampion(data.champion);
            } catch (error) {
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        fetchChampion();
    }, [id]);

    return { champion, loading, error };
}