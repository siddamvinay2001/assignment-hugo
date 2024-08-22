import { z } from 'zod';

export const formSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }).min(4, { message: 'Name must be at least 3 characters long' }),
    nickname: z.string().optional(),
    email: z.string().email({ message: 'Invalid email address' }).min(1, { message: 'Email is required' }),
    isChecked: z.boolean().refine(val => val, { message: 'You must accept the terms' }),
});
