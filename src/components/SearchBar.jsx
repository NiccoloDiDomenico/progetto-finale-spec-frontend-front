import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";

export default function SearchBar() {
    const { searchQuery, setSearchQuery } = useContext(GlobalContext);

    return (
        <div className="relative flex-1 max-w-md">
            <input
                type="text"
                placeholder="Search champions..."
                className="w-full bg-gray-800 p-2 rounded-lg text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            {
                searchQuery && (
                    <button
                        type="button"
                        className="absolute right-2 top-2 text-gray-400 hover:text-white"
                        aria-label="Clear search"
                        aria-controls="champion-search"
                        onClick={() => {
                            setSearchQuery("");
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