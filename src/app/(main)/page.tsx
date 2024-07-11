"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import GlobalLoader from '@/components/Loaders/GlobalLoader';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
const Home = () => {
  const router = useRouter();

  const [jwtToken, setJwtToken] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = window.localStorage.getItem('weya-userToken');
    if (token) {
      setJwtToken(token);
    } else {
      router.push('/login');
    }
    setLoading(false);
  }, [router]);

  const handleExploreClick = () => {
    setLoading(true);
    router.push('/chat');
  };

  const handleLogout = () => {
    window.localStorage.removeItem('weya-userToken');
    router.push('/login');
  };

  return (
    <>
      {loading ? (
        <GlobalLoader />
      ) : jwtToken ? (
        <div className="min-h-screen flex flex-col">
          <TopNavbar onLogout={handleLogout} />
          <main className="flex-grow bg-[#000000]">
            <section className="text-center py-16 bg-gradient-to-b from-[#000000] to-[#345830] text-white">
              <h1 className="text-5xl font-bold mb-4">Welcome to Weya.ai</h1>
              <p className="text-lg mb-8">Explore the new generation assistance</p>
            </section>
            <section className="py-16 px-4 bg-[#000000] text-[#7A7A7A]">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-[#000000]">Our Features</h2>
                <div className="mx-auto text-center">
                  <button onClick={handleExploreClick}>
                    <FeatureCard title="Explore Bot" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
                  </button>
                </div>
              </div>
            </section>
          </main>
          <footer className="bg-[#000000] text-white py-4 text-center">
            {/* <p>Footer</p> */}
          </footer>
        </div>
      ) : (
        <GlobalLoader />
      )}
    </>
  );
};

const TopNavbar = ({ onLogout }: { onLogout: () => void }) => {
  return (
    <nav className="bg-[#000000] text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link legacyBehavior href="/">
          Weya.ai
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link href="/">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about">
              About
            </Link>
          </li>
          <li>
            <Link href="/services">
              Services
            </Link>
          </li>
          <li>
            <Link href="/contact">
              Contact
            </Link>
          </li>
          <li>
            <button onClick={onLogout} className="text-white">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const FeatureCard = ({ title, description }: { title: string; description: string }) => {
  return (
    <div className="bg-[#345830] text-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default Home;
