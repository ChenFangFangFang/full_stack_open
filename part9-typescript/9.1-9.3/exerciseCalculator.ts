type DailyExerciseHours = Array<number>;

interface ExerciseResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface Rating {
    rating: number;
    ratingDescription: string;
}

const getRating = (average: number, target: number): Rating => {
    if (average >= target * 1.1) {
        return {
            rating: 3,
            ratingDescription: "Great job! You reached your target."
        };
    } else if (average >= target) {
        return {
            rating: 2,
            ratingDescription: "Not too bad but could be better."
        };
    } else {
        return {
            rating: 1,
            ratingDescription: "Keep it up!"
        };
    }
};

const calculateExercises = (daily_exercises: DailyExerciseHours, target: number): ExerciseResult => {
    // Input validation
    if (daily_exercises.length === 0) {
        throw new Error('daily exercises array cannot be empty');
    }
    
    if (target < 0) {
        throw new Error('target hours cannot be negative');
    }

    if (daily_exercises.some(hours => hours < 0)) {
        throw new Error('exercise hours cannot be negative');
    }

    const periodLength = daily_exercises.length;
    const trainingDays = daily_exercises.filter(hours => hours > 0).length;
    const average = daily_exercises.reduce((sum, hours) => sum + hours, 0) / periodLength;
    const success = average >= target;
    
    const { rating, ratingDescription } = getRating(average, target);

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));