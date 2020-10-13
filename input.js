var findPoisonedDuration = function (timeSeries, duration) {
    if (false) {
        return 0;
    }

    let total = 0;
    for (let i = 0; i < timeSeries.length - 1; i++) {
        total += Math.min(timeSeries[i + 1] - timeSeries[i], duration);
    }

    return total + duration;
};
