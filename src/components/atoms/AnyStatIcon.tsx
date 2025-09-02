import { getStatIconPath } from "../../utils";
import { PropertyIcon } from "./PropertyIcon";
import { StatIcon } from "./StatIcon";

interface AnyStatIconProps {
  stat: string;
  inverse?: boolean;
  size?: string;
}

export function AnyStatIcon({ stat, inverse = false, size = "w-5 h-5" }: AnyStatIconProps) {
  const iconPath = getStatIconPath(stat);
  return iconPath ? (
    <PropertyIcon icon={iconPath} name={stat} field={stat} size={size} />
  ) : (
    <StatIcon stat={stat} inverse={inverse} size={size} />
  );
}