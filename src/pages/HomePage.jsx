import { useContext, useEffect, useMemo, useState } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import ChampionCard from "../components/ChampionCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilters";
import SortFilter from "../components/SortFilter";

export default function HomePage() {
    const { champions, loading, error, categories, setSearchQuery, setCategoryFilter } = useContext(GlobalContext);
    const [sortBy, setSortBy] = useState("default");

    useEffect(() => {
        setSearchQuery("");
        setCategoryFilter("");
    }, []);

    const sortedChampions = useMemo(() => {
        return [...champions].sort((a, b) => {
            if (sortBy === "default") return 0;
            const [field, direction] = sortBy.split("-");
            return a[field].localeCompare(b[field]) * (direction === "asc" ? 1 : -1);
        })
    }, [champions, sortBy]);

    return (
        <div className="min-h-screen w-full bg-gray-900">
            <div className="container mx-auto py-5 px-20 text-white">
                {/* Hero Section */}
                <section className="text-center">
                    <h1 className="text-6xl font-bold mb-4">Welcome to <span className="text-yellow-300">LoL Stats</span></h1>
                    <p className="text-xl text-gray-300">
                        Explore detailed statistics and information about your favorite League of Legends champions.
                    </p>

                    <div className="flex flex-col items-stretch md:flex-row md:justify-center lg:flex-wrap gap-4 my-12">
                        {/* Search Bar */}
                        <SearchBar />

                        {/* {Filter SVG} */}
                        <div className="px-4 py-2 rounded text-white flex items-center">
                            <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6">
                                <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" fill="#3273FA"></path>
                            </svg>
                            <span className="ms-2 font-bold">Filters</span>
                        </div>

                        {/* {Filter Category} */}
                        <CategoryFilter
                            categories={categories}
                            setCategoryFilter={setCategoryFilter}
                        />

                        {/* Filter Sort */}
                        <SortFilter
                            sortBy={sortBy}
                            setSortBy={setSortBy}
                        />
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
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {sortedChampions.map((champion) => (
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
