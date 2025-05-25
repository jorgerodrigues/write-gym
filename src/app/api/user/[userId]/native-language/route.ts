import { userSettings } from "@/features/user-settings";

type RequestBody = {
  languageCode: string;
};
type Params = { userId: string };

/**
 * Update a user's native language
 * This endpoint updates the user's native language .
 */
export async function PUT(
  req: Request,
  { params }: { params: Promise<Params> }
) {
  try {
    const { userId } = await params;
    // Parse and validate request body
    const body = await req.json();

    const { languageCode } = body as Partial<RequestBody>;
    const user = await userSettings.getUserById(userId);
    const langValidation = userSettings.validateLanguageCode(languageCode);

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

    if (!langValidation.success || !languageCode) {
      return new Response(
        JSON.stringify({
          data: null,
          error: "invalid-request",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    await userSettings.updateNativeLanguage(userId, languageCode);

    return new Response(
      JSON.stringify({
        data: {
          userId: user.id,
          languageCode: languageCode,
        },
        error: null,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error setting native language:", error);

    if (error instanceof Error) {
      return new Response(
        JSON.stringify({ data: null, error: error.message }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

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
