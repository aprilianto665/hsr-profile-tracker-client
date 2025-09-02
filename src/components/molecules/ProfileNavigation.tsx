import { useNavigate } from "react-router-dom";
import { Button } from "../atoms";

interface ProfileNavigationProps {
  activeTab: "info" | "characters";
  onTabChange: (tab: "info" | "characters") => void;
  onRefresh: () => void;
  refreshDisabled: boolean;
  refreshing: boolean;
}

export function ProfileNavigation({ 
  activeTab, 
  onTabChange, 
  onRefresh, 
  refreshDisabled, 
  refreshing 
}: ProfileNavigationProps) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between mb-4 mt-6">
      <Button
        onClick={() => navigate("/")}
        className="px-4 py-2 bg-black text-white font-bold uppercase tracking-wide hover:bg-gray-800 border-2 border-black"
      >
        ← BACK
      </Button>
      <div className="flex gap-4">
        <Button
          onClick={onRefresh}
          disabled={refreshDisabled || refreshing}
          className={`w-12 h-12 font-bold uppercase tracking-wide border-2 border-black flex items-center justify-center ${
            refreshDisabled || refreshing
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-white text-black hover:bg-gray-100"
          }`}
        >
          {refreshDisabled || refreshing ? (
            <img
              src="/herta-kurukuru.gif"
              alt="Loading"
              className="w-8 h-8"
            />
          ) : (
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          )}
        </Button>
        <Button
          onClick={() => onTabChange("info")}
          className={`px-4 py-2 font-bold uppercase tracking-wide border-2 border-black ${
            activeTab === "info"
              ? "bg-black text-white"
              : "bg-white text-black hover:bg-gray-100"
          }`}
        >
          MAIN INFO
        </Button>
        <Button
          onClick={() => onTabChange("characters")}
          className={`px-4 py-2 font-bold uppercase tracking-wide border-2 border-black ${
            activeTab === "characters"
              ? "bg-black text-white"
              : "bg-white text-black hover:bg-gray-100"
          }`}
        >
          CHARACTERS
        </Button>
      </div>
    </div>
  );
}