import prisma from "@/database/client";

/**
 * Get a user by ID
 */
export async function getUserById(userId: string) {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}