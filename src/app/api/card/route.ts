import { CARD_TYPES } from "@/constants/cards";
import prisma from "@/database/client";

export async function GET(request: Request) {
  try {
    const userId = request.headers.get("userId") || "";
    const skip = parseInt(request.headers.get("skip") || "0");

    if (!userId) {
      return new Response("User ID is required", { status: 400 });
    }

    const cards = await getLatestSentenceCards({
      userId,
      skip,
    });

    return new Response(JSON.stringify(cards), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(
        `Failed to fetch latest sentence cards: ${error.message}`,
        { status: 500 }
      );
    }
    return new Response("Failed to fetch latest sentence cards", {
      status: 500,
    });
  }
}

const getLatestSentenceCards = async ({
  userId,
  skip,
}: {
  userId: string;
  skip?: number;
}) => {
  try {
    const cards = await prisma.card.findMany({
      where: {
        userId,
        type: CARD_TYPES.SENTENCE,
      },
      include: {
        sentence: {
          include: {
            words: true,
          },
        },
      },
      orderBy: {
        nextDueDate: "asc",
      },
      take: 5,
      skip,
    });
    return cards;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch latest sentence cards");
  }
};
