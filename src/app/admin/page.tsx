"use client";

import { useState, useEffect } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import {
  auth,
  isAdminSetup,
  createAdminAccount,
  loginAdmin,
  logoutAdmin,
  changeAdminPassword,
  getProjects,
  getExperimentalProjects,
  getServices,
  getClientsAndAgencies,
  getAboutContent,
  saveProject,
  deleteProject,
  saveExperimentalProject,
  deleteExperimentalProject,
  saveServices,
  saveClientsAndAgencies,
  saveAboutContent,
  getInquiries,
  uploadMedia,
  seedDefaultData,
  type Inquiry,
} from "@/lib/db-client";
import type { Project, ExperimentalProject, Service, Logo } from "@/types";
import { PageHeader } from "@/components/ui/PageHeader";

type Tab = "projects" | "experimental" | "services" | "clients" | "about" | "inquiries" | "system";

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isSetup, setIsSetup] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("projects");

  // Database states
  const [projects, setProjects] = useState<Project[]>([]);
  const [experimental, setExperimental] = useState<ExperimentalProject[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [clients, setClients] = useState<Logo[]>([]);
  const [agencies, setAgencies] = useState<Logo[]>([]);
  const [homepageLogos, setHomepageLogos] = useState<Logo[]>([]);
  const [aboutData, setAboutData] = useState<any>(null);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  // Editing states
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingExperimental, setEditingExperimental] = useState<ExperimentalProject | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);

  // Initial Auth & Setup Check
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      const setupStatus = await isAdminSetup();
      setIsSetup(setupStatus);
      setLoading(false);

      if (currentUser) {
        loadAllData();
      }
    });

    return () => unsubscribe();
  }, []);

  const loadAllData = async () => {
    try {
      const [pList, eList, sList, cData, aData, iList] = await Promise.all([
        getProjects(),
        getExperimentalProjects(),
        getServices(),
        getClientsAndAgencies(),
        getAboutContent(),
        getInquiries(),
      ]);

      setProjects(pList);
      setExperimental(eList);
      setServices(sList);
      setClients(cData.clients);
      setAgencies(cData.agencies);
      setHomepageLogos(cData.homepageLogos);
      setAboutData(aData);
      setInquiries(iList);
    } catch (err) {
      console.error("Error loading admin dashboard data:", err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (!isSetup) {
        // First time setup: create account
        await createAdminAccount(password);
        setIsSetup(true);
        setSuccess("Admin account created successfully!");
      } else {
        // Standard login
        await loginAdmin(password);
        setSuccess("Logged in successfully!");
      }
      setPassword("");
    } catch (err: any) {
      setError(err.message || "Authentication failed. Please verify your password.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logoutAdmin();
      setSuccess("Logged out successfully.");
    } catch (err: any) {
      setError(err.message || "Failed to log out.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!password.trim()) {
      setError("Password cannot be empty.");
      return;
    }
    try {
      await changeAdminPassword(password);
      setSuccess("Password changed successfully!");
      setPassword("");
    } catch (err: any) {
      setError(err.message || "Failed to change password.");
    }
  };

  const handleSeed = async () => {
    if (!confirm("Are you sure you want to seed default data? This will overwrite or add default entries.")) return;
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await seedDefaultData();
      setSuccess("Database successfully seeded with default projects, clients, and about content!");
      await loadAllData();
    } catch (err: any) {
      setError(err.message || "Failed to seed data.");
    } finally {
      setLoading(false);
    }
  };

  // ─── CRUD HANDLERS ───────────────────────────────────────────────────

  // Projects
  const handleSaveProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingProject) return;
    setError("");
    setSuccess("");
    try {
      await saveProject(editingProject);
      setSuccess(`Project "${editingProject.title}" saved successfully!`);
      setEditingProject(null);
      await loadAllData();
    } catch (err: any) {
      setError(err.message || "Failed to save project.");
    }
  };

  const handleDeleteProject = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteProject(slug);
      setSuccess("Project deleted.");
      await loadAllData();
    } catch (err: any) {
      setError(err.message || "Failed to delete project.");
    }
  };

  // Experimental Projects
  const handleSaveExperimental = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingExperimental) return;
    setError("");
    setSuccess("");
    try {
      await saveExperimentalProject(editingExperimental);
      setSuccess(`Experimental Project "${editingExperimental.title}" saved successfully!`);
      setEditingExperimental(null);
      await loadAllData();
    } catch (err: any) {
      setError(err.message || "Failed to save experimental project.");
    }
  };

  const handleDeleteExperimental = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this experimental project?")) return;
    try {
      await deleteExperimentalProject(slug);
      setSuccess("Experimental project deleted.");
      await loadAllData();
    } catch (err: any) {
      setError(err.message || "Failed to delete experimental project.");
    }
  };

  // Services
  const handleSaveService = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingService) return;
    setError("");
    setSuccess("");
    try {
      const updatedServices = services.map((s) => (s.id === editingService.id ? editingService : s));
      await saveServices(updatedServices);
      setSuccess(`Service "${editingService.title}" updated successfully!`);
      setEditingService(null);
      await loadAllData();
    } catch (err: any) {
      setError(err.message || "Failed to save service.");
    }
  };

  // Media File Upload Helper
  const handleFileUpload = async (file: File, type: "cover" | "still", index?: number) => {
    try {
      setSuccess("Uploading file...");
      const url = await uploadMedia(file, type);
      setSuccess("File uploaded successfully!");
      if (editingProject) {
        if (type === "cover") {
          setEditingProject({ ...editingProject, cover: url });
        } else if (type === "still" && index !== undefined) {
          const stills = [...(editingProject.stills || [])];
          stills[index] = { src: url, alt: stills[index]?.alt || "" };
          setEditingProject({ ...editingProject, stills });
        }
      } else if (editingExperimental) {
        if (type === "cover") {
          setEditingExperimental({ ...editingExperimental, cover: url });
        } else if (type === "still" && index !== undefined) {
          const stills = [...(editingExperimental.stills || [])];
          stills[index] = { src: url, alt: stills[index]?.alt || "" };
          setEditingExperimental({ ...editingExperimental, stills });
        }
      }
    } catch (err: any) {
      setError("File upload failed: " + err.message);
    }
  };

  // Loading indicator
  if (loading) {
    return (
      <div className="min-h-screen bg-base flex flex-col items-center justify-center text-ink">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-accent mb-4"></div>
        <p className="font-serif text-lg text-ink-muted">Authenticating CineCrafter Admin...</p>
      </div>
    );
  }

  // ─── LOGIN PANEL ─────────────────────────────────────────────────────
  if (!user) {
    return (
      <div className="min-h-screen bg-base flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-base-elevated border border-base-line p-8 md:p-10 shadow-2xl relative overflow-hidden backdrop-blur-md">
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent"></div>
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl text-ink tracking-tight mb-2">
              {isSetup ? "Admin Portal" : "Welcome to CineCrafter"}
            </h1>
            <p className="text-sm text-ink-muted leading-relaxed">
              {isSetup
                ? "Enter your secure admin password to modify website content."
                : "Choose an admin password to initialize your dashboard."}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="pass" className="eyebrow block mb-2 text-ink-faint">
                {isSetup ? "Password" : "New Admin Password"}
              </label>
              <input
                id="pass"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full border-b border-base-line bg-transparent py-3 text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none transition-colors duration-300"
              />
            </div>

            {error && <p className="text-xs text-accent">{error}</p>}
            {success && <p className="text-xs text-emerald-500">{success}</p>}

            <button
              type="submit"
              className="w-full border border-ink/30 px-6 py-3 text-sm tracking-wide text-ink transition-all duration-500 ease-cine hover:border-accent hover:text-accent font-sans"
            >
              {isSetup ? "Log In" : "Complete Setup"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ─── MAIN DASHBOARD ──────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-base pb-32">
      {/* Top Banner */}
      <div className="border-b border-base-line bg-base-elevated/40 backdrop-blur-md sticky top-0 z-50">
        <div className="frame py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-xl text-ink tracking-tight">CineCrafter Panel</span>
            <span className="text-xs eyebrow px-2 py-0.5 border border-accent/30 rounded text-accent bg-accent/5">
              Secure Session
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-sm text-ink-muted hidden sm:inline">{user.email}</span>
            <button
              onClick={handleLogout}
              className="text-xs eyebrow border border-ink/20 hover:border-accent hover:text-accent px-3 py-1.5 transition-colors"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>

      <PageHeader
        eyebrow="Console"
        title="Manage website content."
        intro="Control every project, service offering, client reference, and about section bio dynamically in real-time."
      />

      <div className="frame">
        {/* Alerts */}
        {error && (
          <div className="mb-8 p-4 bg-accent/10 border border-accent/20 text-accent text-sm rounded flex justify-between items-center">
            <span>{error}</span>
            <button onClick={() => setError("")} className="text-xs ml-4 hover:underline">Dismiss</button>
          </div>
        )}
        {success && (
          <div className="mb-8 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-sm rounded flex justify-between items-center">
            <span>{success}</span>
            <button onClick={() => setSuccess("")} className="text-xs ml-4 hover:underline">Dismiss</button>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="mb-10 flex flex-wrap gap-x-6 gap-y-2 border-b border-base-line pb-4 overflow-x-auto no-scrollbar">
          {(
            [
              ["projects", "Portfolio Work"],
              ["experimental", "Experimental"],
              ["services", "Services"],
              ["clients", "Clients & Logos"],
              ["about", "About Studio"],
              ["inquiries", `Inquiries (${inquiries.length})`],
              ["system", "System Settings"],
            ] as const
          ).map(([tabId, label]) => (
            <button
              key={tabId}
              onClick={() => {
                setActiveTab(tabId);
                setEditingProject(null);
                setEditingExperimental(null);
                setEditingService(null);
              }}
              className={`text-sm tracking-wide transition-colors py-2 px-1 relative ${
                activeTab === tabId ? "text-accent font-medium" : "text-ink-faint hover:text-ink-muted"
              }`}
            >
              {label}
              {activeTab === tabId && (
                <span className="absolute bottom-[-17px] left-0 w-full h-[2px] bg-accent" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Contents */}

        {/* 1. PORTFOLIO WORK TAB */}
        {activeTab === "projects" && (
          <div>
            {!editingProject ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="font-serif text-2xl text-ink">Portfolio projects ({projects.length})</h2>
                  <button
                    onClick={() =>
                      setEditingProject({
                        slug: "",
                        title: "",
                        category: "Film Production",
                        excerpt: "",
                        description: "",
                        role: "",
                        client: "",
                        year: new Date().getFullYear(),
                        cover: "",
                        featured: false,
                        stills: [],
                      })
                    }
                    className="border border-accent px-4 py-2 text-xs eyebrow text-accent hover:bg-accent/10 transition-colors"
                  >
                    + Add New Project
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((p) => (
                    <div key={p.slug} className="border border-base-line bg-base-elevated/20 p-5 flex flex-col justify-between">
                      <div>
                        {p.cover && (
                          <div className="aspect-video w-full relative overflow-hidden mb-4 bg-base-elevated">
                            <img src={p.cover} alt={p.title} className="object-cover w-full h-full" />
                          </div>
                        )}
                        <h3 className="font-serif text-lg text-ink mb-1">{p.title}</h3>
                        <p className="text-xs eyebrow text-accent mb-2">{p.category} · {p.year}</p>
                        <p className="text-sm text-ink-muted line-clamp-2">{p.excerpt}</p>
                      </div>

                      <div className="mt-6 flex justify-between items-center border-t border-base-line pt-4">
                        <span className="text-xs text-ink-faint">
                          {p.featured ? "★ Featured" : "Standard"}
                        </span>
                        <div className="flex gap-3">
                          <button
                            onClick={() => setEditingProject(p)}
                            className="text-xs text-ink hover:text-accent transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteProject(p.slug)}
                            className="text-xs text-red-400 hover:text-red-500 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // Add / Edit Project Form
              <div className="bg-base-elevated/10 border border-base-line p-6 max-w-4xl">
                <div className="flex justify-between items-center mb-8 pb-4 border-b border-base-line">
                  <h3 className="font-serif text-xl text-ink">
                    {editingProject.slug ? "Edit Project" : "Add New Project"}
                  </h3>
                  <button onClick={() => setEditingProject(null)} className="text-xs eyebrow hover:underline">
                    Cancel
                  </button>
                </div>

                <form onSubmit={handleSaveProject} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="eyebrow block mb-1">Title</label>
                      <input
                        type="text"
                        required
                        value={editingProject.title}
                        onChange={(e) => {
                          const title = e.target.value;
                          const slug = title
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, "-")
                            .replace(/(^-|-$)/g, "");
                          setEditingProject({
                            ...editingProject,
                            title,
                            slug: editingProject.slug ? editingProject.slug : slug,
                          });
                        }}
                        className="w-full border-b border-base-line bg-transparent py-2 text-ink focus:border-accent focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="eyebrow block mb-1">Slug (URL identifier)</label>
                      <input
                        type="text"
                        required
                        value={editingProject.slug}
                        onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                        className="w-full border-b border-base-line bg-transparent py-2 text-ink focus:border-accent focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="eyebrow block mb-1">Category</label>
                      <select
                        value={editingProject.category}
                        onChange={(e: any) => setEditingProject({ ...editingProject, category: e.target.value })}
                        className="w-full border-b border-base-line bg-base py-2 text-ink focus:border-accent focus:outline-none"
                      >
                        <option value="Film Production">Film Production</option>
                        <option value="Line Production">Line Production</option>
                        <option value="Filmmaking">Filmmaking</option>
                        <option value="Web Series">Web Series</option>
                        <option value="Ad Films">Ad Films</option>
                        <option value="Documentaries">Documentaries</option>
                        <option value="Digital Marketing Videos">Digital Marketing Videos</option>
                      </select>
                    </div>
                    <div>
                      <label className="eyebrow block mb-1">Year</label>
                      <input
                        type="number"
                        required
                        value={editingProject.year}
                        onChange={(e) => setEditingProject({ ...editingProject, year: Number(e.target.value) })}
                        className="w-full border-b border-base-line bg-transparent py-2 text-ink focus:border-accent focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="eyebrow block mb-1">Client</label>
                      <input
                        type="text"
                        required
                        value={editingProject.client}
                        onChange={(e) => setEditingProject({ ...editingProject, client: e.target.value })}
                        className="w-full border-b border-base-line bg-transparent py-2 text-ink focus:border-accent focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="eyebrow block mb-1">Excerpt (short card teaser)</label>
                    <input
                      type="text"
                      required
                      value={editingProject.excerpt}
                      onChange={(e) => setEditingProject({ ...editingProject, excerpt: e.target.value })}
                      className="w-full border-b border-base-line bg-transparent py-2 text-ink focus:border-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="eyebrow block mb-1">Role / Credits (e.g. "Direction · Edit · Color")</label>
                    <input
                      type="text"
                      required
                      value={editingProject.role}
                      onChange={(e) => setEditingProject({ ...editingProject, role: e.target.value })}
                      className="w-full border-b border-base-line bg-transparent py-2 text-ink focus:border-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="eyebrow block mb-1">Full Description</label>
                    <textarea
                      required
                      rows={4}
                      value={editingProject.description}
                      onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                      className="w-full border-b border-base-line bg-transparent py-2 text-ink focus:border-accent focus:outline-none resize-none"
                    />
                  </div>

                  {/* Media uploads */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="eyebrow block mb-1">Cover Image URL</label>
                      <input
                        type="text"
                        value={editingProject.cover}
                        onChange={(e) => setEditingProject({ ...editingProject, cover: e.target.value })}
                        className="w-full border-b border-base-line bg-transparent py-2 text-ink focus:border-accent focus:outline-none mb-2"
                        placeholder="Or upload file below"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files?.[0]) handleFileUpload(e.target.files[0], "cover");
                        }}
                        className="text-xs text-ink-muted"
                      />
                    </div>

                    <div>
                      <label className="eyebrow block mb-1">Featured Project</label>
                      <div className="flex items-center mt-3">
                        <input
                          id="featured-check"
                          type="checkbox"
                          checked={editingProject.featured || false}
                          onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                          className="mr-3 h-4 w-4 bg-transparent border-base-line focus:ring-0 accent-accent"
                        />
                        <label htmlFor="featured-check" className="text-sm text-ink-muted">
                          Show on home page "Selected Work" carousel
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="eyebrow block mb-1">YouTube/Vimeo Embed Video URL</label>
                      <input
                        type="text"
                        value={editingProject.videoUrl || ""}
                        onChange={(e) => setEditingProject({ ...editingProject, videoUrl: e.target.value })}
                        className="w-full border-b border-base-line bg-transparent py-2 text-ink focus:border-accent focus:outline-none"
                        placeholder="https://www.youtube.com/embed/..."
                      />
                    </div>
                    <div>
                      <label className="eyebrow block mb-1">Muted Hover Loop Video URL (.mp4 / .webm)</label>
                      <input
                        type="text"
                        value={editingProject.previewUrl || ""}
                        onChange={(e) => setEditingProject({ ...editingProject, previewUrl: e.target.value })}
                        className="w-full border-b border-base-line bg-transparent py-2 text-ink focus:border-accent focus:outline-none"
                        placeholder="https://domain.com/loop.mp4"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="eyebrow block mb-1">External Behance URL (optional)</label>
                    <input
                      type="text"
                      value={editingProject.externalUrl || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, externalUrl: e.target.value })}
                      className="w-full border-b border-base-line bg-transparent py-2 text-ink focus:border-accent focus:outline-none"
                    />
                  </div>

                  {/* Gallery Stills */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <label className="eyebrow block">Gallery Stills ({editingProject.stills?.length || 0})</label>
                      <button
                        type="button"
                        onClick={() => {
                          const stills = [...(editingProject.stills || [])];
                          stills.push({ src: "", alt: "" });
                          setEditingProject({ ...editingProject, stills });
                        }}
                        className="text-xs eyebrow text-accent border border-accent/20 px-2 py-1"
                      >
                        + Add Still
                      </button>
                    </div>

                    <div className="space-y-4">
                      {editingProject.stills?.map((still, idx) => (
                        <div key={idx} className="flex gap-4 items-center border border-base-line/50 p-4">
                          <span className="text-xs eyebrow text-ink-faint">#{idx + 1}</span>
                          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <input
                                type="text"
                                placeholder="Image URL or upload"
                                value={still.src}
                                onChange={(e) => {
                                  const stills = [...(editingProject.stills || [])];
                                  stills[idx] = { src: e.target.value, alt: stills[idx]?.alt || "" };
                                  setEditingProject({ ...editingProject, stills });
                                }}
                                className="w-full border-b border-base-line bg-transparent py-1 text-sm text-ink focus:border-accent focus:outline-none mb-1"
                              />
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  if (e.target.files?.[0]) handleFileUpload(e.target.files[0], "still", idx);
                                }}
                                className="text-xs text-ink-muted"
                              />
                            </div>
                            <div>
                              <input
                                type="text"
                                placeholder="Alt description"
                                value={still.alt}
                                onChange={(e) => {
                                  const stills = [...(editingProject.stills || [])];
                                  stills[idx] = { src: stills[idx]?.src || "", alt: e.target.value };
                                  setEditingProject({ ...editingProject, stills });
                                }}
                                className="w-full border-b border-base-line bg-transparent py-1 text-sm text-ink focus:border-accent focus:outline-none"
                              />
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const stills = [...(editingProject.stills || [])];
                              stills.splice(idx, 1);
                              setEditingProject({ ...editingProject, stills });
                            }}
                            className="text-xs text-red-400 hover:text-red-500"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-base-line flex gap-4">
                    <button
                      type="submit"
                      className="border border-accent px-6 py-2.5 text-xs eyebrow text-accent hover:bg-accent/10"
                    >
                      Save Project
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingProject(null)}
                      className="border border-ink/20 px-6 py-2.5 text-xs eyebrow text-ink-muted hover:border-ink/40"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* 2. EXPERIMENTAL TAB */}
        {activeTab === "experimental" && (
          <div>
            {!editingExperimental ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="font-serif text-2xl text-ink">Experimental projects ({experimental.length})</h2>
                  <button
                    onClick={() =>
                      setEditingExperimental({
                        slug: "",
                        title: "",
                        tag: "",
                        excerpt: "",
                        description: "",
                        year: new Date().getFullYear(),
                        cover: "",
                        stills: [],
                      })
                    }
                    className="border border-accent px-4 py-2 text-xs eyebrow text-accent hover:bg-accent/10 transition-colors"
                  >
                    + Add New Experimental Project
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {experimental.map((p) => (
                    <div key={p.slug} className="border border-base-line bg-base-elevated/20 p-5 flex flex-col justify-between">
                      <div>
                        {p.cover && (
                          <div className="aspect-video w-full relative overflow-hidden mb-4 bg-base-elevated">
                            <img src={p.cover} alt={p.title} className="object-cover w-full h-full" />
                          </div>
                        )}
                        <h3 className="font-serif text-lg text-ink mb-1">{p.title}</h3>
                        <p className="text-xs eyebrow text-accent mb-2">{p.tag} · {p.year}</p>
                        <p className="text-sm text-ink-muted line-clamp-2">{p.excerpt}</p>
                      </div>

                      <div className="mt-6 flex justify-end gap-3 border-t border-base-line pt-4">
                        <button
                          onClick={() => setEditingExperimental(p)}
                          className="text-xs text-ink hover:text-accent transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteExperimental(p.slug)}
                          className="text-xs text-red-400 hover:text-red-500 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // Add / Edit Experimental Form
              <div className="bg-base-elevated/10 border border-base-line p-6 max-w-4xl">
                <div className="flex justify-between items-center mb-8 pb-4 border-b border-base-line">
                  <h3 className="font-serif text-xl text-ink">
                    {editingExperimental.slug ? "Edit Passion Project" : "Add Passion Project"}
                  </h3>
                  <button onClick={() => setEditingExperimental(null)} className="text-xs eyebrow hover:underline">
                    Cancel
                  </button>
                </div>

                <form onSubmit={handleSaveExperimental} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="eyebrow block mb-1">Title</label>
                      <input
                        type="text"
                        required
                        value={editingExperimental.title}
                        onChange={(e) => {
                          const title = e.target.value;
                          const slug = title
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, "-")
                            .replace(/(^-|-$)/g, "");
                          setEditingExperimental({
                            ...editingExperimental,
                            title,
                            slug: editingExperimental.slug ? editingExperimental.slug : slug,
                          });
                        }}
                        className="w-full border-b border-base-line bg-transparent py-2 text-ink focus:border-accent focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="eyebrow block mb-1">Slug (URL identifier)</label>
                      <input
                        type="text"
                        required
                        value={editingExperimental.slug}
                        onChange={(e) => setEditingExperimental({ ...editingExperimental, slug: e.target.value })}
                        className="w-full border-b border-base-line bg-transparent py-2 text-ink focus:border-accent focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="eyebrow block mb-1">Tag (e.g. "Documentary · Expedition")</label>
                      <input
                        type="text"
                        required
                        value={editingExperimental.tag}
                        onChange={(e) => setEditingExperimental({ ...editingExperimental, tag: e.target.value })}
                        className="w-full border-b border-base-line bg-transparent py-2 text-ink focus:border-accent focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="eyebrow block mb-1">Year</label>
                      <input
                        type="number"
                        required
                        value={editingExperimental.year}
                        onChange={(e) => setEditingExperimental({ ...editingExperimental, year: Number(e.target.value) })}
                        className="w-full border-b border-base-line bg-transparent py-2 text-ink focus:border-accent focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="eyebrow block mb-1">Excerpt (short card teaser)</label>
                    <input
                      type="text"
                      required
                      value={editingExperimental.excerpt}
                      onChange={(e) => setEditingExperimental({ ...editingExperimental, excerpt: e.target.value })}
                      className="w-full border-b border-base-line bg-transparent py-2 text-ink focus:border-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="eyebrow block mb-1">Full Description</label>
                    <textarea
                      required
                      rows={4}
                      value={editingExperimental.description}
                      onChange={(e) => setEditingExperimental({ ...editingExperimental, description: e.target.value })}
                      className="w-full border-b border-base-line bg-transparent py-2 text-ink focus:border-accent focus:outline-none resize-none"
                    />
                  </div>

                  {/* Media uploads */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="eyebrow block mb-1">Cover Image URL</label>
                      <input
                        type="text"
                        value={editingExperimental.cover}
                        onChange={(e) => setEditingExperimental({ ...editingExperimental, cover: e.target.value })}
                        className="w-full border-b border-base-line bg-transparent py-2 text-ink focus:border-accent focus:outline-none mb-2"
                        placeholder="Or upload file below"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files?.[0]) handleFileUpload(e.target.files[0], "cover");
                        }}
                        className="text-xs text-ink-muted"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="eyebrow block mb-1">YouTube/Vimeo Embed Video URL</label>
                      <input
                        type="text"
                        value={editingExperimental.videoUrl || ""}
                        onChange={(e) => setEditingExperimental({ ...editingExperimental, videoUrl: e.target.value })}
                        className="w-full border-b border-base-line bg-transparent py-2 text-ink focus:border-accent focus:outline-none"
                        placeholder="https://www.youtube.com/embed/..."
                      />
                    </div>
                    <div>
                      <label className="eyebrow block mb-1">Muted Hover Loop Video URL (.mp4 / .webm)</label>
                      <input
                        type="text"
                        value={editingExperimental.previewUrl || ""}
                        onChange={(e) => setEditingExperimental({ ...editingExperimental, previewUrl: e.target.value })}
                        className="w-full border-b border-base-line bg-transparent py-2 text-ink focus:border-accent focus:outline-none"
                        placeholder="https://domain.com/loop.mp4"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="eyebrow block mb-1">External Link URL (optional)</label>
                    <input
                      type="text"
                      value={editingExperimental.externalUrl || ""}
                      onChange={(e) => setEditingExperimental({ ...editingExperimental, externalUrl: e.target.value })}
                      className="w-full border-b border-base-line bg-transparent py-2 text-ink focus:border-accent focus:outline-none"
                    />
                  </div>

                  {/* Gallery Stills */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <label className="eyebrow block">Gallery Stills ({editingExperimental.stills?.length || 0})</label>
                      <button
                        type="button"
                        onClick={() => {
                          const stills = [...(editingExperimental.stills || [])];
                          stills.push({ src: "", alt: "" });
                          setEditingExperimental({ ...editingExperimental, stills });
                        }}
                        className="text-xs eyebrow text-accent border border-accent/20 px-2 py-1"
                      >
                        + Add Still
                      </button>
                    </div>

                    <div className="space-y-4">
                      {editingExperimental.stills?.map((still, idx) => (
                        <div key={idx} className="flex gap-4 items-center border border-base-line/50 p-4">
                          <span className="text-xs eyebrow text-ink-faint">#{idx + 1}</span>
                          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <input
                                type="text"
                                placeholder="Image URL or upload"
                                value={still.src}
                                onChange={(e) => {
                                  const stills = [...(editingExperimental.stills || [])];
                                  stills[idx] = { src: e.target.value, alt: stills[idx]?.alt || "" };
                                  setEditingExperimental({ ...editingExperimental, stills });
                                }}
                                className="w-full border-b border-base-line bg-transparent py-1 text-sm text-ink focus:border-accent focus:outline-none mb-1"
                              />
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  if (e.target.files?.[0]) handleFileUpload(e.target.files[0], "still", idx);
                                }}
                                className="text-xs text-ink-muted"
                              />
                            </div>
                            <div>
                              <input
                                type="text"
                                placeholder="Alt description"
                                value={still.alt}
                                onChange={(e) => {
                                  const stills = [...(editingExperimental.stills || [])];
                                  stills[idx] = { src: stills[idx]?.src || "", alt: e.target.value };
                                  setEditingExperimental({ ...editingExperimental, stills });
                                }}
                                className="w-full border-b border-base-line bg-transparent py-1 text-sm text-ink focus:border-accent focus:outline-none"
                              />
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const stills = [...(editingExperimental.stills || [])];
                              stills.splice(idx, 1);
                              setEditingExperimental({ ...editingExperimental, stills });
                            }}
                            className="text-xs text-red-400 hover:text-red-500"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-base-line flex gap-4">
                    <button
                      type="submit"
                      className="border border-accent px-6 py-2.5 text-xs eyebrow text-accent hover:bg-accent/10"
                    >
                      Save Passion Project
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingExperimental(null)}
                      className="border border-ink/20 px-6 py-2.5 text-xs eyebrow text-ink-muted hover:border-ink/40"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* 3. SERVICES TAB */}
        {activeTab === "services" && (
          <div className="space-y-6">
            {!editingService ? (
              <div>
                <h2 className="font-serif text-2xl text-ink mb-6">Service offerings ({services.length})</h2>
                <div className="space-y-4">
                  {services.map((s) => (
                    <div key={s.id} className="border border-base-line bg-base-elevated/20 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="max-w-2xl">
                        <h3 className="font-serif text-xl text-ink mb-1">{s.title}</h3>
                        <p className="text-xs eyebrow text-accent mb-3">{s.summary}</p>
                        <p className="text-sm text-ink-muted mb-4">{s.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {s.capabilities.map((c) => (
                            <span key={c} className="text-xs eyebrow px-2 py-1 bg-base border border-base-line text-ink-faint">
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => setEditingService(s)}
                        className="border border-ink/20 px-4 py-2 text-xs eyebrow text-ink-muted hover:border-accent hover:text-accent transition-all shrink-0"
                      >
                        Edit Offering
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-base-elevated/10 border border-base-line p-6 max-w-4xl">
                <div className="flex justify-between items-center mb-8 pb-4 border-b border-base-line">
                  <h3 className="font-serif text-xl text-ink">Edit Service offering: {editingService.title}</h3>
                  <button onClick={() => setEditingService(null)} className="text-xs eyebrow hover:underline">
                    Cancel
                  </button>
                </div>

                <form onSubmit={handleSaveService} className="space-y-6">
                  <div>
                    <label className="eyebrow block mb-1">Title</label>
                    <input
                      type="text"
                      required
                      value={editingService.title}
                      onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                      className="w-full border-b border-base-line bg-transparent py-2 text-ink focus:border-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="eyebrow block mb-1">Summary (1-line teaser)</label>
                    <input
                      type="text"
                      required
                      value={editingService.summary}
                      onChange={(e) => setEditingService({ ...editingService, summary: e.target.value })}
                      className="w-full border-b border-base-line bg-transparent py-2 text-ink focus:border-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="eyebrow block mb-1">Description</label>
                    <textarea
                      required
                      rows={3}
                      value={editingService.description}
                      onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                      className="w-full border-b border-base-line bg-transparent py-2 text-ink focus:border-accent focus:outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="eyebrow block mb-1">Image URL</label>
                    <input
                      type="text"
                      value={editingService.image || ""}
                      onChange={(e) => setEditingService({ ...editingService, image: e.target.value })}
                      className="w-full border-b border-base-line bg-transparent py-2 text-ink focus:border-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="eyebrow block mb-1">Linked Example Project (Slug)</label>
                    <input
                      type="text"
                      value={editingService.exampleProjectSlug || ""}
                      onChange={(e) => setEditingService({ ...editingService, exampleProjectSlug: e.target.value })}
                      className="w-full border-b border-base-line bg-transparent py-2 text-ink focus:border-accent focus:outline-none"
                      placeholder="e.g. smaranayil"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <label className="eyebrow block">Capabilities</label>
                      <button
                        type="button"
                        onClick={() => {
                          const capabilities = [...editingService.capabilities];
                          capabilities.push("");
                          setEditingService({ ...editingService, capabilities });
                        }}
                        className="text-xs eyebrow text-accent border border-accent/20 px-2 py-1"
                      >
                        + Add Capability
                      </button>
                    </div>

                    <div className="space-y-2">
                      {editingService.capabilities.map((c, idx) => (
                        <div key={idx} className="flex gap-4 items-center">
                          <input
                            type="text"
                            required
                            value={c}
                            onChange={(e) => {
                              const capabilities = [...editingService.capabilities];
                              capabilities[idx] = e.target.value;
                              setEditingService({ ...editingService, capabilities });
                            }}
                            className="flex-1 border-b border-base-line bg-transparent py-1 text-sm text-ink focus:border-accent focus:outline-none"
                            placeholder="e.g. Scriptwriting"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const capabilities = [...editingService.capabilities];
                              capabilities.splice(idx, 1);
                              setEditingService({ ...editingService, capabilities });
                            }}
                            className="text-xs text-red-400 hover:text-red-500"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-base-line flex gap-4">
                    <button
                      type="submit"
                      className="border border-accent px-6 py-2.5 text-xs eyebrow text-accent hover:bg-accent/10"
                    >
                      Save Service
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingService(null)}
                      className="border border-ink/20 px-6 py-2.5 text-xs eyebrow text-ink-muted hover:border-ink/40"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* 4. CLIENTS TAB */}
        {activeTab === "clients" && (
          <div className="space-y-12">
            <div>
              <h2 className="font-serif text-2xl text-ink mb-6">Client Logos &amp; Partner List</h2>
              <p className="text-sm text-ink-muted mb-8 max-w-prose">
                Manage references, studios, and agency partner lists shown on the "Clients" page.
              </p>
            </div>

            {/* Clients List */}
            <div className="border border-base-line p-6 bg-base-elevated/15">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-serif text-xl text-ink">Brands &amp; Networks</h3>
                <button
                  onClick={() => {
                    const newList = [...clients, { name: "", src: "", url: "" }];
                    setClients(newList);
                  }}
                  className="text-xs eyebrow border border-accent/20 px-2 py-1 text-accent"
                >
                  + Add Client
                </button>
              </div>

              <div className="space-y-4">
                {clients.map((c, idx) => (
                  <div key={idx} className="flex gap-4 items-center">
                    <input
                      type="text"
                      placeholder="Brand Name (e.g. Isha Foundation)"
                      required
                      value={c.name}
                      onChange={(e) => {
                        const newList = [...clients];
                        newList[idx] = { ...newList[idx], name: e.target.value };
                        setClients(newList);
                      }}
                      className="flex-1 border-b border-base-line bg-transparent py-1 text-sm text-ink focus:border-accent focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Logo Path (SVG/PNG, e.g. /logos/isha.svg)"
                      value={c.src || ""}
                      onChange={(e) => {
                        const newList = [...clients];
                        newList[idx] = { ...newList[idx], src: e.target.value };
                        setClients(newList);
                      }}
                      className="flex-1 border-b border-base-line bg-transparent py-1 text-sm text-ink focus:border-accent focus:outline-none"
                    />
                    <button
                      onClick={() => {
                        const newList = [...clients];
                        newList.splice(idx, 1);
                        setClients(newList);
                      }}
                      className="text-xs text-red-400 hover:text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Production houses */}
            <div className="border border-base-line p-6 bg-base-elevated/15">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-serif text-xl text-ink">Studios &amp; Production Collaborations</h3>
                <button
                  onClick={() => {
                    const newList = [...agencies, { name: "", src: "", url: "" }];
                    setAgencies(newList);
                  }}
                  className="text-xs eyebrow border border-accent/20 px-2 py-1 text-accent"
                >
                  + Add Studio
                </button>
              </div>

              <div className="space-y-4">
                {agencies.map((a, idx) => (
                  <div key={idx} className="flex gap-4 items-center">
                    <input
                      type="text"
                      placeholder="Studio Name (e.g. Banijay Asia)"
                      required
                      value={a.name}
                      onChange={(e) => {
                        const newList = [...agencies];
                        newList[idx] = { ...newList[idx], name: e.target.value };
                        setAgencies(newList);
                      }}
                      className="flex-1 border-b border-base-line bg-transparent py-1 text-sm text-ink focus:border-accent focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Logo Path (SVG/PNG, e.g. /logos/banijay.svg)"
                      value={a.src || ""}
                      onChange={(e) => {
                        const newList = [...agencies];
                        newList[idx] = { ...newList[idx], src: e.target.value };
                        setAgencies(newList);
                      }}
                      className="flex-1 border-b border-base-line bg-transparent py-1 text-sm text-ink focus:border-accent focus:outline-none"
                    />
                    <button
                      onClick={() => {
                        const newList = [...agencies];
                        newList.splice(idx, 1);
                        setAgencies(newList);
                      }}
                      className="text-xs text-red-400 hover:text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Homepage Wall */}
            <div className="border border-base-line p-6 bg-base-elevated/15">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-serif text-xl text-ink">Homepage Strip Logos</h3>
                <button
                  onClick={() => {
                    const newList = [...homepageLogos, { name: "", src: "", url: "" }];
                    setHomepageLogos(newList);
                  }}
                  className="text-xs eyebrow border border-accent/20 px-2 py-1 text-accent"
                >
                  + Add Homepage Logo
                </button>
              </div>

              <div className="space-y-4">
                {homepageLogos.map((h, idx) => (
                  <div key={idx} className="flex gap-4 items-center">
                    <input
                      type="text"
                      placeholder="Logo Name (e.g. MTV)"
                      required
                      value={h.name}
                      onChange={(e) => {
                        const newList = [...homepageLogos];
                        newList[idx] = { ...newList[idx], name: e.target.value };
                        setHomepageLogos(newList);
                      }}
                      className="flex-1 border-b border-base-line bg-transparent py-1 text-sm text-ink focus:border-accent focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Logo Path (optional)"
                      value={h.src || ""}
                      onChange={(e) => {
                        const newList = [...homepageLogos];
                        newList[idx] = { ...newList[idx], src: e.target.value };
                        setHomepageLogos(newList);
                      }}
                      className="flex-1 border-b border-base-line bg-transparent py-1 text-sm text-ink focus:border-accent focus:outline-none"
                    />
                    <button
                      onClick={() => {
                        const newList = [...homepageLogos];
                        newList.splice(idx, 1);
                        setHomepageLogos(newList);
                      }}
                      className="text-xs text-red-400 hover:text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={async () => {
                try {
                  await saveClientsAndAgencies({ clients, agencies, homepageLogos });
                  setSuccess("Clients and partner logos updated successfully!");
                  await loadAllData();
                } catch (err: any) {
                  setError("Failed to save: " + err.message);
                }
              }}
              className="border border-accent px-6 py-3 text-xs eyebrow text-accent hover:bg-accent/10"
            >
              Save All Client Logs
            </button>
          </div>
        )}

        {/* 5. ABOUT TAB */}
        {activeTab === "about" && aboutData && (
          <div className="space-y-12">
            <div>
              <h2 className="font-serif text-2xl text-ink mb-6">About Studio Content</h2>
              <p className="text-sm text-ink-muted mb-8 max-w-prose">
                Edit the profile details, experience milestones, software tools, and statistics shown on the "About" page.
              </p>
            </div>

            {/* Founder details */}
            <div className="border border-base-line p-6 bg-base-elevated/15">
              <h3 className="font-serif text-xl text-ink mb-6">Founder Bio Profile</h3>
              <div className="space-y-6">
                <div>
                  <label className="eyebrow block mb-1">Founder Name</label>
                  <input
                    type="text"
                    required
                    value={aboutData.founder?.name || ""}
                    onChange={(e) => {
                      setAboutData({
                        ...aboutData,
                        founder: { ...aboutData.founder, name: e.target.value },
                      });
                    }}
                    className="w-full border-b border-base-line bg-transparent py-2 text-ink focus:border-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label className="eyebrow block mb-1">Founder Role</label>
                  <input
                    type="text"
                    required
                    value={aboutData.founder?.role || ""}
                    onChange={(e) => {
                      setAboutData({
                        ...aboutData,
                        founder: { ...aboutData.founder, role: e.target.value },
                      });
                    }}
                    className="w-full border-b border-base-line bg-transparent py-2 text-ink focus:border-accent focus:outline-none"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="eyebrow block">Bio Paragraphs</label>
                    <button
                      type="button"
                      onClick={() => {
                        const bio = [...(aboutData.founder?.bio || [])];
                        bio.push("");
                        setAboutData({
                          ...aboutData,
                          founder: { ...aboutData.founder, bio },
                        });
                      }}
                      className="text-xs eyebrow border border-accent/20 px-2 py-1 text-accent"
                    >
                      + Add Paragraph
                    </button>
                  </div>

                  <div className="space-y-4">
                    {aboutData.founder?.bio?.map((p: string, idx: number) => (
                      <div key={idx} className="flex gap-4 items-start">
                        <textarea
                          rows={3}
                          value={p}
                          onChange={(e) => {
                            const bio = [...(aboutData.founder?.bio || [])];
                            bio[idx] = e.target.value;
                            setAboutData({
                              ...aboutData,
                              founder: { ...aboutData.founder, bio },
                            });
                          }}
                          className="flex-1 border border-base-line bg-transparent p-2 text-sm text-ink focus:border-accent focus:outline-none resize-none"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const bio = [...(aboutData.founder?.bio || [])];
                            bio.splice(idx, 1);
                            setAboutData({
                              ...aboutData,
                              founder: { ...aboutData.founder, bio },
                            });
                          }}
                          className="text-xs text-red-400 hover:text-red-500 mt-2"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Experience Timeline */}
            <div className="border border-base-line p-6 bg-base-elevated/15">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-serif text-xl text-ink">Selected Experience Milestones</h3>
                <button
                  onClick={() => {
                    const experience = [...(aboutData.experience || [])];
                    experience.push({ period: "", org: "", role: "", detail: "" });
                    setAboutData({ ...aboutData, experience });
                  }}
                  className="text-xs eyebrow border border-accent/20 px-2 py-1 text-accent"
                >
                  + Add Experience Item
                </button>
              </div>

              <div className="space-y-6">
                {aboutData.experience?.map((exp: any, idx: number) => (
                  <div key={idx} className="border border-base-line/50 p-4 relative space-y-4">
                    <button
                      type="button"
                      onClick={() => {
                        const experience = [...(aboutData.experience || [])];
                        experience.splice(idx, 1);
                        setAboutData({ ...aboutData, experience });
                      }}
                      className="absolute top-4 right-4 text-xs text-red-400 hover:text-red-500"
                    >
                      Delete Milestone
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="eyebrow block text-[10px] mb-1">Period (e.g. "2022 — Present")</label>
                        <input
                          type="text"
                          required
                          value={exp.period}
                          onChange={(e) => {
                            const experience = [...(aboutData.experience || [])];
                            experience[idx] = { ...experience[idx], period: e.target.value };
                            setAboutData({ ...aboutData, experience });
                          }}
                          className="w-full border-b border-base-line bg-transparent py-1 text-sm text-ink focus:border-accent focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="eyebrow block text-[10px] mb-1">Organization / Studio</label>
                        <input
                          type="text"
                          required
                          value={exp.org}
                          onChange={(e) => {
                            const experience = [...(aboutData.experience || [])];
                            experience[idx] = { ...experience[idx], org: e.target.value };
                            setAboutData({ ...aboutData, experience });
                          }}
                          className="w-full border-b border-base-line bg-transparent py-1 text-sm text-ink focus:border-accent focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="eyebrow block text-[10px] mb-1">Role / Job Title</label>
                        <input
                          type="text"
                          required
                          value={exp.role}
                          onChange={(e) => {
                            const experience = [...(aboutData.experience || [])];
                            experience[idx] = { ...experience[idx], role: e.target.value };
                            setAboutData({ ...aboutData, experience });
                          }}
                          className="w-full border-b border-base-line bg-transparent py-1 text-sm text-ink focus:border-accent focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="eyebrow block text-[10px] mb-1">Project details &amp; achievements</label>
                      <input
                        type="text"
                        required
                        value={exp.detail}
                        onChange={(e) => {
                          const experience = [...(aboutData.experience || [])];
                          experience[idx] = { ...experience[idx], detail: e.target.value };
                          setAboutData({ ...aboutData, experience });
                        }}
                        className="w-full border-b border-base-line bg-transparent py-1 text-sm text-ink focus:border-accent focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Statistics */}
            <div className="border border-base-line p-6 bg-base-elevated/15">
              <h3 className="font-serif text-xl text-ink mb-6">Homepage &amp; Profile Stats (exactly 4 recommended)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {aboutData.aboutStats?.map((s: any, idx: number) => (
                  <div key={idx} className="border border-base-line/50 p-4 space-y-4">
                    <span className="text-xs eyebrow text-ink-faint">Stat #{idx + 1}</span>
                    <div>
                      <label className="eyebrow block text-[10px] mb-1">Numeric Value (e.g. "12+")</label>
                      <input
                        type="text"
                        required
                        value={s.value}
                        onChange={(e) => {
                          const aboutStats = [...(aboutData.aboutStats || [])];
                          aboutStats[idx] = { ...aboutStats[idx], value: e.target.value };
                          setAboutData({ ...aboutData, aboutStats });
                        }}
                        className="w-full border-b border-base-line bg-transparent py-1 text-sm text-ink focus:border-accent focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="eyebrow block text-[10px] mb-1">Label description</label>
                      <input
                        type="text"
                        required
                        value={s.label}
                        onChange={(e) => {
                          const aboutStats = [...(aboutData.aboutStats || [])];
                          aboutStats[idx] = { ...aboutStats[idx], label: e.target.value };
                          setAboutData({ ...aboutData, aboutStats });
                        }}
                        className="w-full border-b border-base-line bg-transparent py-1 text-sm text-ink focus:border-accent focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Software Toolkit & Languages */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-base-line p-6 bg-base-elevated/15">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-serif text-xl text-ink">Software Toolkit</h3>
                  <button
                    onClick={() => {
                      const tools = [...(aboutData.tools || [])];
                      tools.push("");
                      setAboutData({ ...aboutData, tools });
                    }}
                    className="text-xs eyebrow border border-accent/20 px-2 py-1 text-accent"
                  >
                    + Add Tool
                  </button>
                </div>

                <div className="space-y-3">
                  {aboutData.tools?.map((t: string, idx: number) => (
                    <div key={idx} className="flex gap-4 items-center">
                      <input
                        type="text"
                        value={t}
                        onChange={(e) => {
                          const tools = [...(aboutData.tools || [])];
                          tools[idx] = e.target.value;
                          setAboutData({ ...aboutData, tools });
                        }}
                        className="flex-1 border-b border-base-line bg-transparent py-1 text-sm text-ink focus:border-accent"
                      />
                      <button
                        onClick={() => {
                          const tools = [...(aboutData.tools || [])];
                          tools.splice(idx, 1);
                          setAboutData({ ...aboutData, tools });
                        }}
                        className="text-xs text-red-400 hover:text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-base-line p-6 bg-base-elevated/15">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-serif text-xl text-ink">Languages Spoken</h3>
                  <button
                    onClick={() => {
                      const languages = [...(aboutData.languages || [])];
                      languages.push("");
                      setAboutData({ ...aboutData, languages });
                    }}
                    className="text-xs eyebrow border border-accent/20 px-2 py-1 text-accent"
                  >
                    + Add Language
                  </button>
                </div>

                <div className="space-y-3">
                  {aboutData.languages?.map((l: string, idx: number) => (
                    <div key={idx} className="flex gap-4 items-center">
                      <input
                        type="text"
                        value={l}
                        onChange={(e) => {
                          const languages = [...(aboutData.languages || [])];
                          languages[idx] = e.target.value;
                          setAboutData({ ...aboutData, languages });
                        }}
                        className="flex-1 border-b border-base-line bg-transparent py-1 text-sm text-ink focus:border-accent"
                      />
                      <button
                        onClick={() => {
                          const languages = [...(aboutData.languages || [])];
                          languages.splice(idx, 1);
                          setAboutData({ ...aboutData, languages });
                        }}
                        className="text-xs text-red-400 hover:text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={async () => {
                try {
                  await saveAboutContent(aboutData);
                  setSuccess("About page content saved successfully!");
                  await loadAllData();
                } catch (err: any) {
                  setError("Failed to save: " + err.message);
                }
              }}
              className="border border-accent px-6 py-3 text-xs eyebrow text-accent hover:bg-accent/10"
            >
              Save About Page Details
            </button>
          </div>
        )}

        {/* 6. INQUIRIES TAB */}
        {activeTab === "inquiries" && (
          <div className="space-y-6">
            <h2 className="font-serif text-2xl text-ink mb-6">Client form inquiries ({inquiries.length})</h2>

            {inquiries.length === 0 ? (
              <p className="text-sm text-ink-muted">No inquiries received yet.</p>
            ) : (
              <div className="space-y-6">
                {inquiries.map((inq) => {
                  const dateStr = inq.createdAt?.seconds
                    ? new Date(inq.createdAt.seconds * 1000).toLocaleString()
                    : new Date(inq.createdAt).toLocaleString();
                  return (
                    <div key={inq.id} className="border border-base-line bg-base-elevated/25 p-6 space-y-4">
                      <div className="flex flex-wrap justify-between items-start border-b border-base-line/60 pb-3 gap-2">
                        <div>
                          <h4 className="font-serif text-xl text-ink">{inq.name}</h4>
                          <p className="text-xs text-accent mt-0.5">
                            {inq.company ? `${inq.company} · ` : ""}
                            <a href={`mailto:${inq.email}`} className="hover:underline">
                              {inq.email}
                            </a>
                          </p>
                        </div>
                        <span className="text-xs eyebrow text-ink-faint">{dateStr}</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans">
                        <div>
                          <span className="eyebrow text-ink-faint block">Project Type</span>
                          <span className="text-ink mt-0.5 block">{inq.projectType}</span>
                        </div>
                        <div>
                          <span className="eyebrow text-ink-faint block">Budget Range</span>
                          <span className="text-ink mt-0.5 block">{inq.budget || "—"}</span>
                        </div>
                        <div>
                          <span className="eyebrow text-ink-faint block">Heard Via</span>
                          <span className="text-ink mt-0.5 block">{inq.referral || "—"}</span>
                        </div>
                      </div>

                      <div className="border-t border-base-line/40 pt-4">
                        <span className="eyebrow text-ink-faint block mb-2">Message Brief</span>
                        <p className="text-sm text-ink-muted whitespace-pre-wrap leading-relaxed">{inq.message}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* 7. SYSTEM SETTINGS TAB */}
        {activeTab === "system" && (
          <div className="space-y-12">
            <div>
              <h2 className="font-serif text-2xl text-ink mb-4">System Settings &amp; Utility Commands</h2>
              <p className="text-sm text-ink-muted max-w-prose">
                Perform administrative checks, rebuild data seeds, or rotate the shared password.
              </p>
            </div>

            {/* Change Password */}
            <div className="border border-base-line p-6 bg-base-elevated/15 max-w-md">
              <h3 className="font-serif text-xl text-ink mb-6">Change Shared Admin Password</h3>
              <form onSubmit={handlePasswordChange} className="space-y-6">
                <div>
                  <label htmlFor="newpass" className="eyebrow block mb-2">New Password</label>
                  <input
                    id="newpass"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full border-b border-base-line bg-transparent py-2 text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="border border-accent px-4 py-2 text-xs eyebrow text-accent hover:bg-accent/10 transition-colors"
                >
                  Change Password
                </button>
              </form>
            </div>

            {/* Seeding */}
            <div className="border border-base-line p-6 bg-base-elevated/15 max-w-2xl">
              <h3 className="font-serif text-xl text-ink mb-2">Seed default data</h3>
              <p className="text-sm text-ink-muted mb-6">
                Initialize or reset all database entries in Firestore. This reads the local seed data in
                the code files (`src/data/*.ts`) and imports them into your Firestore collection documents.
              </p>
              <button
                onClick={handleSeed}
                className="border border-red-400 px-5 py-2.5 text-xs eyebrow text-red-400 hover:bg-red-400/10 transition-colors"
              >
                Seed default database
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
