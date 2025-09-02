import React from "react";

interface InfoCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function InfoCard({ title, children, className }: InfoCardProps) {
  return (
    <div className={`border-2 border-black p-4 ${className || ''}`}>
      <h3 className="text-xl font-bold text-black mb-4 uppercase tracking-wide border-b-2 border-black pb-2">
        {title}
      </h3>
      {children}
    </div>
  );
}