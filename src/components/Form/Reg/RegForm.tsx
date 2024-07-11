'use client'
import FormLoader from '@/components/Loaders/FormLoader';
import { regFormData } from '@/types/Type';
import Link from 'next/link';
import React, { FormEventHandler, useEffect, useState } from 'react';
import { RegisterOptions, UseFormRegisterReturn } from 'react-hook-form';
import { BiShowAlt } from 'react-icons/bi';
import { GrFormViewHide } from 'react-icons/gr';
import { contryCode } from '@/helpers/constants';

interface Props {
    isSubmitting: boolean;
    handleSubmit: (data: any) => FormEventHandler<HTMLFormElement>;
    onSubmitHandler: (data: regFormData) => Promise<void>;
    register: (name: string, options?: RegisterOptions) => UseFormRegisterReturn;
    errors: any;
    showPassword: boolean;
    togglePasswordVisibility: () => void;
    countryDialCode: string
}

const RegForm: React.FC<Props> = ({
    isSubmitting,
    handleSubmit,
    onSubmitHandler,
    register,
    errors,
    showPassword,
    togglePasswordVisibility,
    countryDialCode
}) => {


    return (
        <section>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full max-w-xl bg-transparent rounded-lg shadow dark:border md:mt-0 sm:max-w-2xl xl:p-0">
                    <div className={`p-6 space-y-4 md:space-y-6 sm:p-8 ${isSubmitting && 'opacity-65'}`}>
                        <h1 className="text-xl flex justify-center font-bold leading-tight tracking-tight text-white md:text-2xl">
                            Create an account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmitHandler)}>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="userName" className="block mb-2 text-sm font-medium text-white">
                                        Your Name*
                                    </label>
                                    <input
                                        type="text"
                                        id="userName"
                                        {...register('userName', {
                                            required: 'Name is required'
                                        })}
                                        className={`bg-gray-50 border ${errors.userName ? 'border-red-500' : 'border-gray-300'} text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                                        placeholder="Name"
                                    />
                                    {errors.userName && <p className="text-red-500 text-sm mx-1">{errors.userName.message}</p>}
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">
                                        Your Company Email*
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        {...register('email', {
                                            required: 'Company Email is required',
                                            pattern: {
                                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                message: 'Invalid email address'
                                            }
                                        })}
                                        className={`bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-300'} text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                                        placeholder="Enter company email"
                                    />
                                    {errors.email && <p className="text-red-500 text-sm mx-1">{errors.email.message}</p>}
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">
                                        Your Password*
                                    </label>
                                    <div className="relative flex items-center">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            id="password"
                                            {...register('password', {
                                                required: 'Password is required',
                                                minLength: {
                                                    value: 8,
                                                    message: 'Password must be at least 8 characters'
                                                }
                                            })}
                                            className={`bg-gray-50 border ${errors.password ? 'border-red-500' : 'border-gray-300'} text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10`}
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center text-sm leading-5 text-black"
                                        >
                                            {showPassword ? (
                                                <BiShowAlt className='w-6 h-6' />
                                            ) : (
                                                <GrFormViewHide className='w-6 h-6' />
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && <p className="text-red-500 text-sm mx-1">{errors.password.message}</p>}
                                </div>
                                <div>
                                    <label htmlFor="mobileNumber" className="block mb-2 text-sm font-medium text-white">
                                        Mobile Number
                                    </label>
                                    <div className="relative flex items-center">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-500 text-sm">
                                            {countryDialCode}
                                        </span>
                                        <input
                                            type="text"
                                            id="mobileNumber"
                                            {...register('mobileNumber', {
                                                required: 'Mobile Number is required',
                                                pattern: {
                                                    value: /^[0-9]{10,15}$/,
                                                    message: 'Invalid mobile number'
                                                }
                                            })}
                                            className={`bg-gray-50 border ${errors.mobileNumber ? 'border-red-500' : 'border-gray-300'} text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pl-14`}
                                            placeholder="Enter mobile number"
                                        />
                                    </div>
                                    {errors.mobileNumber && <p className="text-red-500 text-sm mx-1">{errors.mobileNumber.message}</p>}
                                </div>
                                <div>
                                    <label htmlFor="referralSource" className="block mb-2 text-sm font-medium text-white">
                                        Source of referral [Optional]
                                    </label>
                                    <input
                                        type="text"
                                        id="referralSource"
                                        {...register('referralSource')}
                                        className={`bg-gray-50 border ${errors.referralSource ? 'border-red-500' : 'border-gray-300'} text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                                        placeholder="How did you hear about us?"
                                    />
                                    {errors.referralSource && <p className="text-red-500 text-sm mx-1">{errors.referralSource.message}</p>}
                                </div>
                                <div>
                                    <label htmlFor="companyName" className="block mb-2 text-sm font-medium text-white">
                                        Company Name*
                                    </label>
                                    <input
                                        type="text"
                                        id="companyName"
                                        {...register('companyName', {
                                            required: 'Company name is required'
                                        })}
                                        className={`bg-gray-50 border ${errors.companyName ? 'border-red-500' : 'border-gray-300'} text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                                        placeholder="Company Name"
                                    />
                                    {errors.companyName && <p className="text-red-500 text-sm mx-1">{errors.companyName.message}</p>}
                                </div>

                                <div>
                                    <label htmlFor="teamSize" className="block mb-2 text-sm font-medium text-white">
                                        Team Size*
                                    </label>
                                    <select
                                        id="teamSize"
                                        defaultValue={''}
                                        {...register('teamSize', {
                                            required: 'Team size is required',
                                        })}
                                        className={`bg-gray-50 border ${errors.teamSize ? 'border-red-500' : 'border-gray-300'} text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                                    >
                                        {/* <option value="" disabled selected hidden>Select team size</option> */}
                                        <option value="2-10">2-10</option>
                                        <option value="<50">&lt;50</option>
                                        <option value="<100">&lt;100</option>
                                        <option value="<1000">&lt;1000</option>
                                        <option value="1000+">1000+</option>
                                    </select>
                                    {errors.teamSize && <p className="text-red-500 text-sm mx-1">{errors.teamSize.message}</p>}
                                </div>
                            </div>
                            <div className="flex justify-center mt-4">
                                <button
                                    type="submit"
                                    className={`w-full max-w-xs text-white bg-[#2F3238] font-medium rounded-lg text-sm px-5 py-2.5 text-center ${isSubmitting && 'opacity-50 cursor-not-allowed'}`}
                                >
                                    {isSubmitting ? <> <FormLoader /> Creating account... </> : 'Create an account'}
                                </button>
                            </div>
                            <p className="text-sm font-light text-gray-500 text-center mt-2">
                                Already have an account? <Link href={'/login'} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default RegForm;
