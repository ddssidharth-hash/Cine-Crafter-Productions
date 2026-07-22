import { firebaseApp } from "./firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updatePassword,
  type User,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  getDocs,
  collection,
  deleteDoc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import type { Project, ExperimentalProject, Service, Logo } from "@/types";

// Import local static data for fallbacks and seeding
import { projects as staticProjects } from "@/data/projects";
import { experimentalProjects as staticExperimental } from "@/data/experimental";
import { clients as staticClients, agencies as staticAgencies, homepageLogos as staticHomepageLogos } from "@/data/clients";
import { aboutStats as staticAboutStats, process as staticProcess, founder as staticFounder, experience as staticExperience, tools as staticTools, languages as staticLanguages } from "@/data/about";
import { services as staticServices } from "@/data/services";

// Get SDK instances
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);

const SETUP_DOC_PATH = "settings/setup";

// ─── ADMIN SETUP & AUTH ───────────────────────────────────────────────

/** Checks if the admin account has been set up yet. */
export async function isAdminSetup(): Promise<boolean> {
  try {
    const setupDoc = await getDoc(doc(db, SETUP_DOC_PATH));
    return setupDoc.exists() && setupDoc.data()?.adminCreated === true;
  } catch (error) {
    console.error("Error checking admin setup:", error);
    return false;
  }
}

/** Registers the admin password for the first-time setup. */
export async function createAdminAccount(password: string): Promise<User> {
  const email = "admin@cinecrafter.com";
  // Create user in Firebase Auth
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  // Mark setup as complete in Firestore
  await setDoc(doc(db, SETUP_DOC_PATH), {
    adminCreated: true,
    createdAt: new Date().toISOString(),
  });
  return userCredential.user;
}

/** Logs in using the admin password. */
export async function loginAdmin(password: string): Promise<User> {
  const email = "admin@cinecrafter.com";
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

/** Logs out the current admin session. */
export async function logoutAdmin(): Promise<void> {
  await signOut(auth);
}

/** Updates the admin password. */
export async function changeAdminPassword(password: string): Promise<void> {
  const user = auth.currentUser;
  if (!user) throw new Error("Unauthenticated. Please log in first.");
  await updatePassword(user, password);
}

// ─── DATA FETCHING (WITH STATIC FALLBACKS) ─────────────────────────────

/** Fetch all portfolio projects. */
export async function getProjects(): Promise<Project[]> {
  try {
    const q = query(collection(db, "projects"));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return staticProjects;
    }
    const list: Project[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data() as Project;
      const staticMatch = staticProjects.find((p) => p.slug === data.slug);
      if (staticMatch && (!data.cover || data.cover.includes("images.unsplash.com"))) {
        data.cover = staticMatch.cover;
      }
      list.push(data);
    });
    // Sort projects if order exists, otherwise keep as is or sort by year
    return list.sort((a, b) => b.year - a.year);
  } catch (error) {
    console.warn("Firestore projects fetch failed, using static fallback:", error);
    return staticProjects;
  }
}

/** Fetch all experimental projects. */
export async function getExperimentalProjects(): Promise<ExperimentalProject[]> {
  try {
    const snapshot = await getDocs(collection(db, "experimental"));
    if (snapshot.empty) {
      return staticExperimental.filter((p) => p.slug !== "western-ghats");
    }
    const list: ExperimentalProject[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data() as ExperimentalProject;
      if (data.slug !== "western-ghats" && !data.slug.includes("western-ghats")) {
        const staticMatch = staticExperimental.find((p) => p.slug === data.slug);
        if (staticMatch && (!data.cover || data.cover.includes("images.unsplash.com"))) {
          data.cover = staticMatch.cover;
        }
        list.push(data);
      }
    });
    return list.sort((a, b) => b.year - a.year);
  } catch (error) {
    console.warn("Firestore experimental fetch failed, using static fallback:", error);
    return staticExperimental.filter((p) => p.slug !== "western-ghats");
  }
}

/** Fetch services list. */
export async function getServices(): Promise<Service[]> {
  try {
    const snapshot = await getDocs(collection(db, "services"));
    if (snapshot.empty) {
      return staticServices;
    }
    const list: Service[] = [];
    snapshot.forEach((doc) => {
      list.push(doc.data() as Service);
    });
    return list;
  } catch (error) {
    console.warn("Firestore services fetch failed, using static fallback:", error);
    return staticServices;
  }
}

/** Fetch client/agency logos. */
export async function getClientsAndAgencies(): Promise<{
  clients: Logo[];
  agencies: Logo[];
  homepageLogos: Logo[];
}> {
  try {
    const clientsDoc = await getDoc(doc(db, "clients", "list"));
    if (!clientsDoc.exists()) {
      return { clients: staticClients, agencies: staticAgencies, homepageLogos: staticHomepageLogos };
    }
    const data = clientsDoc.data();
    return {
      clients: data.clients || [],
      agencies: data.agencies || [],
      homepageLogos: data.homepageLogos || [],
    };
  } catch (error) {
    console.warn("Firestore clients fetch failed, using static fallback:", error);
    return { clients: staticClients, agencies: staticAgencies, homepageLogos: staticHomepageLogos };
  }
}

/** Fetch about content. */
export async function getAboutContent(): Promise<{
  aboutStats: typeof staticAboutStats;
  process: typeof staticProcess;
  founder: typeof staticFounder;
  experience: typeof staticExperience;
  tools: string[];
  languages: string[];
}> {
  try {
    const aboutDoc = await getDoc(doc(db, "about", "content"));
    if (!aboutDoc.exists()) {
      return {
        aboutStats: staticAboutStats,
        process: staticProcess,
        founder: staticFounder,
        experience: staticExperience,
        tools: staticTools,
        languages: staticLanguages,
      };
    }
    const data = aboutDoc.data();
    return {
      aboutStats: data.aboutStats || staticAboutStats,
      process: data.process || staticProcess,
      founder: data.founder || staticFounder,
      experience: data.experience || staticExperience,
      tools: data.tools || staticTools,
      languages: data.languages || staticLanguages,
    };
  } catch (error) {
    console.warn("Firestore about fetch failed, using static fallback:", error);
    return {
      aboutStats: staticAboutStats,
      process: staticProcess,
      founder: staticFounder,
      experience: staticExperience,
      tools: staticTools,
      languages: staticLanguages,
    };
  }
}

// ─── DATA WRITING (ADMIN CRUD) ────────────────────────────────────────

export async function saveProject(project: Project): Promise<void> {
  await setDoc(doc(db, "projects", project.slug), project);
}

export async function deleteProject(slug: string): Promise<void> {
  await deleteDoc(doc(db, "projects", slug));
}

export async function saveExperimentalProject(project: ExperimentalProject): Promise<void> {
  await setDoc(doc(db, "experimental", project.slug), project);
}

export async function deleteExperimentalProject(slug: string): Promise<void> {
  await deleteDoc(doc(db, "experimental", slug));
}

export async function saveServices(servicesList: Service[]): Promise<void> {
  for (const s of servicesList) {
    await setDoc(doc(db, "services", s.id), s);
  }
}

export async function saveClientsAndAgencies(data: {
  clients: Logo[];
  agencies: Logo[];
  homepageLogos: Logo[];
}): Promise<void> {
  await setDoc(doc(db, "clients", "list"), data);
}

export async function saveAboutContent(data: {
  aboutStats: any[];
  process: any[];
  founder: any;
  experience: any[];
  tools: string[];
  languages: string[];
}): Promise<void> {
  await setDoc(doc(db, "about", "content"), data);
}

// ─── CONTACT INQUIRIES ───────────────────────────────────────────────

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  company?: string;
  projectType: string;
  budget?: string;
  referral?: string;
  message: string;
  createdAt: any;
}

export async function getInquiries(): Promise<Inquiry[]> {
  const snapshot = await getDocs(collection(db, "inquiries"));
  const list: Inquiry[] = [];
  snapshot.forEach((doc) => {
    const data = doc.data();
    list.push({
      id: doc.id,
      name: data.name,
      email: data.email,
      company: data.company,
      projectType: data.projectType,
      budget: data.budget,
      referral: data.referral,
      message: data.message,
      createdAt: data.createdAt,
    });
  });
  // Sort by createdAt descending
  return list.sort((a, b) => {
    const t1 = a.createdAt?.seconds ? a.createdAt.seconds * 1000 : new Date(a.createdAt).getTime() || 0;
    const t2 = b.createdAt?.seconds ? b.createdAt.seconds * 1000 : new Date(b.createdAt).getTime() || 0;
    return t2 - t1;
  });
}

// ─── FILE UPLOAD TO FIREBASE STORAGE ──────────────────────────────────

/** Uploads a file to Firebase Storage and returns its public URL. */
export async function uploadMedia(file: File, path: string): Promise<string> {
  const storageRef = ref(storage, `uploads/${Date.now()}_${file.name}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
}

// ─── DATABASE SEEDING ─────────────────────────────────────────────────

/** Seeds Firestore with all initial static data. */
export async function seedDefaultData(): Promise<void> {
  // 1. Projects
  for (const p of staticProjects) {
    await setDoc(doc(db, "projects", p.slug), p);
  }
  // 2. Experimental
  for (const p of staticExperimental) {
    await setDoc(doc(db, "experimental", p.slug), p);
  }
  // 3. Services
  for (const s of staticServices) {
    await setDoc(doc(db, "services", s.id), s);
  }
  // 4. Clients
  await setDoc(doc(db, "clients", "list"), {
    clients: staticClients,
    agencies: staticAgencies,
    homepageLogos: staticHomepageLogos,
  });
  // 5. About
  await setDoc(doc(db, "about", "content"), {
    aboutStats: staticAboutStats,
    process: staticProcess,
    founder: staticFounder,
    experience: staticExperience,
    tools: staticTools,
    languages: staticLanguages,
  });

  // Ensure setup is marked complete
  await setDoc(doc(db, SETUP_DOC_PATH), {
    adminCreated: true,
    lastSeeded: new Date().toISOString(),
  });
}
