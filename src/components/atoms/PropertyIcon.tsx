import React from "react";
import { STAR_RAIL_RES_BASE } from "../../constants";
import { StatIcon } from "./StatIcon";

interface PropertyIconProps {
  icon: string;
  name: string;
  field: string;
  size?: string;
}

export function PropertyIcon({ icon, name, field, size = "w-5 h-5" }: PropertyIconProps) {
  const [failed, setFailed] = React.useState(false);
  
  if (failed) {
    return <StatIcon stat={field} size={size} inverse={true} />;
  }
  
  const normalized = icon.startsWith("/") ? icon.slice(1) : icon;
  return (
    <span className={`${size} property-icon-container`}>
      <img
        src={`${STAR_RAIL_RES_BASE}${normalized}`}
        alt={name}
        className="w-4 h-4"
        onError={() => setFailed(true)}
      />
    </span>
  );
}