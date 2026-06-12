import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";

// ═══════════════════════════════════════════════════════════════════════
// FIREBASE INITIALIZATION
//
// NOTE ON "SECRETS": A Firebase *web* config (apiKey, appId, etc.) is NOT a
// secret. It is shipped to every browser by design and is safe to commit —
// access is controlled by Firestore Security Rules, not by hiding this config.
// (See https://firebase.google.com/docs/projects/api-keys.)
//
// Values default to the CineCrafter project below, and can be overridden per
// environment via NEXT_PUBLIC_FIREBASE_* env vars (see .env.local.example).
//
// TODO: If you rotate the Firebase project, update these defaults or set the
//       NEXT_PUBLIC_FIREBASE_* env vars.
// ═══════════════════════════════════════════════════════════════════════

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "AIzaSyBsVw-jtDBSYwfzFblk6ONqVy10xsr7eBA",
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "cine-crafter-productions.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "cine-crafter-productions",
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "cine-crafter-productions.firebasestorage.app",
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "879812388381",
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "1:879812388381:web:9c2093dba40b68905ac8f4",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? "G-CXK1P7BL3M",
};

// Reuse the app across hot-reloads / serverless invocations.
// NOTE: this module imports only `firebase/app` (small) so it is safe to use
// from client components (e.g. Analytics) without pulling the Firestore SDK
// into the browser bundle. Firestore is imported server-side in the contact
// API route instead.
export const firebaseApp: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
