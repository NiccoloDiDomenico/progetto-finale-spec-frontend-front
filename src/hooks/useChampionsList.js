import { useContext } from 'react';
import { ChampionsContext } from '../contexts/ChampionsContext';

export const useChampionsList = () => {
    const context = useContext(ChampionsContext);
    if (!context) {
        throw new Error("useChampions must be used within a ChampionsProvider");
    }
    return context;
};