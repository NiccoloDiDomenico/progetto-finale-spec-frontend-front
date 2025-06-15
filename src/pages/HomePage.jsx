import { useEffect, useMemo, useState } from "react";
import { useChampionsList } from "../hooks/useChampionsList";
import { useCompare } from "../hooks/useCompare";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilters";
import SortFilter from "../components/SortFilter";
import ChampionCard from "../components/ChampionCard";

export default function HomePage() {
    const { championsList, loading, error, categories, search, setSearch, setCategory } = useChampionsList();
    const { compareLimitReached } = useCompare();
    const [sortBy, setSortBy] = useState("default");

    useEffect(() => {
        setSearch("");
        setCategory("");
    }, []);

    const sortedChampions = useMemo(() => {
        return [...championsList].sort((a, b) => {
            if (sortBy === "default") return 0;
            const [field, direction] = sortBy.split("-");
            return a[field].localeCompare(b[field]) * (direction === "asc" ? 1 : -1);
        })
    }, [championsList, sortBy]);

    return (
        <div className="min-h-screen w-full bg-gray-900">
            <div className="container mx-auto py-10 px-20 text-white">
                {/* Hero Section */}
                <section className="text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4"><span className="text-yellow-300">LoL Stats</span></h1>
                    <p className="text-lg md:text-xl text-gray-300">
                        Explore detailed statistics and information about your favorite League of Legends champions.
                    </p>

                    {/* Compare limit alert */}
                    {compareLimitReached && (
                        <div className="fixed top-25 right-5 bg-yellow-500 text-black px-4 py-2 rounded shadow-lg z-50">
                            You can compare up to 3 champions only.
                        </div>
                    )}

                    <div className="flex flex-col items-stretch md:flex-row md:justify-center lg:flex-wrap gap-4 my-12">
                        {/* Search Bar */}
                        <SearchBar
                            search={search}
                            setSearch={setSearch}
                        />

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
                            setCategoryFilter={setCategory}
                        />

                        {/* Filter Sort */}
                        <SortFilter
                            sortBy={sortBy}
                            setSortBy={setSortBy}
                        />
                    </div>
                </section>

                {/* Champions Section */}
                <section>
                    {/* Loading State */}
                    {loading && (
                        <div className="text-center text-yellow-300 text-2xl mt-20">
                            <p>Loading champions...</p>
                        </div>
                    )}

                    {/* Error States */}
                    {error && (
                        <div className="text-center text-red-500 text-2xl mt-20">
                            <p>Error loading champions. Please try again later.</p>
                        </div>
                    )}

                    {/* No champions */}
                    {!loading && !error && sortedChampions.length === 0 && (
                        <div className="text-center text-gray-400 text-xl mt-20">
                            <p>No champions found. Try changing your search or filter criteria.</p>
                        </div>
                    )}

                    {/* Champions Grid */}
                    <div className="grid sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {sortedChampions.map((champion) => (
                            <ChampionCard
                                key={champion.id}
                                champion={champion}
                                page={'homepage'}
                            />
                        ))}
                    </div>

                </section>
            </div>
        </div>
    );
};
