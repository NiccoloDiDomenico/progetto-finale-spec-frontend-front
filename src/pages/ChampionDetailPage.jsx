import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useChampionById } from "../hooks/useChampionsDetails";
import { getDifficultyRating } from "../utils/customFunctions";

export default function ChampionsDetailPage() {
    const { id } = useParams();
    const { champion, loading, error } = useChampionById(id);

    const detailsRef = useRef(null);

    const [selectedAbility, setSelectedAbility] = useState(null);
    const abilityKeys = ["P", "Q", "W", "E", "R"];

    const handleScroll = () => {
        detailsRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    if (loading) {
        return (
            <div className="text-center text-yellow-300 text-2xl pt-10">
                <p>Loading champion details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 text-2xl pt-10">
                <p>Error loading champion data.</p>
            </div>
        );
    }

    if (!champion) {
        return (
            <div className="text-center text-gray-400 text-2xl pt-10">
                <p>No data available.</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 text-white">

            {/* Hero section */}
            <section className="relative h-[calc(100vh-3rem)] w-full overflow-hidden">

                {/* {Splash art} */}
                <img
                    src={champion.image.splash}
                    alt={champion.title}
                    className="absolute w-full h-full object-cover"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/20 via-gray-900/40 to-gray-900/20" />

                {/* Content */}
                <div className="relative h-full z-20 container mx-auto px-10 flex flex-col justify-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-yellow-300">
                        {champion.title.toUpperCase()}
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl italic text-gray-300">
                        {champion.description.toUpperCase()}
                    </p>
                    <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed max-w-2xl">
                        {champion.lore}
                    </p>
                </div>

                {/* Scroll indicator */}
                <div
                    onClick={handleScroll}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 px-4 md:px-6 py-2 md:py-3 rounded-4xl cursor-pointer animate-pulse bg-gray-900/30  hover:bg-gray-900/40 transition-all shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40"
                >
                    <span className="text-yellow-300 text-sm md:text-base lg:text-lg">Explore {champion.title}</span>
                </div>
            </section>

            {/* Details section */}
            <section
                ref={detailsRef}
                className="min-h-screen container mx-auto px-10 py-10"
            >
                <div className="space-y-8">
                    {/* Details */}
                    <div>
                        <h2 className="text-3xl font-bold text-yellow-300 mb-4">Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                            <div className="bg-gray-800 p-4 rounded-lg">
                                <p className="text-gray-400">Position</p>
                                <p className="font-bold text-xl">{champion.role.charAt(0).toUpperCase() + champion.role.slice(1)}</p>
                            </div>
                            <div className="bg-gray-800 p-4 rounded-lg">
                                <p className="text-gray-400">Role</p>
                                <p className="font-bold text-xl">{champion.category}</p>
                            </div>
                            <div className="bg-gray-800 p-4 rounded-lg">
                                <p className="text-gray-400">Resource</p>
                                <p className="font-bold text-xl">{champion.partype}</p>
                            </div>
                            <div className="bg-gray-800 p-4 rounded-lg">
                                <p className="text-gray-400">Difficulty</p>
                                <p className="font-bold text-xl">{getDifficultyRating(champion.info.difficulty)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Abilities */}
                    <div>
                        <h2 className="text-3xl font-bold text-yellow-300 mb-4">Abilities</h2>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                            {/* Passive */}
                            <div
                                className="bg-gray-800 p-4 rounded-lg cursor-pointer hover:scale-105 transition"
                                onClick={() => setSelectedAbility({ ...champion.passive, key: "P" })}
                            >
                                <img src={champion.passive.image} alt={champion.passive.name} className="mx-auto mb-2" />
                                <p className="text-lg text-yellow-300 font-bold text-center">P</p>
                                <p className="text-base text-center mt-1">{champion.passive.name}</p>
                            </div>

                            {/* Spells */}
                            {champion.spells.map((spell, i) => (
                                <div
                                    key={spell.id}
                                    className="bg-gray-800 p-4 rounded-lg cursor-pointer hover:scale-105 transition"
                                    onClick={() => setSelectedAbility({ ...spell, key: abilityKeys[i + 1] })}
                                >
                                    <img src={spell.image} alt={spell.name} className="mx-auto mb-2" />
                                    <p className="text-lg text-yellow-300 font-bold text-center">{abilityKeys[i + 1]}</p>
                                    <p className="text-base text-center mt-1">{spell.name}</p>
                                </div>
                            ))}
                        </div>
                        {/* Modal */}
                        {selectedAbility && (
                            <div className="fixed inset-0 bg-black/80 z-50 flex items-center">
                                <div className="bg-gray-900 p-6 rounded-xl   max-w-xs md:max-w-md  mx-auto text-white relative">
                                    <button
                                        className="absolute top-3 right-3 text-gray-400 text-2xl hover:text-white"
                                        onClick={() => setSelectedAbility(null)}
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 6l12 12M18 6l-12 12" />
                                        </svg>
                                    </button>
                                    <div className="flex items-center gap-4 mb-4">
                                        <img src={selectedAbility.image} alt={selectedAbility.name} />
                                        <div>
                                            <span className="text-xl text-yellow-300 font-bold text-lg">{selectedAbility.key}</span>
                                            <h3 className="text-xl font-semibold">{selectedAbility.name}</h3>
                                        </div>
                                    </div>
                                    <p className="text-sm md:text-base" dangerouslySetInnerHTML={{ __html: selectedAbility.description }} />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Stats */}
                    <div>
                        <h2 className="text-3xl font-bold text-yellow-300 mb-4">Stats</h2>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                            <div className="bg-gray-800 p-4 rounded-lg">
                                <p className="text-gray-400">Health</p>
                                <p className="font-bold text-xl">{champion.stats.hp}</p>
                                <p className="text-sm text-gray-400">+{champion.stats.hpperlevel} per level</p>
                            </div>

                            <div className="bg-gray-800 p-4 rounded-lg">
                                <p className="text-gray-400">Mana</p>
                                <p className="font-bold text-xl">{champion.stats.mp}</p>
                                <p className="text-sm text-gray-400">+{champion.stats.mpperlevel} per level</p>
                            </div>

                            <div className="bg-gray-800 p-4 rounded-lg">
                                <p className="text-gray-400">Armor</p>
                                <p className="font-bold text-xl">{champion.stats.armor}</p>
                                <p className="text-sm text-gray-400">+{champion.stats.armorperlevel} per level</p>
                            </div>

                            <div className="bg-gray-800 p-4 rounded-lg">
                                <p className="text-gray-400">Magic Resist</p>
                                <p className="font-bold text-xl">{champion.stats.spellblock}</p>
                                <p className="text-sm text-gray-400">+{champion.stats.spellblockperlevel} per level</p>
                            </div>

                            <div className="bg-gray-800 p-4 rounded-lg">
                                <p className="text-gray-400">Movement Speed</p>
                                <p className="font-bold text-xl">{champion.stats.movespeed}</p>
                            </div>

                            <div className="bg-gray-800 p-4 rounded-lg">
                                <p className="text-gray-400">Attack Range</p>
                                <p className="font-bold text-xl">{champion.stats.attackrange}</p>
                            </div>

                            <div className="bg-gray-800 p-4 rounded-lg">
                                <p className="text-gray-400">HP Regen</p>
                                <p className="font-bold text-xl">{champion.stats.hpregen}</p>
                                <p className="text-sm text-gray-400">+{champion.stats.hpregenperlevel} per level</p>
                            </div>

                            <div className="bg-gray-800 p-4 rounded-lg">
                                <p className="text-gray-400">Mana Regen</p>
                                <p className="font-bold text-xl">{champion.stats.mpregen}</p>
                                <p className="text-sm text-gray-400">+{champion.stats.mpregenperlevel} per level</p>
                            </div>

                            <div className="bg-gray-800 p-4 rounded-lg">
                                <p className="text-gray-400">Attack Speed</p>
                                <p className="font-bold text-xl">Base</p>
                                <p className="text-sm text-gray-400">+{champion.stats.attackspeedperlevel}% per level</p>
                            </div>

                            <div className="bg-gray-800 p-4 rounded-lg">
                                <p className="text-gray-400">Critical Strike</p>
                                <p className="font-bold text-xl">{champion.stats.crit}%</p>
                                <p className="text-sm text-gray-400">+{champion.stats.critperlevel}% per level</p>
                            </div>
                        </div>
                    </div>

                    {/* Tips */}
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {champion.allytips.length > 0 && (
                                <div>
                                    <h2 className="text-2xl font-bold text-green-400 mb-2">Ally Tips</h2>
                                    <ul className="list-disc pl-5 space-y-1 text-gray-300">
                                        {champion.allytips.map((tip, i) => (
                                            <li key={i}>{tip}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {champion.enemytips.length > 0 && (
                                <div>
                                    <h2 className="text-2xl font-bold text-red-400 mb-2">Enemy Tips</h2>
                                    <ul className="list-disc pl-5 space-y-1 text-gray-300">
                                        {champion.enemytips.map((tip, i) => (
                                            <li key={i}>{tip}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}