import prisma from "@/lib/prisma";
import EditBookForm from "./_components/UpdateBook";
import { notFound } from "next/navigation";

export default async function EditBookPage({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const { bookId } = await params;

  const book = await prisma.book.findUnique({
    where: {
      id: bookId,
    },
  });

  // try {
  //   const book = await prisma.book.findUnique({
  //     where: {
  //       id: bookId,
  //     },
  //   });

  //   return {
  //     success: true,
  //   };
  // } catch (error) {
  //   console.log(error);
  //   return { success: false };
  // }

  if (!book) {
    notFound();
  }

  return (
    <div className="w-full md:w-xl mx-auto">
      <h1 className="text-2xl font-extrabold pb-4">Edit book</h1>

      <EditBookForm book={book} />
    </div>
  );
}
