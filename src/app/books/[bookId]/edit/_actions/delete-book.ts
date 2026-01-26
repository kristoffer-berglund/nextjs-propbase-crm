"use server";

import prisma from "@/lib/prisma";

export default async function deleteBookAction({ bookId }: { bookId: string }) {
  try {
    const book = await prisma.book.delete({
      where: {
        id: bookId,
      },
    });
    return { success: true, book };
  } catch (error) {
    console.log(error);

    return {
      success: false,
    };
  }
}
