import { z } from "zod";

export const userValidation = z.object({
    userName: z.string()
        .min(3, { message: "Username must be at least 3 characters long" })
        .max(50, { message: "Username must be at most 50 characters long" }),
    email: z.string().email({ message: "Invalid company email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
    mobileNumber: z.string().refine((value) => value.toString().length >= 10 && value.toString().length <= 15,
        { message: "Mobile number must be between 10 and 15 digits" }),
    referralSource: z.string().max(100, { message: "Referral source must be at most 100 characters long" }),
    companyName: z.string().max(100, { message: "Company name must be at most 100 characters long" }),
    teamSize: z.string()
});
