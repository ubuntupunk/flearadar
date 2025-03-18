// src/lib/types/cookies.ts
export interface CookieOptions {
  path?: string
  domain?: string
  maxAge?: number
  secure?: boolean
  httpOnly?: boolean
  sameSite?: 'Strict' | 'Lax' | 'None'
  expires?: Date
}

export interface CookieHelpers {
  get: (name: string) => string | undefined
  set: (name: string, value: string, options?: CookieOptions) => void
  remove: (name: string, options?: Pick<CookieOptions, 'path' | 'domain'>) => void
  getAll: () => Record<string, string>
}
