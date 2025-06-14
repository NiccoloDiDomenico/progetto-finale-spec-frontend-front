const API_URL = import.meta.env.VITE_API_URL;

// Fetch champion list 
export const fetchChampions = async (search, category) => {
    let url = `${API_URL}/champions?`;
    if (search) url += `search=${search}&`;
    if (category) url += `category=${category}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error("Errore nel fetch dei campioni");
    return res.json();
};

// Fetch champion detail
export const fetchChampionById = async (id) => {
    const res = await fetch(`${API_URL}/champions/${id}`);
    if (!res.ok) throw new Error("Errore nel fetch del dettaglio campione");
    return res.json();
};