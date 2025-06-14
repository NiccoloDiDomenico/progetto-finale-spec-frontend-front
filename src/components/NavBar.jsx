import { Link } from "react-router-dom";
import { useState } from "react";
import { useCompare } from "../hooks/useCompare";
import { useFavorites } from "../hooks/useFavorites";

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const { compareList } = useCompare();
    const { favorites } = useFavorites();

    const NavItem = ({ to, icon, label, count }) => (
        <li className="relative">
            <Link
                to={to}
                className="hover:text-yellow-300 transition flex items-center gap-1"
                onClick={() => setIsOpen(false)}
                title={label}
                aria-label={label}
            >
                <span className="hidden lg:inline">{label}</span>
                {icon}
                {count > 0 && (
                    <span className="absolute -top-2 -right-3 bg-yellow-400 text-black rounded-full text-xs w-5 h-5 flex items-center justify-center">
                        {count}
                    </span>
                )}
            </Link>
        </li>
    );

    return (
        <nav className="bg-gray-800 text-white px-6 py-4 shadow-md relative">
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <h1 className="text-2xl md:text-3xl text-yellow-300 font-bold tracking-wide">LoL Stats</h1>

                    {/* Desktop menu */}
                    <ul className="hidden md:flex gap-6 text-lg">
                        <NavItem
                            to="/"
                            label="Home"
                            icon={
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M3 12l9-9 9 9M4 10v10a1 1 0 001 1h5m4 0h5a1 1 0 001-1V10" />
                                </svg>
                            }
                        />
                        <NavItem
                            to="/compare"
                            label="Compare"
                            icon={
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                </svg>
                            }
                            count={compareList.length}
                        />
                        <NavItem
                            to="/favorites"
                            label="Favorites"
                            icon={
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                </svg>
                            }
                            count={favorites.length}
                        />
                    </ul>

                    {/* Mobile button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-white hover:text-yellow-300 focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            {isOpen ? (
                                <path d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>


                {/* Mobile menu */}
                {isOpen && (
                    <div className="md:hidden mt-4">
                        <ul className="flex flex-col gap-4 text-lg">
                            <li>
                                <Link
                                    to="/"
                                    className="block hover:text-yellow-300 transition py-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M3 12l9-9 9 9M4 10v10a1 1 0 001 1h5m4 0h5a1 1 0 001-1V10" />
                                    </svg>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/compare"
                                    className="block hover:text-yellow-300 transition py-2 flex items-center gap-1"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                    </svg>
                                    {compareList.length > 0 && `(${compareList.length})`}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/favorites"
                                    className="block hover:text-yellow-300 transition py-2 flex items-center gap-1"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                    {favorites.length > 0 && `(${favorites.length})`}
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
}