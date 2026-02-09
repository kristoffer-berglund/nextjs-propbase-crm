import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="sticky bg-stone-900">
      <ul className="sm:flex gap-7 p-4 items-center">
        <li>
          <Link href="/" className="font-medium">
            <h1 className="font-bold text-xl mr-3">PropBase</h1>
          </Link>
        </li>
        <li>
          <Link href="/" className="font-medium">
            Home
          </Link>
        </li>
        <li>
          <Link href="/properties/" className="font-medium">
            Properties
          </Link>
        </li>
        <li>
          <Link href="/create-property/" className="font-medium">
            Create New Property
          </Link>
        </li>
      </ul>
    </nav>
  );
}
