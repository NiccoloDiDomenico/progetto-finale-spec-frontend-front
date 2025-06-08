import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { Link } from "react-router-dom";
import ChampionCard from "../components/ChampionCard";

export default function HomePage() {
    const { champions, loading, error } = useContext(GlobalContext);

    return (
        <div className="min-h-screen w-full bg-gray-900">
            <div className="container mx-auto py-5 px-20 text-white">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <h1 className="text-6xl font-bold mb-4">Welcome to <span className="text-yellow-300">LoL Stats</span></h1>
                    <p className="text-xl text-gray-300">
                        Explore detailed statistics and information about your favorite League of Legends champions.
                    </p>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="text-center text-yellow-300 text-2xl">
                        <p>Loading champions...</p>
                    </div>
                )}

                {/* Champions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
            </div>
        </div>
    );
}
