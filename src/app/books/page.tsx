import { Button } from "@/components/ui/button";
import BookToogle from "./_components/Display";
import BookList from "./_components/BooksList";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus } from "lucide-react";
import { notFound } from "next/navigation";

export default async function BookPage() {
  const books = await prisma.book.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!books) {
    notFound();
  }

  return (
    <div className="w-full md:w-4xl md:px-0 xl:w-7xl mx-auto">
      <h1 className="text-2xl font-extrabold">Books</h1>
      <ul className="flex gap-5 py-4">
        <li>
          <BookToogle />
        </li>
        <li>
          <Button variant="outline" asChild>
            <Link href="/create-book/">
              <Plus /> Create new Book
            </Link>
          </Button>
        </li>
      </ul>
      <BookList books={books} />
    </div>
  );
}
