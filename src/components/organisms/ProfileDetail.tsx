import { useState } from "react";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Character, ProfileData } from "../../types";
import { Button, AnyStatIcon } from "../atoms";
import { InfoCard, InfoRow, CharacterPortrait, CharacterInfo, LightConeDisplay, StatsDisplay } from "../molecules";

export function ProfileDetail() {
  const { uid } = useParams<{ uid: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"info" | "characters">("info");
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
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
          
          const imagePromises = transformedCharacters.map((character: Character) => {
            return Promise.all([
              new Promise<void>((resolve) => {
                const img = new Image();
                img.onload = () => resolve();
                img.onerror = () => resolve();
                img.src = character.portrait;
              }),
              new Promise<void>((resolve) => {
                const img = new Image();
                img.onload = () => resolve();
                img.onerror = () => resolve();
                img.src = character.lightCone.icon;
              })
            ]);
          });
          
          Promise.all(imagePromises).then(() => {});
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

  React.useEffect(() => {
    if (activeTab === "characters" && !selectedCharacter && characters.length > 0) {
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

      <div className={`relative z-10 min-h-screen flex flex-col items-center justify-center p-4 pb-16 pt-20`}>
        <div className={`w-full max-w-7xl mx-auto relative ${activeTab === "info" ? "" : "mt-8"}`}>
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
              <Button
                onClick={() => navigate("/")}
                className="px-4 py-2 bg-black text-white font-bold uppercase tracking-wide hover:bg-gray-800 border-2 border-black"
              >
                ← BACK
              </Button>
              <div className="flex gap-4">
                <Button
                  onClick={() => setActiveTab("info")}
                  className={`px-4 py-2 font-bold uppercase tracking-wide border-2 border-black ${
                    activeTab === "info"
                      ? "bg-black text-white"
                      : "bg-white text-black hover:bg-gray-100"
                  }`}
                >
                  MAIN INFO
                </Button>
                <Button
                  onClick={() => setActiveTab("characters")}
                  className={`px-4 py-2 font-bold uppercase tracking-wide border-2 border-black ${
                    activeTab === "characters"
                      ? "bg-black text-white"
                      : "bg-white text-black hover:bg-gray-100"
                  }`}
                >
                  CHARACTERS
                </Button>
              </div>
            </div>

            {activeTab === "info" && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <InfoCard title="AVATAR" className="flex flex-col">
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
                </InfoCard>

                <InfoCard title="BASIC INFO" className="md:col-span-2">
                  <div className="space-y-3">
                    <InfoRow label="NICKNAME" value={profileData?.player?.nickname || 'Unknown'} />
                    <InfoRow label="LEVEL" value={profileData?.player?.level || 0} />
                    <InfoRow label="WORLD LEVEL" value={profileData?.player?.world_level || 0} />
                    <InfoRow label="FRIENDS" value={profileData?.player?.friend_count || 0} />
                    <InfoRow label="SIGNATURE" value={profileData?.player?.signature || 'No signature'} />
                  </div>
                </InfoCard>

                <InfoCard title="SPACE INFO">
                  <div className="space-y-3">
                    <InfoRow label="UNIVERSE LEVEL" value={profileData?.player?.space_info?.universe_level || 0} />
                    <InfoRow label="AVATARS" value={profileData?.player?.space_info?.avatar_count || 0} />
                    <InfoRow label="LIGHT CONES" value={profileData?.player?.space_info?.light_cone_count || 0} />
                    <InfoRow label="RELICS" value={profileData?.player?.space_info?.relic_count || 0} />
                    <InfoRow label="ACHIEVEMENTS" value={profileData?.player?.space_info?.achievement_count || 0} />
                    <InfoRow label="BOOKS" value={profileData?.player?.space_info?.book_count || 0} />
                    <InfoRow label="MUSIC" value={profileData?.player?.space_info?.music_count || 0} />
                  </div>
                </InfoCard>
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
                        <Button
                          key={character.id}
                          onClick={() => setSelectedCharacter(character)}
                          className={`border-2 border-black px-4 py-2 font-bold text-sm uppercase tracking-wide relative ${
                            selectedCharacter?.id === character.id
                              ? "bg-black text-white border-b-black z-20"
                              : "bg-white hover:bg-gray-100 -mr-0.5"
                          } ${index > 0 ? "-ml-0.5" : ""}`}
                        >
                          {character.name}
                        </Button>
                      ))}
                    </div>
                    {selectedCharacter && (
                      <div className="border-2 border-black p-4 bg-white relative z-30">
                        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-start justify-between">
                          <div className="flex flex-col w-full lg:w-[650px]">
                            <div className="flex gap-6 w-full">
                              <div className="w-full">
                                <div className="flex flex-col md:flex-row md:items-start md:space-x-4">
                                  <CharacterPortrait character={selectedCharacter} />
                                  <CharacterInfo character={selectedCharacter} />
                                </div>
                                <LightConeDisplay lightCone={selectedCharacter.lightCone} />
                              </div>
                              <div className="w-full">
                                <StatsDisplay character={selectedCharacter} />
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
          © 2025 HSR Profile Tracker. Relic scoring algorithm by <a href="https://scoremyrelic.com/relic-scorer" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-300">scoremyrelic.com</a>
        </p>
      </footer>
    </div>
  );
}