import type { Character } from "../../types";

interface CharacterInfoProps {
  character: Character;
}

export function CharacterInfo({ character }: CharacterInfoProps) {
  return (
    <div className="mt-3 md:mt-0 md:flex-1">
      <div className="hidden md:block text-left space-y-2">
        <h4 className="text-lg font-black uppercase tracking-widest bg-black text-white px-3 py-1 border-2 border-black transform -skew-x-12 inline-block">
          <span className="transform skew-x-12 inline-block">{character.name}</span>
        </h4>
      </div>
      <div className="mt-2 text-sm w-full space-y-1 text-left">
        <div className="font-mono"><span className="font-bold">Element</span> : {character.element}</div>
        <div className="font-mono"><span className="font-bold">Path</span> : {character.path}</div>
        <div className="font-mono"><span className="font-bold">Level</span> : {character.level}</div>
        <div className="font-mono"><span className="font-bold">Eidolon Level</span> : {character.eidolon}</div>
      </div>
    </div>
  );
}