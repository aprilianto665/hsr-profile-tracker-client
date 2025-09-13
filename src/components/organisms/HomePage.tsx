import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "../atoms";

export function HomePage() {
  const [uid, setUid] = useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (uid.trim()) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/checkprofile/${uid}`);
        const data = await response.json();
        if (data.exists) {
          navigate(`/profile/${uid}`);
        } else {
          setMessage(data.message);
        }
      } catch (error) {
        console.error("Error checking profile:", error);
        setMessage("Failed to check profile. Please try again.");
      }
    }
  };

  const handleUidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 9 && !value.includes("-")) {
      setUid(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (["-", "+", "e", "E"].includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div className="page-container">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle, black 1px, transparent 1px)`,
          backgroundSize: "8px 8px",
        }}
      ></div>

      <div className="content-wrapper">
        <div className="main-card">
          <div className="header-container-mobile">
            <h1 className="main-title">
              HONKAI STAR RAIL
            </h1>
            <div className="flex items-center justify-center gap-2 md:gap-3">
              <div className="title-divider"></div>
              <p className="subtitle">
                崩壊：スターレイル
              </p>
              <div className="title-divider"></div>
            </div>
            <div className="badge-mobile">
              <h2 className="badge-text">
                Profile Tracker
              </h2>
            </div>
          </div>

          <div className="main-content-card">
            <form onSubmit={handleSubmit}>
              <label
                htmlFor="uid"
                className="block text-lg md:text-xl font-bold text-black mb-3 md:mb-4 mt-4 md:mt-8 tracking-wide uppercase border-b-2 border-black pb-2"
              >
                ENTER YOUR UID
              </label>
              <div className="flex flex-col md:flex-row border-3 border-black">
                <Input
                  type="number"
                  id="uid"
                  value={uid}
                  onChange={handleUidChange}
                  onKeyDown={handleKeyDown}
                  placeholder="800123456"
                  className="flex-1 px-3 md:px-6 py-3 md:py-6 text-lg md:text-2xl bg-white border-b-3 md:border-b-0 md:border-r-3 border-black text-black placeholder-gray-500 focus:outline-none font-mono tracking-wider focus:bg-gray-50"
                />
                <Button
                  type="submit"
                  className="px-4 md:px-8 py-3 md:py-6 text-lg md:text-xl font-bold bg-black text-white hover:bg-gray-800 focus:outline-none whitespace-nowrap uppercase tracking-wide relative overflow-hidden group"
                >
                  <span className="relative z-10">TRACK</span>
                  <div className="absolute inset-0 bg-white transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                  <span className="absolute inset-0 flex items-center justify-center text-black font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    GO!
                  </span>
                </Button>
              </div>
            </form>
            {message && (
              <p className="mt-4 text-center text-red-500 font-bold">{message}</p>
            )}
          </div>
        </div>
      </div>


    </div>
  );
}