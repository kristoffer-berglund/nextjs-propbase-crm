"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Grid2X2, Table } from "lucide-react";

export default function ToggleDisplay() {
  return (
    <nav>
      <ToggleGroup variant="outline" type="single" defaultValue="grid">
        <ToggleGroupItem value="grid" aria-label="Toggle Grid">
          <Grid2X2 />
          Grid
        </ToggleGroupItem>
        <ToggleGroupItem value="list" aria-label="Toggle Table">
          <Table />
          Table
        </ToggleGroupItem>
      </ToggleGroup>
    </nav>
  );
}
