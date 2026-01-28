import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SignUpForm } from "./_components/SignUpForm";

export default async function SignUpPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/");
  }

  return (
    <div className="w-full md:w-xl mx-auto">
      <h1 className="text-2xl font-extrabold pb-4">Sign Up</h1>
      <SignUpForm />
    </div>
  );
}
