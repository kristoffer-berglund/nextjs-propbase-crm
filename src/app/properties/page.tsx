import { Button } from "@/components/ui/button";
import ToggleDisplay from "./_components/Display";
import PropertyList from "./_components/PropertiesList";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus } from "lucide-react";
import { notFound } from "next/navigation";

export default async function PropertyPage() {
  const properties = await prisma.property.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!properties) {
    notFound();
  }

  return (
    <div className="w-full md:w-4xl md:px-0 xl:w-7xl mx-auto">
      <h1 className="text-2xl font-extrabold">Properties</h1>
      <ul className="flex gap-5 py-4">
        <li>
          <ToggleDisplay />
        </li>
        <li>
          <Button variant="outline" asChild>
            <Link href="/create-property/">
              <Plus /> Create New Property
            </Link>
          </Button>
        </li>
      </ul>
      <PropertyList properties={properties} />
    </div>
  );
}
