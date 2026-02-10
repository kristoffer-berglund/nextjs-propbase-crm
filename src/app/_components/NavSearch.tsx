"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Form from "next/form";
import { usePathname, useSearchParams } from "next/navigation";

export function NavSearch() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = pathname === "/search" ? searchParams.get("q") : null;

  return (
    <div>
      <Form action="/search" className="flex gap-2">
        <Input
          type="search"
          defaultValue={query ?? ""}
          name="q"
          placeholder="E.g. '12 Oak Lane', 'Oak Heights'"
        />
        <Button size="icon" variant="outline">
          <Search />
        </Button>
      </Form>
    </div>
  );
}
