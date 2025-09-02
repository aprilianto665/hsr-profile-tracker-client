import React from "react";

interface ButtonProps {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit";
}

export function Button({ onClick, className, children, type = "button" }: ButtonProps) {
  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
}