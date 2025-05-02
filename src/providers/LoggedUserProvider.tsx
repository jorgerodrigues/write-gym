"use client";

import { BasicUserInfo } from "@/features/profile/types";
import { apiFetcher } from "@/lib/api/apiFetcher";
import { APIReturnType } from "@/types/api/apiReturnType";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useMemo } from "react";

type UserContext = {
  id: string;
  email: string;
  firstName: string | null | undefined;
  lastName: string | null | undefined;
  practicingLanguages: Array<string>;
  activeSubscription?: boolean;
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
  const { data: userInfo, isLoading } = useQuery({
    enabled: Boolean(userId),
    staleTime: 30 * 1000,
    queryKey: ["userBasicInfo", userId],
    queryFn: async () =>
      await apiFetcher<APIReturnType<BasicUserInfo>>(
        `/api/user/${userId}/info`
      ),
  });

  const stateValue = useMemo(() => {
    if (!userInfo?.data) {
      return {
        user: {
          id: "",
          email: "",
          firstName: "",
          lastName: "",
          practicingLanguages: [],
          activeSubscription: true,
        },
        loading: isLoading,
      };
    }

    const user = userInfo.data;

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        practicingLanguages: [],
        activeSubscription: true,
      },
      loading: isLoading,
    };
  }, [userInfo, isLoading]);

  return (
    <LoggedUserContext.Provider value={stateValue}>
      {children}
    </LoggedUserContext.Provider>
  );
};

/**
 * This hook is used to access the current user and its settings such as email, language, companies, etc.
 * @returns User object containing id, email, language, companies.
 * @returns loading: a state that determines whether the info provided by the hook is ready for use. Use it for showing loading states in the ui
 * */
export const useUser = () => useContext(LoggedUserContext);
