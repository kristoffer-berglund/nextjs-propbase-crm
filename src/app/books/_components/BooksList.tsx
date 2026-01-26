import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Book } from "@/schemas/book";
import Link from "next/link";

export default async function BookList({ books }: { books: Book[] }) {
  console.log(books);

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
      {books.map((book) => (
        <Card key={book.id}>
          <CardHeader>
            <CardTitle>
              <Link href={`/books/${book.id}`}>{book.title}</Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs">
              <ul className="flex flex-wrap">
                <li className="flex-1">
                  <p className="pb-1 text-muted-foreground uppercase">Author</p>
                  <p className="pb-3">{book.author}</p>
                </li>
                <li className="flex-1">
                  <p className="pb-1 text-muted-foreground uppercase">
                    Published
                  </p>
                  <p className="pb-3">
                    {book.published.toLocaleDateString("sv-SE")}
                  </p>
                </li>
                <li className="w-full">
                  <p className="text-muted-foreground uppercase">ISBN</p>
                  <p>{book.isbn}</p>
                </li>
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" aria-label="View Book" asChild>
              <Link href={`/books/${book.id}`}>View</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
