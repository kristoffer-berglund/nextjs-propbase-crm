import prisma from "@/lib/prisma";
import EditPropertyForm from "./_components/UpdateBook";
import { notFound } from "next/navigation";

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ propertyId: string }>;
}) {
  const { propertyId } = await params;

  const property = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
  });

  if (!property) {
    notFound();
  }

  return (
    <div className="w-full md:w-xl mx-auto">
      <h1 className="text-2xl font-extrabold pb-4">Edit property</h1>

      <EditPropertyForm property={property} />
    </div>
  );
}
