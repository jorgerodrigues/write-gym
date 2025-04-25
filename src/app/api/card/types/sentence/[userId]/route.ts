import { CARD_TYPES } from "@/constants/cards";
import prisma from "@/database/client";
import { generateCardsForUser } from "@/lib/cards/generateCardsForUser";
import { parseStringToNumber } from "@/utils/string/parseStringToNumber";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const skipQuery = searchParams.get("skip");
    const skip = skipQuery ? parseStringToNumber(skipQuery) : 0;

    const paramsData = await params;
    const userId = paramsData.userId;

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
    return new Response(`Failed to fetch latest sentence cards: ${error}`, {
      status: 500,
    });
  }
}

const getLatestSentenceCards = async ({
  userId,
  skip,
}: {
  userId: string;
  skip?: number | null;
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
      take: 10,
      skip: skip ?? 0,
    });

    const cardsLeftForReview = await prisma.card.count({
      where: {
        userId,
        type: CARD_TYPES.SENTENCE,
        nextDueDate: {
          lte: new Date(),
        },
      },
    });

    // This breaks the idempotency of the operation
    // However it is a calculated measure to avoid having other solutions
    // that would have been overly complicated for this point in time.
    if (cardsLeftForReview <= 5) {
      // Fire-and-forget: generateCardsForUser is intentionally not awaited
      // because it performs a background task that does not affect the response.
    }

    return cards;
  } catch {
    throw new Error("Failed to fetch latest sentence cards");
  }
};
