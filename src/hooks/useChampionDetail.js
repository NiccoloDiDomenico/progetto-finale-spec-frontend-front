import { useEffect, useState } from "react";
import { fetchChampionById } from "../api/champions";

export default function useChampionDetail(id) {
    const [champion, setChampion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!id) return;

        const getChampion = async () => {
            try {
                const data = await fetchChampionById(id);
                setChampion(data.champion);
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        getChampion();
    }, [id]);

    return { champion, loading, error };
}