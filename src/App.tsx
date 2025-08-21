import { useState } from "react";

function App() {
  const [uid, setUid] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("UID:", uid);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
          linear-gradient(rgba(156,163,175,0.15) 1px, transparent 1px),
          linear-gradient(90deg, rgba(156,163,175,0.15) 1px, transparent 1px)
        `,
          backgroundSize: "20px 20px",
        }}
      ></div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 space-y-8">
          <div className="w-full max-w-4xl flex items-center justify-center gap-6">
            <img
              src="/logo.png"
              alt="HSR Logo"
              className="w-80 drop-shadow-xl flex-shrink-0"
            />
            <div className="space-y-3">
              <div>
                <h1 className="text-6xl font-black bg-gradient-to-r from-gray-800 via-gray-900 to-black bg-clip-text text-transparent tracking-tight leading-none drop-shadow-sm">
                  HONKAI
                </h1>
                <h1 className="text-6xl font-black bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight leading-none drop-shadow-sm -mt-2">
                  STAR RAIL
                </h1>
              </div>

              <div className="flex items-center gap-3 mt-4">
                <div className="w-8 h-0.5 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full"></div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent tracking-[0.2em] uppercase">
                  Profile Tracker
                </h2>
                <div className="w-8 h-0.5 bg-gradient-to-r from-gray-500 to-gray-700 rounded-full"></div>
              </div>

              <p className="text-lg text-slate-700 font-medium opacity-90 max-w-md leading-relaxed pt-3 italic">
                "Embark on your stellar journey and track every moment of your
                Trailblazer adventure"
              </p>
            </div>
          </div>

          <div className="w-full max-w-4xl">
            <form onSubmit={handleSubmit}>
              <label
                htmlFor="uid"
                className="block text-2xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent mb-4 text-left tracking-wide uppercase"
              >
                Enter your UID
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="uid"
                  value={uid}
                  onChange={(e) => setUid(e.target.value)}
                  placeholder="8xxxxxxxx"
                  className="flex-1 px-8 py-7 text-2xl rounded-l-2xl backdrop-blur-sm bg-white/50 border border-gray-300/50 border-r-0 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400/50 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="px-10 py-7 text-2xl font-semibold rounded-r-2xl backdrop-blur-md bg-black/10 hover:bg-black/20 border border-gray-400/30 hover:border-gray-500/50 text-gray-800 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400/50 focus:border-transparent whitespace-nowrap"
                >
                  Track Profile
                </button>
              </div>
            </form>
          </div>
      </div>
    </div>
  );
}

export default App;
