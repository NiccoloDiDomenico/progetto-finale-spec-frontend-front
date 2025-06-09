export default function CategoryFilter({ categories, setCategoryFilter }) {
    return (
        <select
            className="px-4 py-2 rounded bg-gray-800 text-white"
            onChange={(e) => setCategoryFilter(e.target.value)}
        >
            <option value="">All Roles</option>
            {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
            ))}
        </select>
    )
}