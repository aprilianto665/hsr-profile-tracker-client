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
  rarity?: number; // optional; default display 5 if absent
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
  outgoingHealingBoost: number;
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
    stats?: { hp: number; atk: number; def: number };
    attributes?: {
      field: string;
      name: string;
      icon: string; // relative path under STAR_RAIL_RES_BASE
      value: number;
      display: string;
      percent: boolean;
    }[];
  };
  cavityRelics: Relic[];
  planarRelics: Relic[];
  relicSetEffects: RelicSetEffect[];
}

interface ProfileData {
  player: Player;
}

// Base URL for StarRailRes assets
const STAR_RAIL_RES_BASE =
  "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/";

// Map stat names to property icon relative paths under STAR_RAIL_RES_BASE
function getStatIconPath(stat: string): string | null {
  const s = stat.toLowerCase();
  // Elemental DMG% on Body piece
  if (s.includes("wind dmg")) return "icon/property/IconWindAddedRatio.png";
  if (s.includes("fire dmg")) return "icon/property/IconFireAddedRatio.png";
  if (s.includes("ice dmg")) return "icon/property/IconIceAddedRatio.png";
  if (s.includes("lightning dmg") || s.includes("thunder dmg"))
    return "icon/property/IconThunderAddedRatio.png";
  if (s.includes("imaginary dmg"))
    return "icon/property/IconImaginaryAddedRatio.png";
  if (s.includes("quantum dmg"))
    return "icon/property/IconQuantumAddedRatio.png";
  if (s.includes("physical dmg"))
    return "icon/property/IconPhysicalAddedRatio.png";
  if (s.includes("heal")) return "icon/property/IconHealRatio.png";
  if (s.includes("crit dmg")) return "icon/property/IconCriticalDamage.png";
  if (s.includes("crit rate")) return "icon/property/IconCriticalChance.png";
  if (s.includes("energy") && s.includes("regen"))
    return "icon/property/IconEnergyRecovery.png";
  if (s.includes("effect") && s.includes("res"))
    return "icon/property/IconStatusResistance.png";
  if (s.includes("effect") && (s.includes("hit") || s.includes("prob")))
    return "icon/property/IconStatusProbability.png";
  if (s.includes("break")) return "icon/property/IconBreakUp.png";
  if (s.includes("spd") || s.includes("speed"))
    return "icon/property/IconSpeed.png";
  if (s.includes("atk%")) return "icon/property/IconAttack.png";
  if (s === "atk" || s.includes(" atk")) return "icon/property/IconAttack.png";
  if (s.includes("def%")) return "icon/property/IconDefence.png";
  if (s === "def" || s.includes(" def")) return "icon/property/IconDefence.png";
  if (s.includes("hp%")) return "icon/property/IconMaxHP.png";
  if (s === "hp" || s.includes(" hp")) return "icon/property/IconMaxHP.png";
  return null;
}

// Map element name to its DMG icon path
function getElementDmgIcon(element: string): string | null {
  const e = element.toLowerCase();
  if (e.includes("ice")) return "icon/property/IconIceAddedRatio.png";
  if (e.includes("fire")) return "icon/property/IconFireAddedRatio.png";
  if (e.includes("wind")) return "icon/property/IconWindAddedRatio.png";
  if (e.includes("physical")) return "icon/property/IconPhysicalAddedRatio.png";
  if (e.includes("quantum")) return "icon/property/IconQuantumAddedRatio.png";
  if (e.includes("imaginary"))
    return "icon/property/IconImaginaryAddedRatio.png";
  if (e.includes("thunder") || e.includes("lightning"))
    return "icon/property/IconThunderAddedRatio.png";
  return null;
}

// Helper to convert stat names into compact icon-like abbreviations
function getStatAbbr(stat: string): string {
  const s = stat.toLowerCase();
  if (s.includes("crit dmg")) return "CD%";
  if (s.includes("crit rate")) return "CR%";
  if (s.includes("energy regen")) return "ERR%";
  if (s.includes("effect res")) return "RES%";
  if (s.includes("effect hit")) return "EHR%";
  if (s.includes("break effect")) return "BE%";
  if (s.includes("heal")) return "HEAL%";
  if (s.includes("atk%")) return "ATK%";
  if (s === "atk") return "ATK";
  if (s.includes("def%")) return "DEF%";
  if (s === "def") return "DEF";
  if (s.includes("hp%")) return "HP%";
  if (s === "hp") return "HP";
  if (s.includes("spd")) return "SPD";
  if (s.includes("dmg") && s.includes("%")) return "DMG%";
  return stat.toUpperCase();
}

function StatIcon({
  stat,
  inverse = false,
  size = "w-6 h-6",
}: {
  stat: string;
  inverse?: boolean;
  size?: string;
}) {
  const abbr = getStatAbbr(stat);
  const base = "inline-flex items-center justify-center align-middle";
  const style = inverse ? "text-white border-white" : "text-black border-black";
  return (
    <span
      className={`${base} ${size} ${style} font-black text-[10px] leading-none border bg-white ${
        inverse ? "bg-black" : "bg-white"
      }`}
      title={stat}
    >
      {abbr}
    </span>
  );
}

// Image icon for attributes with safe fallback to StatIcon when load fails
function PropertyIcon({
  icon,
  name,
  field,
  size = "w-5 h-5",
}: {
  icon: string;
  name: string;
  field: string;
  size?: string;
}) {
  const [failed, setFailed] = React.useState(false);
  if (failed) {
    return <StatIcon stat={field} size={size} inverse={true} />;
  }
  const normalized = icon.startsWith("/") ? icon.slice(1) : icon;
  return (
    <span
      className={`${size} inline-flex items-center justify-center bg-black border border-black`}
    >
      <img
        src={`${STAR_RAIL_RES_BASE}${normalized}`}
        alt={name}
        className="w-4 h-4"
        onError={() => setFailed(true)}
      />
    </span>
  );
}

// Choose image icon when available; otherwise fallback to text icon
function AnyStatIcon({
  stat,
  inverse = false,
  size = "w-5 h-5",
}: {
  stat: string;
  inverse?: boolean;
  size?: string;
}) {
  const p = getStatIconPath(stat);
  if (p) {
    return <PropertyIcon icon={p} name={stat} field={stat} size={size} />;
  }
  return <StatIcon stat={stat} inverse={inverse} size={size} />;
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
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    const fetchProfile = async () => {
      if (!uid) return;
      
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/profile/${uid}`);
        const result = await response.json();
        
        if (result.status === 'success') {
          setProfileData(result.data);
          const transformedCharacters = result.data.characters?.map((char: Record<string, unknown>) => {
            const finalStats = (char.final_stats as Array<{name: string; value: string}>) || [];
            const getStatValue = (statName: string) => {
              const stat = finalStats.find((s) => s.name.toLowerCase().includes(statName.toLowerCase()));
              return stat ? parseFloat(stat.value) || 0 : 0;
            };
            
            const cavityRelics = (char.relics as Array<Record<string, unknown>>)?.filter((r) => (r.type as number) >= 1 && (r.type as number) <= 4).map((relic) => ({
              name: relic.name as string,
              level: relic.level as number,
              mainStat: (relic.main_affix as Record<string, unknown>)?.name as string || '',
              mainStatValue: (relic.main_affix as Record<string, unknown>)?.value as string || '',
              icon: relic.icon as string,
              slot: ['', 'Head', 'Hands', 'Body', 'Feet'][relic.type as number] || 'Unknown',
              rarity: relic.rarity as number || 5,
              subStats: ((relic.sub_affix as Array<Record<string, unknown>>)?.map((sub) => ({
                stat: sub.name as string,
                value: sub.value as string,
              })) || []),
            })) || [];
            
            const planarRelics = (char.relics as Array<Record<string, unknown>>)?.filter((r) => (r.type as number) >= 5 && (r.type as number) <= 6).map((relic) => ({
              name: relic.name as string,
              level: relic.level as number,
              mainStat: (relic.main_affix as Record<string, unknown>)?.name as string || '',
              mainStatValue: (relic.main_affix as Record<string, unknown>)?.value as string || '',
              icon: relic.icon as string,
              slot: (relic.type as number) === 5 ? 'Planar Sphere' : 'Link Rope',
              rarity: relic.rarity as number || 5,
              subStats: ((relic.sub_affix as Array<Record<string, unknown>>)?.map((sub) => ({
                stat: sub.name as string,
                value: sub.value as string,
              })) || []),
            })) || [];
            
            return {
              id: char.name as string,
              name: char.name as string,
              element: (char.element as Record<string, unknown>)?.name as string || 'Unknown',
              path: (char.path as Record<string, unknown>)?.name as string || 'Unknown',
              level: char.level,
              icon: char.portrait,
              portrait: char.portrait,
              eidolon: char.rank,
              rarity: char.rarity,
              stats: {
                baseHp: getStatValue('base hp'),
                baseAtk: getStatValue('base atk'),
                baseDef: getStatValue('base def'),
                spd: getStatValue('spd'),
                critRate: getStatValue('crit rate'),
                critDmg: getStatValue('crit dmg'),
                effectHitRate: getStatValue('effect hit rate'),
                effectRes: getStatValue('effect res'),
                elementDmg: getStatValue('dmg boost'),
                breakEffect: getStatValue('break effect'),
                energyRegenRate: getStatValue('energy regeneration rate'),
                outgoingHealingBoost: getStatValue('outgoing healing boost'),
              },
              lightCone: {
                name: (char.light_cone as Record<string, unknown>)?.name as string || 'None',
                level: (char.light_cone as Record<string, unknown>)?.level as number || 0,
                superimposition: (char.light_cone as Record<string, unknown>)?.rank as number || 0,
                icon: (char.light_cone as Record<string, unknown>)?.icon as string || '',
                rarity: (char.light_cone as Record<string, unknown>)?.rarity as number || 0,
                path: (char.path as Record<string, unknown>)?.name as string || 'Unknown',
                attributes: ((char.light_cone as Record<string, unknown>)?.attributes as Array<Record<string, unknown>>)?.map((attr) => ({
                  field: (attr.name as string).toLowerCase().replace(/\s+/g, ''),
                  name: attr.name as string,
                  icon: attr.icon as string,
                  value: parseInt(attr.value as string) || 0,
                  display: attr.value as string,
                  percent: false,
                })) || [],
              },
              cavityRelics,
              planarRelics,
              relicSetEffects: ((char.relic_sets as Array<Record<string, unknown>>)?.map((set) => ({
                setName: set.name as string,
                pieces: set.num as number,
                effect: '',
                icon: set.icon as string,
              })) || []),
            };
          }) || [];
          
          setCharacters(transformedCharacters);
        } else {
          setError(result.message || 'Failed to fetch profile');
        }
      } catch {
        setError('Failed to fetch profile data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, [uid]);

  // Dummy data removed - now using API data

  React.useEffect(() => {
    if (
      activeTab === "characters" &&
      !selectedCharacter &&
      characters.length > 0
    ) {
      setSelectedCharacter(characters[0]);
    }
  }, [activeTab, selectedCharacter, characters]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-bold">Loading...</div>
      </div>
    );
  }

  if (error || !profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-bold text-red-500">{error || 'Profile not found'}</div>
      </div>
    );
  }

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
        className={`relative z-10 min-h-screen flex flex-col items-center justify-center p-4 pb-16 pt-20`}
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
                UID: {profileData?.player?.uid || uid}
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
                      src={profileData?.player?.avatar?.icon || ''}
                      alt={profileData?.player?.avatar?.name || 'Avatar'}
                      className="w-32 h-32 object-cover"
                    />
                    <div className="text-center">
                      <div className="font-mono text-sm">
                        {profileData?.player?.avatar?.name || 'Unknown'}
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
                        {profileData?.player?.nickname || 'Unknown'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">LEVEL:</span>
                      <span className="font-mono">
                        {profileData?.player?.level || 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">WORLD LEVEL:</span>
                      <span className="font-mono">
                        {profileData?.player?.world_level || 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">FRIENDS:</span>
                      <span className="font-mono">
                        {profileData?.player?.friend_count || 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">SIGNATURE:</span>
                      <span className="font-mono">
                        {profileData?.player?.signature || 'No signature'}
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
                        {profileData?.player?.space_info?.universe_level || 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">AVATARS:</span>
                      <span className="font-mono">
                        {profileData?.player?.space_info?.avatar_count || 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">LIGHT CONES:</span>
                      <span className="font-mono">
                        {profileData?.player?.space_info?.light_cone_count || 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">RELICS:</span>
                      <span className="font-mono">
                        {profileData?.player?.space_info?.relic_count || 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">ACHIEVEMENTS:</span>
                      <span className="font-mono">
                        {profileData?.player?.space_info?.achievement_count || 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">BOOKS:</span>
                      <span className="font-mono">
                        {profileData?.player?.space_info?.book_count || 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">MUSIC:</span>
                      <span className="font-mono">
                        {profileData?.player?.space_info?.music_count || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "characters" && (
              <div className="relative">
                {characters.length === 0 ? (
                  <div className="text-center text-gray-500">
                    No characters available
                  </div>
                ) : (
                  <>
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
                        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-start justify-between">
                          <div className="flex flex-col w-full lg:w-[650px]">
                            <div className="flex gap-6 w-full">
                              <div className="w-full">
                                <div className="flex flex-col md:flex-row md:items-start md:space-x-4">
                                  <div className="flex flex-col items-center">
                                    <div className="relative inline-block mb-4">
                                      <img
                                        src={selectedCharacter.portrait}
                                        alt={selectedCharacter.name}
                                        className="w-32 h-32 object-cover border-2 border-black"
                                      />
                                      <div className="absolute left-1/2 -translate-x-1/2 translate-y-1/2 bottom-0 bg-white px-1 leading-none transform">
                                        <span className="text-black text-xs md:text-sm">
                                          {"★".repeat(selectedCharacter.rarity)}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="mt-3 md:mt-0 md:flex-1">
                                    <div className="text-left space-y-2">
                                      <h4 className="text-lg font-black uppercase tracking-widest bg-black text-white px-3 py-1 border-2 border-black transform -skew-x-12 inline-block">
                                        <span className="transform skew-x-12 inline-block">
                                          {selectedCharacter.name}
                                        </span>
                                      </h4>
                                    </div>
                                    <div className="mt-2 text-sm w-full space-y-1 text-left">
                                      <div className="font-mono">
                                        <span className="font-bold">Element</span> : {selectedCharacter.element}
                                      </div>
                                      <div className="font-mono">
                                        <span className="font-bold">Path</span> : {selectedCharacter.path}
                                      </div>
                                      <div className="font-mono">
                                        <span className="font-bold">Level</span> : {selectedCharacter.level}
                                      </div>
                                      <div className="font-mono">
                                        <span className="font-bold">Eidolon Level</span> : {selectedCharacter.eidolon}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <h5 className="text-sm font-black uppercase tracking-widest bg-black text-white px-3 py-1 border-2 border-black transform -skew-x-12 inline-block mb-3">
                                  <span className="transform skew-x-12 inline-block">LIGHT CONE</span>
                                </h5>
                                <div className="flex items-center space-x-3 mb-4">
                                  <div className="relative flex-shrink-0">
                                    <div className="w-24 h-24 border-2 border-black bg-white flex items-center justify-center">
                                      <img
                                        src={selectedCharacter.lightCone.icon}
                                        alt={selectedCharacter.lightCone.name}
                                        className="w-full h-full object-contain"
                                      />
                                    </div>
                                    <div className="absolute -top-1 -right-1 bg-black text-white text-sm px-1.5 py-0.5 font-black">
                                      {selectedCharacter.lightCone.superimposition}
                                    </div>
                                    <div className="absolute left-1/2 -translate-x-1/2 translate-y-1/2 bottom-0 bg-white px-1 leading-none transform">
                                      <span className="text-black text-xs md:text-sm">
                                        {"★".repeat(selectedCharacter.lightCone.rarity)}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="text-sm">
                                    <div className="font-mono font-bold break-words mb-1">
                                      {selectedCharacter.lightCone.name}
                                    </div>
                                    <div className="font-mono">
                                      Level: {selectedCharacter.lightCone.level}
                                    </div>
                                    {selectedCharacter.lightCone.attributes && selectedCharacter.lightCone.attributes.length > 0 && (
                                      <div className="bg-white border-2 border-black p-2 mt-2">
                                        <div className="flex flex-nowrap gap-x-4 text-xs overflow-x-auto">
                                          {selectedCharacter.lightCone.attributes.map((attr, idx) => (
                                            <div key={idx} className="flex items-center">
                                              <div className="w-5 h-5 inline-flex items-center justify-center bg-black border border-black">
                                                <img
                                                  src={attr.icon}
                                                  alt={attr.name}
                                                  className="w-4 h-4"
                                                  onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.style.display = 'none';
                                                    const parent = target.parentElement;
                                                    if (parent) {
                                                      parent.innerHTML = `<span class="text-white text-[8px] font-black">${attr.field.toUpperCase().slice(0,3)}</span>`;
                                                    }
                                                  }}
                                                />
                                              </div>
                                              <span className="font-mono font-black ml-2">
                                                {attr.display}
                                              </span>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="w-full">
                                <div className="w-full mt-2">
                                  <h5 className="text-sm font-black uppercase tracking-widest bg-black text-white px-3 py-1 border-2 border-black transform -skew-x-12 inline-block mb-3">
                                    <span className="transform skew-x-12 inline-block">STATS</span>
                                  </h5>
                                  <div className="bg-white border-2 border-black p-3 text-sm">
                                    <div className="grid grid-cols-1 gap-y-1">
                                      {[
                                        { key: 'baseHp', label: 'HP', icon: 'HP', value: selectedCharacter.stats.baseHp, suffix: '' },
                                        { key: 'baseAtk', label: 'ATK', icon: 'ATK', value: selectedCharacter.stats.baseAtk, suffix: '' },
                                        { key: 'baseDef', label: 'DEF', icon: 'DEF', value: selectedCharacter.stats.baseDef, suffix: '' },
                                        { key: 'spd', label: 'SPD', icon: 'SPD', value: selectedCharacter.stats.spd, suffix: '' },
                                        { key: 'critRate', label: 'CRIT Rate', icon: 'CRIT Rate', value: selectedCharacter.stats.critRate, suffix: '%' },
                                        { key: 'critDmg', label: 'CRIT DMG', icon: 'CRIT DMG', value: selectedCharacter.stats.critDmg, suffix: '%' },
                                        { key: 'effectHitRate', label: 'Effect Hit', icon: 'Effect Hit', value: selectedCharacter.stats.effectHitRate, suffix: '%' },
                                        { key: 'effectRes', label: 'Effect RES', icon: 'Effect RES', value: selectedCharacter.stats.effectRes, suffix: '%' },
                                        { key: 'elementDmg', label: `${selectedCharacter.element} DMG`, icon: 'DMG', value: selectedCharacter.stats.elementDmg, suffix: '%', isElementDmg: true },
                                        { key: 'breakEffect', label: 'Break Effect', icon: 'Break Effect', value: selectedCharacter.stats.breakEffect, suffix: '%' },
                                        { key: 'energyRegenRate', label: 'Energy Regen', icon: 'Energy Regen', value: selectedCharacter.stats.energyRegenRate, suffix: '%' },
                                        { key: 'outgoingHealingBoost', label: 'Outgoing Healing', icon: 'heal', value: selectedCharacter.stats.outgoingHealingBoost, suffix: '%' },
                                      ].filter(stat => stat.value > 0).map((stat) => (
                                        <div key={stat.key} className="flex justify-between items-center">
                                          <span className="font-bold text-gray-700 flex items-center gap-2">
                                            {stat.isElementDmg ? (() => {
                                              const icon = getElementDmgIcon(selectedCharacter.element);
                                              return icon ? (
                                                <PropertyIcon
                                                  icon={icon}
                                                  name={`${selectedCharacter.element} DMG`}
                                                  field="DMG"
                                                  size="w-5 h-5"
                                                />
                                              ) : (
                                                <AnyStatIcon stat="DMG" inverse size="w-5 h-5" />
                                              );
                                            })() : (
                                              <AnyStatIcon stat={stat.icon} inverse size="w-5 h-5" />
                                            )}
                                            <span>{stat.label}:</span>
                                          </span>
                                          <span className="font-mono font-black">
                                            {stat.value}{stat.suffix}
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="w-full">
                              <h5 className="text-sm font-black uppercase tracking-widest bg-black text-white px-3 py-1 border-2 border-black transform -skew-x-12 inline-block mb-3">
                                <span className="transform skew-x-12 inline-block">RELICS SCORE SUMMARY</span>
                              </h5>
                              <div className="space-y-3">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  <div className="bg-white border-2 border-black p-3 flex flex-col items-start">
                                    <div className="font-bold text-xs uppercase">Rank</div>
                                    <div className="text-6xl font-black">N/A</div>
                                  </div>
                                  <div className="bg-white border-2 border-black p-3">
                                    <div className="text-xs font-bold uppercase mb-1">Score Breakdown</div>
                                    <div className="flex justify-between text-sm font-mono">
                                      <span>Base Relic Score:</span>
                                      <span>N/A</span>
                                    </div>
                                    <div className="flex justify-between text-sm font-mono">
                                      <span>Set Bonus:</span>
                                      <span>N/A</span>
                                    </div>
                                    <div className="flex justify-between text-sm font-mono font-black">
                                      <span>Total:</span>
                                      <span>N/A</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="w-full lg:w-5/12">
                            <h5 className="text-sm font-black uppercase tracking-widest bg-black text-white px-3 py-1 border-2 border-black transform -skew-x-12 inline-block mb-3">
                              <span className="transform skew-x-12 inline-block">SET EFFECTS</span>
                            </h5>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-4 md:mb-6">
                              {selectedCharacter.relicSetEffects?.length > 0 ? (
                                selectedCharacter.relicSetEffects.map((setEffect, index) => (
                                  <div key={`seteffect-${index}`} className="bg-white border-2 border-black p-2 h-full flex items-center">
                                    <div className="flex items-center">
                                      <div className="relative mr-2">
                                        <div className="w-8 h-8 border border-black bg-white flex items-center justify-center">
                                          <img src={setEffect.icon} alt={setEffect.setName} className="w-6 h-6 object-contain" />
                                        </div>
                                        <div className="absolute -top-1 -right-1 bg-black text-white text-xs px-1 font-black">
                                          {setEffect.pieces}
                                        </div>
                                      </div>
                                      <div className="font-bold text-xs uppercase">
                                        {setEffect.setName}
                                      </div>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div className="text-center text-gray-500 col-span-full">No set effects available</div>
                              )}
                            </div>
                            <h5 className="text-sm font-black uppercase tracking-widest bg-black text-white px-3 py-1 border-2 border-black transform -skew-x-12 inline-block mb-3">
                              <span className="transform skew-x-12 inline-block">RELICS & PLANAR</span>
                            </h5>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-flow-col grid-rows-6 sm:grid-rows-3 lg:grid-rows-2 gap-x-2 gap-y-6">
                              {[
                                ...selectedCharacter.cavityRelics,
                                ...selectedCharacter.planarRelics,
                              ].map((relic, index) => (
                                <div
                                  key={index}
                                  className="bg-white border-2 border-black p-2 pt-5 pb-4 relative"
                                >
                                  <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-0 bg-white px-2 leading-none inline-block whitespace-nowrap">
                                    <span className="font-black text-xs uppercase whitespace-nowrap">
                                      {relic.slot}
                                    </span>
                                  </div>
                                  <div>
                                    <div className="flex items-start space-x-2">
                                      <div className="relative">
                                        <div className="w-14 h-14 border border-black bg-white flex items-center justify-center">
                                          <img
                                            src={relic.icon}
                                            alt={relic.name}
                                            className="w-12 h-12 object-cover"
                                          />
                                        </div>
                                        <div className="absolute -top-1 -right-1 bg-black text-white text-xs px-1 font-black">
                                          {relic.level}
                                        </div>
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="mb-1">
                                          <div className="text-xs font-black text-white bg-black px-1.5 py-0.5 border border-black inline-flex items-center space-x-1">
                                            <AnyStatIcon
                                              stat={relic.mainStat}
                                              inverse={true}
                                              size="w-4 h-4"
                                            />
                                            <span>{relic.mainStatValue}</span>
                                          </div>
                                        </div>
                                        <div className="text-[10px] font-mono flex items-center space-x-3">
                                          <div>
                                            <span className="font-bold">Score</span>
                                            : N/A
                                          </div>
                                          <div>
                                            <span className="font-bold">Rank</span>
                                            : N/A
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="mt-2 grid grid-cols-2 gap-x-2 gap-y-1 w-full">
                                      {relic.subStats.map((subStat, subIndex) => (
                                        <div
                                          key={subIndex}
                                          className="text-xs font-bold text-black flex items-center justify-between"
                                        >
                                          <span className="flex items-center space-x-1">
                                            <AnyStatIcon
                                              stat={subStat.stat}
                                              size="w-5 h-5"
                                              inverse={true}
                                            />
                                          </span>
                                          <span className="font-black">
                                            {subStat.value}
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  <div
                                    className="absolute left-1/2 -translate-x-1/2 translate-y-1/2 bottom-0 bg-white px-1 leading-none transform"
                                    aria-hidden="true"
                                  >
                                    <span className="text-black text-xs">
                                      {"★".repeat(relic.rarity ?? 5)}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
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
