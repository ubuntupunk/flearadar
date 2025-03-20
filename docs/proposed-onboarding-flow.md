# Onboarding Flow

This document outlines the proposed onboarding flow for users who log in via Supabase.

## Goal

To seamlessly onboard users and direct them to the appropriate dashboard (UserDash, VendorDash, or MarketDash) based on their selected user type. To allow for a seperate admin / staff dashboard AdminDash.

## Plan

### Stage One.
1.  **Create Onboarding Page:** Create a new page `src/app/onboarding/page.tsx` with three buttons (User, Vendor, Market).
2.  **Handle Button Clicks:** When a button is clicked, store the selected user type in a cookie or the supabase storage (user table, user_type column) and redirect to the login URL.
3.**Handle Successful Registration:** Upon successful registration, the user is directed to the /auth/register-success page. Await email verification, request user to check email.
4.  **Modify Supabase Callback Route:** Update the `src/app/api/auth/login/route.ts` file to retrieve the user type from the cookie or supabase storage, if no profile is found, redirect to the onboarding page.
5.  **Redirect to the appropriate dashboard:** Based on the stored user type, redirect the user to the correct dashboard (UserDash, VendorDash, or MarketDash) after login.
6. **Create hidden AdminDash** for admin and staff (only accessed via  Admin)
7. **Ensure dashboard (UserDash, VendorDash, MarketDash, AdminDash) are protected**
Update the middleware to check for user type and redirect to the appropriate dashboard.

### Stage Two.
8. **Setup profiles for each dashboard**
Use the profiles table, users table and images table to store the user's profile information. Profile table has the following columns: 
id, updated_at, full_name, avatar_url, website, profile_type, chosen_color. Users table has the following relevent columns: id, username, user_type, update_at, gps_tracking_consent, latitude, longitude, geofence_radius, reputation_score. Images table has the following columns: id, imageable_id, imagable_type, url, alt_text, created_at, updated_at.The default Supabase auth.users.id table contains display name, email, phone columns. Remember  to construct the profile using the above tables.
9. **Create Profile Form:** Check page `src/app/auth/profile-selection/page.tsx` if it has a form to collect the user's profile information, if not, create one, check if it handles the relevent tables (profiles, users, images) and stores the profile information.
10. **Handle Profile Submission:** When the form is submitted, store the profile information in the relevent tables and redirect to the appropriate dashboard.
11. **Create Profile Component:** Create a new component `src/components/Profile.tsx` to display the user's profile information.
12. **Create Profile Page:** Create a new page `src/app/profile/page.tsx` to display the user's profile information.

### Stage Three.
7.  **Implement Payment Details Collection:** Add a payment details collection form for Vendors and Markets on their respective dashboards or a dedicated settings page.
8.  **Populate the dashboard:** Implement the specific features for each dashboard, as mentioned by the user (bookmarks, reviews, journal, special offers) utilising the bookmarks table for bookmarks, content table for reviews, journal and special table for special offers.
9. **Bookmarks table** has the following columns id, item_type, item_id, created_at, updated_at
10. **Content table** has the following columns id, type, title, slug, body, metadata, listing_id, created_by, created_at, updated_at.
11. **Special table** has the following columns id, title, slug, body, metadata, listing_id, created_by, created_at, updated_at.
12. **Address Storybook:** Provide guidance on how to use Storybook to develop and test the UI components, especially the buttons, payment form, and dashboard components.

## Notes

*   This plan is subject to change based on the resolution of existing Auth issues.
*   Payment details collection for Vendors and Markets will be implemented after the basic onboarding flow is established.
