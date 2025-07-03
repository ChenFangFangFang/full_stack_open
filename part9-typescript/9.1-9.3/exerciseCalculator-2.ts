type DailyExerciseHours2 = Array<number>;

interface ExerciseResult2 {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface Rating2 {
    rating: number;
    ratingDescription: string;
}

const getRating2 = (average: number, target: number): Rating2 => {
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

const calculateExercises2 = (daily_exercises: DailyExerciseHours2, target: number): ExerciseResult2 => {
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
    
    const { rating, ratingDescription } = getRating2(average, target);

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

interface ExerciseValues {
    target: number;
    daily_exercises: DailyExerciseHours2;
}

const parseArguments2 = (args: string[]): ExerciseValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    
    const target = Number(args[2]);
    if (isNaN(target)) {
        throw new Error('Target value must be a number');
    }

    const daily_exercises = args.slice(3).map(num => {
        const value = Number(num);
        if (isNaN(value)) {
            throw new Error('All exercise hours must be numbers');
        }
        return value;
    });

    return {
        target,
        daily_exercises
    };
};

try {
    const { target, daily_exercises } = parseArguments2(process.argv);
    console.log(calculateExercises2(daily_exercises, target));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    console.log('Error:', errorMessage);
}


