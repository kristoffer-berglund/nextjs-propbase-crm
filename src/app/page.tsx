import { NavSearch } from "./_components/NavSearch";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-neutral-950">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-neutral-950 sm:items-start">
        <div className="w-xl text-center">
          <h1 className="font-bold text-4xl mb-10">Find your dream home</h1>
          <NavSearch />
        </div>
      </main>
    </div>
  );
}
