import { NextRequest } from "next/server";
import { userLoginValidation } from "./validation/validation";
import { z } from "zod";
import bcrypt from 'bcryptjs';
import { genToken } from "@/helpers/token";
import { isErrorResult } from "@/helpers/errorHandler";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const userLoginService = async (req: NextRequest) => {
    try {
        const inputData = await req.json();
        const validationResult = userLoginValidation.safeParse(inputData);

        // Validate the input data
        if (!validationResult.success) {
            const validationErrors = (validationResult as z.SafeParseError<typeof req>).error.issues.map(
                (issue) => ({
                    message: issue.message,
                    path: issue.path.join('.'),
                })
            );
            return { error: { message: 'Validation errors occurred', details: validationErrors }, status: 422 };
        }
        const { data } = validationResult;

        // Check if the user exists in the database
        const isEmailExist = await prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });

        if (!isEmailExist) {
            return { error: { message: 'User not found! Please Register First', path: 'email' }, status: 422 };
        }

        // Check if the email is verified
        if (!isEmailExist.isVerified) {
            return { error: { message: 'Email not verified', path: 'email' }, status: 422 };
        }

        // Verify the password
        const isPassMatch = await bcrypt.compare(data.password, isEmailExist.password);
        if (!isPassMatch) {
            return { error: { message: 'Invalid password', path: 'password' }, status: 422 };
        }

        // Generate a token for the user
        const tokenResult = await genToken({ _id: isEmailExist.id });
        if (isErrorResult(tokenResult)) {
            return { error: { message: tokenResult.error.message, path: 'token' }, status: 422 };
        }

        // Successful login response
        return {
            message: 'User login successful',
            token: tokenResult
        };
    } catch (error: any) {
        return { error: { message: error.message || 'An unexpected error occurred' }, status: 500 };
    } finally {
        await prisma.$disconnect();
    }
};
