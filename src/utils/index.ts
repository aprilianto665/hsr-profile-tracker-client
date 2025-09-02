export { transformCharacterData } from "./characterTransform";

export function getStatIconPath(stat: string): string | null {
  const s = stat.toLowerCase();
  const iconMap: Record<string, string> = {
    "wind dmg": "icon/property/IconWindAddedRatio.png",
    "fire dmg": "icon/property/IconFireAddedRatio.png",
    "ice dmg": "icon/property/IconIceAddedRatio.png",
    "lightning dmg": "icon/property/IconThunderAddedRatio.png",
    "thunder dmg": "icon/property/IconThunderAddedRatio.png",
    "imaginary dmg": "icon/property/IconImaginaryAddedRatio.png",
    "quantum dmg": "icon/property/IconQuantumAddedRatio.png",
    "physical dmg": "icon/property/IconPhysicalAddedRatio.png",
    "heal": "icon/property/IconHealRatio.png",
    "crit dmg": "icon/property/IconCriticalDamage.png",
    "crit rate": "icon/property/IconCriticalChance.png",
    "energy regen": "icon/property/IconEnergyRecovery.png",
    "effect res": "icon/property/IconStatusResistance.png",
    "effect hit": "icon/property/IconStatusProbability.png",
    "effect prob": "icon/property/IconStatusProbability.png",
    "break": "icon/property/IconBreakUp.png",
    "spd": "icon/property/IconSpeed.png",
    "speed": "icon/property/IconSpeed.png",
    "atk%": "icon/property/IconAttack.png",
    "atk": "icon/property/IconAttack.png",
    "def%": "icon/property/IconDefence.png",
    "def": "icon/property/IconDefence.png",
    "hp%": "icon/property/IconMaxHP.png",
    "hp": "icon/property/IconMaxHP.png"
  };
  
  for (const [key, value] of Object.entries(iconMap)) {
    if (s.includes(key)) return value;
  }
  return null;
}

export function getElementDmgIcon(element: string): string | null {
  const elementMap: Record<string, string> = {
    "ice": "icon/property/IconIceAddedRatio.png",
    "fire": "icon/property/IconFireAddedRatio.png",
    "wind": "icon/property/IconWindAddedRatio.png",
    "physical": "icon/property/IconPhysicalAddedRatio.png",
    "quantum": "icon/property/IconQuantumAddedRatio.png",
    "imaginary": "icon/property/IconImaginaryAddedRatio.png",
    "thunder": "icon/property/IconThunderAddedRatio.png",
    "lightning": "icon/property/IconThunderAddedRatio.png"
  };
  
  const e = element.toLowerCase();
  for (const [key, value] of Object.entries(elementMap)) {
    if (e.includes(key)) return value;
  }
  return null;
}

export function getStatAbbr(stat: string): string {
  const s = stat.toLowerCase();
  const abbrMap: Record<string, string> = {
    "crit dmg": "CD%",
    "crit rate": "CR%",
    "energy regen": "ERR%",
    "effect res": "RES%",
    "effect hit": "EHR%",
    "break effect": "BE%",
    "heal": "HEAL%",
    "atk%": "ATK%",
    "atk": "ATK",
    "def%": "DEF%",
    "def": "DEF",
    "hp%": "HP%",
    "hp": "HP",
    "spd": "SPD"
  };
  
  for (const [key, value] of Object.entries(abbrMap)) {
    if (s.includes(key)) return value;
  }
  if (s.includes("dmg") && s.includes("%")) return "DMG%";
  return stat.toUpperCase();
}