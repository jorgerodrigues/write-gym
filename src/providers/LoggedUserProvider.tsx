"use client";

import { BasicUserInfo } from "@/features/profile/types";
import { apiFetcher } from "@/lib/api/apiFetcher";
import { APIReturnType } from "@/types/api/apiReturnType";
import { LanguagePreferenceResponse } from "@/features/user-settings/types";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useOnboardingRedirect } from "@/hooks/useOnboardingRedirect";

type UserContext = {
  id: string;
  email: string;
  firstName: string | null | undefined;
  lastName: string | null | undefined;
  practicingLanguages: Array<string>;
  activeSubscription?: boolean;
  language?: string | null;
  nativeLanguage?: string;
};

type LoggedUserProviderState = {
  user: UserContext;
  loading: boolean;
};

export const LoggedUserContext = createContext<LoggedUserProviderState>({
  user: {
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    practicingLanguages: [],
    activeSubscription: true,
    language: null,
    nativeLanguage: "en",
  },
  loading: true,
});

interface LoggedUserProviderProps {
  userId: string;
  children?: React.ReactNode;
}

export const LoggedUserProvider: React.FC<LoggedUserProviderProps> = ({
  userId,
  children,
}) => {
  const router = useRouter();
  const { data: userInfo, isLoading: isLoadingUserInfo } = useQuery({
    enabled: Boolean(userId),
    staleTime: 30 * 1000,
    queryKey: ["userBasicInfo", userId],
    queryFn: async () =>
      await apiFetcher<APIReturnType<BasicUserInfo>>(
        `/api/user/${userId}/info`
      ),
  });

  const { data: languagePreference, isLoading: isLoadingLanguage } = useQuery({
    enabled: Boolean(userId),
    staleTime: 30 * 1000,
    queryKey: ["userLanguagePreference", userId],
    queryFn: async () =>
      await apiFetcher<APIReturnType<LanguagePreferenceResponse>>(
        `/api/user/${userId}/language-preference`
      ),
  });

  const stateValue = useMemo(() => {
    const isLoading = isLoadingUserInfo || isLoadingLanguage;

    if (!userInfo?.data) {
      return {
        user: {
          id: "",
          email: "",
          firstName: "",
          lastName: "",
          practicingLanguages: [],
          activeSubscription: true,
          language: null,
          nativeLanguage: "en",
          onboardingCompleted: false,
        },
        loading: isLoading,
      };
    }

    const user = userInfo.data;
    const language = languagePreference?.data?.languageCode || null;

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        practicingLanguages: [],
        activeSubscription: true,
        language,
        nativeLanguage: user.nativeLanguage || "en",
        onboardingCompleted: user.onboardingCompleted,
      },
      loading: isLoading,
    };
  }, [userInfo, languagePreference, isLoadingUserInfo, isLoadingLanguage]);

  useOnboardingRedirect({
    userInfoReceived: Boolean(userInfo?.data),
    onboardingCompleted: stateValue.user.onboardingCompleted,
    loading: stateValue.loading,
  });

  return (
    <LoggedUserContext.Provider value={stateValue}>
      {children}
    </LoggedUserContext.Provider>
  );
};

/**
 * This hook is used to access the current user and its settings such as email, language, etc.
 * @returns User object containing id, email, language, etc.
 * @returns loading: a state that determines whether the info provided by the hook is ready for use. Use it for showing loading states in the ui
 * */
export const useUser = () => useContext(LoggedUserContext);
