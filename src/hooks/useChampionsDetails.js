import { useEffect, useState } from "react";
import { fetchChampionById } from "../api/champions";

// ✅ Hook per UN solo campione
export function useChampionById(id) {
    const [champion, setChampion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!id) {
            setChampion(null);
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await fetchChampionById(id);
                setChampion(data.champion);
                setError(false);
            } catch (err) {
                setError(true);
                setChampion(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    return { champion, loading, error };
}

// ✅ Hook per ARRAY di campioni (Promise.all)
export function useChampionsComparison(ids = []) {
    const [champions, setChampions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (ids.length === 0) {
            setChampions([]);
            setLoading(false);
            return;
        }

        const fetchAll = async () => {
            try {
                setLoading(true);
                const results = await Promise.all(ids.map(fetchChampionById));
                const champions = results.filter(r => r && r.champion);
                setChampions(champions.map(r => r.champion));
                setError(false);
            } catch (err) {
                console.error("Errore nel fetch multiplo", err);
                setError(true);
                setChampions([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAll();
    }, [JSON.stringify(ids)]); // stable dependency

    return { champions, loading, error };
}