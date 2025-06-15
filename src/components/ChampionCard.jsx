import { Link } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";
import { useCompare } from "../hooks/useCompare";

export default function ChampionCard({ champion, page }) {
    const { toggleFavorite, isFavorite } = useFavorites();
    const { toggleCompare, isCompare } = useCompare();

    const handleActionClick = (e, action) => {
        e.preventDefault();
        switch (action) {
            case 'favorites':
                toggleFavorite(champion);
                break;
            case 'compare':
                toggleCompare(champion);
                break;
            default:
                break;
        }
    };

    return (
        <>
            {/* Card */}
            < Link
                to={`/champion/${champion.id}`
                }
                className="relative bg-gray-800 rounded-lg p-2 md:p-4 flex max-sm:gap-3 sm:flex-col items-center hover:bg-gray-700 transition-colors cursor-pointer"
            >

                {/* Card Header */}
                <img src={champion.image.square} alt={champion.name} className="w-18 sm:w-24 rounded-lg sm:mb-2 object-cover" />

                {/* Card Content */}
                <div className="sm:text-center max-sm:flex-1 max-sm:flex justify-between items-center">
                    <div>
                        <h2 className="text-base md:text-xl font-bold hover:text-yellow-300 transition-colors">
                            {champion.title.toUpperCase()}
                        </h2>
                        {/* Champions role */}
                        {(page === 'homepage' || page === 'favorites') && (
                            <p className="text-sm md:text-base text-gray-400">{champion.category.toUpperCase()}</p>
                        )}
                    </div>

                    {/* Static Action Menu */}
                    {page === 'homepage' && (
                        <div className="flex max-sm:flex-col justify-center sm:mt-1">
                            {/* Favorite button */}
                            <button
                                title="Add to Favorites"
                                className={`p-2 rounded-lg hover:bg-gray-800 transition-colors ${isFavorite(champion.id) ? "text-yellow-300" : "text-gray-300"
                                    }`}
                                onClick={(e) => handleActionClick(e, 'favorites')}
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                </svg>
                            </button>

                            {/* Compare button */}
                            <button
                                title="Compare Champion"
                                className={`p-2 rounded-lg hover:bg-gray-800 transition-colors ${isCompare(champion.id) ? "text-yellow-300" : "text-gray-300"}`}
                                onClick={(e) => handleActionClick(e, 'compare')}
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                </svg>
                            </button>
                        </div>
                    )}

                    {/* Remove favorite button */}
                    {page === 'favorites' && (
                        <button
                            title="Remove from Favorites"
                            className="absolute top-2 right-2 text-white cursor-pointer"
                            onClick={(e) => handleActionClick(e, 'favorites')}
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 6l12 12M18 6l-12 12" />
                            </svg>
                        </button>
                    )}
                </div>
            </Link >
        </>
    );
}