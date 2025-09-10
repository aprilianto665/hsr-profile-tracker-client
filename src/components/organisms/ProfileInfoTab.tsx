import type { ProfileData } from "../../types";
import { InfoCard, InfoRow } from "../molecules";

interface ProfileInfoTabProps {
  profileData: ProfileData;
}

export function ProfileInfoTab({ profileData }: ProfileInfoTabProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 min-[980px]:grid-cols-4 gap-6">
      <InfoCard title="AVATAR" className="flex flex-col">
        <div className="flex flex-col items-center justify-center space-y-3 flex-1">
          <img
            src={profileData?.player?.avatar?.icon || ''}
            alt={profileData?.player?.avatar?.name || 'Avatar'}
            className="w-32 h-32 object-cover"
          />
          <div className="text-center">
            <div className="font-mono text-sm">
              {profileData?.player?.avatar?.name || 'Unknown'}
            </div>
          </div>
        </div>
      </InfoCard>

      <InfoCard title="BASIC INFO" className="md:col-span-1 min-[980px]:col-span-2">
        <div className="space-y-3">
          <InfoRow label="NICKNAME" value={profileData?.player?.nickname || 'Unknown'} />
          <InfoRow label="LEVEL" value={profileData?.player?.level || 0} />
          <InfoRow label="WORLD LEVEL" value={profileData?.player?.world_level || 0} />
          <InfoRow label="FRIENDS" value={profileData?.player?.friend_count || 0} />
          <InfoRow label="SIGNATURE" value={profileData?.player?.signature || 'No signature'} />
        </div>
      </InfoCard>

      <InfoCard title="SPACE INFO">
        <div className="space-y-3">
          <InfoRow label="UNIVERSE LEVEL" value={profileData?.player?.space_info?.universe_level || 0} />
          <InfoRow label="AVATARS" value={profileData?.player?.space_info?.avatar_count || 0} />
          <InfoRow label="LIGHT CONES" value={profileData?.player?.space_info?.light_cone_count || 0} />
          <InfoRow label="RELICS" value={profileData?.player?.space_info?.relic_count || 0} />
          <InfoRow label="ACHIEVEMENTS" value={profileData?.player?.space_info?.achievement_count || 0} />
          <InfoRow label="BOOKS" value={profileData?.player?.space_info?.book_count || 0} />
          <InfoRow label="MUSIC" value={profileData?.player?.space_info?.music_count || 0} />
        </div>
      </InfoCard>
    </div>
  );
}