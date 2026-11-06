import React, { useEffect, useRef, useState } from "react";
import {
  NotebookPen,
  UserRoundPen,
  Link2,
  UserRound,
  Camera,
  Settings,
  BookUser,
} from "lucide-react";
import { Link } from "react-router-dom";

const Edit_Profile = () => {
  const [image, setImage] = useState("/User.jpeg");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [pronouns, setPronouns] = useState("Don't Specify");

  const [url1, setUrl1] = useState("");
  const [url2, setUrl2] = useState("");
  const [url3, setUrl3] = useState("");

  const fileInputRef = useRef(null);

  useEffect(() => {
    const savedProfile = localStorage.getItem("nova-profile");

    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);

        setUsername(profile.username || "");
        setEmail(profile.email || "");
        setBio(profile.bio || "");
        setPronouns(profile.pronouns || "Don't Specify");
        setUrl1(profile.url1 || "");
        setUrl2(profile.url2 || "");
        setUrl3(profile.url3 || "");
        setImage(profile.image || "/User.jpeg");
      } catch (error) {
        console.error("Failed to load profile:", error);
      }
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (image?.startsWith("blob:")) {
      URL.revokeObjectURL(image);
    }

    setImage(URL.createObjectURL(file));
  };

  const handleRemove = () => {
    if (image?.startsWith("blob:")) {
      URL.revokeObjectURL(image);
    }

    setImage("/User.jpeg");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSave = () => {
    const profileData = {
      username,
      email,
      bio,
      pronouns,
      url1,
      url2,
      url3,
      image,
    };

    localStorage.setItem("nova-profile", JSON.stringify(profileData));

    window.dispatchEvent(
      new CustomEvent("nova:profile-updated", {
        detail: profileData,
      })
    );
  };

  const inputClass =
    "w-full rounded-md border border-[#d1d9e0] bg-white px-3 py-[7px] text-sm text-[#1f2328] shadow-sm outline-none transition focus:border-[#0969da] focus:ring-[3px] focus:ring-[#0969da]/15 placeholder:text-[#9198a1]";

  const labelClass =
    "mb-2 block text-sm font-semibold text-[#1f2328]";

  return (
    <div className="min-h-screen w-full bg-white text-[#1f2328]">

      {/* PAGE HEADER */}
      <div className="border-b border-[#d1d9e0] bg-[#f6f8fa]">
        <div className="mx-auto max-w-[1280px] px-5 py-6 sm:px-8">
          <div className="flex items-center gap-2 text-sm text-[#59636e]">
            <Settings size={16} />
            <span>Settings</span>
            <span>/</span>
            <span className="font-semibold text-[#1f2328]">
              Public profile
            </span>
          </div>

          <h1 className="mt-3 text-2xl font-semibold tracking-tight">
            Profile settings
          </h1>

          <p className="mt-1 text-sm text-[#59636e]">
            Manage your public profile information.
          </p>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[230px_minmax(0,1fr)]">

        {/* LEFT SETTINGS SIDEBAR */}
        <aside className="space-y-1">

          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wide text-[#59636e]">
            Personal settings
          </p>

          <div className="flex items-center gap-3 rounded-md border-l-2 border-[#0969da] bg-[#ddf4ff] px-3 py-2.5 text-sm font-semibold text-[#0969da]">
            <UserRound size={17} />
            Public profile
          </div>

          <div className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-[#59636e]">
            <Settings size={17} />
            Account
          </div>

          <div className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-[#59636e]">
            <BookUser size={17} />
            Profile information
          </div>

          <div className="my-4 border-t border-[#d1d9e0]" />

          <p className="px-3 text-xs font-semibold uppercase tracking-wide text-[#59636e]">
            NOVA
          </p>

          <Link
            to="/Profile"
            className="mt-2 flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-[#59636e] transition hover:bg-[#f6f8fa] hover:text-[#1f2328]"
          >
            <UserRound size={17} />
            View profile
          </Link>

        </aside>

        {/* RIGHT CONTENT */}
        <main className="min-w-0">

          {/* PUBLIC PROFILE */}
          <section className="border-b border-[#d1d9e0] pb-6">

            <h2 className="text-xl font-semibold">
              Public profile
            </h2>

            <p className="mt-1 text-sm text-[#59636e]">
              This information will be displayed on your NOVA profile.
            </p>

            {/* AVATAR */}
            <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

              <div className="flex items-start gap-4">

                <img
                  src={image}
                  alt="Profile"
                  className="h-24 w-24 rounded-full border border-[#d1d9e0] object-cover"
                />

                <div className="pt-1">
                  <h3 className="text-sm font-semibold">
                    Profile picture
                  </h3>

                  <p className="mt-1 text-xs leading-relaxed text-[#59636e]">
                    Your profile picture helps others recognize you.
                  </p>

                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                  />

                  <div className="mt-3 flex flex-wrap gap-2">

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2 rounded-md border border-[#d1d9e0] bg-[#f6f8fa] px-3 py-1.5 text-xs font-medium shadow-sm transition hover:bg-[#eef1f4]"
                    >
                      <Camera size={14} />
                      Upload new
                    </button>

                    <button
                      type="button"
                      onClick={handleRemove}
                      className="rounded-md border border-[#d1d9e0] bg-white px-3 py-1.5 text-xs font-medium text-[#cf222e] transition hover:bg-[#fff1f0]"
                    >
                      Remove
                    </button>

                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* PROFILE DETAILS */}
          <section className="border-b border-[#d1d9e0] py-7">

            <h2 className="text-base font-semibold">
              Profile information
            </h2>

            <p className="mt-1 text-sm text-[#59636e]">
              Update your personal details.
            </p>

            <div className="mt-6 grid max-w-2xl grid-cols-1 gap-5">

              {/* USERNAME */}
              <div>
                <label className={labelClass}>
                  Username
                </label>

                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter Username"
                  className={inputClass}
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className={labelClass}>
                  Email address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Mail ID"
                  className={inputClass}
                />
              </div>

              {/* BIO */}
              <div>
                <label className={labelClass}>
                  Bio
                </label>

                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Enter Your Bio..."
                  rows={4}
                  className={`${inputClass} resize-y`}
                />

                <p className="mt-1.5 text-xs text-[#59636e]">
                  Tell people a little about yourself.
                </p>
              </div>

              {/* PRONOUNS */}
              <div>
                <label className={labelClass}>
                  Pronouns
                </label>

                <select
                  id="pronouns"
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

          {/* SOCIAL LINKS */}
          <section className="border-b border-[#d1d9e0] py-7">

            <h2 className="text-base font-semibold">
              Social accounts
            </h2>

            <p className="mt-1 text-sm text-[#59636e]">
              Add links to your websites and social profiles.
            </p>

            <div className="mt-6 grid max-w-2xl grid-cols-1 gap-5">

              <div>
                <label className={labelClass}>
                  <span className="flex items-center gap-2">
                    <Link2 size={15} className="text-[#59636e]" />
                    Website / Social URL 1
                  </span>
                </label>

                <input
                  type="url"
                  value={url1}
                  onChange={(e) => setUrl1(e.target.value)}
                  placeholder="https://example.com"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  <span className="flex items-center gap-2">
                    <Link2 size={15} className="text-[#59636e]" />
                    Website / Social URL 2
                  </span>
                </label>

                <input
                  type="url"
                  value={url2}
                  onChange={(e) => setUrl2(e.target.value)}
                  placeholder="https://example.com"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  <span className="flex items-center gap-2">
                    <Link2 size={15} className="text-[#59636e]" />
                    Website / Social URL 3
                  </span>
                </label>

                <input
                  type="url"
                  value={url3}
                  onChange={(e) => setUrl3(e.target.value)}
                  placeholder="https://example.com"
                  className={inputClass}
                />
              </div>

            </div>
          </section>

          {/* SAVE */}
          <div className="flex flex-col-reverse items-start justify-between gap-4 py-6 sm:flex-row sm:items-center">

            <p className="text-xs text-[#59636e]">
              Changes will be reflected on your NOVA profile.
            </p>

            <div className="flex gap-2">

              <Link
                to="/Profile"
                className="rounded-md border border-[#d1d9e0] bg-[#f6f8fa] px-4 py-2 text-sm font-medium shadow-sm transition hover:bg-[#eef1f4]"
              >
                Cancel
              </Link>

              <Link
                to="/Profile"
                onClick={handleSave}
                className="rounded-md border border-[#1f883d] bg-[#1f883d] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1a7f37]"
              >
                Save changes
              </Link>

            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default Edit_Profile;