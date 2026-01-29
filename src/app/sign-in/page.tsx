import { auth } from "@/lib/auth";
import { SignInForm } from "./_components/SignInForm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/create-book");
  }

  return (
    <div className="w-full md:w-xl mx-auto">
      <h1 className="font-extrabold pb-4 text-2xl">Sign In</h1>
      <SignInForm />
    </div>
  );
}
