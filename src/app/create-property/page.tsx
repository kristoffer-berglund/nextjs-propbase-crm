import CreatePropertyForm from "./_components/CreateProperty";

export default async function CreateNewPropertyPage() {
  // const session = await auth.api.getSession({ headers: await headers() });

  // if (!session) {
  //   redirect("/sign-in");
  // }

  return (
    <div className="w-full md:w-xl mx-auto">
      <h1 className="text-2xl font-bold pb-4">Create a new property</h1>
      <CreatePropertyForm />
    </div>
  );
}
