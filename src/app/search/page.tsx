"use server";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { NavSearch } from "../_components/NavSearch";

export default async function SearchPage(props: PageProps<"/search">) {
  const searchParams = await props.searchParams;
  const query = Array.isArray(searchParams.q)
    ? searchParams.q[0]
    : searchParams.q;

  const properties = await prisma.property.findMany({
    where: query
      ? {
          OR: [
            { address: { contains: query, mode: "insensitive" } },
            { agent: { contains: query, mode: "insensitive" } },
          ],
        }
      : undefined,
  });

  return (
    <div className="w-full md:w-4xl md:px-0 xl:w-7xl mx-auto">
      <h1 className="text-2xl font-bold">Search</h1>

      <div className="py-4 w-full sm:w-lg">
        <NavSearch />
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
        {properties.map((property) => (
          <Card key={property.id}>
            <CardHeader>
              <CardTitle>
                <Link href={`/properties/${property.id}`}>
                  {property.address}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs">
                <ul className="flex flex-wrap">
                  <li className="flex-1">
                    <p className="pb-1 text-muted-foreground uppercase">
                      Agent
                    </p>
                    <p className="pb-3">{property.agent}</p>
                  </li>
                  <li className="flex-1">
                    <p className="pb-1 text-muted-foreground uppercase">
                      Price
                    </p>
                    <p className="pb-3">
                      {Number(property.price).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </p>
                  </li>
                  <li className="w-full">
                    <p className="text-muted-foreground uppercase">Listing</p>
                    <p>{property.listingNumber}</p>
                  </li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" aria-label="View Property" asChild>
                <Link href={`/properties/${property.id}`}>View</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
