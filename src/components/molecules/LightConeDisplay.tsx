import type { Character } from "../../types";
import { StarRating } from "../atoms";

interface LightConeDisplayProps {
  lightCone: Character['lightCone'];
}

export function LightConeDisplay({ lightCone }: LightConeDisplayProps) {
  return (
    <>
      <h5 className="text-sm font-black uppercase tracking-widest bg-black text-white px-3 py-1 border-2 border-black transform -skew-x-12 inline-block my-3">
        <span className="transform skew-x-12 inline-block">LIGHT CONE</span>
      </h5>
      <div className="flex flex-col md:flex-row items-center md:items-center space-y-3 md:space-y-0 md:space-x-3 mb-4">
        <div className="relative flex-shrink-0">
          <div className="w-24 h-24 border-2 border-black bg-white flex items-center justify-center">
            <img src={lightCone.icon} alt={lightCone.name} className="w-full h-full object-contain" />
          </div>
          <div className="absolute -top-1 -right-1 bg-black text-white text-sm px-1.5 py-0.5 font-black">
            {lightCone.superimposition}
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 translate-y-1/2 bottom-0 bg-white px-1 leading-none transform">
            <StarRating count={lightCone.rarity} />
          </div>
        </div>
        <div className="text-sm text-center md:text-left">
          <div className="font-mono font-bold break-words mb-1">{lightCone.name}</div>
          <div className="font-mono">Level: {lightCone.level}</div>
          {lightCone.attributes && lightCone.attributes.length > 0 && (
            <div className="bg-white border-2 border-black p-2 mt-2">
              <div className="flex flex-nowrap gap-x-4 text-xs overflow-x-auto justify-center md:justify-start">
                {lightCone.attributes.map((attr, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className="w-5 h-5 inline-flex items-center justify-center bg-black border border-black">
                      <img
                        src={attr.icon}
                        alt={attr.name}
                        className="w-4 h-4"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `<span class="text-white text-[8px] font-black">${attr.field.toUpperCase().slice(0,3)}</span>`;
                          }
                        }}
                      />
                    </div>
                    <span className="font-mono font-black ml-2">{attr.display}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}