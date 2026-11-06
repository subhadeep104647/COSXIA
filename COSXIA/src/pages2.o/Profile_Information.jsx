import React, { useEffect, useState } from "react";
import {
  UserRound,
  MapPin,
  Building2,
  Globe,
  Link2,
  NotebookPen,
  BriefcaseBusiness,
  Settings,
  ChevronRight,
  Save,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";

const Profile_Information = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [pronouns, setPronouns] = useState("Don't Specify");
  const [location, setLocation] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [url1, setUrl1] = useState("");
  const [url2, setUrl2] = useState("");
  const [url3, setUrl3] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const profile = JSON.parse(
        localStorage.getItem("nova-profile") || "{}"
      );

      setFullName(profile.fullName || "");
      setUsername(profile.username || "");
      setBio(profile.bio || "");
      setPronouns(profile.pronouns || "Don't Specify");
      setLocation(profile.location || "");
      setCompany(profile.company || "");
      setWebsite(profile.website || "");
      setUrl1(profile.url1 || "");
      setUrl2(profile.url2 || "");
      setUrl3(profile.url3 || "");
    } catch (error) {
      console.error("Failed to load profile information:", error);
    }
  }, []);

  const handleSave = () => {
    try {
      const existingProfile = JSON.parse(
        localStorage.getItem("nova-profile") || "{}"
      );

      const updatedProfile = {
        ...existingProfile,
        fullName,
        username,
        bio,
        pronouns,
        location,
        company,
        website,
        url1,
        url2,
        url3,
      };

      localStorage.setItem(
        "nova-profile",
        JSON.stringify(updatedProfile)
      );

      window.dispatchEvent(
        new CustomEvent("nova:profile-updated", {
          detail: updatedProfile,
        })
      );

      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (error) {
      console.error("Failed to save profile information:", error);
    }
  };

  const inputClass =
    "w-full rounded-md border border-[#d1d9e0] bg-white px-3 py-2 text-sm text-[#1f2328] outline-none transition focus:border-[#0969da] focus:ring-[3px] focus:ring-[#0969da]/15 placeholder:text-[#9198a1]";

  const labelClass =
    "mb-2 block text-sm font-semibold text-[#1f2328]";

  const sectionClass =
    "border-b border-[#d1d9e0] py-7 last:border-b-0";

  return (
    <div className="min-h-screen w-full bg-white text-[#1f2328]">

      {/* HEADER */}
      <header className="border-b border-[#d1d9e0] bg-[#f6f8fa]">
        <div className="mx-auto max-w-[1280px] px-5 py-6 sm:px-8">
          <div className="flex items-center gap-2 text-xs text-[#59636e]">
            <Settings size={15} />
            <span>Settings</span>
            <ChevronRight size={13} />
            <span className="font-medium text-[#1f2328]">
              Profile information
            </span>
          </div>

          <h1 className="mt-3 text-2xl font-semibold tracking-tight">
            Profile information
          </h1>

          <p className="mt-1 text-sm text-[#59636e]">
            Customize how you appear to other people on NOVA.
          </p>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[230px_minmax(0,1fr)]">

        {/* SIDEBAR */}
        <aside className="space-y-1">
          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-[#818b98]">
            Personal settings
          </p>

          <Link
            to="/Edit_Profile"
            className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-[#59636e] transition hover:bg-[#f6f8fa] hover:text-[#1f2328]"
          >
            <UserRound size={17} />
            Public profile
          </Link>

          <Link
            to="/Account"
            className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-[#59636e] transition hover:bg-[#f6f8fa] hover:text-[#1f2328]"
          >
            <Settings size={17} />
            Account
          </Link>

          <div className="flex items-center gap-3 rounded-md border-l-2 border-[#0969da] bg-[#ddf4ff] px-3 py-2.5 text-sm font-semibold text-[#0969da]">
            <UserRound size={17} />
            Profile information
          </div>

          <div className="my-4 border-t border-[#d1d9e0]" />

          <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-[#818b98]">
            NOVA
          </p>

          <Link
            to="/Profile"
            className="mt-2 flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-[#59636e] transition hover:bg-[#f6f8fa]"
          >
            <UserRound size={17} />
            View profile
          </Link>
        </aside>

        {/* MAIN */}
        <main className="min-w-0">

          <div className="mb-7">
            <h2 className="text-xl font-semibold">
              Public profile details
            </h2>
            <p className="mt-1 text-sm text-[#59636e]">
              Add information to help people know more about you.
            </p>
          </div>

          {/* PROFILE PREVIEW */}
          <section className="mb-7 overflow-hidden rounded-lg border border-[#d1d9e0]">

            <div className="h-20 bg-gradient-to-r from-[#dbeafe] via-[#e9e5ff] to-[#cffafe]" />

            <div className="px-5 pb-5">
              <div className="-mt-8 flex items-end gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-[#f6f8fa] shadow-sm">
                  <UserRound size={28} className="text-[#59636e]" />
                </div>

                <div className="min-w-0 pb-1">
                  <p className="truncate text-base font-semibold">
                    {fullName || username || "Your Name"}
                  </p>
                  <p className="truncate text-sm text-[#59636e]">
                    {username ? `@${username}` : "@username"}
                  </p>
                </div>
              </div>

              <p className="mt-4 max-w-xl whitespace-pre-wrap text-sm text-[#59636e]">
                {bio || "Your bio will appear here."}
              </p>

              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-[#59636e]">
                {location && (
                  <span className="flex items-center gap-1">
                    <MapPin size={13} />
                    {location}
                  </span>
                )}

                {company && (
                  <span className="flex items-center gap-1">
                    <Building2 size={13} />
                    {company}
                  </span>
                )}

                {website && (
                  <a
                    href={website}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-[#0969da] hover:underline"
                  >
                    <Globe size={13} />
                    Website
                    <ExternalLink size={11} />
                  </a>
                )}
              </div>
            </div>
          </section>

          {/* BASIC INFORMATION */}
          <section className={sectionClass}>
            <div className="mb-5">
              <h3 className="text-base font-semibold">
                Basic information
              </h3>
              <p className="mt-1 text-sm text-[#59636e]">
                Your name and personal introduction.
              </p>
            </div>

            <div className="grid max-w-2xl grid-cols-1 gap-5">

              <div>
                <label className={labelClass}>
                  Full name
                </label>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Username
                </label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Bio
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Write a short introduction about yourself..."
                  rows={4}
                  className={`${inputClass} resize-y`}
                />
                <p className="mt-1.5 text-xs text-[#59636e]">
                  Share your interests, skills or what you are working on.
                </p>
              </div>

              <div>
                <label className={labelClass}>
                  Pronouns
                </label>
                <select
                  value={pronouns}
                  onChange={(e) => setPronouns(e.target.value)}
                  className={`${inputClass} max-w-sm cursor-pointer`}
                >
                  <option>Don't Specify</option>
                  <option>They/Them</option>
                  <option>She/Her</option>
                  <option>He/Him</option>
                  <option>Custom</option>
                </select>
              </div>
            </div>
          </section>

          {/* PROFESSIONAL INFORMATION */}
          <section className={sectionClass}>
            <div className="mb-5">
              <h3 className="text-base font-semibold">
                Professional information
              </h3>
              <p className="mt-1 text-sm text-[#59636e]">
                Let others know where you are based and what you do.
              </p>
            </div>

            <div className="grid max-w-2xl grid-cols-1 gap-5">

              <div>
                <label className={labelClass}>
                  <span className="flex items-center gap-2">
                    <MapPin size={15} />
                    Location
                  </span>
                </label>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City, Country"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  <span className="flex items-center gap-2">
                    <BriefcaseBusiness size={15} />
                    Company / Organization
                  </span>
                </label>
                <input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Your college or organization"
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          {/* WEBSITE */}
          <section className={sectionClass}>
            <div className="mb-5">
              <h3 className="flex items-center gap-2 text-base font-semibold">
                <Globe size={18} className="text-[#59636e]" />
                Website
              </h3>
              <p className="mt-1 text-sm text-[#59636e]">
                Share your portfolio or personal website.
              </p>
            </div>

            <div className="max-w-2xl">
              <label className={labelClass}>
                Website URL
              </label>
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://yourwebsite.com"
                className={inputClass}
              />
            </div>
          </section>

          {/* SOCIAL LINKS */}
          <section className={sectionClass}>
            <div className="mb-5">
              <h3 className="flex items-center gap-2 text-base font-semibold">
                <Link2 size={18} className="text-[#59636e]" />
                Social links
              </h3>
              <p className="mt-1 text-sm text-[#59636e]">
                Connect your other online profiles.
              </p>
            </div>

            <div className="grid max-w-2xl grid-cols-1 gap-5">

              <div>
                <label className={labelClass}>Social URL 1</label>
                <input
                  type="url"
                  value={url1}
                  onChange={(e) => setUrl1(e.target.value)}
                  placeholder="https://github.com/username"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Social URL 2</label>
                <input
                  type="url"
                  value={url2}
                  onChange={(e) => setUrl2(e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Social URL 3</label>
                <input
                  type="url"
                  value={url3}
                  onChange={(e) => setUrl3(e.target.value)}
                  placeholder="https://instagram.com/username"
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          {/* SAVE */}
          <div className="flex flex-col-reverse items-start justify-between gap-4 py-6 sm:flex-row sm:items-center">
            <p className="text-xs text-[#59636e]">
              Your public profile will reflect these changes.
            </p>

            <div className="flex gap-2">
              <Link
                to="/Profile"
                className="rounded-md border border-[#d1d9e0] bg-[#f6f8fa] px-4 py-2 text-sm font-medium shadow-sm transition hover:bg-[#eef1f4]"
              >
                Cancel
              </Link>

              <button
                type="button"
                onClick={handleSave}
                className="inline-flex items-center gap-2 rounded-md border border-[#1f883d] bg-[#1f883d] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1a7f37]"
              >
                {saved ? <CheckCircle2 size={16} /> : <Save size={16} />}
                {saved ? "Changes saved" : "Save changes"}
              </button>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default Profile_Information;