import { useChampions } from "../hooks/useChampions";

export default function SearchBar() {
    const { search, setSearch } = useChampions();

    return (
        <div className="relative flex-1 max-w-md">
            <input
                type="text"
                placeholder="Search champions..."
                className="w-full bg-gray-800 p-2 rounded-lg text-white"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            {
                search && (
                    <button
                        type="button"
                        className="absolute right-2 top-2 text-gray-400 hover:text-white"
                        aria-label="Clear search"
                        aria-controls="champion-search"
                        onClick={() => {
                            setSearch("");
                            setInputValue("");
                        }}
                    >
                        ✕
                    </button>
                )
            }
        </div >
    );
};