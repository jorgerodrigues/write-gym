import { getOnboardingStatus } from "./services/getOnboardingStatus";
import { markOnboardingComplete } from "./services/markOnboardingAsComplete";

export const onboarding = {
  getOnboardingStatus,
  markOnboardingComplete,
};
