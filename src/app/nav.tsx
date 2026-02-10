import { auth } from "@/lib/auth";
import { UserRound } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import SignInOutButton from "./_components/SignInOutButton";
import { NavSearch } from "./_components/NavSearch";

export default async function NavBar() {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <nav className="sticky bg-stone-900">
      <ul className="sm:flex gap-7 p-4 items-center w-full">
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
        <li className="ml-auto flex gap-2 items-center">
          <NavSearch />
        </li>
        {session && (
          <>
            <li>
              <Link href="/create-property/" className="font-medium">
                Create New Property
              </Link>
            </li>
            <li className="font-medium flex gap-2 items-center">
              <UserRound size="18" />
              {session.user.name}
            </li>
          </>
        )}
        <li className="font-medium flex gap-2 items-center">
          <SignInOutButton />
        </li>
      </ul>
    </nav>
  );
}
