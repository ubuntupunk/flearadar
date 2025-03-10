import { NextRequest, NextResponse } from 'next/server';

import { Auth0Client } from "@auth0/nextjs-auth0/server"
import { handleLogin, handleLogout, handleCallback, handleProfile } from "@auth0/nextjs-auth0";

export const auth0 = new Auth0Client({
  routes: {
    login: "/login",
    logout: "/logout",
    callback: "/callback",
    backChannelLogout: "/backchannel-logout",
  },
})


export const runtime = 'edge';

const authentication = {
  login: handleLogin,
  logout: handleLogout,
  callback: handleCallback,
  profile: handleProfile,
};

export const GET = authentication;
export const POST = authentication;
