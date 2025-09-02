import type { ReactNode } from "react";

interface ProfileLayoutProps {
  children: ReactNode;
  activeTab: "info" | "characters";
}

export function ProfileLayout({ children, activeTab }: ProfileLayoutProps) {
  return (
    <div className="min-h-screen relative overflow-hidden bg-white">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle, black 1px, transparent 1px)`,
          backgroundSize: "8px 8px",
        }}
      />
      
      <div className={`relative z-10 min-h-screen flex flex-col items-center justify-center p-4 pb-16 pt-20`}>
        <div className={`w-full max-w-7xl mx-auto relative ${activeTab === "info" ? "" : "mt-8"}`}>
          <div className="absolute -top-16 md:-top-24 left-1/2 transform -translate-x-1/2 bg-white border-2 md:border-4 border-black p-3 md:p-6 z-20 shadow-lg text-center w-max md:w-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}