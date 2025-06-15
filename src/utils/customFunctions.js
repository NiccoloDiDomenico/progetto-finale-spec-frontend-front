export const getDifficultyRating = (difficulty) => {
    if (difficulty <= 3) return 'Easy';
    if (difficulty <= 7) return 'Medium';
    if (difficulty <= 10) return 'Hard';
};

export const getColorClass = (value, rivalValue) => {
    if (value > rivalValue) return "text-green-400";
    if (value < rivalValue) return "text-red-400";
};

export const getMaxValueFromRivals = (rivals, key) => {
    const values = rivals.map(rival => rival ? (rival.info[key] || rival.stats[key]) : 0)
    const maxValue = Math.max(...values);

    return maxValue;
};