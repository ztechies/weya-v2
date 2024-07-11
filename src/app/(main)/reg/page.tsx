'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { regUser } from './action';
import { isAuthenticated } from '@/app/lib/Auth';
import { useRouter } from 'next/navigation';
import { regFormData } from '@/types/Type';
import RegForm from '@/components/Form/Reg/RegForm';
import { ToastContainer, toast } from 'react-toastify';
import { contryCode } from '@/helpers/constants';

const Reg = () => {
    const router = useRouter();

    useEffect(() => {
        (async () => {
            const res = await isAuthenticated();
            if (res) {
                router.push('/');
            }
        })()
    }, [router]);

    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset, setError } = useForm();
    const [countryDialCode, setCountryDialCode] = useState('');

    const togglePasswordVisibility = () => setShowPassword(prevShowPassword => !prevShowPassword);
    const onSubmitHandler = async (data: regFormData): Promise<void> => {
        data.mobileNumber = countryDialCode + data.mobileNumber
        setIsSubmitting(true);
        try {
            const result = await regUser(data)
            if (result.error) {
                if (result.error.status === 422) {
                    switch (result.error.path) {
                        case 'email':
                            setError('email', {
                                type: 'manual',
                                message: result.error.message
                            });
                            toast(result.error.message)
                            break;
                        case 'token':
                            toast("Error while generating token")
                            break;
                        default:
                            console.error('Validation error:', result.error.message);
                            toast("Form Validation Failed")
                            break;
                    }
                } else {
                    console.error('Login error:', result.error.message);
                }
            } else {
                if (result.token) {
                    toast("Verification link send to your email, please check",{position: "top-center"})
                    setInterval(() => { router.push('/login'); }, 2000)
                    reset();
                }
            }

        } catch (error) {
            console.error('An unexpected error occurred:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        const fetchCountry = async () => {
            try {
                const response = await fetch('https://ipinfo.io/json');
                if (!response.ok) {
                    throw new Error('Failed to fetch IP info');
                }
                const data = await response.json();
                const countryCode = data.country; 
                const dialCode = contryCode.find(country => country.code === countryCode)?.dial_code || '';
                setCountryDialCode(dialCode);

            } catch (error) {
                console.error('Error fetching IP info:', error);
            }
        };
        fetchCountry();
    }, []);


    return (
        <>
            <RegForm
                isSubmitting={isSubmitting}
                handleSubmit={handleSubmit}
                onSubmitHandler={onSubmitHandler}
                register={register}
                errors={errors}
                showPassword={showPassword}
                togglePasswordVisibility={togglePasswordVisibility}
                countryDialCode={countryDialCode}
            />
            <ToastContainer/>
        </>
    );
};

export default Reg;
