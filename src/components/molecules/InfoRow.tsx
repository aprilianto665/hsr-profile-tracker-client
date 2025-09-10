interface InfoRowProps {
  label: string;
  value: string | number;
}

export function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="flex justify-between">
      <span className="font-bold">{label}:</span>
      <span className="font-mono text-right">{value}</span>
    </div>
  );
}