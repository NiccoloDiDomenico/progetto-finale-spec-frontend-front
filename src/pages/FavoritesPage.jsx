import { useFavorites } from "../hooks/useFavorites";
import ChampionCard from "../components/ChampionCard";

export default function FavoritesPage() {
    const { favorites } = useFavorites();

    return (
        <div className="min-h-screen w-full bg-gray-900">
            <div className="container mx-auto py-10 px-20 text-white">
                {/* Title */}
                <section className="text-center mb-12">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">
                        <span className="text-yellow-300">Favorites</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300">
                        Your favorite champions all in one place.
                    </p>
                </section>

                {/* No favorites */}
                {favorites.length === 0 && (
                    <div className="text-center text-gray-400 text-xl mt-20">
                        You haven't added any champions to favorites yet.
                    </div>
                )}

                {/* Favorites List */}
                {favorites.length > 0 && (
                    <div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                        {favorites.map((champion) => (
                            <ChampionCard
                                key={champion.id}
                                champion={champion}
                                page="favorites"
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}