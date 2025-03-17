"use client";
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect } from 'react';

const OnboardingPage = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkUserType = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: userProfile } = await supabase
          .from('users')
          .select('user_type')
          .eq('id', user.id)
          .single();

        if (userProfile?.user_type) {
          // Redirect if user type is already set
          let redirectPath = '';
          switch (userProfile.user_type) {
            case 'user':
              redirectPath = '/user-dash';
              break;
            case 'vendor':
              redirectPath = '/vendor-dash';
              break;
            case 'market':
              redirectPath = '/market-dash';
              break;
            case 'admin':
              redirectPath = '/admin-dash';
              break;
            default:
              redirectPath = '/dashboard';
          }
          router.push(redirectPath);
        }
      }
    };

    checkUserType();
  }, [router, supabase]);


  const handleUserTypeSelection = async (userType: string) => {
    await supabase.from('users').update({ user_type: userType }).eq('id', (await supabase.auth.getUser()).data.user?.id);
    router.push('/auth/register');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-semibold text-center mb-4">Welcome!</h1>
        <p className="text-gray-700 text-center mb-6">Please select your user type to continue.</p>
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
};

export default OnboardingPage;
