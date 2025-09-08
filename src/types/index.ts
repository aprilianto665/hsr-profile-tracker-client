export interface Avatar {
  id: string;
  name: string;
  icon: string;
}

export interface SpaceInfo {
  universe_level: number;
  avatar_count: number;
  light_cone_count: number;
  relic_count: number;
  achievement_count: number;
  book_count: number;
  music_count: number;
}

export interface Player {
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

export interface Relic {
  name: string;
  level: number;
  mainStat: string;
  mainStatValue: string;
  icon: string;
  slot: string;
  subStats: { stat: string; value: number }[];
  rarity?: number;
  rank?: string;
  score?: number;
}

export interface RelicSetEffect {
  setName: string;
  pieces: number;
  effect: string;
  icon: string;
}

export interface Stats {
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

export interface Character {
  id: string;
  name: string;
  element: string;
  path: string;
  level: number;
  icon: string;
  portrait: string;
  eidolon: number;
  rarity: number;
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
      icon: string;
      value: number;
      display: string;
      percent: boolean;
    }[];
  };
  cavityRelics: Relic[];
  planarRelics: Relic[];
  relicSetEffects: RelicSetEffect[];
  relicScore?: {
    rank: string;
    total_score: number;
    average_score: number;
  };
}

export interface ProfileData {
  player: Player;
  characters?: Record<string, unknown>[];
}