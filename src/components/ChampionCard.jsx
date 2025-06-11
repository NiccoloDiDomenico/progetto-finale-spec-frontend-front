import { Link } from "react-router-dom";

export default function ChampionCard({ champion, category }) {

    return (
        <Link
            to={`/champion/${champion.id}`}
            key={champion.id}
            className="bg-gray-800 rounded-lg p-4 flex max-sm:gap-3 sm:flex-col items-center hover:bg-gray-700 transition-colors cursor-pointer"
        >
            <img
                src={champion.image.square}
                alt={champion.name}
                className="w-18 sm:w-24 rounded-lg sm:mb-4 object-cover"
            />
            <div className="text-center">
                <h2 className="text-lg md:text-xl font-bold hover:text-yellow-300 transition-colors">{champion.title.toUpperCase()}</h2>
                {category && (
                    <p className="text-gray-400">{champion.category.toUpperCase()}</p>
                )}
            </div>
        </Link>
    )
}