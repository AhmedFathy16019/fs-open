import { z } from 'zod';

import { Visibility, Weather } from "./types";

export const NewEntrySchema = z.object({
    weather: z.nativeEnum(Weather),
    visibility: z.nativeEnum(Visibility),
    date: z.string().date(),
    Comment: z.string().optional(),
});