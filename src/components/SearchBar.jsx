import { useState } from "react";

export default function SearchBar({ setSearchQuery }) {
    const [inputValue, setInputValue] = useState("");

    return (
        <div className="relative">
            <input
                id="champion-search"
                type="text"
                placeholder="Search champions..."
                className="px-4 py-2 rounded bg-gray-800 text-white w-full"
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value);
                    setSearchQuery(e.target.value);
                }}
            />
            {
                inputValue && (
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
        </div>
    );
};