import { useState } from "react";
import { useFavorites } from "../hooks/useFavorites";
import { useChampionsList } from "../hooks/useChampionsList";
import ChampionCard from "../components/ChampionCard";

export default function FavoritesPage() {
    const { championsList } = useChampionsList();
    const { favorites, addToFavorite, resetFavorites } = useFavorites();
    const [selectedId, setSelectedId] = useState("");

    const availableOptions = championsList.filter(
        (champ) => !favorites.includes(champ.id)
    );

    const handleSelect = (e) => {
        const id = parseInt(e.target.value);
        if (!id) return;
        addToFavorite(id);
        setSelectedId("");
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white py-10 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <section className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-yellow-300 mb-8">
                        Favorite Champions
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300">
                        Here you can view and manage your favorite League of Legends champions. Add or remove champions from your favorites list.
                    </p>

                    <div className="flex justify-center gap-4 my-8">
                        {/* Add Champion Select */}
                        <select
                            className="px-4 py-2 rounded bg-gray-800 text-white"
                            value={selectedId}
                            onChange={handleSelect}
                        >
                            <option value="">Add to favorites</option>
                            {availableOptions.map((champ) => (
                                <option key={champ.id} value={champ.id}>
                                    {champ.title}
                                </option>
                            ))}
                        </select>

                        {/* Reset Button */}
                        {favorites.length > 0 && (
                            <button
                                title="Reset Favorites"
                                className="bg-gray-700 hover:bg-gray-800 text-sm font-semibold text-white py-2 px-4 rounded shadow"
                                onClick={resetFavorites}
                            >
                                Reset
                            </button>
                        )}
                    </div>
                </section>

                {/* Empty State */}
                {favorites.length === 0 && (
                    <div className="text-center text-gray-400 text-xl mt-20">
                        You have no favorite champions yet. <br />
                        Add some to see them here!
                    </div>
                )}

                {/* Champions Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {favorites.sort((a, b) => a - b).map((id) => {
                        const champion = championsList.find((c) => c.id === id);
                        if (!champion) return null;
                        return (
                            <ChampionCard
                                key={champion.id}
                                champion={champion}
                                page="favorites"
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}