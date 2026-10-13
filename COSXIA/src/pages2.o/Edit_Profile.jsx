import React, { useEffect, useRef, useState } from "react";
import {
  NotebookPen,
  UserRoundPen,
  Link2,
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

  // Load previously saved profile
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

    const preview = URL.createObjectURL(file);

    setImage((oldImage) => {
      if (oldImage?.startsWith("blob:")) {
        URL.revokeObjectURL(oldImage);
      }

      return preview;
    });
  };

  const handleRemove = () => {
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

    localStorage.setItem(
      "nova-profile",
      JSON.stringify(profileData)
    );

    // Notify other components such as Profile page
    window.dispatchEvent(
      new CustomEvent("nova:profile-updated", {
        detail: profileData,
      })
    );
  };

  return (
    <div className="min-h-screen w-full bg-black text-white px-5 sm:px-8 lg:px-10 py-10">
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-10">

        {/* ================= PROFILE IMAGE ================= */}
        <div className="w-full lg:w-1/4 flex flex-col items-center gap-5 lg:pt-5">

          <div>
            <img
              src={image}
              alt="Profile"
              className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 object-cover border-2 border-gray-600 rounded-full"
            />
          </div>

          <div className="flex flex-col items-center gap-4">

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />

            <div className="flex gap-3">

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-gray-900 text-white rounded-md text-sm border border-gray-700 hover:bg-gray-800 transition"
              >
                Upload new
              </button>

              <button
                type="button"
                onClick={handleRemove}
                className="px-4 py-2 border border-gray-600 text-gray-300 rounded-md text-sm hover:bg-gray-900 transition"
              >
                Remove
              </button>

            </div>
          </div>
        </div>

        {/* ================= PROFILE FORM ================= */}
        <div className="w-full lg:w-3/4 flex flex-col items-start gap-4">

          {/* USERNAME */}
          <div className="flex flex-row items-center gap-3 w-full">

            <div className="shrink-0">
              <UserRoundPen
                color="#ffffff"
                strokeWidth={1.25}
              />
            </div>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Username"
              className="px-4 py-2 text-gray-300 bg-gray-900 font-normal text-lg tracking-wide border border-gray-600 rounded-xl w-full max-w-2xl outline-none focus:border-purple-500 transition"
            />

          </div>

          {/* EMAIL */}
          <div className="flex flex-row items-center gap-3 w-full">

            <div className="shrink-0">
              <UserRoundPen
                color="#ffffff"
                strokeWidth={1.25}
              />
            </div>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Mail ID"
              className="px-4 py-2 text-gray-300 bg-gray-900 font-normal text-lg tracking-wide border border-gray-600 rounded-xl w-full max-w-2xl outline-none focus:border-purple-500 transition"
            />

          </div>

          {/* BIO */}
          <div className="flex flex-row items-start gap-3 w-full">

            <div className="shrink-0 mt-3">
              <NotebookPen
                color="#ffffff"
                strokeWidth={1.25}
              />
            </div>

            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Enter Your Bio..."
              rows="4"
              className="bg-gray-900 px-5 py-3 font-normal text-lg tracking-wide border border-gray-600 rounded-xl w-full max-w-2xl text-gray-300 outline-none focus:border-purple-500 transition resize-none"
            />

          </div>

          {/* PRONOUNS */}
          <div className="flex flex-row items-center gap-3 bg-gray-900 px-4 py-2 border border-gray-600 rounded-xl w-full max-w-2xl">

            <label
              htmlFor="pronouns"
              className="text-gray-400 font-normal text-lg tracking-wide"
            >
              Pronouns :
            </label>

            <select
              id="pronouns"
              value={pronouns}
              onChange={(e) => setPronouns(e.target.value)}
              className="bg-gray-900 text-gray-300 w-40 font-normal text-lg outline-none cursor-pointer"
            >
              <option>Don't Specify</option>
              <option>They/Them</option>
              <option>She/Her</option>
              <option>He/Him</option>
              <option>Custom</option>
            </select>

          </div>

          {/* URL 1 */}
          <div className="flex flex-row items-center gap-3 w-full">

            <div className="shrink-0">
              <Link2
                color="#ffffff"
                strokeWidth={1.25}
              />
            </div>

            <input
              type="url"
              value={url1}
              onChange={(e) => setUrl1(e.target.value)}
              placeholder="Enter URL 1"
              className="px-4 py-2 text-gray-300 bg-gray-900 font-normal text-lg tracking-wide border border-gray-600 rounded-xl w-full max-w-2xl outline-none focus:border-purple-500 transition"
            />

          </div>

          {/* URL 2 */}
          <div className="flex flex-row items-center gap-3 w-full">

            <div className="shrink-0">
              <Link2
                color="#ffffff"
                strokeWidth={1.25}
              />
            </div>

            <input
              type="url"
              value={url2}
              onChange={(e) => setUrl2(e.target.value)}
              placeholder="Enter URL 2"
              className="px-4 py-2 text-gray-300 bg-gray-900 font-normal text-lg tracking-wide border border-gray-600 rounded-xl w-full max-w-2xl outline-none focus:border-purple-500 transition"
            />

          </div>

          {/* URL 3 */}
          <div className="flex flex-row items-center gap-3 w-full">

            <div className="shrink-0">
              <Link2
                color="#ffffff"
                strokeWidth={1.25}
              />
            </div>

            <input
              type="url"
              value={url3}
              onChange={(e) => setUrl3(e.target.value)}
              placeholder="Enter URL 3"
              className="px-4 py-2 text-gray-300 bg-gray-900 font-normal text-lg tracking-wide border border-gray-600 rounded-xl w-full max-w-2xl outline-none focus:border-purple-500 transition"
            />

          </div>

          {/* SAVE BUTTON */}
          <Link
            to="/Profile"
            onClick={handleSave}
            className="bg-green-600 border border-white rounded-xl text-white py-2 px-6 tracking-wide mt-3 hover:bg-green-700 transition"
          >
            <span className="font-medium text-lg tracking-wide">
              Save
            </span>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default Edit_Profile;