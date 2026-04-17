import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { useBackend } from "./useBackend";

export function useAuth() {
  const {
    identity,
    login,
    clear,
    isAuthenticated,
    isInitializing,
    loginStatus,
  } = useInternetIdentity();
  const { actor } = useBackend();

  const { data: currentUser, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["myProfile", identity?.getPrincipal().toText()],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyProfile();
    },
    enabled: !!actor && isAuthenticated,
    staleTime: 5 * 60 * 1000,
  });

  return {
    identity,
    isAuthenticated,
    isInitializing,
    loginStatus,
    currentUser: currentUser ?? null,
    isLoadingProfile,
    login,
    logout: clear,
  };
}
