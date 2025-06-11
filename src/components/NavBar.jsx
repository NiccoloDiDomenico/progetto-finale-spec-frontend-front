import { Link } from "react-router-dom";
import { useState } from "react";

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-gray-800 text-white px-6 py-4 shadow-md relative">
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <h1 className="text-2xl md:text-3xl text-yellow-300 font-bold tracking-wide">LoL Stats</h1>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-white hover:text-yellow-300 focus:outline-none"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {isOpen ? (
                                <path d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>

                    {/* Desktop menu */}
                    <ul className="hidden md:flex gap-6 text-lg">
                        <li>
                            <Link to="/" className="hover:text-yellow-300 transition">Home</Link>
                        </li>
                        <li>
                            <Link to="/compare" className="hover:text-yellow-300 transition">Compare</Link>
                        </li>
                        <li>
                            <Link to="/favorites" className="hover:text-yellow-300 transition">Favorites</Link>
                        </li>
                    </ul>
                </div>

                {/* Mobile menu */}
                <div className={`${isOpen ? 'block' : 'hidden'} md:hidden mt-4`}>
                    <ul className="flex flex-col gap-4 text-lg">
                        <li>
                            <Link
                                to="/"
                                className="block hover:text-yellow-300 transition py-2"
                                onClick={() => setIsOpen(false)}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/compare"
                                className="block hover:text-yellow-300 transition py-2"
                                onClick={() => setIsOpen(false)}
                            >
                                Compare
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/favorites"
                                className="block hover:text-yellow-300 transition py-2"
                                onClick={() => setIsOpen(false)}
                            >
                                Favorites
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}