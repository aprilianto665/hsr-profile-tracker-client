import { useState, useEffect } from "react";
import type { Character, ProfileData } from "../types";
import { transformCharacterData } from "../utils/characterTransform";

export function useCharacterData(profileData: ProfileData | null) {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    if (!profileData?.characters) {
      setCharacters([]);
      return;
    }

    const transformedCharacters = profileData.characters.map(transformCharacterData);
    setCharacters(transformedCharacters);

    // Preload images
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
  }, [profileData]);

  return { characters };
}