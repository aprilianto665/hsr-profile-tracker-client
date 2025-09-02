import { useState, useEffect } from "react";
import type { Character } from "../../types";
import { Button, AnyStatIcon } from "../atoms";
import { CharacterPortrait, CharacterInfo, LightConeDisplay, StatsDisplay } from "../molecules";

interface CharacterTabProps {
  characters: Character[];
}

export function CharacterTab({ characters }: CharacterTabProps) {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  useEffect(() => {
    if (!selectedCharacter && characters.length > 0) {
      setSelectedCharacter(characters[0]);
    }
  }, [selectedCharacter, characters]);

  if (characters.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No characters available
      </div>
    );
  }

  return (
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
  );
}