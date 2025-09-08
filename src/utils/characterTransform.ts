import type { Character } from "../types";

export function transformCharacterData(char: Record<string, unknown>): Character {
  const finalStats = (char.final_stats as Array<{name: string; value: string}>) || [];
  
  const getStatValue = (statName: string) => {
    const stat = finalStats.find((s) => s.name.toLowerCase().includes(statName.toLowerCase()));
    return stat ? parseFloat(stat.value) || 0 : 0;
  };
  
  const relics = (char.relics as Array<Record<string, unknown>>) || [];
  
  const cavityRelics = relics
    .filter((r) => (r.type as number) >= 1 && (r.type as number) <= 4)
    .map((relic) => ({
      name: relic.name as string,
      level: relic.level as number,
      mainStat: (relic.main_affix as Record<string, unknown>)?.name as string || '',
      mainStatValue: (relic.main_affix as Record<string, unknown>)?.value as string || '',
      icon: relic.icon as string,
      slot: ['', 'Head', 'Hands', 'Body', 'Feet'][relic.type as number] || 'Unknown',
      rarity: relic.rarity as number || 5,
      rank: relic.rank as string,
      score: relic.score as number,
      subStats: ((relic.sub_affix as Array<Record<string, unknown>>)?.map((sub) => ({
        stat: sub.name as string,
        value: sub.value as string,
      })) || []),
    }));
  
  const planarRelics = relics
    .filter((r) => (r.type as number) >= 5 && (r.type as number) <= 6)
    .map((relic) => ({
      name: relic.name as string,
      level: relic.level as number,
      mainStat: (relic.main_affix as Record<string, unknown>)?.name as string || '',
      mainStatValue: (relic.main_affix as Record<string, unknown>)?.value as string || '',
      icon: relic.icon as string,
      slot: (relic.type as number) === 5 ? 'Planar Sphere' : 'Link Rope',
      rarity: relic.rarity as number || 5,
      rank: relic.rank as string,
      score: relic.score as number,
      subStats: ((relic.sub_affix as Array<Record<string, unknown>>)?.map((sub) => ({
        stat: sub.name as string,
        value: sub.value as string,
      })) || []),
    }));
  
  return {
    id: char.name as string,
    name: char.name as string,
    element: (char.element as Record<string, unknown>)?.name as string || 'Unknown',
    path: (char.path as Record<string, unknown>)?.name as string || 'Unknown',
    level: char.level as number,
    icon: char.portrait as string,
    portrait: char.portrait as string,
    eidolon: char.rank as number,
    rarity: char.rarity as number,
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
    relicScore: char.relic_score as { rank: string; total_score: number; average_score: number } | undefined,
  };
}