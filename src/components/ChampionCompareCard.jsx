import { getDifficultyRating, getColorClass } from "../utility/customFunctions";

export default function ChampionCompareCard({ champion, rival }) {

    return (
        <div className="bg-gray-800 rounded-xl p-6 space-y-6 shadow-md relative">
            {/* Header with image and title */}
            <div className="flex gap-4 items-center">
                <img
                    src={champion.image.square}
                    alt={champion.title}
                    className="w-24 h-24 rounded-lg"
                />
                <div>
                    <h2 className="text-xl font-bold text-yellow-300">{champion.title.toUpperCase()}</h2>
                    <p className="text-gray-400">{champion.description.toUpperCase()}</p>
                </div>
            </div>

            {/* Detail Section */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-yellow-300">Detail</h2>
                <div className="space-y-2">
                    <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                        <p className="text-gray-400">Position</p>
                        <p className="font-bold">{champion.role.charAt(0).toUpperCase() + champion.role.slice(1)}</p>
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

            {/* Info Section */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-yellow-300">Info</h2>
                <div className="space-y-2">
                    <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                        <p className="text-gray-400">Attack</p>
                        <p className={`font-bold ${getColorClass(champion.info.attack, rival?.info?.attack)}`}>{champion.info.attack}</p>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                        <p className="text-gray-400">Defense</p>
                        <p className={`font-bold ${getColorClass(champion.info.defense, rival?.info?.defense)}`}>{champion.info.defense}</p>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                        <p className="text-gray-400">Magic</p>
                        <p className={`font-bold ${getColorClass(champion.info.magic, rival?.info?.magic)}`}>{champion.info.magic}</p>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-yellow-300">Stats</h2>
                <div className="space-y-2">
                    <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                        <p className="text-gray-400">Health</p>
                        <div className="text-right">
                            <p className={`font-bold ${getColorClass(champion.stats.hp, rival?.stats?.hp)}`}>{champion.stats.hp}</p>
                            <p className="text-sm text-gray-400">+{champion.stats.hpperlevel} per level</p>
                        </div>
                    </div>

                    <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                        <p className="text-gray-400">Mana</p>
                        <div className="text-right">
                            <p className={`font-bold ${getColorClass(champion.stats.mp, rival?.stats?.mp)}`}>{champion.stats.mp}</p>
                            <p className="text-sm text-gray-400">+{champion.stats.mpperlevel} per level</p>
                        </div>
                    </div>

                    <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                        <p className="text-gray-400">Movement Speed</p>
                        <div className="text-right">
                            <p className={`font-bold ${getColorClass(champion.stats.movespeed, rival?.stats?.movespeed)}`}>{champion.stats.movespeed}</p>
                        </div>
                    </div>

                    <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                        <p className="text-gray-400">Armor</p>
                        <div className="text-right">
                            <p className={`font-bold ${getColorClass(champion.stats.armor, rival?.stats?.armor)}`}>{champion.stats.armor}</p>
                            <p className="text-sm text-gray-400">+{champion.stats.armorperlevel} per level</p>
                        </div>
                    </div>

                    <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                        <p className="text-gray-400">Magic Resist</p>
                        <div className="text-right">
                            <p className={`font-bold ${getColorClass(champion.stats.spellblock, rival?.stats?.spellblock)}`}>{champion.stats.spellblock}</p>
                            <p className="text-sm text-gray-400">+{champion.stats.spellblockperlevel} per level</p>
                        </div>
                    </div>

                    <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                        <p className="text-gray-400">Attack Range</p>
                        <div className="text-right">
                            <p className={`font-bold ${getColorClass(champion.stats.attackrange, rival?.stats?.attackrange)}`}>{champion.stats.attackrange}</p>
                        </div>
                    </div>

                    <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                        <p className="text-gray-400">HP Regen</p>
                        <div className="text-right">
                            <p className={`font-bold ${getColorClass(champion.stats.hpregen, rival?.stats?.hpregen)}`}>{champion.stats.hpregen}</p>
                            <p className="text-sm text-gray-400">+{champion.stats.hpregenperlevel} per level</p>
                        </div>
                    </div>

                    <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                        <p className="text-gray-400">Mana Regen</p>
                        <div className="text-right">
                            <p className={`font-bold ${getColorClass(champion.stats.mpregen, rival?.stats?.mpregen)}`}>{champion.stats.mpregen}</p>
                            <p className="text-sm text-gray-400">+{champion.stats.mpregenperlevel} per level</p>
                        </div>
                    </div>

                    <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                        <p className="text-gray-400">Attack Speed</p>
                        <div className="text-right">
                            <p className={`font-bold ${getColorClass(champion.stats.attackspeed, rival?.stats?.attackspeed)}`}>Base</p>
                            <p className="text-sm text-gray-400">+{champion.stats.attackspeedperlevel}% per level</p>
                        </div>
                    </div>

                    <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                        <p className="text-gray-400">Critical Strike</p>
                        <div className="text-right">
                            <p className={`font-bold ${getColorClass(champion.stats.crit, rival?.stats?.crit)}`}>{champion.stats.crit}%</p>
                            <p className="text-sm text-gray-400">+{champion.stats.critperlevel}% per level</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}