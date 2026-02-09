import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import DeletePropertySubmit from "./edit/_components/DeleteBook";
import { ChevronLeft, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default async function PropertyDetails({
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
      <Button
        className="mb-4"
        variant="outline"
        aria-label="Back to Listings"
        asChild
      >
        <Link href="/properties">
          <ChevronLeft /> Back to Listings
        </Link>
      </Button>
      <Card>
        <CardContent>
          <h2 className="text-xl font-bold mb-3">{property.address}</h2>
          <p className="mb-3">{property.description}</p>
          <p className="text-muted-foreground">
            Asking price: ${property.price}
          </p>
        </CardContent>
        <CardFooter>
          <Badge>{property.agent}</Badge>
        </CardFooter>
      </Card>

      <ul className="flex gap-2 py-4">
        <li>
          <Button variant="outline" aria-label="Edit Property" asChild>
            <Link href={`/properties/${property.id}/edit/`}>
              <Pencil />
              Edit
            </Link>
          </Button>
        </li>
        <li>
          <DeletePropertySubmit
            aria-label="Delete Property"
            propertyId={property.id}
          />
        </li>
      </ul>
    </div>
  );
}
