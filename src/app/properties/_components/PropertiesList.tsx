import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Property } from "@/schemas/property";
import Link from "next/link";

export default async function PropertyList({
  properties,
}: {
  properties: Property[];
}) {
  console.log(properties);

  return (
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
                  <p className="pb-1 text-muted-foreground uppercase">Agent</p>
                  <p className="pb-3">{property.agent}</p>
                </li>
                <li className="flex-1">
                  <p className="pb-1 text-muted-foreground uppercase">Price</p>
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
  );
}
