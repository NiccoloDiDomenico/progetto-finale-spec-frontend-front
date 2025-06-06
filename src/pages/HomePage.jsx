import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { Link } from "react-router-dom";

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
                        <Link
                            to={`/champion/${champion.id}`}
                            key={champion.id}
                            className="bg-gray-800 rounded-lg p-4 flex flex-col items-center hover:bg-gray-700 transition-colors cursor-pointer"
                        >
                            <img
                                src={champion.image.square}
                                alt={champion.name}
                                className="w-32 h-32 rounded-lg mb-4 object-cover"
                            />
                            <h2 className="text-2xl font-bold mb-2 hover:text-yellow-300 transition-colors">{champion.title}</h2>
                            <p className="text-gray-400">{champion.category.toUpperCase()}</p>
                        </Link>
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
