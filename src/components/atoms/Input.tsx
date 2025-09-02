import React from "react";

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  type?: string;
  id?: string;
}

export function Input({ value, onChange, onKeyDown, placeholder, className, type = "text", id }: InputProps) {
  return (
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      className={className}
    />
  );
}