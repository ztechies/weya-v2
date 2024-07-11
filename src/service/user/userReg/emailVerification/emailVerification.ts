import { PrismaClient } from '@prisma/client';
import { isErrorResult } from "@/helpers/errorHandler";
import { verifyToken } from "@/helpers/token";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export const emailVerification = async (req: NextRequest) => {
    try {
        const url = new URL(req.url);
        const token = url.searchParams.get('token');

        if (!token) {
            return { error: { message: 'Please provide token in params' }, status: 422 };
        }

        const verificationResult = await verifyToken(token);

        if (isErrorResult(verificationResult)) {
            return { error: { message: verificationResult.error.message }, status: 400 };
        }

        const userId = verificationResult as string;

        // Update the user's verification status using Prisma
        const verifiedUser = await prisma.user.update({
            where: { id: userId },
            data: { isVerified: true },
        });

        if (verifiedUser) {
            return { message: 'User verified successfully', user: verifiedUser, status: 200 };
        } else {
            return { error: { message: 'User not verified' }, status: 404 };
        }
    } catch (error: any) {
        return { error: { message: error.message || 'An unexpected error occurred during registration' } };
    } finally {
        await prisma.$disconnect();
    }
};
