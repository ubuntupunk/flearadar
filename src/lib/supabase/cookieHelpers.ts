// src/lib/supabase/cookieHelpers.ts
import type { CookieOptions, CookieHelpers } from './types/cookies'

export const cookieHelpers: CookieHelpers = {
  get(name: string): string | undefined {
    // First validate the cookie name
    if (!isValidCookieName(name)) {
      throw new Error('Invalid cookie name')
    }
    
    const cookies = document.cookie.split(';')
    const cookie = cookies.find(c => c.trim().startsWith(`${name}=`))
    if (!cookie) return undefined
    
    return decodeURIComponent(cookie.split('=')[1].trim())
  },

  set(name: string, value: string, options: CookieOptions = {}): void {
    if (!isValidCookieName(name)) {
      throw new Error('Invalid cookie name')
    }
    if (!isValidCookieValue(value)) {
      throw new Error('Invalid cookie value')
    }
    if (!isValidCookieOptions(options)) {
      throw new Error('Invalid cookie options')
    }
    
    const {
      path = '/',
      domain,
      maxAge,
      secure = true,
      sameSite = 'Lax',
      httpOnly = true,
      expires
    } = options

    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`

    if (path) cookieString += `; path=${path}`
    if (domain) cookieString += `; domain=${domain}`
    if (maxAge) cookieString += `; max-age=${maxAge}`
    if (secure) cookieString += '; secure'
    if (httpOnly) cookieString += '; httpOnly'
    if (sameSite) cookieString += `; samesite=${sameSite}`
    if (expires) cookieString += `; expires=${expires.toUTCString()}`

    document.cookie = cookieString
  },

  remove(name: string, options: Pick<CookieOptions, 'path' | 'domain'> = {}): void {
    if (!isValidCookieName(name)) {
      throw new Error('Invalid cookie name')
    }
    
    const { path = '/', domain } = options
    
    // Set an expired date to remove the cookie
    this.set(name, '', {
      path,
      domain,
      maxAge: -1,
      expires: new Date(0)
    })
  },

  getAll(): Record<string, string> {
    return document.cookie
      .split(';')
      .reduce((cookies, cookie) => {
        const [name, value] = cookie.trim().split('=')
        if (name && value) {
          cookies[decodeURIComponent(name)] = decodeURIComponent(value)
        }
        return cookies
      }, {} as Record<string, string>)
  }
}

// Utility function to validate cookie names
function isValidCookieName(name: string): boolean {
  return /^[\w-]+$/.test(name)
}

// Utility function to validate cookie values
function isValidCookieValue(value: string): boolean {
  return !value.includes(';') && !value.includes(',')
}

// Type guard for cookie options
function isValidCookieOptions(options: CookieOptions): boolean {
  if (options.sameSite && !['Strict', 'Lax', 'None'].includes(options.sameSite)) {
    return false
  }
  
  if (options.maxAge !== undefined && (!Number.isInteger(options.maxAge) || options.maxAge < -1)) {
    return false
  }

  return true
}

export { cookieHelpers }
