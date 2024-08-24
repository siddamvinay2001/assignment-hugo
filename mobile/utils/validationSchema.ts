import { z } from "zod";

export const userSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }).min(3, { message: 'Name must be at least 3 characters long' }),
    nickname: z.string().optional(),
    email: z.string().email({ message: 'Invalid email address' }).min(1, { message: 'Email is required' }),
});

export const passwordSchema = z
    .object({
        password: z
            .string()
            .length(4, "Password must be 4 digits")
            .regex(/^\d+$/, "Password must be numeric"),
        confirmPassword: z
            .string()
            .length(4, "Confirm password must be 4 digits")
            .regex(/^\d+$/, "Confirm password must be numeric"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });


export const vehicleSchema = z.object({
    name: z.string().min(1, "Vehicle name is required"),
    type: z.union([z.literal(2), z.literal(3), z.literal(4)]),
    engineCC: z.number().min(50, "Engine CC should be at least 50"),
});
