'use client'

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation'

function OnboardingPage() {
  const router = useRouter();
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/';


  useEffect(() => {
    const session = localStorage.getItem('supabase.auth.token');
    if (session) {
      router.push(callbackUrl);
    }
  }, [router, callbackUrl]);

  const handleUserTypeSelection = (userType: string) => {
    document.cookie = `user_type=${userType}; path=/`;
    router.push(`/auth?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold text-center mb-4">Welcome!</h1>
        <p className="text-center text-gray-700 mb-6">Please select your user type to continue.</p>
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => handleUserTypeSelection('user')}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            User
          </button>
          <button
            onClick={() => handleUserTypeSelection('vendor')}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Vendor
          </button>
          <button
            onClick={() => handleUserTypeSelection('market')}
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Market
          </button>
        </div>
      </div>
    </div>
  );
}

export default OnboardingPage;
