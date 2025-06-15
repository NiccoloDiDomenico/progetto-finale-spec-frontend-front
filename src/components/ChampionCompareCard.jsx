import { useCompare } from "../hooks/useCompare";
import { championStats } from "../utils/championStats";
import { getDifficultyRating, getColorClass, getMaxValueFromRivals } from "../utils/customFunctions";
import ChampionCard from "./ChampionCard";

export default function ChampionCompareCard({ champion, rivals = [] }) {
    const { removeFromCompare } = useCompare();

    return (
        <div className="relative bg-gray-800 rounded-xl p-6 space-y-6">
            {/* Header card */}
            <ChampionCard champion={champion} />

            {/* Detail */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-yellow-300">Detail</h2>
                <div className="space-y-2">
                    <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                        <p className="text-gray-400">Position</p>
                        <p className="font-bold">
                            {champion.role.charAt(0).toUpperCase() + champion.role.slice(1)}
                        </p>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                        <p className="text-gray-400">Role</p>
                        <p className="font-bold">{champion.category}</p>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                        <p className="text-gray-400">Resource</p>
                        <p className="font-bold">{champion.partype}</p>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                        <p className="text-gray-400">Difficulty</p>
                        <p className="font-bold">{getDifficultyRating(champion.info.difficulty)}</p>
                    </div>
                </div>
            </div>

            {/* Info */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-yellow-300">Info</h2>
                <div className="space-y-2">
                    {["attack", "defense", "magic"].map((stat) => (
                        <div key={stat} className="flex justify-between items-center border-b border-gray-700 pb-2">
                            <p className="text-gray-400">{stat.charAt(0).toUpperCase() + stat.slice(1)}</p>
                            <p
                                className={`font-bold ${getColorClass(
                                    champion.info[stat],
                                    getMaxValueFromRivals(rivals, stat)
                                )}`}
                            >
                                {champion.info[stat]}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Stats Section */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-yellow-300">Stats</h2>
                <div className="space-y-2">
                    {championStats.map(({ stat, label, perLevel, isPercent }) => (
                        <div key={stat} className="flex justify-between items-center border-b border-gray-700 pb-2">
                            <p className="text-gray-400">{label}</p>
                            <div className="text-right">
                                <p
                                    className={`font-bold ${getColorClass(
                                        champion.stats[stat],
                                        getMaxValueFromRivals(rivals, stat)
                                    )}`}
                                >
                                    {isPercent ? `${champion.stats[stat]}%` : champion.stats[stat]}
                                </p>
                                {perLevel && champion.stats[perLevel] != null && (
                                    <p className="text-sm text-gray-400">
                                        +{champion.stats[perLevel]}
                                        {isPercent ? "%" : ""} per level
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Remove Button */}
            <div className="text-right">
                <button
                    title="Remove from Compare"
                    className="absolute top-2 right-2 text-white cursor-pointer"
                    onClick={() => removeFromCompare(champion.id)}
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 6l12 12M18 6l-12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
}