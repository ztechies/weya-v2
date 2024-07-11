'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';

const EmailVerification = ({ params }: { params: { token: string } }) => {
    const [isVerified, setIsVerified] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await fetch(`/api/user/reg?token=${params.token}`);
                const result = await response.json();
                if (result?.user?.isVerified) {
                    setIsVerified(true);
                } else {
                    setError('Email verification failed. Please try again.');
                }
            } catch (err) {
                console.error('Verification Email Error', err);
                setError('An error occurred during verification. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        verifyEmail();
    }, [params.token]);

    if (loading)
        return <div className="text-lg text-[#36E891] h-[100%] w-[100%] bg-[#7A7A7A] text-center text-[40px] pt-[5rem]">Verifying your email...</div>;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black p-6 text-center">
            {isVerified ? (
                <div className="bg-black p-10 rounded-lg shadow-lg">
                    <div className="relative block w-full glass p-6 sm:p-8 lg:p-12 rounded-xl bg-[#345830] text-white">
                        <h1 className="text-2xl font-bold text-white">Email Verified Successfully!</h1>
                        <p className="mt-4 text-white">Your email has been verified. You can now log in to your account.</p>
                        <button type="button" className='w-full' onClick={() => router.push('/login')}>
                            <span className="mt-4 block font-semibold">
                                <div className="border-2 w-full border-[#345830] rounded-xl text-white bg-gradient-to-r from-[#345830] to-black p-4">
                                    Go to Login
                                </div>
                            </span>
                        </button>
                    </div>
                </div>
            ) : (
                <div className="bg-black p-10 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold text-red-600">Email Verification Failed</h1>
                    <p className="mt-4 text-gray-700">{error}</p>
                </div>
            )}
        </div>
    );
}

export default EmailVerification;
