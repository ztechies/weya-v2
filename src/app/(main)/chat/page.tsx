'use client'
import React, { useEffect, useState } from 'react';
import { XIcon } from '../../../components/icons/XIcon';
import Conversation from '../../../components/Conversition/Conversition';
import { usePathname, useRouter } from 'next/navigation'; 
import GlobalLoader from '@/components/Loaders/GlobalLoader';
import { isAuthenticated } from '@/app/lib/Auth';

export default function Chat() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter(); 
    const currentPath = usePathname()
    
    useEffect(() => {
        (async () => {
            const res = await isAuthenticated();
            if (!res) {
                router.push('/login');
            }
        })()
    }, []);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleRouteChange = (e: React.MouseEvent<HTMLButtonElement>) => {
        const newPath = e.currentTarget.value;
        if (currentPath !== newPath) { 
            setIsLoading(true);
            router.push(newPath);
        }
    };

    return (
        <div className="h-screen flex flex-col">
            <header className="bg-black text-white h-16 flex items-center justify-between px-6">
                <button className="md:hidden text-white" onClick={toggleSidebar}>
                    {isSidebarOpen ? (
                        <XIcon className="h-6 w-6" />
                    ) : (
                        <svg
                            className="h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    )}
                </button>
                <a href="/" className="text-2xl text-[#36E891]">
                    Weya.ai
                </a>
                <div className="flex items-center gap-6 text-sm">
                    {/* Add any header buttons or links here */}
                </div>
            </header>

            <div className="flex flex-grow">
                {/* Sidebar */}
                <div
                    className={`w-64 md:w-1/5 h-full bg-black flex flex-col items-center p-5 border-r-2 border-[#345830] fixed md:relative z-10 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                        } md:translate-x-0 transition-transform duration-300 ease-in-out`}
                >
                    <ul className="flex flex-col text-center text-lg gap-5 w-full">
                        {["first", "second", "third", "fourth"].map((bot) => (
                            <button
                                key={bot}
                                value={`/chat/${bot}`}
                                onClick={handleRouteChange}
                            >
                                <li className="border-2 border-[#345830] rounded-xl text-white bg-gradient-to-r from-[#345830] to-black p-4">
                                    {bot === "voice-bot" ? "Weya Voice Bot" : `Bot ${bot.charAt(0).toUpperCase() + bot.slice(1)}`}
                                </li>
                            </button>
                        ))}
                    </ul>
                </div>

                <main className={`flex-grow flex justify-center items-center bg-black p-5 overflow-y-auto ${isSidebarOpen ? "" : "ml-0"} md:ml-0`}>
                    {isLoading ? <GlobalLoader /> : <Conversation botNumber={"first"}/>}
                </main>
            </div>
        </div>
    );
}
