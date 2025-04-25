import { generateCardsForUser } from "@/lib/cards/generateCardsForUser";

export async function POST(request: Request) {
  // get userId and language from request body
  const body = await request.json();
  const { userId, language } = body as { userId: string; language: string };

  if (!userId || !language) {
    return new Response("missing-required-args", { status: 400 });
  }

  try {
    const object = await generateCardsForUser(userId, language);

    return new Response(JSON.stringify(object), {
      status: 200, // Or any other appropriate status code
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
