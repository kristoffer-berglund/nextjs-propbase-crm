import z from "zod";

export const propertySchema = z.object({
  id: z.string().optional(),
  address: z.string().min(1, "Address is required"),
  agent: z.string().min(1, "Agent is required"),
  price: z.number().positive("Price must be positive"),
  description: z.string().optional(),
  listingNumber: z.string().optional(),
});

export type PropertyFormValues = z.infer<typeof propertySchema>;
