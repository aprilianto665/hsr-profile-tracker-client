import { useState, useCallback } from "react";
import type { ProfileData } from "../types";

export function useProfileData(uid: string | undefined) {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshDisabled, setRefreshDisabled] = useState(false);

  const fetchProfile = useCallback(async (refresh = false) => {
    if (!uid) return;
    
    try {
      if (refresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      
      const url = refresh 
        ? `${import.meta.env.VITE_API_BASE_URL}/profile/${uid}?refresh=true` 
        : `${import.meta.env.VITE_API_BASE_URL}/profile/${uid}`;
      
      const response = await fetch(url);
      const result = await response.json();
        
      if (result.status === 'success') {
        setProfileData(result.data);
      } else {
        setError(result.message || 'Failed to fetch profile');
      }
    } catch {
      setError('Failed to fetch profile data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [uid]);

  const handleRefresh = async () => {
    if (refreshDisabled) return;
    
    setRefreshDisabled(true);
    await fetchProfile(true);
    
    setTimeout(() => {
      setRefreshDisabled(false);
    }, 10000);
  };

  return {
    profileData,
    loading,
    error,
    refreshing,
    refreshDisabled,
    fetchProfile,
    handleRefresh
  };
}