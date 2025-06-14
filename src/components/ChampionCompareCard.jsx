import { useCompare } from "../hooks/useCompare";
import { getDifficultyRating, getColorClass } from "../utils/customFunctions";
import ChampionCard from "./ChampionCard";

export default function ChampionCompareCard({ champion, rivals = [] }) {
    const { removeFromCompare } = useCompare();

    const getMaxFromRivals = (getter) =>
        Math.max(...rivals.map(r => r && getter(r)).filter(n => typeof n === "number")) || 0;

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
                    {["attack", "defense", "magic"].map((key) => (
                        <div key={key} className="flex justify-between items-center border-b border-gray-700 pb-2">
                            <p className="text-gray-400">{key.charAt(0).toUpperCase() + key.slice(1)}</p>
                            <p
                                className={`font-bold ${getColorClass(
                                    champion.info[key],
                                    getMaxFromRivals(r => r.info?.[key])
                                )}`}
                            >
                                {champion.info[key]}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Stats Section */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-yellow-300">Stats</h2>
                <div className="space-y-2">
                    {[
                        { key: "hp", label: "Health", suffix: "hpperlevel" },
                        { key: "mp", label: "Mana", suffix: "mpperlevel" },
                        { key: "movespeed", label: "Movement Speed" },
                        { key: "armor", label: "Armor", suffix: "armorperlevel" },
                        { key: "spellblock", label: "Magic Resist", suffix: "spellblockperlevel" },
                        { key: "attackrange", label: "Attack Range" },
                        { key: "hpregen", label: "HP Regen", suffix: "hpregenperlevel" },
                        { key: "mpregen", label: "Mana Regen", suffix: "mpregenperlevel" },
                        { key: "attackspeedperlevel", label: "Attack Speed", suffix: "attackspeedperlevel", isPercent: true },
                        { key: "crit", label: "Critical Strike", suffix: "critperlevel", isPercent: true },
                    ].map(({ key, label, suffix, isPercent }) => (
                        <div key={key} className="flex justify-between items-center border-b border-gray-700 pb-2">
                            <p className="text-gray-400">{label}</p>
                            <div className="text-right">
                                <p
                                    className={`font-bold ${getColorClass(
                                        champion.stats[key],
                                        getMaxFromRivals(r => r.stats?.[key])
                                    )}`}
                                >
                                    {isPercent ? `${champion.stats[key]}%` : champion.stats[key]}
                                </p>
                                {suffix && champion.stats[suffix] != null && (
                                    <p className="text-sm text-gray-400">
                                        +{champion.stats[suffix]}
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