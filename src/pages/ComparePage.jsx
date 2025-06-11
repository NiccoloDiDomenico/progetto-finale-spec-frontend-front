import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import useChampionDetail from "../hooks/useChampionDetail";
import ChampionCompareCard from "../components/ChampionCompareCard";

export default function ComparatorPage() {
    const { champions } = useContext(GlobalContext);
    const [firstChampionId, setFirstChampionId] = useState("");
    const [secondChampionId, setSecondChampionId] = useState("");

    const { champion: champOne } = useChampionDetail(firstChampionId);
    const { champion: champTwo } = useChampionDetail(secondChampionId);

    return (
        <div className="min-h-screen bg-gray-900 text-white py-10 px-4">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* {Hero} */}
                <h1 className="text-4xl font-bold text-yellow-300 text-center">Compare Champions</h1>
                {!champOne && !champTwo && (
                    <p className="text-xl text-gray-300 text-center">Select champions to compare</p>
                )}

                {/* Select boxes */}
                <div className="flex flex-col md:flex-row justify-center gap-6">
                    <select
                        className="bg-gray-800 p-2 rounded-lg text-white"
                        value={firstChampionId}
                        onChange={(e) => setFirstChampionId(e.target.value)}
                    >
                        <option value="">-</option>
                        {champions.map((champ) => (
                            <option key={champ.id} value={champ.id}>
                                {champ.title}
                            </option>
                        ))}
                    </select>

                    <span className="text-2xl text-center font-bold text-yellow-300">VS</span>

                    <select
                        className="bg-gray-800 p-2 rounded-lg text-white"
                        value={secondChampionId}
                        onChange={(e) => setSecondChampionId(e.target.value)}
                    >
                        <option value="">-</option>
                        {champions.map((champ) => (
                            <option key={champ.id} value={champ.id}>
                                {champ.title}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Comparison Grid */}
                <div className="flex justify-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {firstChampionId && champOne && (
                            <ChampionCompareCard
                                champion={champOne}
                                rival={champTwo}
                            />
                        )}
                        {setSecondChampionId && champTwo && (
                            <ChampionCompareCard
                                champion={champTwo}
                                rival={champOne}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}