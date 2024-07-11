import { VerificationResult } from '@/types/service';
import jwt from 'jsonwebtoken';

export const genToken = async ({ _id }: { _id: string }): Promise<VerificationResult> => {
    try {
        if (!_id) {
            return { error: { message: 'User ID is required to generate a token' } };
        }
        try {
            const token = await jwt.sign({ _id: _id }, process.env.TOKEN_SECRETE_KEY!);
            return token;
        } catch (jwtError) {
            return { error: { message: 'Failed to generate token. Please try again later.' } };
        }
    } catch (error: any) {
        return { error: { message: error.message || 'Token generation failed due to an unexpected error' } };
    }
}

export const verifyToken = async (token: string): Promise<VerificationResult> => {
    try {
        if (token) {
            const decodedId = await jwt.verify(token, process.env.TOKEN_SECRETE_KEY!) as jwt.JwtPayload;
            if (decodedId) {
                return decodedId._id.toString();
            } else {
                return { error: { message: 'Invalid token' } };
            }
        } else {
            return { error: { message: 'Token is required' } };
        }
    } catch (error) {
        return { error: { message: 'Token verification failed' } };
    }
};

