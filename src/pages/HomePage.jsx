import { useContext, useState } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import ChampionCard from "../components/ChampionCard";

export default function HomePage() {
    const { champions, loading, error, categories, setSearchQuery, setCategoryFilter } = useContext(GlobalContext);

    const [inputValue, setInputValue] = useState(""); // Add this state

    return (
        <div className="min-h-screen w-full bg-gray-900">
            <div className="container mx-auto py-5 px-20 text-white">
                {/* Hero Section */}
                <section className="text-center">
                    <h1 className="text-6xl font-bold mb-4">Welcome to <span className="text-yellow-300">LoL Stats</span></h1>
                    <p className="text-xl text-gray-300">
                        Explore detailed statistics and information about your favorite League of Legends champions.
                    </p>

                    {/* Search Bar */}
                    <div className="flex flex-col items-stretch md:flex-row md:justify-center gap-4 my-12">
                        <div className="relative">
                            <input
                                id="champion-search"
                                type="text"
                                placeholder="Search champions..."
                                className="px-4 py-2 rounded bg-gray-800 text-white w-full md:w-84"
                                value={inputValue}
                                onChange={(e) => {
                                    setInputValue(e.target.value);
                                    setSearchQuery(e.target.value);
                                }}
                            />
                            {
                                inputValue && (
                                    <button
                                        type="button"
                                        className="absolute right-2 top-2 text-gray-400 hover:text-white"
                                        aria-label="Clear search"
                                        aria-controls="champion-search"
                                        onClick={() => {
                                            setSearchQuery("");
                                            setInputValue("");
                                        }}
                                    >
                                        ✕
                                    </button>
                                )
                            }
                        </div>
                        <select
                            className="px-4 py-2 rounded bg-gray-800 text-white"
                            onChange={(e) => setCategoryFilter(e.target.value)}
                        >
                            <option value="">All Roles</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category.toLowerCase()}>{category}</option>
                            ))}
                        </select>
                    </div>
                </section>

                <section>
                    {/* Loading State */}
                    {loading && (
                        <div className="text-center text-yellow-300 text-2xl">
                            <p>Loading champions...</p>
                        </div>
                    )}

                    {/* Champions Grid */}
                    <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {champions.map((champion) => (
                            <ChampionCard
                                key={champion.id}
                                champion={champion}
                            />
                        ))}
                    </div>

                    {/* Error States */}
                    {error && (
                        <div className="text-center text-red-500 text-2xl">
                            <p>Error loading champions. Please try again later.</p>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};
