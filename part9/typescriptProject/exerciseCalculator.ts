import { isNotNumber } from "./utils";

interface exerciseCalculatorResults {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface exerciseValues {
    target: number;
    dailyExerciseHours: number[];
}

const parseArguments = (args: string[]): exerciseValues => {
    const target = args[2];

    const dailyExerciseHours = args.slice(3).map(hours => hours);
    const isDailyHoursValid = dailyExerciseHours.every(hours => !isNotNumber(hours));
    
    if (!isNotNumber(target) && isDailyHoursValid) {
        return {
            target: Number(target),
            dailyExerciseHours: dailyExerciseHours.map(hours => Number(hours))
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

export const calculateExercise = (dailyExerciseHours: number[], target: number): exerciseCalculatorResults => {
    const trainingDays = dailyExerciseHours.filter(hours => hours > 0).length;
    const average = dailyExerciseHours.reduce((a, b) => a + b, 0) / dailyExerciseHours.length;
    const rating = (average >= target) 
        ? 3 
        : (average >= target * 0.8) ? 2 : 1;
    const ratingDescription = (rating === 3) 
        ? 'Great job!' 
        : (rating === 2) ? 'Not too bad but could be better' 
        : 'You should exercise more';

    return {
        periodLength: dailyExerciseHours.length,
        trainingDays,
        success: average >= target,
        rating,
        ratingDescription,
        target,
        average
    };
};

try {
    const { target, dailyExerciseHours } = parseArguments(process.argv);
    console.log(calculateExercise(dailyExerciseHours, target));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened. ';

    if (error instanceof Error) {
        errorMessage += 'Error: ' + error.message;
    }

    console.log(errorMessage);
}