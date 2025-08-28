import { useState } from "react";
import * as React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useParams,
} from "react-router-dom";

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

interface Relic {
  name: string;
  level: number;
  mainStat: string;
  mainStatValue: string;
  icon: string;
  slot: string;
  subStats: { stat: string; value: string }[];
}

interface RelicSetEffect {
  setName: string;
  pieces: number;
  effect: string;
  icon: string;
}

interface Stats {
  baseHp: number;
  baseAtk: number;
  baseDef: number;
  spd: number;
  critRate: number;
  critDmg: number;
  effectHitRate: number;
  effectRes: number;
  elementDmg: number;
  breakEffect: number;
  energyRegenRate: number;
}

interface Character {
  id: string;
  name: string;
  element: string;
  path: string;
  level: number;
  icon: string;
  portrait: string;
  eidolon: number;
  rarity: number; // 4 or 5
  stats: Stats;
  lightCone: {
    name: string;
    level: number;
    superimposition: number;
    icon: string;
    rarity: number;
    path: string;
  };
  cavityRelics: Relic[];
  planarRelics: Relic[];
  relicSetEffects: RelicSetEffect[];
}

interface ProfileData {
  player: Player;
}

function HomePage() {
  const [uid, setUid] = useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (uid.trim()) {
      try {
        const response = await fetch(
          `http://localhost:3000/checkprofile/${uid}`
        );
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
          <div className="absolute -top-16 md:-top-24 left-1/2 transform -translate-x-1/2 bg-white border-2 md:border-4 border-black p-3 md:p-6 z-20 shadow-lg text-center w-max md:w-auto">
            <h1 className="text-2xl md:text-5xl font-black text-black tracking-tight leading-none mb-2 md:mb-3 md:whitespace-nowrap">
              HONKAI STAR RAIL
            </h1>
            <div className="flex items-center justify-center gap-2 md:gap-3">
              <div className="w-6 md:w-12 h-0.5 bg-black"></div>
              <p className="text-sm md:text-lg font-bold text-black px-1 md:px-2">
                崩壊：スターレイル
              </p>
              <div className="w-6 md:w-12 h-0.5 bg-black"></div>
            </div>
            <div className="absolute -bottom-3 md:-bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 md:px-4 py-1 transform -skew-x-12 z-30">
              <h2 className="text-xs md:text-sm font-bold tracking-widest uppercase transform skew-x-12 whitespace-nowrap">
                Profile Tracker
              </h2>
            </div>
          </div>

          <div className="bg-white border-2 md:border-4 border-black p-4 md:p-8 relative pt-8 md:pt-12">
            <form onSubmit={handleSubmit}>
              <label
                htmlFor="uid"
                className="block text-lg md:text-xl font-bold text-black mb-3 md:mb-4 mt-4 md:mt-8 tracking-wide uppercase border-b-2 border-black pb-2"
              >
                ENTER YOUR UID
              </label>
              <div className="flex flex-col md:flex-row border-3 border-black">
                <input
                  type="number"
                  id="uid"
                  value={uid}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length <= 9 && !value.includes("-")) {
                      setUid(value);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (
                      e.key === "-" ||
                      e.key === "+" ||
                      e.key === "e" ||
                      e.key === "E"
                    ) {
                      e.preventDefault();
                    }
                  }}
                  placeholder="800123456"
                  className="flex-1 px-3 md:px-6 py-3 md:py-6 text-lg md:text-2xl bg-white border-b-3 md:border-b-0 md:border-r-3 border-black text-black placeholder-gray-500 focus:outline-none font-mono tracking-wider focus:bg-gray-50"
                />
                <button
                  type="submit"
                  className="px-4 md:px-8 py-3 md:py-6 text-lg md:text-xl font-bold bg-black text-white hover:bg-gray-800 focus:outline-none whitespace-nowrap uppercase tracking-wide relative overflow-hidden group"
                >
                  <span className="relative z-10">TRACK</span>
                  <div className="absolute inset-0 bg-white transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                  <span className="absolute inset-0 flex items-center justify-center text-black font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    GO!
                  </span>
                </button>
              </div>
            </form>
            {message && (
              <p className="mt-4 text-center text-red-500 font-bold">
                {message}
              </p>
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

function ProfileDetail() {
  const { uid } = useParams<{ uid: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"info" | "characters">("info");
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );

  const characters: Character[] = [
    {
      id: "1001",
      name: "March 7th",
      element: "Ice",
      path: "Preservation",
      level: 80,
      icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/image/character_preview/1001.png",
      portrait:
        "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/image/character_portrait/1001.png",
      eidolon: 6,
      rarity: 4,
      stats: {
        baseHp: 1058,
        baseAtk: 511,
        baseDef: 573,
        spd: 101,
        critRate: 5.0,
        critDmg: 50.0,
        effectHitRate: 0.0,
        effectRes: 0.0,
        elementDmg: 0.0,
        breakEffect: 0.0,
        energyRegenRate: 100.0,
      },
      lightCone: {
        name: "Landau's Choice",
        level: 80,
        superimposition: 5,
        icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/light_cone/23003.png",
        rarity: 4,
        path: "Preservation",
      },
      cavityRelics: [
        {
          name: "Knight of Purity Palace",
          level: 15,
          mainStat: "HP",
          mainStatValue: "705",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/101_0.png",
          slot: "Head",
          subStats: [
            { stat: "DEF%", value: "5.8%" },
            { stat: "ATK", value: "19" },
            { stat: "SPD", value: "2" },
            { stat: "Effect RES%", value: "3.9%" },
          ],
        },
        {
          name: "Knight of Purity Palace",
          level: 15,
          mainStat: "ATK",
          mainStatValue: "352",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/101_1.png",
          slot: "Hands",
          subStats: [
            { stat: "HP%", value: "4.3%" },
            { stat: "DEF%", value: "11.6%" },
            { stat: "CRIT Rate%", value: "2.9%" },
            { stat: "Effect Hit Rate%", value: "3.9%" },
          ],
        },
        {
          name: "Knight of Purity Palace",
          level: 15,
          mainStat: "DEF%",
          mainStatValue: "54.0%",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/101_2.png",
          slot: "Body",
          subStats: [
            { stat: "HP", value: "42" },
            { stat: "ATK%", value: "4.3%" },
            { stat: "CRIT DMG%", value: "5.8%" },
            { stat: "Effect RES%", value: "7.7%" },
          ],
        },
        {
          name: "Knight of Purity Palace",
          level: 15,
          mainStat: "SPD",
          mainStatValue: "25",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/101_3.png",
          slot: "Feet",
          subStats: [
            { stat: "HP%", value: "8.6%" },
            { stat: "ATK", value: "19" },
            { stat: "DEF%", value: "5.8%" },
            { stat: "CRIT Rate%", value: "2.9%" },
          ],
        },
      ],
      planarRelics: [
        {
          name: "Fleet of the Ageless",
          level: 15,
          mainStat: "HP%",
          mainStatValue: "43.2%",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/301_0.png",
          slot: "Planar Sphere",
          subStats: [
            { stat: "ATK%", value: "4.3%" },
            { stat: "DEF", value: "19" },
            { stat: "CRIT Rate%", value: "2.9%" },
          ],
        },
        {
          name: "Fleet of the Ageless",
          level: 15,
          mainStat: "Energy Regen Rate",
          mainStatValue: "19.4%",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/301_1.png",
          slot: "Link Rope",
          subStats: [
            { stat: "HP", value: "42" },
            { stat: "ATK%", value: "4.3%" },
            { stat: "DEF%", value: "5.8%" },
          ],
        },
      ],
      relicSetEffects: [
        {
          setName: "Knight of Purity Palace",
          pieces: 2,
          effect: "Increases DEF by 15%.",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/101.png",
        },
        {
          setName: "Knight of Purity Palace",
          pieces: 4,
          effect:
            "Increases DEF by 15%. When the wearer is hit or hits an enemy target, they regenerate 2 Energy. This effect can only be triggered once per turn.",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/101.png",
        },
        {
          setName: "Fleet of the Ageless",
          pieces: 2,
          effect:
            "Increases the wearer's Max HP by 12%. When the wearer's SPD reaches 120 or higher, all allies' ATK increases by 8%.",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/301.png",
        },
      ],
    },
    {
      id: "1002",
      name: "Dan Heng",
      element: "Wind",
      path: "Hunt",
      level: 80,
      icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/image/character_preview/1002.png",
      portrait:
        "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/image/character_portrait/1002.png",
      eidolon: 0,
      rarity: 4,
      stats: {
        baseHp: 882,
        baseAtk: 546,
        baseDef: 396,
        spd: 110,
        critRate: 5.0,
        critDmg: 50.0,
        effectHitRate: 0.0,
        effectRes: 0.0,
        elementDmg: 0.0,
        breakEffect: 0.0,
        energyRegenRate: 100.0,
      },
      lightCone: {
        name: "In the Night",
        level: 80,
        superimposition: 1,
        icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/light_cone/21001.png",
        rarity: 5,
        path: "Hunt",
      },
      cavityRelics: [
        {
          name: "Eagle of Twilight Line",
          level: 15,
          mainStat: "HP",
          mainStatValue: "705",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/102_0.png",
          slot: "Head",
          subStats: [
            { stat: "ATK%", value: "4.3%" },
            { stat: "DEF%", value: "5.8%" },
            { stat: "CRIT Rate%", value: "2.9%" },
            { stat: "SPD", value: "2" },
          ],
        },
        {
          name: "Eagle of Twilight Line",
          level: 15,
          mainStat: "ATK",
          mainStatValue: "352",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/102_1.png",
          slot: "Hands",
          subStats: [
            { stat: "HP%", value: "4.3%" },
            { stat: "DEF%", value: "5.8%" },
            { stat: "CRIT DMG%", value: "5.8%" },
            { stat: "Effect RES%", value: "3.9%" },
          ],
        },
        {
          name: "Eagle of Twilight Line",
          level: 15,
          mainStat: "Wind DMG%",
          mainStatValue: "38.8%",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/102_2.png",
          slot: "Body",
          subStats: [
            { stat: "HP", value: "42" },
            { stat: "ATK%", value: "4.3%" },
            { stat: "CRIT Rate%", value: "2.9%" },
            { stat: "SPD", value: "2" },
          ],
        },
        {
          name: "Eagle of Twilight Line",
          level: 15,
          mainStat: "SPD",
          mainStatValue: "25",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/102_3.png",
          slot: "Feet",
          subStats: [
            { stat: "HP%", value: "4.3%" },
            { stat: "ATK%", value: "4.3%" },
            { stat: "DEF%", value: "5.8%" },
            { stat: "CRIT DMG%", value: "5.8%" },
          ],
        },
      ],
      planarRelics: [
        {
          name: "Space Sealing Station",
          level: 15,
          mainStat: "ATK%",
          mainStatValue: "43.2%",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/302_0.png",
          slot: "Planar Sphere",
          subStats: [
            { stat: "HP%", value: "4.3%" },
            { stat: "DEF%", value: "5.8%" },
            { stat: "CRIT Rate%", value: "2.9%" },
          ],
        },
        {
          name: "Space Sealing Station",
          level: 15,
          mainStat: "ATK%",
          mainStatValue: "43.2%",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/302_1.png",
          slot: "Link Rope",
          subStats: [
            { stat: "HP", value: "42" },
            { stat: "DEF%", value: "5.8%" },
            { stat: "CRIT DMG%", value: "5.8%" },
          ],
        },
      ],
      relicSetEffects: [
        {
          setName: "Eagle of Twilight Line",
          pieces: 2,
          effect: "Increases Wind DMG by 10%.",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/102.png",
        },
        {
          setName: "Eagle of Twilight Line",
          pieces: 4,
          effect:
            "Increases Wind DMG by 10%. After the wearer uses their Ultimate, their action is Advanced Forward by 25%.",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/102.png",
        },
        {
          setName: "Space Sealing Station",
          pieces: 2,
          effect:
            "Increases the wearer's ATK by 12%. When the wearer's SPD reaches 120 or higher, the wearer's ATK increases by an extra 12%.",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/302.png",
        },
      ],
    },
    {
      id: "1003",
      name: "Himeko",
      element: "Fire",
      path: "Erudition",
      level: 80,
      icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/image/character_preview/1003.png",
      portrait:
        "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/image/character_portrait/1003.png",
      eidolon: 1,
      rarity: 5,
      stats: {
        baseHp: 1047,
        baseAtk: 756,
        baseDef: 463,
        spd: 96,
        critRate: 5.0,
        critDmg: 50.0,
        effectHitRate: 0.0,
        effectRes: 0.0,
        elementDmg: 0.0,
        breakEffect: 0.0,
        energyRegenRate: 100.0,
      },
      lightCone: {
        name: "Night on the Milky Way",
        level: 80,
        superimposition: 1,
        icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/light_cone/23002.png",
        rarity: 5,
        path: "Erudition",
      },
      cavityRelics: [
        {
          name: "Firesmith of Lava-Forging",
          level: 15,
          mainStat: "HP",
          mainStatValue: "705",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/103_0.png",
          slot: "Head",
          subStats: [
            { stat: "ATK%", value: "4.3%" },
            { stat: "DEF%", value: "5.8%" },
            { stat: "CRIT Rate%", value: "2.9%" },
            { stat: "SPD", value: "2" },
          ],
        },
        {
          name: "Firesmith of Lava-Forging",
          level: 15,
          mainStat: "ATK",
          mainStatValue: "352",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/103_1.png",
          slot: "Hands",
          subStats: [
            { stat: "HP%", value: "4.3%" },
            { stat: "DEF%", value: "5.8%" },
            { stat: "CRIT DMG%", value: "5.8%" },
            { stat: "Effect RES%", value: "3.9%" },
          ],
        },
        {
          name: "Firesmith of Lava-Forging",
          level: 15,
          mainStat: "Fire DMG%",
          mainStatValue: "38.8%",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/103_2.png",
          slot: "Body",
          subStats: [
            { stat: "HP", value: "42" },
            { stat: "ATK%", value: "4.3%" },
            { stat: "CRIT Rate%", value: "2.9%" },
            { stat: "SPD", value: "2" },
          ],
        },
        {
          name: "Firesmith of Lava-Forging",
          level: 15,
          mainStat: "ATK%",
          mainStatValue: "43.2%",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/103_3.png",
          slot: "Feet",
          subStats: [
            { stat: "HP%", value: "4.3%" },
            { stat: "DEF%", value: "5.8%" },
            { stat: "CRIT DMG%", value: "5.8%" },
            { stat: "Effect Hit Rate%", value: "3.9%" },
          ],
        },
      ],
      planarRelics: [
        {
          name: "Celestial Differentiator",
          level: 15,
          mainStat: "ATK%",
          mainStatValue: "43.2%",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/303_0.png",
          slot: "Planar Sphere",
          subStats: [
            { stat: "HP%", value: "4.3%" },
            { stat: "DEF%", value: "5.8%" },
            { stat: "CRIT Rate%", value: "2.9%" },
          ],
        },
        {
          name: "Celestial Differentiator",
          level: 15,
          mainStat: "ATK%",
          mainStatValue: "43.2%",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/303_1.png",
          slot: "Link Rope",
          subStats: [
            { stat: "HP", value: "42" },
            { stat: "DEF%", value: "5.8%" },
            { stat: "CRIT DMG%", value: "5.8%" },
          ],
        },
      ],
      relicSetEffects: [
        {
          setName: "Firesmith of Lava-Forging",
          pieces: 2,
          effect: "Increases Fire DMG by 10%.",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/103.png",
        },
        {
          setName: "Firesmith of Lava-Forging",
          pieces: 4,
          effect:
            "Increases Fire DMG by 10%. After using Skill, increases the wearer's next Basic ATK DMG by 12%.",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/103.png",
        },
        {
          setName: "Celestial Differentiator",
          pieces: 2,
          effect:
            "Increases the wearer's CRIT DMG by 16%. When the wearer's current CRIT DMG reaches 120% or higher, after entering battle, the wearer's CRIT Rate increases by 60% until the end of their first attack.",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/303.png",
        },
      ],
    },
    {
      id: "1004",
      name: "Welt",
      element: "Imaginary",
      path: "Nihility",
      level: 80,
      icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/image/character_preview/1004.png",
      portrait:
        "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/image/character_portrait/1004.png",
      eidolon: 0,
      rarity: 5,
      stats: {
        baseHp: 1125,
        baseAtk: 620,
        baseDef: 509,
        spd: 102,
        critRate: 5.0,
        critDmg: 50.0,
        effectHitRate: 0.0,
        effectRes: 0.0,
        elementDmg: 0.0,
        breakEffect: 0.0,
        energyRegenRate: 100.0,
      },
      lightCone: {
        name: "In the Name of the World",
        level: 80,
        superimposition: 1,
        icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/light_cone/23001.png",
        rarity: 5,
        path: "Nihility",
      },
      cavityRelics: [
        {
          name: "Genius of Brilliant Stars",
          level: 15,
          mainStat: "HP",
          mainStatValue: "705",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/104_0.png",
          slot: "Head",
          subStats: [
            { stat: "ATK%", value: "4.3%" },
            { stat: "DEF%", value: "5.8%" },
            { stat: "CRIT Rate%", value: "2.9%" },
            { stat: "SPD", value: "2" },
          ],
        },
        {
          name: "Genius of Brilliant Stars",
          level: 15,
          mainStat: "ATK",
          mainStatValue: "352",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/104_1.png",
          slot: "Hands",
          subStats: [
            { stat: "HP%", value: "4.3%" },
            { stat: "DEF%", value: "5.8%" },
            { stat: "CRIT DMG%", value: "5.8%" },
            { stat: "Effect RES%", value: "3.9%" },
          ],
        },
        {
          name: "Genius of Brilliant Stars",
          level: 15,
          mainStat: "Imaginary DMG%",
          mainStatValue: "38.8%",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/104_2.png",
          slot: "Body",
          subStats: [
            { stat: "HP", value: "42" },
            { stat: "ATK%", value: "4.3%" },
            { stat: "CRIT Rate%", value: "2.9%" },
            { stat: "SPD", value: "2" },
          ],
        },
        {
          name: "Genius of Brilliant Stars",
          level: 15,
          mainStat: "ATK%",
          mainStatValue: "43.2%",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/104_3.png",
          slot: "Feet",
          subStats: [
            { stat: "HP%", value: "4.3%" },
            { stat: "DEF%", value: "5.8%" },
            { stat: "CRIT DMG%", value: "5.8%" },
            { stat: "Effect Hit Rate%", value: "3.9%" },
          ],
        },
      ],
      planarRelics: [
        {
          name: "Pan-Cosmic Commercial Enterprise",
          level: 15,
          mainStat: "ATK%",
          mainStatValue: "43.2%",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/304_0.png",
          slot: "Planar Sphere",
          subStats: [
            { stat: "HP%", value: "4.3%" },
            { stat: "DEF%", value: "5.8%" },
            { stat: "CRIT Rate%", value: "2.9%" },
          ],
        },
        {
          name: "Pan-Cosmic Commercial Enterprise",
          level: 15,
          mainStat: "ATK%",
          mainStatValue: "43.2%",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/304_1.png",
          slot: "Link Rope",
          subStats: [
            { stat: "HP", value: "42" },
            { stat: "DEF%", value: "5.8%" },
            { stat: "CRIT DMG%", value: "5.8%" },
          ],
        },
      ],
      relicSetEffects: [
        {
          setName: "Genius of Brilliant Stars",
          pieces: 2,
          effect: "Increases Quantum DMG by 10%.",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/104.png",
        },
        {
          setName: "Genius of Brilliant Stars",
          pieces: 4,
          effect:
            "Increases Quantum DMG by 10%. When the wearer deals DMG to the target enemy, ignores 10% DEF. If the target enemy has Quantum Weakness, the wearer additionally ignores 10% DEF.",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/104.png",
        },
        {
          setName: "Pan-Cosmic Commercial Enterprise",
          pieces: 2,
          effect:
            "Increases the wearer's Effect Hit Rate by 10%. Meanwhile, the wearer's ATK increases by an amount that is equal to 25% of the current Effect Hit Rate, up to a maximum of 25%.",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/304.png",
        },
      ],
    },
    {
      id: "1005",
      name: "Kafka",
      element: "Lightning",
      path: "Nihility",
      level: 80,
      icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/image/character_preview/1005.png",
      portrait:
        "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/image/character_portrait/1005.png",
      eidolon: 2,
      rarity: 5,
      stats: {
        baseHp: 1086,
        baseAtk: 679,
        baseDef: 485,
        spd: 104,
        critRate: 5.0,
        critDmg: 50.0,
        effectHitRate: 0.0,
        effectRes: 0.0,
        elementDmg: 0.0,
        breakEffect: 0.0,
        energyRegenRate: 100.0,
      },
      lightCone: {
        name: "Patience Is All You Need",
        level: 80,
        superimposition: 1,
        icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/light_cone/23042.png",
        rarity: 5,
        path: "Nihility",
      },
      cavityRelics: [
        {
          name: "Band of Sizzling Thunder",
          level: 15,
          mainStat: "HP",
          mainStatValue: "705",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/105_0.png",
          slot: "Head",
          subStats: [
            { stat: "ATK%", value: "4.3%" },
            { stat: "DEF%", value: "5.8%" },
            { stat: "CRIT Rate%", value: "2.9%" },
            { stat: "SPD", value: "2" },
          ],
        },
        {
          name: "Band of Sizzling Thunder",
          level: 15,
          mainStat: "ATK",
          mainStatValue: "352",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/105_1.png",
          slot: "Hands",
          subStats: [
            { stat: "HP%", value: "4.3%" },
            { stat: "DEF%", value: "5.8%" },
            { stat: "CRIT DMG%", value: "5.8%" },
            { stat: "Effect RES%", value: "3.9%" },
          ],
        },
        {
          name: "Band of Sizzling Thunder",
          level: 15,
          mainStat: "Lightning DMG%",
          mainStatValue: "38.8%",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/105_2.png",
          slot: "Body",
          subStats: [
            { stat: "HP", value: "42" },
            { stat: "ATK%", value: "4.3%" },
            { stat: "CRIT Rate%", value: "2.9%" },
            { stat: "SPD", value: "2" },
          ],
        },
        {
          name: "Band of Sizzling Thunder",
          level: 15,
          mainStat: "ATK%",
          mainStatValue: "43.2%",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/105_3.png",
          slot: "Feet",
          subStats: [
            { stat: "HP%", value: "4.3%" },
            { stat: "DEF%", value: "5.8%" },
            { stat: "CRIT DMG%", value: "5.8%" },
            { stat: "Effect Hit Rate%", value: "3.9%" },
          ],
        },
      ],
      planarRelics: [
        {
          name: "Firmament Frontline: Glamoth",
          level: 15,
          mainStat: "ATK%",
          mainStatValue: "43.2%",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/305_0.png",
          slot: "Planar Sphere",
          subStats: [
            { stat: "HP%", value: "4.3%" },
            { stat: "DEF%", value: "5.8%" },
            { stat: "CRIT Rate%", value: "2.9%" },
          ],
        },
        {
          name: "Firmament Frontline: Glamoth",
          level: 15,
          mainStat: "ATK%",
          mainStatValue: "43.2%",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/305_1.png",
          slot: "Link Rope",
          subStats: [
            { stat: "HP", value: "42" },
            { stat: "DEF%", value: "5.8%" },
            { stat: "CRIT DMG%", value: "5.8%" },
          ],
        },
      ],
      relicSetEffects: [
        {
          setName: "Band of Sizzling Thunder",
          pieces: 2,
          effect: "Increases Lightning DMG by 10%.",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/105.png",
        },
        {
          setName: "Band of Sizzling Thunder",
          pieces: 4,
          effect:
            "Increases Lightning DMG by 10%. When the wearer uses their Skill, increases the wearer's ATK by 20% for 1 turn.",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/105.png",
        },
        {
          setName: "Firmament Frontline: Glamoth",
          pieces: 2,
          effect:
            "Increases the wearer's ATK by 12%. When the wearer's SPD reaches 135/160 or higher, the wearer deals 12%/18% more DMG.",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/305.png",
        },
      ],
    },
    {
      id: "1006",
      name: "Silver Wolf",
      element: "Quantum",
      path: "Nihility",
      level: 80,
      icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/image/character_preview/1006.png",
      portrait:
        "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/image/character_portrait/1006.png",
      eidolon: 1,
      rarity: 5,
      stats: {
        baseHp: 1047,
        baseAtk: 640,
        baseDef: 460,
        spd: 107,
        critRate: 5.0,
        critDmg: 50.0,
        effectHitRate: 0.0,
        effectRes: 0.0,
        elementDmg: 0.0,
        breakEffect: 0.0,
        energyRegenRate: 100.0,
      },
      lightCone: {
        name: "Incessant Rain",
        level: 80,
        superimposition: 3,
        icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/light_cone/21004.png",
        rarity: 5,
        path: "Nihility",
      },
      cavityRelics: [
        {
          name: "Genius of Brilliant Stars",
          level: 15,
          mainStat: "HP",
          mainStatValue: "705",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/104_0.png",
          slot: "Head",
          subStats: [
            { stat: "ATK%", value: "4.3%" },
            { stat: "DEF%", value: "5.8%" },
            { stat: "CRIT Rate%", value: "2.9%" },
            { stat: "SPD", value: "2" },
          ],
        },
        {
          name: "Genius of Brilliant Stars",
          level: 15,
          mainStat: "ATK",
          mainStatValue: "352",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/104_1.png",
          slot: "Hands",
          subStats: [
            { stat: "HP%", value: "4.3%" },
            { stat: "DEF%", value: "5.8%" },
            { stat: "CRIT DMG%", value: "5.8%" },
            { stat: "Effect RES%", value: "3.9%" },
          ],
        },
        {
          name: "Genius of Brilliant Stars",
          level: 15,
          mainStat: "Quantum DMG%",
          mainStatValue: "38.8%",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/104_2.png",
          slot: "Body",
          subStats: [
            { stat: "HP", value: "42" },
            { stat: "ATK%", value: "4.3%" },
            { stat: "CRIT Rate%", value: "2.9%" },
            { stat: "SPD", value: "2" },
          ],
        },
        {
          name: "Genius of Brilliant Stars",
          level: 15,
          mainStat: "ATK%",
          mainStatValue: "43.2%",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/104_3.png",
          slot: "Feet",
          subStats: [
            { stat: "HP%", value: "4.3%" },
            { stat: "DEF%", value: "5.8%" },
            { stat: "CRIT DMG%", value: "5.8%" },
            { stat: "Effect Hit Rate%", value: "3.9%" },
          ],
        },
      ],
      planarRelics: [
        {
          name: "Inert Salsotto",
          level: 15,
          mainStat: "ATK%",
          mainStatValue: "43.2%",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/306_0.png",
          slot: "Planar Sphere",
          subStats: [
            { stat: "HP%", value: "4.3%" },
            { stat: "DEF%", value: "5.8%" },
            { stat: "CRIT Rate%", value: "2.9%" },
          ],
        },
        {
          name: "Inert Salsotto",
          level: 15,
          mainStat: "ATK%",
          mainStatValue: "43.2%",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/306_1.png",
          slot: "Link Rope",
          subStats: [
            { stat: "HP", value: "42" },
            { stat: "DEF%", value: "5.8%" },
            { stat: "CRIT DMG%", value: "5.8%" },
          ],
        },
      ],
      relicSetEffects: [
        {
          setName: "Genius of Brilliant Stars",
          pieces: 2,
          effect: "Increases Quantum DMG by 10%.",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/104.png",
        },
        {
          setName: "Genius of Brilliant Stars",
          pieces: 4,
          effect:
            "Increases Quantum DMG by 10%. When the wearer deals DMG to the target enemy, ignores 10% DEF. If the target enemy has Quantum Weakness, the wearer additionally ignores 10% DEF.",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/104.png",
        },
        {
          setName: "Inert Salsotto",
          pieces: 2,
          effect:
            "Increases the wearer's CRIT Rate by 8%. When the wearer's current CRIT Rate reaches 50% or higher, the wearer's Ultimate and follow-up attack DMG increases by 15%.",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/306.png",
        },
      ],
    },
    {
      id: "1007",
      name: "Seele",
      element: "Quantum",
      path: "Hunt",
      level: 80,
      icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/image/character_preview/1102.png",
      portrait:
        "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/image/character_portrait/1102.png",
      eidolon: 0,
      rarity: 5,
      stats: {
        baseHp: 931,
        baseAtk: 640,
        baseDef: 363,
        spd: 115,
        critRate: 5.0,
        critDmg: 50.0,
        effectHitRate: 0.0,
        effectRes: 0.0,
        elementDmg: 0.0,
        breakEffect: 0.0,
        energyRegenRate: 100.0,
      },
      lightCone: {
        name: "In the Night",
        level: 80,
        superimposition: 1,
        icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/light_cone/21001.png",
        rarity: 5,
        path: "Hunt",
      },
      cavityRelics: [
        {
          name: "Hunter of Glacial Forest",
          level: 15,
          mainStat: "HP",
          mainStatValue: "705",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/106_0.png",
          slot: "Head",
          subStats: [
            { stat: "ATK%", value: "4.3%" },
            { stat: "DEF%", value: "5.8%" },
            { stat: "CRIT Rate%", value: "2.9%" },
            { stat: "SPD", value: "2" },
          ],
        },
        {
          name: "Hunter of Glacial Forest",
          level: 15,
          mainStat: "ATK",
          mainStatValue: "352",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/106_1.png",
          slot: "Hands",
          subStats: [
            { stat: "HP%", value: "4.3%" },
            { stat: "DEF%", value: "5.8%" },
            { stat: "CRIT DMG%", value: "5.8%" },
            { stat: "Effect RES%", value: "3.9%" },
          ],
        },
        {
          name: "Hunter of Glacial Forest",
          level: 15,
          mainStat: "Quantum DMG%",
          mainStatValue: "38.8%",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/106_2.png",
          slot: "Body",
          subStats: [
            { stat: "HP", value: "42" },
            { stat: "ATK%", value: "4.3%" },
            { stat: "CRIT Rate%", value: "2.9%" },
            { stat: "SPD", value: "2" },
          ],
        },
        {
          name: "Hunter of Glacial Forest",
          level: 15,
          mainStat: "ATK%",
          mainStatValue: "43.2%",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/106_3.png",
          slot: "Feet",
          subStats: [
            { stat: "HP%", value: "4.3%" },
            { stat: "DEF%", value: "5.8%" },
            { stat: "CRIT DMG%", value: "5.8%" },
            { stat: "Effect Hit Rate%", value: "3.9%" },
          ],
        },
      ],
      planarRelics: [
        {
          name: "Rutilant Arena",
          level: 15,
          mainStat: "ATK%",
          mainStatValue: "43.2%",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/307_0.png",
          slot: "Planar Sphere",
          subStats: [
            { stat: "HP%", value: "4.3%" },
            { stat: "DEF%", value: "5.8%" },
            { stat: "CRIT Rate%", value: "2.9%" },
          ],
        },
        {
          name: "Rutilant Arena",
          level: 15,
          mainStat: "ATK%",
          mainStatValue: "43.2%",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/307_1.png",
          slot: "Link Rope",
          subStats: [
            { stat: "HP", value: "42" },
            { stat: "DEF%", value: "5.8%" },
            { stat: "CRIT DMG%", value: "5.8%" },
          ],
        },
      ],
      relicSetEffects: [
        {
          setName: "Hunter of Glacial Forest",
          pieces: 2,
          effect: "Increases Ice DMG by 10%.",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/106.png",
        },
        {
          setName: "Hunter of Glacial Forest",
          pieces: 4,
          effect:
            "Increases Ice DMG by 10%. After the wearer uses their Ultimate, their CRIT DMG increases by 25% for 2 turn(s).",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/106.png",
        },
        {
          setName: "Rutilant Arena",
          pieces: 2,
          effect:
            "Increases the wearer's CRIT Rate by 8%. When the wearer's current CRIT Rate reaches 70% or higher, the wearer's Basic ATK and Skill DMG increase by 20%.",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/307.png",
        },
      ],
    },
    {
      id: "1008",
      name: "Bronya",
      element: "Wind",
      path: "Harmony",
      level: 80,
      icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/image/character_preview/1101.png",
      portrait:
        "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/image/character_portrait/1101.png",
      eidolon: 1,
      rarity: 5,
      stats: {
        baseHp: 1241,
        baseAtk: 582,
        baseDef: 533,
        spd: 99,
        critRate: 5.0,
        critDmg: 50.0,
        effectHitRate: 0.0,
        effectRes: 0.0,
        elementDmg: 0.0,
        breakEffect: 0.0,
        energyRegenRate: 100.0,
      },
      lightCone: {
        name: "But the Battle Isn't Over",
        level: 80,
        superimposition: 1,
        icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/light_cone/23004.png",
        rarity: 5,
        path: "Harmony",
      },
      cavityRelics: [
        {
          name: "Musketeer of Wild Wheat",
          level: 15,
          mainStat: "HP",
          mainStatValue: "705",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/107_0.png",
          slot: "Head",
          subStats: [
            { stat: "ATK%", value: "4.3%" },
            { stat: "DEF%", value: "5.8%" },
            { stat: "CRIT Rate%", value: "2.9%" },
            { stat: "SPD", value: "2" },
          ],
        },
        {
          name: "Musketeer of Wild Wheat",
          level: 15,
          mainStat: "ATK",
          mainStatValue: "352",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/107_1.png",
          slot: "Hands",
          subStats: [
            { stat: "HP%", value: "4.3%" },
            { stat: "DEF%", value: "5.8%" },
            { stat: "CRIT DMG%", value: "5.8%" },
            { stat: "Effect RES%", value: "3.9%" },
          ],
        },
        {
          name: "Musketeer of Wild Wheat",
          level: 15,
          mainStat: "Wind DMG%",
          mainStatValue: "38.8%",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/107_2.png",
          slot: "Body",
          subStats: [
            { stat: "HP", value: "42" },
            { stat: "ATK%", value: "4.3%" },
            { stat: "CRIT Rate%", value: "2.9%" },
            { stat: "SPD", value: "2" },
          ],
        },
        {
          name: "Musketeer of Wild Wheat",
          level: 15,
          mainStat: "SPD",
          mainStatValue: "25",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/107_3.png",
          slot: "Feet",
          subStats: [
            { stat: "HP%", value: "4.3%" },
            { stat: "ATK%", value: "4.3%" },
            { stat: "DEF%", value: "5.8%" },
            { stat: "CRIT DMG%", value: "5.8%" },
          ],
        },
      ],
      planarRelics: [
        {
          name: "Broken Keel",
          level: 15,
          mainStat: "ATK%",
          mainStatValue: "43.2%",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/308_0.png",
          slot: "Planar Sphere",
          subStats: [
            { stat: "HP%", value: "4.3%" },
            { stat: "DEF%", value: "5.8%" },
            { stat: "CRIT Rate%", value: "2.9%" },
          ],
        },
        {
          name: "Broken Keel",
          level: 15,
          mainStat: "Energy Regen Rate",
          mainStatValue: "19.4%",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/308_1.png",
          slot: "Link Rope",
          subStats: [
            { stat: "HP", value: "42" },
            { stat: "ATK%", value: "4.3%" },
            { stat: "DEF%", value: "5.8%" },
          ],
        },
      ],
      relicSetEffects: [
        {
          setName: "Musketeer of Wild Wheat",
          pieces: 2,
          effect: "ATK increases by 12%.",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/107.png",
        },
        {
          setName: "Musketeer of Wild Wheat",
          pieces: 4,
          effect:
            "ATK increases by 12%. The wearer's SPD increases by 6% and Basic ATK DMG increases by 10%.",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/107.png",
        },
        {
          setName: "Broken Keel",
          pieces: 2,
          effect:
            "Increases the wearer's Effect RES by 10%. When the wearer's Effect RES is at 30% or higher, all allies' CRIT DMG increases by 10%.",
          icon: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/308.png",
        },
      ],
    },
  ];

  // Set first character as default when characters tab is active
  React.useEffect(() => {
    if (
      activeTab === "characters" &&
      !selectedCharacter &&
      characters.length > 0
    ) {
      setSelectedCharacter(characters[0]);
    }
  }, [activeTab, selectedCharacter, characters]);

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

      <div
        className={`relative z-10 min-h-screen flex flex-col items-center p-4 pb-16 ${
          activeTab === "info" ? "justify-center" : "justify-start pt-20"
        }`}
      >
        <div
          className={`w-full max-w-7xl mx-auto relative ${
            activeTab === "info" ? "" : "mt-8"
          }`}
        >
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

          <div className="bg-white border-2 md:border-4 border-black p-4 md:p-8 relative pt-12 md:pt-16 space-y-6 overflow-visible">
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
              <div className="relative">
                <h3 className="text-xl font-bold text-black mb-4 uppercase tracking-wide">
                  CHARACTER ROSTER
                </h3>
                <div className="flex flex-wrap gap-0 mb-0 relative top-1">
                  {characters.map((character, index) => (
                    <button
                      key={character.id}
                      onClick={() => setSelectedCharacter(character)}
                      className={`border-2 border-black px-4 py-2 font-bold text-sm uppercase tracking-wide relative ${
                        selectedCharacter?.id === character.id
                          ? "bg-black text-white border-b-black z-20"
                          : "bg-white hover:bg-gray-100 -mr-0.5"
                      } ${index > 0 ? "-ml-0.5" : ""}`}
                    >
                      {character.name}
                    </button>
                  ))}
                </div>
                {selectedCharacter && (
                  <div className="border-2 border-black p-4 bg-white relative z-30">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-x-3">
                      {/* Character Info */}
                      <div className="lg:col-span-4 flex flex-col items-center">
                        <img
                          src={selectedCharacter.portrait}
                          alt={selectedCharacter.name}
                          className="w-32 h-32 object-cover border-2 border-black mb-3"
                        />
                        <h4 className="text-lg font-black uppercase tracking-widest bg-black text-white px-3 py-1 border-2 border-black transform -skew-x-12 inline-block">
                          <span className="transform skew-x-12 inline-block">
                            {selectedCharacter.name}
                          </span>
                        </h4>
                        <div
                          className="mt-2"
                          title={`${selectedCharacter.rarity}-Star`}
                        >
                          <span
                            className="text-black text-base md:text-lg leading-none"
                            aria-hidden="true"
                          >
                            {"★".repeat(selectedCharacter.rarity)}
                          </span>
                          <span className="sr-only">
                            {selectedCharacter.rarity}-Star
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm mt-3 w-full">
                          <div className="text-center">
                            <span className="font-bold block text-xs">
                              ELEMENT
                            </span>
                            <span className="font-mono">
                              {selectedCharacter.element}
                            </span>
                          </div>
                          <div className="text-center">
                            <span className="font-bold block text-xs">
                              PATH
                            </span>
                            <span className="font-mono">
                              {selectedCharacter.path}
                            </span>
                          </div>
                          <div className="text-center">
                            <span className="font-bold block text-xs">
                              LEVEL
                            </span>
                            <span className="font-mono">
                              {selectedCharacter.level}
                            </span>
                          </div>
                          <div className="text-center">
                            <span className="font-bold block text-xs">
                              EIDOLON
                            </span>
                            <span className="font-mono">
                              E{selectedCharacter.eidolon}
                            </span>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="w-full mt-2">
                          <h5 className="text-sm font-black uppercase tracking-widest bg-black text-white px-3 py-1 border-2 border-black transform -skew-x-12 inline-block mb-3">
                            <span className="transform skew-x-12 inline-block">
                              STATS
                            </span>
                          </h5>
                          <div className="bg-white border-2 border-black p-3 relative text-sm">
                            <div className="grid grid-cols-2 gap-x-6 gap-y-1 relative">
                              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-black"></div>
                              <div className="flex justify-between">
                                <span className="font-bold text-gray-700">
                                  HP:
                                </span>
                                <span className="font-mono font-black">
                                  {selectedCharacter.stats.baseHp}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-bold text-gray-700">
                                  ATK:
                                </span>
                                <span className="font-mono font-black">
                                  {selectedCharacter.stats.baseAtk}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-bold text-gray-700">
                                  DEF:
                                </span>
                                <span className="font-mono font-black">
                                  {selectedCharacter.stats.baseDef}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-bold text-gray-700">
                                  SPD:
                                </span>
                                <span className="font-mono font-black">
                                  {selectedCharacter.stats.spd}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-bold text-gray-700">
                                  CRIT Rate:
                                </span>
                                <span className="font-mono font-black">
                                  {selectedCharacter.stats.critRate}%
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-bold text-gray-700">
                                  CRIT DMG:
                                </span>
                                <span className="font-mono font-black">
                                  {selectedCharacter.stats.critDmg}%
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-bold text-gray-700">
                                  Effect Hit:
                                </span>
                                <span className="font-mono font-black">
                                  {selectedCharacter.stats.effectHitRate}%
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-bold text-gray-700">
                                  Effect RES:
                                </span>
                                <span className="font-mono font-black">
                                  {selectedCharacter.stats.effectRes}%
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-bold text-gray-700">
                                  {selectedCharacter.element} DMG:
                                </span>
                                <span className="font-mono font-black">
                                  {selectedCharacter.stats.elementDmg}%
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-bold text-gray-700">
                                  Break Effect:
                                </span>
                                <span className="font-mono font-black">
                                  {selectedCharacter.stats.breakEffect}%
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-bold text-gray-700 whitespace-nowrap">
                                  Energy Regen:
                                </span>
                                <span className="font-mono font-black">
                                  {selectedCharacter.stats.energyRegenRate}%
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Light Cone and Set Effects */}
                      <div className="lg:col-span-3">
                        <h5 className="text-sm font-black uppercase tracking-widest bg-black text-white px-3 py-1 border-2 border-black transform -skew-x-12 inline-block mb-3">
                          <span className="transform skew-x-12 inline-block">
                            LIGHT CONE
                          </span>
                        </h5>
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="relative">
                            <img
                              src={selectedCharacter.lightCone.icon}
                              alt={selectedCharacter.lightCone.name}
                              className="w-20 h-20 object-cover border-2 border-black"
                            />
                            <div className="absolute -top-1 -right-1 bg-black text-white text-sm px-1.5 py-0.5 font-black">
                              {selectedCharacter.lightCone.superimposition}
                            </div>
                          </div>
                          <div className="text-sm">
                            <div className="font-mono font-bold break-words mb-1">
                              {selectedCharacter.lightCone.name}
                            </div>
                            <div
                              className="text-black leading-none mb-1"
                              aria-hidden="true"
                            >
                              {"★".repeat(selectedCharacter.lightCone.rarity)}
                            </div>
                            <div className="font-mono mb-0.5">
                              Path: {selectedCharacter.lightCone.path}
                            </div>
                            <div className="font-mono">
                              Level: {selectedCharacter.lightCone.level}
                            </div>
                          </div>
                        </div>

                        <h5 className="text-sm font-black uppercase tracking-widest bg-black text-white px-3 py-1 border-2 border-black transform -skew-x-12 inline-block mb-3">
                          <span className="transform skew-x-12 inline-block">
                            SET EFFECTS
                          </span>
                        </h5>
                        <div className="grid grid-cols-1 gap-2">
                          {selectedCharacter.relicSetEffects
                            ?.filter((se) => !se.icon.includes("/relic/3"))
                            .map((setEffect, index) => (
                              <div
                                key={`relic-${index}`}
                                className="bg-white border-2 border-black p-2 h-full"
                              >
                                <div className="flex items-center mb-1">
                                  <div className="relative mr-2">
                                    <img
                                      src={setEffect.icon}
                                      alt={setEffect.setName}
                                      className="w-8 h-8 object-cover border border-black"
                                    />
                                    <div className="absolute -top-1 -right-1 bg-black text-white text-xs px-1 font-black">
                                      {setEffect.pieces}
                                    </div>
                                  </div>
                                  <div className="font-bold text-xs uppercase">
                                    {setEffect.setName}
                                  </div>
                                </div>
                                <div className="text-xs font-mono leading-tight">
                                  {setEffect.effect}
                                </div>
                              </div>
                            ))}

                          {selectedCharacter.relicSetEffects?.some((se) =>
                            se.icon.includes("/relic/3")
                          ) && (
                            <div className="space-y-2">
                              {selectedCharacter.relicSetEffects
                                ?.filter((se) => se.icon.includes("/relic/3"))
                                .map((setEffect, index) => (
                                  <div
                                    key={`planar-${index}`}
                                    className="bg-white border-2 border-black p-2"
                                  >
                                    <div className="flex items-center mb-1">
                                      <div className="relative mr-2">
                                        <img
                                          src={setEffect.icon}
                                          alt={setEffect.setName}
                                          className="w-8 h-8 object-cover border border-black"
                                        />
                                        <div className="absolute -top-1 -right-1 bg-black text-white text-xs px-1 font-black">
                                          {setEffect.pieces}
                                        </div>
                                      </div>
                                      <div className="font-bold text-xs uppercase">
                                        {setEffect.setName}
                                      </div>
                                    </div>
                                    <div className="text-xs font-mono leading-tight">
                                      {setEffect.effect}
                                    </div>
                                  </div>
                                ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Set Effects moved into Light Cone section above */}

                      {/* Relics & Planar - combined section, 3-column cards */}
                      <div className="lg:col-span-5 lg:col-start-8 lg:row-start-1">
                        <h5 className="text-sm font-black uppercase tracking-widest bg-black text-white px-3 py-1 border-2 border-black transform -skew-x-12 inline-block mb-3">
                          <span className="transform skew-x-12 inline-block">
                            RELICS &amp; PLANAR
                          </span>
                        </h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                          {[
                            ...selectedCharacter.cavityRelics,
                            ...selectedCharacter.planarRelics,
                          ].map((relic, index) => (
                            <div
                              key={index}
                              className="bg-white border-2 border-black p-2"
                            >
                              <div>
                                <div className="flex items-start space-x-2">
                                  <div className="relative">
                                    <div className="w-10 h-10 border border-black bg-white flex items-center justify-center">
                                      <img
                                        src={relic.icon}
                                        alt={relic.name}
                                        className="w-8 h-8 object-cover"
                                      />
                                    </div>
                                    <div className="absolute -top-1 -right-1 bg-black text-white text-xs px-1 font-black">
                                      {relic.level}
                                    </div>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="mb-1">
                                      <div className="font-black text-xs uppercase text-black border-b border-black pb-0.5">
                                        {relic.slot}
                                      </div>
                                    </div>
                                    <div className="mb-1">
                                      <div className="text-xs font-black text-white bg-black px-1 py-0.5 border border-black inline-block">
                                        {relic.mainStat}: {relic.mainStatValue}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-2 space-y-0.5 w-full">
                                  {relic.subStats.map((subStat, subIndex) => (
                                    <div
                                      key={subIndex}
                                      className="text-xs font-bold text-black flex justify-between"
                                    >
                                      <span>• {subStat.stat}</span>
                                      <span className="font-black">{subStat.value}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Planar Relics removed; now grouped with Relics in right column above */}
                    </div>
                  </div>
                )}
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile/:uid" element={<ProfileDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
