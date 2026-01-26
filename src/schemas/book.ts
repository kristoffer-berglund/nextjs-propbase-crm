import z from "zod";

export type Book = {
  id: string;
  title: string;
  author: string;
  published: Date;
  isbn: string;
};

export const bookSchema = z.object({
  id: z.string().min(1).max(64).optional(),
  title: z
    .string("Field cannot be empty")
    .min(1, "Field cannot be empty")
    .max(64, {
      error: () => {
        return "Too long, max 64 characters";
      },
    }),
  author: z
    .string("Field cannot be empty")
    .min(1, "Field cannot be empty")
    .max(32, { error: () => "Too long, max 32 characters" }),
  published: z.string("Date cannot be empty"),
  isbn: z
    .string("Must be 13 characters long")
    .min(10, {
      error: () => {
        return "Too short, must be at least 10 characters";
      },
    })
    .max(17, {
      error: () => {
        return "Too long, max 17 characters";
      },
    })
    .regex(/^[\d-xX]+$/, {
      message: "Only numbers and hyphens allowed",
    })
    .trim(),
});

export type BookFormValues = z.infer<typeof bookSchema>;
