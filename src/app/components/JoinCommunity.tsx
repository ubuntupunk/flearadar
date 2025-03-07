import React from 'react';


export default function JoinCommunity(/* props: JoinCommunityProps */): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // eslint-disable-next-line @typescript-eslint/ban-types
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  // eslint-disable-next-line react/display-name
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  return (
    <section className="bg-red-500 pb-3 pt-3 text-white">
      <div className="mx-auto max-w-7xl pb-5 pt-5">
        <div className="flex items-center">
          <div className="flex-1">
            <h2 className="text-2xl mb-3">Join Our Amazing Community</h2>
            <p className="text-white opacity-75">
              We are growing every day. Join a community of traders, bargain-hunters, flea marketeers, supporting South Africa&apos;s informal economy.
            </p>
          </div>
          <div className="ml-auto">
            <a href="#" className="btn bg-white text-red-500 px-4 py-2 rounded-full hover:bg-gray-100">
              Register Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
