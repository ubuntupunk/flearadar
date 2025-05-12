"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

export default function JoinCommunity(/* props: JoinCommunityProps */) {
  const router = useRouter();

  return (
    <section className="bg-red-500 py-2 text-white">
      <div className="mx-auto max-w-5xl py-3 px-4 mb-8">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl font-medium mb-1.5">Join Our Amazing Community</h2>
            <p className="text-white/80 text-sm max-w-md leading-relaxed">
              We are growing every day. Join a community of traders, bargain-hunters, flea marketeers, supporting South Africa&apos;s informal economy.
            </p>
          </div>
          <div className="sm:ml-auto">
            <button
              onClick={() => router.push('/api/auth/login?screen_hint=signup')}
              className="bg-white text-red-500 px-3 py-1.5 text-sm font-medium hover:bg-white/90 transition-colors duration-300"
            >
              Register Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
