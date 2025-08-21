import { useState } from "react";

function App() {
  const [uid, setUid] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("UID:", uid);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-white">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle, black 1px, transparent 1px)`,
          backgroundSize: "8px 8px",
        }}
      ></div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-4xl relative">
          <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 bg-white border-4 border-black p-6 z-20 shadow-lg text-center">
            <h1 className="text-5xl font-black text-black tracking-tight leading-none mb-3 whitespace-nowrap">
              HONKAI STAR RAIL
            </h1>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-0.5 bg-black"></div>
              <p className="text-lg font-bold text-black px-2">
                崩壊：スターレイル
              </p>
              <div className="w-12 h-0.5 bg-black"></div>
            </div>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-1 transform -skew-x-12 z-30">
              <h2 className="text-sm font-bold tracking-widest uppercase transform skew-x-12">
                Profile Tracker
              </h2>
            </div>
          </div>

          <div className="bg-white border-4 border-black p-8 relative pt-12">
            <form onSubmit={handleSubmit}>
              <label
                htmlFor="uid"
                className="block text-xl font-bold text-black mb-4 mt-8 tracking-wide uppercase border-b-2 border-black pb-2"
              >
                UID を入力してください
              </label>
              <div className="flex border-3 border-black">
                <input
                  type="text"
                  id="uid"
                  value={uid}
                  onChange={(e) => setUid(e.target.value)}
                  placeholder="8xxxxxxxx"
                  className="flex-1 px-6 py-6 text-2xl bg-white border-r-3 border-black text-black placeholder-gray-500 focus:outline-none font-mono tracking-wider focus:bg-gray-50"
                />
                <button
                  type="submit"
                  className="px-8 py-6 text-xl font-bold bg-black text-white hover:bg-gray-800 focus:outline-none whitespace-nowrap uppercase tracking-wide relative overflow-hidden group"
                >
                  <span className="relative z-10">TRACK</span>
                  <div className="absolute inset-0 bg-white transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                  <span className="absolute inset-0 flex items-center justify-center text-black font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    GO!
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
