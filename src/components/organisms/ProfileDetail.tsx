import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProfileData, useCharacterData } from "../../hooks";
import { LoadingState, ErrorState, ProfileHeader, ProfileNavigation } from "../molecules";
import { ProfileInfoTab, CharacterTab } from "../organisms";

export function ProfileDetail() {
  const { uid } = useParams<{ uid: string }>();
  const [activeTab, setActiveTab] = useState<"info" | "characters">("info");
  
  const { profileData, loading, error, fetchProfile, handleRefresh, refreshDisabled, refreshing } = useProfileData(uid);
  const { characters } = useCharacterData(profileData);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (loading) {
    return <LoadingState />;
  }

  if (error || !profileData) {
    return <ErrorState error={error || 'Profile not found'} />;
  }

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
            <ProfileHeader uid={profileData?.player?.uid || uid || ''} />
          </div>

          <div className="bg-white border-2 md:border-4 border-black p-4 md:p-8 relative pt-12 md:pt-16 space-y-6 overflow-visible">
            <ProfileNavigation
              activeTab={activeTab}
              onTabChange={setActiveTab}
              onRefresh={handleRefresh}
              refreshDisabled={refreshDisabled}
              refreshing={refreshing}
            />

            {activeTab === "info" && (
              <ProfileInfoTab profileData={profileData} />
            )}

            {activeTab === "characters" && (
              <div className="relative">
                <CharacterTab characters={characters} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}