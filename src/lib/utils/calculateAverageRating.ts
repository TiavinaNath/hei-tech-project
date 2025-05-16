export function calculateAverageRating(reviews: { rating: number }[]) {
    const totalReviews = reviews.length;

    if (totalReviews === 0) {
        return {
            average: null,
            total: 0,
        };
    }

    const average =
        reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews;

    return {
        average,
        total: totalReviews,
    };
}
