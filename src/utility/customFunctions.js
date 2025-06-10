export const getDifficultyRating = (difficulty) => {
    if (difficulty <= 3) return 'Easy';
    if (difficulty <= 7) return 'Medium';
    if (difficulty <= 10) return 'Hard';
};