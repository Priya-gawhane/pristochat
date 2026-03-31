"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";
import { useRouter } from "next/navigation";

interface UserProfile {
  name: string;
  email: string;
  bio: string;
  joined_at: string | null;
  stats: {
    total_conversations: number;
    total_messages: number;
  };
}

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: "", bio: "" });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/auth/me");
        setProfile(res.data);
        setForm({ name: res.data.name, bio: res.data.bio });
      } catch {
        router.push("/auth/login");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [router]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await API.patch("/auth/me", form);
      setProfile((p) => p ? { ...p, ...form } : p);
      setEditing(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      // silently fail
    } finally {
      setSaving(false);
    }
  };

  const initials = profile?.name
    ? profile.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "??";

  const joinedDate = profile?.joined_at
    ? new Date(profile.joined_at).toLocaleDateString("en-US", {
        year: "numeric", month: "long", day: "numeric",
      })
    : "Unknown";

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#131315]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-primary-container border-t-transparent animate-spin" />
          <p className="text-on-surface-variant text-sm font-label uppercase tracking-widest">Loading profile…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#131315] text-on-surface font-body overflow-y-auto pt-16 pb-24 px-4 md:px-12">
      {/* Decorative glow */}
      <div className="fixed top-0 right-0 w-[600px] h-[400px] bg-primary-container/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[400px] bg-secondary-container/8 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative max-w-3xl mx-auto z-10">

        {/* Header */}
        <div className="mb-12">
          <p className="text-[10px] font-headline uppercase tracking-[0.3em] text-outline-variant mb-1">Account</p>
          <h1 className="text-3xl md:text-4xl font-headline font-bold tracking-tight text-white">
            Your Profile
          </h1>
        </div>

        {/* Avatar + Identity card */}
        <div className="relative rounded-3xl border border-outline-variant/10 bg-surface-container-low/50 backdrop-blur-sm p-8 mb-6 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-linear-to-r from-primary-container via-secondary-container to-transparent opacity-80" />

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-24 h-24 rounded-2xl bg-linear-to-br from-primary-container to-secondary-container flex items-center justify-center shadow-[0_0_40px_rgba(79,70,229,0.4)] text-3xl font-headline font-bold text-white select-none">
                {initials}
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-[#131315] shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
            </div>

            {/* Identity */}
            <div className="flex-1 min-w-0">
              {editing ? (
                <input
                  className="w-full bg-surface-container rounded-xl px-4 py-2 text-xl font-headline font-bold text-white border border-outline-variant/30 focus:outline-none focus:border-primary-container/60 mb-2"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Display name"
                />
              ) : (
                <h2 className="text-2xl md:text-3xl font-headline font-bold text-white truncate mb-1">
                  {profile?.name || "Unnamed User"}
                </h2>
              )}
              <p className="text-on-surface-variant text-sm mb-3">{profile?.email}</p>

              {editing ? (
                <textarea
                  className="w-full bg-surface-container rounded-xl px-4 py-3 text-sm text-on-surface-variant border border-outline-variant/30 focus:outline-none focus:border-primary-container/60 resize-none min-h-[72px]"
                  value={form.bio}
                  onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
                  placeholder="Write a short bio…"
                  maxLength={200}
                />
              ) : (
                <p className="text-sm text-on-surface-variant italic">
                  {profile?.bio || (
                    <span className="opacity-40">No bio yet — click Edit to add one.</span>
                  )}
                </p>
              )}
            </div>

            {/* Edit / Save controls */}
            <div className="flex gap-2 shrink-0">
              {editing ? (
                <>
                  <button
                    onClick={() => { setEditing(false); setForm({ name: profile?.name ?? "", bio: profile?.bio ?? "" }); }}
                    className="px-4 py-2 rounded-xl border border-outline-variant/30 text-on-surface-variant hover:text-white hover:border-outline-variant/60 transition-all text-sm font-headline"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-5 py-2 rounded-xl bg-linear-to-r from-primary-container to-secondary-container text-white font-headline font-bold text-sm shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-primary-container/50 transition-all disabled:opacity-60 flex items-center gap-2"
                  >
                    {saving ? (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                    )}
                    Save
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  className="px-5 py-2 rounded-xl border border-outline-variant/20 hover:border-primary-container/40 hover:bg-primary-container/10 text-on-surface-variant hover:text-white transition-all text-sm font-headline flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px]">edit</span>
                  Edit
                </button>
              )}
            </div>
          </div>

          {/* Saved confirmation */}
          {saved && (
            <div className="mt-4 flex items-center gap-2 text-emerald-400 text-sm font-label animate-fade-in">
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              Profile saved successfully
            </div>
          )}
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {[
            {
              icon: "forum",
              label: "Conversations",
              value: profile?.stats.total_conversations ?? 0,
              color: "from-indigo-500/20 to-violet-500/10",
              glow: "rgba(99,102,241,0.2)",
            },
            {
              icon: "chat_bubble",
              label: "Messages Sent",
              value: profile?.stats.total_messages ?? 0,
              color: "from-fuchsia-500/20 to-purple-500/10",
              glow: "rgba(168,85,247,0.2)",
            },
            {
              icon: "calendar_today",
              label: "Member Since",
              value: joinedDate,
              color: "from-sky-500/20 to-blue-500/10",
              glow: "rgba(14,165,233,0.2)",
              small: true,
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`rounded-2xl p-6 bg-linear-to-br ${stat.color} border border-outline-variant/10 backdrop-blur-sm flex flex-col gap-3`}
              style={{ boxShadow: `0 0 30px ${stat.glow}` }}
            >
              <span
                className="material-symbols-outlined text-2xl text-on-surface-variant"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {stat.icon}
              </span>
              <div>
                <p className={`font-headline font-bold text-white ${stat.small ? "text-base" : "text-3xl"}`}>
                  {stat.value}
                </p>
                <p className="text-[10px] uppercase tracking-widest text-outline-variant font-label mt-0.5">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Danger zone */}
        <div className="rounded-3xl border border-red-500/10 bg-red-500/5 p-6">
          <h3 className="font-headline font-bold text-red-400/80 text-sm uppercase tracking-widest mb-4">Danger Zone</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-on-surface-variant">Sign out of this account</p>
              <p className="text-xs text-outline-variant mt-0.5">Your session cookie will be destroyed.</p>
            </div>
            <a
              href="/logout"
              className="px-5 py-2 rounded-xl border border-red-500/30 text-red-400/80 hover:bg-red-500/10 hover:border-red-500/60 transition-all text-sm font-headline font-bold flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[16px]">logout</span>
              Logout
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}