import { Link } from "react-router-dom";

export default function ChampionCard({ champion }) {
    return (
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
    )
}