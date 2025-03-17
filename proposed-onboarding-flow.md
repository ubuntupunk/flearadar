# Onboarding Flow

This document outlines the proposed onboarding flow for users who log in via Supabase.

## Goal

To seamlessly onboard users and direct them to the appropriate dashboard (UserDash, VendorDash, or MarketDash) based on their selected user type. To allow for a seperate admin / staff dashboard AdminDash.

## Plan

### Stage One.

1.  **Create Onboarding Page:** Create a new page `src/app/onboarding/page.tsx` with three buttons (User, Vendor, Market).
2.  **Handle Button Clicks:** When a button is clicked, store the selected user type in a cookie or the supabase storage (user table, user_type column) and redirect to the Auth0 login URL.
3.  **Modify Supabase Callback Route:** Update the `src/app/api/auth/login/route.ts` file to retrieve the user type from the cookie or supabase storage.
4.  **Redirect to the appropriate dashboard:** Based on the stored user type, redirect the user to the correct dashboard (UserDash, VendorDash, or MarketDash) after login.
5. **Create hidden AdminDash** for admin and staff (only accessed via  Admin)
6. **Ensure dashboard (UserDash, VendorDash, MarketDash) are protected**
Update the middleware to check for user type and redirect to the appropriate dashboard.

### Stage Two.

7.  **Implement Payment Details Collection:** Add a payment details collection form for Vendors and Markets on their respective dashboards or a dedicated settings page.
8.  **Populate the dashboard:** Implement the specific features for each dashboard, as mentioned by the user (bookmarks, reviews, journal, special offers) utilising the bookmarks table for bookmarks, content table for reviews, journal and special table for special offers.
9. **Bookmarks table** has the following columns id, item_type, item_id, created_at, updated_at
10. **Content table** has the following columns id, type, title, slug, body, metadata, listing_id, created_by, created_at, updated_at.
11. **Special table** has the following columns id, title, slug, body, metadata, listing_id, created_by, created_at, updated_at.
12. **Address Storybook:** Provide guidance on how to use Storybook to develop and test the UI components, especially the buttons, payment form, and dashboard components.

## Notes

*   This plan is subject to change based on the resolution of existing Auth issues.
*   Payment details collection for Vendors and Markets will be implemented after the basic onboarding flow is established.
