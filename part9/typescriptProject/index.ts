import express from 'express'; 
import { calculateBmi } from './bmiCalculator';
import { calculator, Operation } from './calculator';
import { calculateExercise } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/ping', (_req, res) => {
    res.send('pong');
});

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (isNaN(height) || isNaN(weight)) {
        res.json({
            error: "malformatted parameters"
        });
        return;
    }

    const bmi = calculateBmi(height, weight);

    res.json({
        weight,
        height,
        bmi
    });
});

app.post('/calculate', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { value1, value2, op } = req.body;

    if (!value1 || isNaN(Number(value1))) {
        res.status(400).json({
            error: "malformatted parameters"
        });
        return;
    }

    if (!value2 || isNaN(Number(value2))) {
        res.status(400).json({
            error: "malformatted parameters"
        });
        return;
    }

    const result = calculator(Number(value1), Number(value2), op as Operation);
    
    res.send({ result });
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    if (!daily_exercises || !target) {
        res.status(400).json({
            error: "parameters missing"
        });
        return;
    }

    if (isNaN(Number(target))) {
        res.status(400).json({
            error: "malformatted parameters"
        });
        return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    if (!daily_exercises.every((value: string) => !isNaN(Number(value)))) {
        res.status(400).json({
            error: "malformatted parameters"
        });
        return;
    }

    const result = calculateExercise(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        daily_exercises.map((hours: string) => Number(hours)) as number[],
        Number(target)
    );

    res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});