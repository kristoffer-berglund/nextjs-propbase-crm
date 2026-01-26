"use server";
import prisma from "@/lib/prisma";
import { BookFormValues, bookSchema } from "@/schemas/book";

export default async function createBookAction(formData: BookFormValues) {
  const validate = bookSchema.safeParse(formData);

  if (!validate.success) {
    return { success: false };
  }

  const validatedData = validate.data;

  try {
    const book = await prisma.book.create({
      data: {
        // id: validatedData.id,
        title: validatedData.title,
        author: validatedData.author,
        published: new Date(validatedData.published),
        isbn: validatedData.isbn,
      },
    });

    return {
      success: true,
      book,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Book could not be saved to database",
    };
  }
}
