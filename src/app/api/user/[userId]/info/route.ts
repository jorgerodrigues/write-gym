import { profile } from "@/features/profile";

type Params = {
  userId: string;
};

export const GET = async (
  req: Request,
  { params }: { params: Promise<Params> }
): Promise<Response> => {
  try {
    const awaitedParams = await params;
    const userId = awaitedParams.userId;

    const { data: userInfo, error } = await profile.getUserInfo({ userId });

    const response = {
      data: userInfo,
      error,
    };
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    if (e instanceof Error) {
      const response = {
        data: null,
        error: e.message,
      };
      return new Response(JSON.stringify(response), {
        status: 500,

        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    const response = {
      data: null,
      error: "unknown-error",
    };
    return new Response(JSON.stringify(response), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
