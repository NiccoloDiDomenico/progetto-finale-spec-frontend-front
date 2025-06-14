import { useState } from "react";
import { useCompare } from "../hooks/useCompare";
import { useChampionsComparison } from "../hooks/useChampionsDetails";
import { useChampionsList } from "../hooks/useChampionsList";
import ChampionCompareCard from "../components/ChampionCompareCard";

export default function ComparatorPage() {
    const { compareList, resetCompare, addToCompare } = useCompare();
    const { championsList } = useChampionsList();
    const { champions, loading, error } = useChampionsComparison(compareList);
    const [selectedId, setSelectedId] = useState("");

    const availableOptions = championsList.filter(
        champ => !compareList.includes(champ.id)
    );

    const handleSelect = (e) => {
        const id = parseInt(e.target.value);
        if (!id) return;
        addToCompare(id);
        setSelectedId("");
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white py-10 px-4">
            {/* Title Section */}
            <section className="text-center mb-12">
                <h1 className="text-5xl md:text-6xl font-bold text-yellow-300 mb-4">Compare</h1>
                <p className="text-lg md:text-xl text-gray-300">
                    Compare detailed statistics and information about multiple League of Legends champions.
                </p>

                <div className="flex justify-center gap-4 mt-6">
                    {/* Add Champion Select */}
                    <select
                        value={selectedId}
                        className="px-4 py-2 rounded bg-gray-800 text-white"
                        onChange={handleSelect}
                        disabled={compareList.length === 3}
                    >
                        <option value="">{compareList.length < 3 ? "Add new champ" : "-"}</option>
                        {availableOptions.map(champ => (
                            <option key={champ.id} value={champ.id}>
                                {champ.title}
                            </option>
                        ))}
                    </select>

                    {/* Reset Button */}
                    {champions.length > 0 && (
                        <button
                            title="Reset Comparison"
                            className="bg-gray-700 hover:bg-gray-800 text-sm font-semibold text-white py-2 px-4 rounded shadow"
                            onClick={resetCompare}
                        >
                            Reset
                        </button>
                    )}
                </div>

                {/* Empty state */}
                {compareList.length === 0 && (
                    <div className="text-center text-gray-400 text-lg md:text-xl mt-20">
                        No champions selected for comparison. Please add champions to compare.
                    </div>
                )}

                {/* Error state */}
                {error && (
                    <div className="text-center text-red-400 mt-8">
                        One or more champions failed to load. Try again.
                    </div>
                )}

                {/* Loading state */}
                {!error && loading && compareList.length > 0 && (
                    <div className="text-center text-gray-500 mt-8">Loading champion details...</div>
                )}
            </section>

            {/* Champions Comparison */}
            {champions.length > 0 && (
                <div className="max-w-5xl mx-auto px-4">
                    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                        {champions.map((champion, index) => {
                            const rivals = champions.filter((_, i) => i !== index);
                            return (
                                <ChampionCompareCard
                                    key={champion.id}
                                    champion={champion}
                                    rivals={rivals}
                                />
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}