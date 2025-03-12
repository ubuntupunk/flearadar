"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

export default function JoinCommunity(/* props: JoinCommunityProps */) {
  const router = useRouter();

  return (
    <section className="bg-red-500 pb-3 pt-3 text-white">
      <div className="mx-auto max-w-7xl pb-5 pt-5">
        <div className="flex items-center">
          <div className="flex-1">
            <h2 className="text-2xl mb-3">Join Our Amazing Community</h2>
            <p className="text-white opacity-75">
              We are growing every day. Join a community of traders, bargain-hunters, flea marketeers, supporting South Africa's informal economy.
            </p>
          </div>
          <div className="ml-auto">
            <button
              onClick={() => router.push('/api/auth/login?screen_hint=signup')}
              className="btn bg-white text-red-500 px-4 py-2 rounded-full hover:bg-gray-100"
            >
              Register Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
