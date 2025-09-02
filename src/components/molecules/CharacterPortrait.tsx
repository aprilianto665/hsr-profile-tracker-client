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
          className="w-32 h-32 object-cover border-2 border-black"
        />
        <div className="absolute left-1/2 -translate-x-1/2 translate-y-1/2 bottom-0 bg-white px-1 leading-none transform">
          <StarRating count={character.rarity} />
        </div>
      </div>
    </div>
  );
}