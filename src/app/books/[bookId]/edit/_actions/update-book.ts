"use server";

import prisma from "@/lib/prisma";
import { BookFormValues } from "@/schemas/book";

export default async function updateBookAction(formData: BookFormValues) {
  try {
    const result = await prisma.book.update({
      where: {
        id: formData.id,
      },
      data: {
        title: formData.title,
        author: formData.author,
        published: new Date(formData.published),
        isbn: formData.isbn,
      },
    });
    return {
      success: true,
      result,
    };
  } catch (error) {
    console.log(error);
  }
}
