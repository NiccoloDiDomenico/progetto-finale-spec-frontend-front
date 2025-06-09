export default function SortFilter({ sortBy, setSortBy }) {
    return (
        <select
            className="px-4 py-2 rounded bg-gray-800 text-white"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
        >
            <option value="default">Sort by...</option>
            <option value="title-asc">Title A-Z</option>
            <option value="title-desc">Title Z-A</option>
            <option value="category-asc">Roles A-Z</option>
            <option value="category-desc">Roles Z-A</option>
        </select>
    )
}