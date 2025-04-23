import { CARD_TYPES } from "@/constants/cards";
import prisma from "@/database/client";
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
      take: 5,
      skip: skip ?? 0,
    });
    return cards;
  } catch {
    throw new Error("Failed to fetch latest sentence cards");
  }
};
