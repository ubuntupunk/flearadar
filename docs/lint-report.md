
> flearadar@0.1.0 lint
> eslint '*/**/*.{js,ts,jsx,tsx}' --quiet --fix


/home/user/Projects/flearadar/src/app/(auth-pages)/layout.tsx
  78:3  error  'error' is defined but never used  @typescript-eslint/no-unused-vars

/home/user/Projects/flearadar/src/app/(protected-pages)/error.tsx
  4:3  error  'error' is defined but never used  @typescript-eslint/no-unused-vars

/home/user/Projects/flearadar/src/app/(protected-pages)/profile/page.tsx
  44:9  error  'formatLastSeen' is assigned a value but never used  @typescript-eslint/no-unused-vars

/home/user/Projects/flearadar/src/app/api/profile/last-seen/route.ts
  5:15  error  'Database' is defined but never used  @typescript-eslint/no-unused-vars

/home/user/Projects/flearadar/src/app/api/profile/route.ts
  89:21  error  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

/home/user/Projects/flearadar/src/app/directory/[listingId]/page.tsx
   5:10  error  'Listing' is defined but never used         @typescript-eslint/no-unused-vars
   6:10  error  'DirectoryProps' is defined but never used  @typescript-eslint/no-unused-vars
  49:34  error  Unexpected any. Specify a different type    @typescript-eslint/no-explicit-any

/home/user/Projects/flearadar/src/app/explorer/page.tsx
  9:11  error  An empty interface declaration allows any non-nullish value, including literals like `0` and `""`.
- If that's what you want, disable this lint rule with an inline comment or configure the 'allowInterfaces' rule option.
- If you want a type meaning "any object", you probably want `object` instead.
- If you want a type meaning "any value", you probably want `unknown` instead  @typescript-eslint/no-empty-object-type
  9:11  error  'ExplorerPageProps' is defined but never used                                                                                                                                                                                                                                                                                                                                             @typescript-eslint/no-unused-vars

/home/user/Projects/flearadar/src/app/layout.tsx
   8:15  error  'Metadata' is defined but never used                                                           @typescript-eslint/no-unused-vars
  33:11  error  Synchronous scripts should not be used. See: https://nextjs.org/docs/messages/no-sync-scripts  @next/next/no-sync-scripts

/home/user/Projects/flearadar/src/app/page.tsx
   3:8   error  'HeroSearch' is defined but never used  @typescript-eslint/no-unused-vars
  13:8   error  'Directory' is defined but never used   @typescript-eslint/no-unused-vars
  83:11  error  'HomeProps' is defined but never used   @typescript-eslint/no-unused-vars

/home/user/Projects/flearadar/src/components/Directory.tsx
   4:8   error  'Map' is defined but never used                                                                                                                     @typescript-eslint/no-unused-vars
  13:8   error  'StarIcon' is defined but never used                                                                                                                @typescript-eslint/no-unused-vars
  22:8   error  'Calendar' is defined but never used                                                                                                                @typescript-eslint/no-unused-vars
  60:51  error  React Hook "useState" cannot be called inside a callback. React Hooks must be called in a React function component or a custom React Hook function  react-hooks/rules-of-hooks

/home/user/Projects/flearadar/src/components/Hero.tsx
  7:11  error  An empty interface declaration allows any non-nullish value, including literals like `0` and `""`.
- If that's what you want, disable this lint rule with an inline comment or configure the 'allowInterfaces' rule option.
- If you want a type meaning "any object", you probably want `object` instead.
- If you want a type meaning "any value", you probably want `unknown` instead  @typescript-eslint/no-empty-object-type
  7:11  error  'HeroProps' is defined but never used                                                                                                                                                                                                                                                                                                                                                     @typescript-eslint/no-unused-vars

/home/user/Projects/flearadar/src/components/HeroSearch.tsx
   5:8  error  'listings' is defined but never used         @typescript-eslint/no-unused-vars
   6:8  error  'Link' is defined but never used             @typescript-eslint/no-unused-vars
   7:8  error  'LocalShipping' is defined but never used    @typescript-eslint/no-unused-vars
   8:8  error  'WbSunny' is defined but never used          @typescript-eslint/no-unused-vars
   9:8  error  'NightlightRound' is defined but never used  @typescript-eslint/no-unused-vars
  10:8  error  'ExploreIcon' is defined but never used      @typescript-eslint/no-unused-vars

/home/user/Projects/flearadar/src/components/HomeClient.tsx
  3:27  error  'useEffect' is defined but never used  @typescript-eslint/no-unused-vars

/home/user/Projects/flearadar/src/components/HowItWorks.tsx
  11:11  error  An empty interface declaration allows any non-nullish value, including literals like `0` and `""`.
- If that's what you want, disable this lint rule with an inline comment or configure the 'allowInterfaces' rule option.
- If you want a type meaning "any object", you probably want `object` instead.
- If you want a type meaning "any value", you probably want `unknown` instead  @typescript-eslint/no-empty-object-type
  11:11  error  'HowItWorksProps' is defined but never used                                                                                                                                                                                                                                                                                                                                               @typescript-eslint/no-unused-vars

/home/user/Projects/flearadar/src/components/JoinCommunity.tsx
  16:127  error  `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`  react/no-unescaped-entities

/home/user/Projects/flearadar/src/components/Listings.tsx
  19:11  error  An empty interface declaration allows any non-nullish value, including literals like `0` and `""`.
- If that's what you want, disable this lint rule with an inline comment or configure the 'allowInterfaces' rule option.
- If you want a type meaning "any object", you probably want `object` instead.
- If you want a type meaning "any value", you probably want `unknown` instead  @typescript-eslint/no-empty-object-type
  19:11  error  'ListingsProps' is defined but never used                                                                                                                                                                                                                                                                                                                                                 @typescript-eslint/no-unused-vars

/home/user/Projects/flearadar/src/components/ListingsManager.tsx
  34:44  error  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

/home/user/Projects/flearadar/src/components/Map.tsx
  3:32  error  'Popup' is defined but never used   @typescript-eslint/no-unused-vars
  3:50  error  'useMap' is defined but never used  @typescript-eslint/no-unused-vars

/home/user/Projects/flearadar/src/components/MercuryMap.tsx
  1:17  error  'useEffect' is defined but never used  @typescript-eslint/no-unused-vars
  1:28  error  'useState' is defined but never used   @typescript-eslint/no-unused-vars

/home/user/Projects/flearadar/src/components/NotFound.tsx
  19:9  error  Do not use an `<a>` element to navigate to `/`. Use `<Link />` from `next/link` instead. See: https://nextjs.org/docs/messages/no-html-link-for-pages  @next/next/no-html-link-for-pages

/home/user/Projects/flearadar/src/components/PopularSpots.tsx
  12:11  error  An empty interface declaration allows any non-nullish value, including literals like `0` and `""`.
- If that's what you want, disable this lint rule with an inline comment or configure the 'allowInterfaces' rule option.
- If you want a type meaning "any object", you probably want `object` instead.
- If you want a type meaning "any value", you probably want `unknown` instead  @typescript-eslint/no-empty-object-type
  12:11  error  'PopularSpotsProps' is defined but never used                                                                                                                                                                                                                                                                                                                                             @typescript-eslint/no-unused-vars

/home/user/Projects/flearadar/src/components/ReachMillions.tsx
  7:11  error  An empty interface declaration allows any non-nullish value, including literals like `0` and `""`.
- If that's what you want, disable this lint rule with an inline comment or configure the 'allowInterfaces' rule option.
- If you want a type meaning "any object", you probably want `object` instead.
- If you want a type meaning "any value", you probably want `unknown` instead  @typescript-eslint/no-empty-object-type
  7:11  error  'ReachMillionsProps' is defined but never used                                                                                                                                                                                                                                                                                                                                            @typescript-eslint/no-unused-vars

/home/user/Projects/flearadar/src/components/Stats.tsx
  12:11  error  An empty interface declaration allows any non-nullish value, including literals like `0` and `""`.
- If that's what you want, disable this lint rule with an inline comment or configure the 'allowInterfaces' rule option.
- If you want a type meaning "any object", you probably want `object` instead.
- If you want a type meaning "any value", you probably want `unknown` instead  @typescript-eslint/no-empty-object-type
  12:11  error  'StatsProps' is defined but never used                                                                                                                                                                                                                                                                                                                                                    @typescript-eslint/no-unused-vars

/home/user/Projects/flearadar/src/components/TrendingExpandable.tsx
  5:12  error  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

/home/user/Projects/flearadar/src/components/TrendingListings.tsx
   7:8   error  'Image' is defined but never used                                                                                                                                                                                                                                                                                                                                                         @typescript-eslint/no-unused-vars
   8:8   error  'Score' is defined but never used                                                                                                                                                                                                                                                                                                                                                         @typescript-eslint/no-unused-vars
  23:11  error  An empty interface declaration allows any non-nullish value, including literals like `0` and `""`.
- If that's what you want, disable this lint rule with an inline comment or configure the 'allowInterfaces' rule option.
- If you want a type meaning "any object", you probably want `object` instead.
- If you want a type meaning "any value", you probably want `unknown` instead  @typescript-eslint/no-empty-object-type
  23:11  error  'TrendingListingsProps' is defined but never used                                                                                                                                                                                                                                                                                                                                         @typescript-eslint/no-unused-vars

/home/user/Projects/flearadar/src/components/auth/LoginForm.tsx
   4:10  error  'createClient' is defined but never used   @typescript-eslint/no-unused-vars
  20:15  error  'LoginFormData' is defined but never used  @typescript-eslint/no-unused-vars
  56:14  error  'error' is defined but never used          @typescript-eslint/no-unused-vars

/home/user/Projects/flearadar/src/components/auth/PasswordResetForm.tsx
  60:14  error  'error' is defined but never used  @typescript-eslint/no-unused-vars

/home/user/Projects/flearadar/src/components/auth/ProfileSelect.tsx
   15:6   error  'UserRow' is defined but never used                              @typescript-eslint/no-unused-vars
  123:25  error  `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`  react/no-unescaped-entities

/home/user/Projects/flearadar/src/components/dashboards/AdminDash.tsx
   7:12  error  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  10:29  error  'user' is defined but never used          @typescript-eslint/no-unused-vars
  10:35  error  'profile' is defined but never used       @typescript-eslint/no-unused-vars

/home/user/Projects/flearadar/src/components/dashboards/MarketDash.tsx
   7:12  error  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  10:30  error  'user' is defined but never used          @typescript-eslint/no-unused-vars
  10:36  error  'profile' is defined but never used       @typescript-eslint/no-unused-vars

/home/user/Projects/flearadar/src/components/dashboards/UserDash.tsx
   7:12  error  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  10:28  error  'user' is defined but never used          @typescript-eslint/no-unused-vars

/home/user/Projects/flearadar/src/components/dashboards/VendorDash.tsx
   7:12  error  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  10:30  error  'user' is defined but never used          @typescript-eslint/no-unused-vars
  10:36  error  'profile' is defined but never used       @typescript-eslint/no-unused-vars

/home/user/Projects/flearadar/src/contexts/AuthContext.tsx
  12:16  error  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  24:50  error  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

/home/user/Projects/flearadar/src/hooks/use-toast.ts
  23:7  error  'actionTypes' is assigned a value but only used as a type  @typescript-eslint/no-unused-vars

/home/user/Projects/flearadar/src/hooks/useAuth.ts
  20:32  error  'isLoading' is assigned a value but never used  @typescript-eslint/no-unused-vars
  20:43  error  'user' is assigned a value but never used       @typescript-eslint/no-unused-vars

/home/user/Projects/flearadar/src/hooks/useProfile.ts
  90:25  error  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

/home/user/Projects/flearadar/src/lib/supabase/client.ts
   4:37  error  'Session' is defined but never used         @typescript-eslint/no-unused-vars
  11:3   error  'AuthStateEvent' is defined but never used  @typescript-eslint/no-unused-vars

/home/user/Projects/flearadar/src/lib/supabase/cookieHelpers.ts
  63:10  error  'isValidCookieName' is defined but never used     @typescript-eslint/no-unused-vars
  68:10  error  'isValidCookieValue' is defined but never used    @typescript-eslint/no-unused-vars
  73:10  error  'isValidCookieOptions' is defined but never used  @typescript-eslint/no-unused-vars

✖ 78 problems (78 errors, 0 warnings)

