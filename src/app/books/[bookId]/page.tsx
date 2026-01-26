import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import DeleteBookSubmit from "./edit/_components/DeleteBook";
import { ChevronLeft, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default async function BookDetails({
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

  if (!book) {
    notFound();
  }

  return (
    <div className="w-full md:w-xl mx-auto">
      <Button
        className="mb-4"
        variant="outline"
        aria-label="Back to Listing"
        asChild
      >
        <Link href="/books">
          <ChevronLeft /> Back to Listing
        </Link>
      </Button>
      <h1 className="text-2xl font-extrabold pb-4">{book.title}</h1>
      <Card>
        <CardContent>
          <p className="text-sm pb-1 text-muted-foreground uppercase">Author</p>
          <p className="pb-3">{book.author}</p>
          <p className="text-sm pb-1 text-muted-foreground uppercase">
            Published
          </p>
          <p className="pb-3">{book.published.toLocaleDateString("sv-SE")}</p>
          <p className="text-sm text-muted-foreground uppercase">ISBN</p>
          <p>{book.isbn}</p>
        </CardContent>
        <CardFooter>
          <Badge variant="secondary" className="text-muted-foreground">
            Created {book.createdAt.toLocaleDateString("sv-SE")}
          </Badge>
          <Badge variant="secondary" className="text-muted-foreground">
            Updated {book.updatedAt.toLocaleDateString("sv-SE")}
          </Badge>
        </CardFooter>
      </Card>

      <ul className="flex gap-2 py-4">
        <li>
          <Button variant="outline" aria-label="Edit Book" asChild>
            <Link href={`/books/${book.id}/edit/`}>
              <Pencil />
              Edit
            </Link>
          </Button>
        </li>
        <li>
          <DeleteBookSubmit bookId={book.id} />
        </li>
      </ul>
    </div>
  );
}
