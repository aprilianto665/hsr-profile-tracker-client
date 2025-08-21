import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Avatar {
  id: string;
  name: string;
  icon: string;
}

interface SpaceInfo {
  universe_level: number;
  avatar_count: number;
  light_cone_count: number;
  relic_count: number;
  achievement_count: number;
  book_count: number;
  music_count: number;
}

interface Player {
  uid: string;
  nickname: string;
  level: number;
  world_level: number;
  friend_count: number;
  avatar: Avatar;
  signature: string;
  is_display: boolean;
  space_info: SpaceInfo;
}

interface ProfileData {
  player: Player;
}

function ProfileDetail() {
  const { uid } = useParams<{ uid: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"info" | "characters">("info");

  const profileData: ProfileData = {
    player: {
      uid: uid || "802081705",
      nickname: "Elaina",
      level: 70,
      world_level: 6,
      friend_count: 12,
      avatar: {
        id: "202006",
        name: "Wanted Poster",
        icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/avatar/IconHead_202006.png",
      },
      signature: "ragumu rugimu",
      is_display: true,
      space_info: {
        universe_level: 9,
        avatar_count: 59,
        light_cone_count: 96,
        relic_count: 1943,
        achievement_count: 941,
        book_count: 246,
        music_count: 100,
      },
    },
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

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 pb-16">
        <div className="w-full max-w-6xl mx-auto relative">
          <div className="absolute -top-16 md:-top-24 left-1/2 transform -translate-x-1/2 bg-white border-2 md:border-4 border-black p-3 md:p-6 z-20 shadow-lg text-center w-max md:w-auto">
            <h1 className="text-2xl md:text-5xl font-black text-black tracking-tight leading-none mb-2 md:mb-3 md:whitespace-nowrap">
              PROFILE DETAILS
            </h1>
            <div className="flex items-center justify-center gap-2 md:gap-3">
              <div className="w-6 md:w-12 h-0.5 bg-black"></div>
              <p className="text-sm md:text-lg font-bold text-black px-1 md:px-2">
                UID: {profileData.player.uid}
              </p>
              <div className="w-6 md:w-12 h-0.5 bg-black"></div>
            </div>
            <div className="absolute -bottom-3 md:-bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 md:px-4 py-1 transform -skew-x-12 z-30">
              <h2 className="text-xs md:text-sm font-bold tracking-widest uppercase transform skew-x-12 whitespace-nowrap">
                Trailblazer Data
              </h2>
            </div>
          </div>

          <div className="bg-white border-2 md:border-4 border-black p-4 md:p-8 relative pt-8 md:pt-12 space-y-6">
            <div className="flex justify-between mb-4 mt-6">
              <button
                onClick={() => navigate("/")}
                className="px-4 py-2 bg-black text-white font-bold uppercase tracking-wide hover:bg-gray-800 border-2 border-black"
              >
                ← BACK
              </button>
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab("info")}
                  className={`px-4 py-2 font-bold uppercase tracking-wide border-2 border-black ${
                    activeTab === "info"
                      ? "bg-black text-white"
                      : "bg-white text-black hover:bg-gray-100"
                  }`}
                >
                  MAIN INFO
                </button>
                <button
                  onClick={() => setActiveTab("characters")}
                  className={`px-4 py-2 font-bold uppercase tracking-wide border-2 border-black ${
                    activeTab === "characters"
                      ? "bg-black text-white"
                      : "bg-white text-black hover:bg-gray-100"
                  }`}
                >
                  CHARACTERS
                </button>
              </div>
            </div>

            {activeTab === "info" && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="border-2 border-black p-4 flex flex-col">
                  <h3 className="text-xl font-bold text-black mb-4 uppercase tracking-wide border-b-2 border-black pb-2">
                    AVATAR
                  </h3>
                  <div className="flex flex-col items-center justify-center space-y-3 flex-1">
                    <img 
                      src={profileData.player.avatar.icon}
                      alt={profileData.player.avatar.name}
                      className="w-32 h-32 object-cover"
                    />
                    <div className="text-center">
                      <div className="font-mono text-sm">
                        {profileData.player.avatar.name}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-2 border-black p-4 md:col-span-2">
                  <h3 className="text-xl font-bold text-black mb-4 uppercase tracking-wide border-b-2 border-black pb-2">
                    BASIC INFO
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-bold">NICKNAME:</span>
                      <span className="font-mono">
                        {profileData.player.nickname}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">LEVEL:</span>
                      <span className="font-mono">
                        {profileData.player.level}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">WORLD LEVEL:</span>
                      <span className="font-mono">
                        {profileData.player.world_level}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">FRIENDS:</span>
                      <span className="font-mono">
                        {profileData.player.friend_count}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">SIGNATURE:</span>
                      <span className="font-mono">
                        {profileData.player.signature}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-2 border-black p-4">
                  <h3 className="text-xl font-bold text-black mb-4 uppercase tracking-wide border-b-2 border-black pb-2">
                    SPACE INFO
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-bold">UNIVERSE LEVEL:</span>
                      <span className="font-mono">
                        {profileData.player.space_info.universe_level}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">AVATARS:</span>
                      <span className="font-mono">
                        {profileData.player.space_info.avatar_count}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">LIGHT CONES:</span>
                      <span className="font-mono">
                        {profileData.player.space_info.light_cone_count}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">RELICS:</span>
                      <span className="font-mono">
                        {profileData.player.space_info.relic_count}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">ACHIEVEMENTS:</span>
                      <span className="font-mono">
                        {profileData.player.space_info.achievement_count}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">BOOKS:</span>
                      <span className="font-mono">
                        {profileData.player.space_info.book_count}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">MUSIC:</span>
                      <span className="font-mono">
                        {profileData.player.space_info.music_count}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "characters" && (
              <div className="border-2 border-black p-4">
                <h3 className="text-xl font-bold text-black mb-4 uppercase tracking-wide border-b-2 border-black pb-2">
                  CHARACTER ROSTER
                </h3>
                <p className="text-center text-gray-600 py-8">
                  Character data will be loaded here...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="absolute bottom-0 left-0 right-0 bg-black text-white py-2 px-4 z-30">
        <p className="text-center text-xs md:text-sm font-mono">
          © 2025 HSR Profile Tracker. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default ProfileDetail;
