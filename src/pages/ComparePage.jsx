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
                <h1 className="text-4xl font-bold text-yellow-300 text-center">Compare LoL Champions</h1>

                {/* Compare section */}
                <section className="max-w-2xl mx-auto space-y-8">
                    {/* Select boxes with consistent width */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <select
                            className="w-full bg-gray-800 p-2 rounded-lg text-white"
                            value={firstChampionId}
                            onChange={(e) => setFirstChampionId(e.target.value)}
                        >
                            <option value="">Select Champion</option>
                            {champions.map((champ) => (
                                <option key={champ.id} value={champ.id}>
                                    {champ.title}
                                </option>
                            ))}
                        </select>

                        <select
                            className="w-full bg-gray-800 p-2 rounded-lg text-white"
                            value={secondChampionId}
                            onChange={(e) => setSecondChampionId(e.target.value)}
                        >
                            <option value="">Select Champion</option>
                            {champions.map((champ) => (
                                <option key={champ.id} value={champ.id}>
                                    {champ.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Comparison Grid */}
                    {!champOne && !champTwo && (
                        <p className="text-xl text-gray-300 text-center"> Select champions to compare</p>
                    )}

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
                </section>
            </div>
        </div>
    );
}