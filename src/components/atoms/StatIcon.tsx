import { getStatAbbr } from "../../utils";

interface StatIconProps {
  stat: string;
  inverse?: boolean;
  size?: string;
}

export function StatIcon({ stat, inverse = false, size = "w-6 h-6" }: StatIconProps) {
  const abbr = getStatAbbr(stat);
  const styleClass = inverse ? "stat-icon-inverse" : "stat-icon-normal";
  return (
    <span className={`${styleClass} ${size}`} title={stat}>
      {abbr}
    </span>
  );
}