import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface OnboardingRedirectProps {
  userInfoReceived: boolean;
  onboardingCompleted: boolean;
  loading: boolean;
}

export const useOnboardingRedirect = ({
  userInfoReceived,
  onboardingCompleted,
  loading,
}: OnboardingRedirectProps) => {
  const router = useRouter();

  useEffect(() => {
    if (userInfoReceived && !onboardingCompleted && !loading) {
      router.push("/onboarding");
    }
  }, [router, userInfoReceived, onboardingCompleted, loading]);
};
