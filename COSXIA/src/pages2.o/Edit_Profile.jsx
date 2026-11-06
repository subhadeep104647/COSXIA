import React, { useEffect, useRef, useState } from "react";
import {
  UserRound,
  Settings,
  BookUser,
  Camera,
  Link2,
  Mail,
  AtSign,
  UserRoundPen,
  MapPin,
  Globe,
  ShieldCheck,
  Check,
  ChevronRight,
  Image as ImageIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

const Edit_Profile = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [image, setImage] = useState("/User.jpeg");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [pronouns, setPronouns] = useState("Don't Specify");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [url1, setUrl1] = useState("");
  const [url2, setUrl2] = useState("");
  const [url3, setUrl3] = useState("");
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    try {
      const profile = JSON.parse(localStorage.getItem("nova-profile") || "{}");
      setUsername(profile.username || "");
      setEmail(profile.email || "");
      setFullName(profile.fullName || "");
      setBio(profile.bio || "");
      setPronouns(profile.pronouns || "Don't Specify");
      setLocation(profile.location || "");
      setWebsite(profile.website || "");
      setUrl1(profile.url1 || "");
      setUrl2(profile.url2 || "");
      setUrl3(profile.url3 || "");
      setImage(profile.image || "/User.jpeg");
    } catch (error) {
      console.error("Failed to load profile:", error);
    }
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (image?.startsWith("blob:")) URL.revokeObjectURL(image);
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    if (image?.startsWith("blob:")) URL.revokeObjectURL(image);
    setImage("/User.jpeg");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSave = () => {
    const profileData = {
      username,
      email,
      fullName,
      bio,
      pronouns,
      location,
      website,
      url1,
      url2,
      url3,
      image,
    };
    localStorage.setItem("nova-profile", JSON.stringify(profileData));
    window.dispatchEvent(
      new CustomEvent("nova:profile-updated", { detail: profileData })
    );
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2600);
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10";
  const labelClass = "mb-2 block text-sm font-semibold text-slate-700";

  const sections = [
    { id: "profile", label: "Public profile", description: "Avatar and social links", icon: UserRound },
    { id: "account", label: "Account", description: "Login and account details", icon: Settings },
    { id: "information", label: "Profile information", description: "Personal details and bio", icon: BookUser },
  ];

  const Field = ({ label, children, hint }) => (
    <div>
      <label className={labelClass}>{label}</label>
      {children}
      {hint && <p className="mt-2 text-xs text-slate-400">{hint}</p>}
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] text-slate-800">
      <div className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto max-w-[1240px] px-5 py-8 sm:px-8">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <Settings size={14} />
            <span>Settings</span>
            <ChevronRight size={13} />
            <span className="text-slate-600">Your preferences</span>
          </div>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">Settings</h1>
              <p className="mt-2 text-sm text-slate-500">
                Manage your account and how you appear across NOVA.
              </p>
            </div>
            <Link
              to="/Profile"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
            >
              <UserRound size={16} /> View profile
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-7 px-5 py-8 sm:px-8 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_4px_24px_rgba(15,23,42,0.03)]">
          <p className="px-3 pb-3 pt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
            Personal settings
          </p>
          <nav className="space-y-1">
            {sections.map(({ id, label, description, icon: Icon }) => {
              const active = activeSection === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveSection(id)}
                  className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
                    active
                      ? "bg-violet-50 text-violet-700 ring-1 ring-violet-100"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                    active ? "bg-white text-violet-600 shadow-sm" : "bg-slate-100 text-slate-500 group-hover:bg-white"
                  }`}>
                    <Icon size={17} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold">{label}</span>
                    <span className={`mt-0.5 block text-[11px] ${active ? "text-violet-500" : "text-slate-400"}`}>
                      {description}
                    </span>
                  </span>
                  {active && <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />}
                </button>
              );
            })}
          </nav>
          <div className="my-4 border-t border-slate-100" />
          <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">NOVA</p>
          <Link
            to="/Profile"
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
              <UserRound size={17} />
            </span>
            View profile
          </Link>
          <div className="mt-4 rounded-xl bg-gradient-to-br from-violet-50 via-white to-cyan-50 p-4">
            <div className="flex items-center gap-2 text-violet-700">
              <ShieldCheck size={16} />
              <span className="text-xs font-semibold">Your profile, your control</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-slate-500">
              Keep your NOVA account details up to date.
            </p>
          </div>
        </aside>

        <main className="min-w-0">
          {activeSection === "profile" && (
            <div className="space-y-6">
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_4px_24px_rgba(15,23,42,0.03)] sm:p-8">
                <div className="border-b border-slate-100 pb-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-600">Appearance</p>
                  <h2 className="mt-2 text-xl font-bold text-slate-900">Public profile</h2>
                  <p className="mt-1 text-sm text-slate-500">Choose how people see you on NOVA.</p>
                </div>
                <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div className="relative h-24 w-24 shrink-0">
                    <img src={image} alt="Profile" className="h-24 w-24 rounded-2xl border border-slate-200 object-cover shadow-sm" />
                    <span className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-xl border-2 border-white bg-violet-600 text-white shadow">
                      <ImageIcon size={14} />
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-slate-800">Profile picture</h3>
                    <p className="mt-1 text-xs text-slate-500">Use a clear image so others can recognize your profile.</p>
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    <div className="mt-4 flex flex-wrap gap-2">
                      <button type="button" onClick={() => fileInputRef.current?.click()} className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-700">
                        <Camera size={14} /> Upload new
                      </button>
                      <button type="button" onClick={handleRemove} className="rounded-lg border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50">
                        Remove photo
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_4px_24px_rgba(15,23,42,0.03)] sm:p-8">
                <h2 className="text-lg font-bold text-slate-900">Social accounts</h2>
                <p className="mt-1 text-sm text-slate-500">Add links to your website and social profiles.</p>
                <div className="mt-6 grid max-w-2xl grid-cols-1 gap-5">
                  <Field label="Website / Social URL 1">
                    <div className="relative"><Link2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} /><input type="url" value={url1} onChange={(e) => setUrl1(e.target.value)} placeholder="https://example.com" className={`${inputClass} pl-11`} /></div>
                  </Field>
                  <Field label="Website / Social URL 2">
                    <div className="relative"><Link2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} /><input type="url" value={url2} onChange={(e) => setUrl2(e.target.value)} placeholder="https://example.com" className={`${inputClass} pl-11`} /></div>
                  </Field>
                  <Field label="Website / Social URL 3">
                    <div className="relative"><Link2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} /><input type="url" value={url3} onChange={(e) => setUrl3(e.target.value)} placeholder="https://example.com" className={`${inputClass} pl-11`} /></div>
                  </Field>
                </div>
              </section>
            </div>
          )}

          {activeSection === "account" && (
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_4px_24px_rgba(15,23,42,0.03)] sm:p-8">
              <div className="border-b border-slate-100 pb-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-600">Account</p>
                <h2 className="mt-2 text-xl font-bold text-slate-900">Account details</h2>
                <p className="mt-1 text-sm text-slate-500">Manage the details associated with your NOVA account.</p>
              </div>
              <div className="mt-7 grid max-w-2xl grid-cols-1 gap-6">
                <Field label="Username" hint="Your username is used to identify your NOVA profile.">
                  <div className="relative"><AtSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} /><input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" className={`${inputClass} pl-11`} /></div>
                </Field>
                <Field label="Email address" hint="Use an email address you can access.">
                  <div className="relative"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} /><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" className={`${inputClass} pl-11`} /></div>
                </Field>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-start gap-3">
                    <ShieldCheck size={18} className="mt-0.5 text-emerald-600" />
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Account security</p>
                      <p className="mt-1 text-xs leading-relaxed text-slate-500">Your account details are stored in this browser's NOVA profile settings. Password and authentication changes are managed by your sign-in provider.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeSection === "information" && (
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_4px_24px_rgba(15,23,42,0.03)] sm:p-8">
              <div className="border-b border-slate-100 pb-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-600">Personal details</p>
                <h2 className="mt-2 text-xl font-bold text-slate-900">Profile information</h2>
                <p className="mt-1 text-sm text-slate-500">Tell the NOVA community a little more about yourself.</p>
              </div>
              <div className="mt-7 grid max-w-2xl grid-cols-1 gap-6">
                <Field label="Full name">
                  <div className="relative"><UserRoundPen className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} /><input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter your full name" className={`${inputClass} pl-11`} /></div>
                </Field>
                <Field label="Bio" hint="A short introduction that appears on your NOVA profile.">
                  <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Write a little about yourself..." rows={5} maxLength={280} className={`${inputClass} resize-y`} />
                  <p className="mt-1 text-right text-[11px] text-slate-400">{bio.length}/280</p>
                </Field>
                <Field label="Pronouns">
                  <select value={pronouns} onChange={(e) => setPronouns(e.target.value)} className={`${inputClass} cursor-pointer`}>
                    <option>Don't Specify</option><option>They/Them</option><option>She/Her</option><option>He/Him</option><option>Custom</option>
                  </select>
                </Field>
                <Field label="Location">
                  <div className="relative"><MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} /><input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City, Country" className={`${inputClass} pl-11`} /></div>
                </Field>
                <Field label="Website">
                  <div className="relative"><Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} /><input type="url" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://yourwebsite.com" className={`${inputClass} pl-11`} /></div>
                </Field>
              </div>
            </section>
          )}

          <div className="mt-6 flex flex-col-reverse items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-[0_4px_24px_rgba(15,23,42,0.03)] sm:flex-row sm:items-center sm:px-8">
            <p className="text-xs text-slate-400">Your changes will be reflected on your NOVA profile.</p>
            <div className="flex items-center gap-3">
              {saved && <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600"><Check size={14} /> Saved</span>}
              <Link to="/Profile" className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-500 transition hover:bg-slate-100">Cancel</Link>
              <button type="button" onClick={handleSave} className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-violet-500/20 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-500/25">
                Save changes
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Edit_Profile;
