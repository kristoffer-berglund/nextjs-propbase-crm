"use server";
import prisma from "@/lib/prisma";
import { propertySchema } from "@/schemas/property";

type CreatePropertyInput = {
  address: string;
  agent: string;
  price: number | string;
  description?: string | null;
  listingNumber?: string | null;
};

export default async function createPropertyAction(data: CreatePropertyInput) {
  const parsed = propertySchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error };
  }
  const payload = parsed.data;
  const created = await prisma.property.create({
    data: {
      address: payload.address,
      agent: payload.agent,
      price: Number(payload.price),
      description: payload.description ?? null,
      listingNumber: payload.listingNumber ?? null,
    },
  });
  return { success: true, property: created };
}
