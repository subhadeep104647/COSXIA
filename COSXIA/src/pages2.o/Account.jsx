import React, { useEffect, useState } from "react";
import {
  Settings,
  UserRound,
  Mail,
  LockKeyhole,
  ShieldCheck,
  Monitor,
  Trash2,
  ChevronRight,
  CheckCircle2,
  Info,
  Save,
} from "lucide-react";
import { Link } from "react-router-dom";

const Account = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const profile = JSON.parse(
        localStorage.getItem("nova-profile") || "{}"
      );

      setUsername(profile.username || "");
      setEmail(profile.email || "");
    } catch (error) {
      console.error("Failed to load account:", error);
    }
  }, []);

  const handleSave = () => {
    try {
      const profile = JSON.parse(
        localStorage.getItem("nova-profile") || "{}"
      );

      const updatedProfile = {
        ...profile,
        username,
        email,
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
      console.error("Failed to save account:", error);
    }
  };

  const inputClass =
    "w-full rounded-md border border-[#d1d9e0] bg-white px-3 py-2 text-sm text-[#1f2328] outline-none transition focus:border-[#0969da] focus:ring-[3px] focus:ring-[#0969da]/15";

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
            <span className="font-medium text-[#1f2328]">Account</span>
          </div>

          <h1 className="mt-3 text-2xl font-semibold tracking-tight">
            Account settings
          </h1>

          <p className="mt-1 text-sm text-[#59636e]">
            Manage your NOVA account, sign-in details and security.
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

          <div className="flex items-center gap-3 rounded-md border-l-2 border-[#0969da] bg-[#ddf4ff] px-3 py-2.5 text-sm font-semibold text-[#0969da]">
            <Settings size={17} />
            Account
          </div>

          <Link
            to="/Profile_Information"
            className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-[#59636e] transition hover:bg-[#f6f8fa] hover:text-[#1f2328]"
          >
            <UserRound size={17} />
            Profile information
          </Link>

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
            <h2 className="text-xl font-semibold">Account</h2>
            <p className="mt-1 text-sm text-[#59636e]">
              Your account identity and access settings.
            </p>
          </div>

          {/* ACCOUNT IDENTITY */}
          <section className={sectionClass}>
            <div className="mb-5">
              <h3 className="text-base font-semibold">
                Account identity
              </h3>
              <p className="mt-1 text-sm text-[#59636e]">
                Your basic NOVA account details.
              </p>
            </div>

            <div className="max-w-2xl space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  <span className="flex items-center gap-2">
                    <UserRound size={15} />
                    Username
                  </span>
                </label>

                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Your username"
                  className={inputClass}
                />
                <p className="mt-1.5 text-xs text-[#59636e]">
                  Your username identifies your NOVA account.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  <span className="flex items-center gap-2">
                    <Mail size={15} />
                    Email address
                  </span>
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className={inputClass}
                />
                <p className="mt-1.5 text-xs text-[#59636e]">
                  This is the email address associated with your profile.
                </p>
              </div>

              <button
                type="button"
                onClick={handleSave}
                className="inline-flex items-center gap-2 rounded-md border border-[#1f883d] bg-[#1f883d] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1a7f37]"
              >
                {saved ? <CheckCircle2 size={16} /> : <Save size={16} />}
                {saved ? "Changes saved" : "Save account"}
              </button>
            </div>
          </section>

          {/* PASSWORD */}
          <section className={sectionClass}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="flex items-center gap-2 text-base font-semibold">
                  <LockKeyhole size={18} className="text-[#59636e]" />
                  Password and authentication
                </h3>
                <p className="mt-1 text-sm text-[#59636e]">
                  Keep your account secure with strong authentication.
                </p>
              </div>

              <span className="w-fit rounded-full border border-[#d1d9e0] bg-[#f6f8fa] px-2.5 py-1 text-xs font-medium text-[#59636e]">
                Backend required
              </span>
            </div>

            <div className="mt-5 max-w-2xl divide-y divide-[#d1d9e0] rounded-lg border border-[#d1d9e0]">

              <div className="flex items-center justify-between gap-4 p-4">
                <div>
                  <p className="text-sm font-semibold">Change password</p>
                  <p className="mt-1 text-xs text-[#59636e]">
                    Update your account password.
                  </p>
                </div>
                <button
                  type="button"
                  disabled
                  className="shrink-0 rounded-md border border-[#d1d9e0] bg-[#f6f8fa] px-3 py-1.5 text-xs font-medium text-[#8c959f] cursor-not-allowed"
                >
                  Configure
                </button>
              </div>

              <div className="flex items-center justify-between gap-4 p-4">
                <div>
                  <p className="text-sm font-semibold">Two-factor authentication</p>
                  <p className="mt-1 text-xs text-[#59636e]">
                    Add another layer of protection to your account.
                  </p>
                </div>
                <button
                  type="button"
                  disabled
                  className="shrink-0 rounded-md border border-[#d1d9e0] bg-[#f6f8fa] px-3 py-1.5 text-xs font-medium text-[#8c959f] cursor-not-allowed"
                >
                  Configure
                </button>
              </div>
            </div>
          </section>

          {/* SECURITY */}
          <section className={sectionClass}>
            <h3 className="flex items-center gap-2 text-base font-semibold">
              <ShieldCheck size={18} className="text-[#59636e]" />
              Security overview
            </h3>

            <div className="mt-5 max-w-2xl rounded-lg border border-[#d1d9e0] bg-[#f6f8fa] p-4">
              <div className="flex items-start gap-3">
                <Info size={18} className="mt-0.5 shrink-0 text-[#0969da]" />
                <div>
                  <p className="text-sm font-semibold">
                    Protect your NOVA account
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-[#59636e]">
                    Password management, login verification and session
                    tracking need to be connected to your authentication
                    backend before they can be enabled.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ACTIVE SESSIONS */}
          <section className={sectionClass}>
            <h3 className="flex items-center gap-2 text-base font-semibold">
              <Monitor size={18} className="text-[#59636e]" />
              Active sessions
            </h3>

            <div className="mt-4 max-w-2xl rounded-lg border border-[#d1d9e0] p-4">
              <div className="flex items-start gap-3">
                <Monitor size={20} className="mt-1 text-[#59636e]" />
                <div className="flex-1">
                  <p className="text-sm font-semibold">
                    Session management
                  </p>
                  <p className="mt-1 text-xs text-[#59636e]">
                    View logged-in devices and sign out of other sessions.
                  </p>
                  <p className="mt-3 text-xs text-[#8c959f]">
                    Session information will appear here after backend integration.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* DANGER ZONE */}
          <section className="mt-2 rounded-lg border border-[#ff8182] p-5">
            <h3 className="flex items-center gap-2 text-base font-semibold text-[#cf222e]">
              <Trash2 size={18} />
              Danger zone
            </h3>

            <p className="mt-2 text-sm text-[#59636e]">
              Permanently deleting your account will remove your account
              and associated data.
            </p>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold">
                  Delete this account
                </p>
                <p className="mt-1 text-xs text-[#59636e]">
                  This action requires secure server-side confirmation.
                </p>
              </div>

              <button
                type="button"
                disabled
                className="w-fit rounded-md border border-[#ff8182] px-3 py-1.5 text-sm font-medium text-[#cf222e] opacity-50 cursor-not-allowed"
              >
                Delete account
              </button>
            </div>
          </section>

          <p className="mt-6 text-xs text-[#8c959f]">
            NOVA Account Settings
          </p>

        </main>
      </div>
    </div>
  );
};

export default Account;