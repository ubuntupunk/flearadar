// src/lib/types/session.ts
import { Session } from '@supabase/supabase-js'
import type { CookieOptions } from './cookies'
import { type AuthChangeEvent } from '@supabase/supabase-js'

export interface SessionStatus {
  userId?: string
  expiresAt: string
  timeUntilExpiry: number
  event?: AuthChangeEvent
}

export interface SessionWarning {
  expiresIn: number
  expiresAt: string
}

export interface SessionInfo {
  userId?: string
  expiresAt: string
}

export interface CookieDebugInfo {
  cookieCount: number
  cookieNames: string[]
  hasAuthToken: boolean
}

export type AuthStateEvent = 
  | 'SIGNED_IN'
  | 'SIGNED_OUT'
  | 'TOKEN_REFRESHED'
  | 'USER_UPDATED'
  | 'USER_DELETED'

export interface SessionCheckResult {
  isValid: boolean
  session: Session | null
  error?: Error
}

export const SESSION_CONSTANTS = {
    WARNING_THRESHOLD: 300000, // 5 minutes in milliseconds
    AUTH_COOKIE_NAME: 'sb-auth-token',
    DEFAULT_COOKIE_OPTIONS: {
      path: '/',
      secure: true,
      sameSite: 'Lax' as const,
      httpOnly: true
    } satisfies CookieOptions
  } as const
