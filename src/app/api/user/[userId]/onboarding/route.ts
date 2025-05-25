import { onboarding } from "@/features/onboarding";
import { userSettings } from "@/features/user-settings";

type Params = {
  userId: string;
};

export async function POST(
  _: Request,
  { params }: { params: Promise<Params> }
) {
  try {
    const { userId } = await params;

    const user = await userSettings.getUserById(userId);

    if (!user) {
      return new Response(
        JSON.stringify({ data: null, error: "user-not-found" }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const res = await onboarding.markOnboardingComplete({ userId });

    if (res.error) {
      return new Response(JSON.stringify({ data: null, error: res.error }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new Response(
      JSON.stringify({ data: { isCompleted: true }, error: null }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch {
    return new Response(
      JSON.stringify({ data: null, error: "internal-server-error" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
