import type { Character } from "../../types";
import { getElementDmgIcon } from "../../utils";
import { AnyStatIcon, PropertyIcon } from "../atoms";

interface StatsDisplayProps {
  character: Character;
}

export function StatsDisplay({ character }: StatsDisplayProps) {
  const stats = [
    { key: 'baseHp', label: 'HP', icon: 'HP', value: character.stats.baseHp, suffix: '' },
    { key: 'baseAtk', label: 'ATK', icon: 'ATK', value: character.stats.baseAtk, suffix: '' },
    { key: 'baseDef', label: 'DEF', icon: 'DEF', value: character.stats.baseDef, suffix: '' },
    { key: 'spd', label: 'SPD', icon: 'SPD', value: character.stats.spd, suffix: '' },
    { key: 'critRate', label: 'CRIT Rate', icon: 'CRIT Rate', value: character.stats.critRate, suffix: '%' },
    { key: 'critDmg', label: 'CRIT DMG', icon: 'CRIT DMG', value: character.stats.critDmg, suffix: '%' },
    { key: 'effectHitRate', label: 'Effect Hit', icon: 'Effect Hit', value: character.stats.effectHitRate, suffix: '%' },
    { key: 'effectRes', label: 'Effect RES', icon: 'Effect RES', value: character.stats.effectRes, suffix: '%' },
    { key: 'elementDmg', label: `${character.element} DMG`, icon: 'DMG', value: character.stats.elementDmg, suffix: '%', isElementDmg: true },
    { key: 'breakEffect', label: 'Break Effect', icon: 'Break Effect', value: character.stats.breakEffect, suffix: '%' },
    { key: 'energyRegenRate', label: 'Energy Regen', icon: 'Energy Regen', value: character.stats.energyRegenRate, suffix: '%' },
    { key: 'outgoingHealingBoost', label: 'Outgoing Healing', icon: 'heal', value: character.stats.outgoingHealingBoost, suffix: '%' },
  ].filter(stat => stat.value > 0);

  return (
    <div className="w-full mt-2">
      <h5 className="text-sm font-black uppercase tracking-widest bg-black text-white px-3 py-1 border-2 border-black transform -skew-x-12 inline-block mb-3">
        <span className="transform skew-x-12 inline-block">STATS</span>
      </h5>
      <div className="bg-white border-2 border-black p-3 text-sm">
        <div className="grid grid-cols-1 gap-y-1">
          {stats.map((stat) => (
            <div key={stat.key} className="flex justify-between items-center">
              <span className="font-bold text-gray-700 flex items-center gap-2">
                {stat.isElementDmg ? (() => {
                  const icon = getElementDmgIcon(character.element);
                  return icon ? (
                    <PropertyIcon icon={icon} name={`${character.element} DMG`} field="DMG" size="w-5 h-5" />
                  ) : (
                    <AnyStatIcon stat="DMG" inverse size="w-5 h-5" />
                  );
                })() : (
                  <AnyStatIcon stat={stat.icon} inverse size="w-5 h-5" />
                )}
                <span>{stat.label}:</span>
              </span>
              <span className="font-mono font-black">{stat.value}{stat.suffix}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}