import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="sticky bg-stone-900">
      <ul className="sm:flex gap-5 p-4">
        <li>
          <Link href="/" className="font-medium">
            Home
          </Link>
        </li>
        <li>
          <Link href="/books/" className="font-medium">
            Books
          </Link>
        </li>
        <li>
          <Link href="/create-book/" className="font-medium">
            Create New Book
          </Link>
        </li>
      </ul>
    </nav>
  );
}
