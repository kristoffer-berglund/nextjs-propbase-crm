"use server";

import prisma from "@/lib/prisma";
import { PropertyFormValues } from "@/schemas/property";

export default async function updatePropertyAction(
  formData: PropertyFormValues,
) {
  try {
    const result = await prisma.property.update({
      where: {
        id: formData.id,
      },
      data: {
        address: formData.address,
        agent: formData.agent,
        price: Number(formData.price),
        description: formData.description ?? null,
        listingNumber: formData.listingNumber ?? null,
      },
    });
    return {
      success: true,
      property: result,
    };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}
