import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-3xl text-yellow-300 font-bold tracking-wide">LoL Compare</h1>
                <ul className="flex gap-6 text-lg">
                    <li>
                        <Link to="/" className="hover:text-blue-400 transition">Home</Link>
                    </li>
                    <li>
                        <Link to="/compare" className="hover:text-blue-400 transition">Compare</Link>
                    </li>
                    <li>
                        <Link to="/favorites" className="hover:text-blue-400 transition">Favorites</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}