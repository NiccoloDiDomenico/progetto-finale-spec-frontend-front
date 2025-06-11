export const getDifficultyRating = (difficulty) => {
    if (difficulty <= 3) return 'Easy';
    if (difficulty <= 7) return 'Medium';
    if (difficulty <= 10) return 'Hard';
};

export const getColorClass = (value, rivalValue) => {
    if (value > rivalValue) return "text-green-400";
    if (value < rivalValue) return "text-red-400";
};