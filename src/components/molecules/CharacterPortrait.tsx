import type { Character } from "../../types";
import { StarRating } from "../atoms";

interface CharacterPortraitProps {
  character: Character;
}

export function CharacterPortrait({ character }: CharacterPortraitProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative inline-block mb-4">
        <img
          src={character.portrait}
          alt={character.name}
          className="w-52 h-52 md:w-32 md:h-32 object-cover border-2 border-black"
        />
        <div className="absolute left-1/2 -translate-x-1/2 translate-y-1/2 bottom-0 bg-white px-1 leading-none transform">
          <StarRating count={character.rarity} />
        </div>
      </div>
      <h4 className="md:hidden text-lg font-black uppercase tracking-widest bg-black text-white px-3 py-1 border-2 border-black transform -skew-x-12 inline-block">
        <span className="transform skew-x-12 inline-block">{character.name}</span>
      </h4>
    </div>
  );
}