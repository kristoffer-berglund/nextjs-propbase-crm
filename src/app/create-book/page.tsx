import { auth } from "@/lib/auth";
import CreateBookForm from "./_components/CreateBook";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function CreateNewBookPage() {
  // const session = await auth.api.getSession({ headers: await headers() });

  // if (!session) {
  //   redirect("/sign-in");
  // }

  return (
    <div className="w-full md:w-xl mx-auto">
      <h1 className="text-2xl font-bold pb-4">Create a new book</h1>
      <CreateBookForm />
    </div>
  );
}
