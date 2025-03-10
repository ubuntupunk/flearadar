# Proposed Onboarding Flow

This document outlines the proposed onboarding flow for users who log in via Auth0.

## Goal

To seamlessly onboard users and direct them to the appropriate dashboard (UserDash, VendorDash, or MarketDash) based on their selected user type.

## Plan

1.  **Create Onboarding Page:** Create a new page `src/app/onboarding/page.tsx` with three buttons (User, Vendor, Market).
2.  **Handle Button Clicks:** When a button is clicked, store the selected user type in a cookie or local storage and redirect to the Auth0 login URL.
3.  **Modify Auth0 Callback Route:** Update the `src/app/api/auth/[auth0]/route.ts` file to retrieve the user type from the cookie or local storage.
4.  **Redirect to the appropriate dashboard:** Based on the stored user type, redirect the user to the correct dashboard (UserDash, VendorDash, or MarketDash) after login.
5.  **Implement Payment Details Collection:** Add a payment details collection form for Vendors and Markets on their respective dashboards or a dedicated settings page.
6.  **Populate the dashboard:** Implement the specific features for each dashboard, as mentioned by the user (bookmarks, reviews, journal, special offers for UserDash).
7.  **Address Storybook:** Provide guidance on how to use Storybook to develop and test the UI components, especially the buttons, payment form, and dashboard components.

## Notes

*   This plan is subject to change based on the resolution of existing Auth0 issues.
*   Payment details collection for Vendors and Markets will be implemented after the basic onboarding flow is established.
