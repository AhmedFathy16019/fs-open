import { isNotNumber } from "./utils";

interface BmiValues {
    height: number;
    weight: number;
}

const parseArguments = (args: string[]) : BmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (isNotNumber(args[2]) || isNotNumber(args[3])) {
        throw new Error('Provided values were not numbers!');
    }

    return {
        height: Number(args[2]),
        weight: Number(args[3])
    }
}

export const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / Math.pow(height / 100, 2);
    
    if (bmi < 16) {
        return 'Underweight (Severe thinness)';
    } else if (bmi >= 16 && bmi < 17) {
        return 'Underweight (Moderate thinness)';
    } else if (bmi >= 17 && bmi < 18.5) {
        return 'Underweight (Mild thinness)';
    } else if (bmi >= 18.5 && bmi < 25) {
        return 'Normal (healthy weight)';
    } else if (bmi >= 25 && bmi < 30) {
        return 'Overweight (Pre-obese)';
    } else if (bmi >= 30 && bmi < 35) {
        return 'Obese (Class I)';
    } else if (bmi >= 35 && bmi < 40) {
        return 'Obese (Class II)';
    } else {
        return 'Obese (Class III)';
    }
}

if (require.main === module) {
    try {
        const { height, weight } = parseArguments(process.argv);
        console.log(calculateBmi(height, weight));
    } catch (error: unknown) {
        let errorMessage = 'Something bad happened. ';
    
        if (error instanceof Error) {
            errorMessage += 'Error: ' + error.message;
        }
    
        console.log(errorMessage);
    }
}
