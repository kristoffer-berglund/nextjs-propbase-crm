"use server";

import prisma from "@/lib/prisma";

export default async function deletePropertyAction({
  propertyId,
}: {
  propertyId: string;
}) {
  try {
    const property = await prisma.property.delete({
      where: {
        id: propertyId,
      },
    });
    return { success: true, property };
  } catch (error) {
    console.log(error);

    return {
      success: false,
    };
  }
}
