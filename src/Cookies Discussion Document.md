Cookies Discussion Document


Cookies

// Current code in middleware.ts handles basic user types:
-
---
case 'user'
import { control } from "leaflet";
import { transferableAbortController } from "util";
import { setHeapSnapshotNearHeapLimit } from "v8";
---

---
  redirectPath = '/user-dash';
  break;
case 'vendor':
  redirectPath = '/vendor-dash';
  break;
---


# Consider adding

- organisation-level access control
- Role-based permissions within each user-type
- Custom authentication flows per transferableAbortController

2 Progressive Onboarding

Consider expanding Middlewarw

- Multistep onboarding Views 
- Different onboarding paths per user type 
- Resumable onboarding sessions 
- Required vs optional onboarding steps     
- Session management: Current setup uses basic session handling: Consider adding:   

Session timeout handling
- Multiple device management
- Refresh token rotation 
- Session invalidation across devices 
- Authorisation levels 

Consider adding:

granular permission checks 
Resource based acces restrictions 
IP based restrictions 
Authentication State Recovery: 
Current setup needs enhancement for: 
Passowrd reset flows 
Account recovery 
Email verification 
Two factor authentication 

---
/ src/contexts/AuthContext.tsx
expor`t const AuthContext = createContext<{
  user: User | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
}>({
  user: null,
  userProfile: null,
  isLoading: true,
});

// src/components/guards/RouteGuard.tsx
export function RouteGuard({ 
  children, 
  requiredUserType,
  requiredPermissions 
}: RouteGuardProps) {
  // Add more sophisticated checks here
  return children;
}

// src/hooks/useAuthPersistence.ts
export function useAuthPersistence() {
  // Handle auth state persistence across page refreshes
  // Manage token refresh
  // Handle session expiry
}
----