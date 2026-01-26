"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import updateBookAction from "../_actions/update-book";
import { BookFormValues, bookSchema } from "@/schemas/book";

type Book = {
  id: string;
  title: string;
  author: string;
  published: Date;
  isbn: string;
};

export default function EditBookForm({ book }: { book: Book }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<BookFormValues>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      id: book.id,
      title: book.title,
      author: book.author,
      published: book.published.toLocaleDateString("sv-SE"),
      isbn: book.isbn,
    },
  });

  async function onSubmit(formData: BookFormValues) {
    setLoading(true);

    const validate = bookSchema.safeParse(formData);

    if (!validate.success) {
      toast.error("Book could not be updated", { position: "top-center" });
      return validate.error;
    } else {
      const result = await updateBookAction(formData);
      console.log(result);

      if (result?.success && result?.result?.id) {
        toast.success("Book updated successfully", { position: "top-center" });
        router.push(`/books/${result?.result?.id}`);
      } else {
        toast.error("Book could not be updated", { position: "top-center" });
      }
    }
    setLoading(false);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-title">Title</FieldLabel>
              <Input
                {...field}
                name="title"
                id="form-title"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="author"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-author">Author</FieldLabel>
              <Input
                {...field}
                name="author"
                id="form-author"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="published"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-published">Published</FieldLabel>
              <Input
                {...field}
                name="published"
                type="date"
                id="form-published"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="isbn"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-isbn">ISBN</FieldLabel>
              <Input
                {...field}
                name="isbn"
                id="form-isbn"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button
          variant="outline"
          type="submit"
          disabled={loading}
          aria-label="Submit"
        >
          {loading && (
            <>
              <Spinner />
              <span className="sr-only">Loading...</span>
            </>
          )}
          Submit
        </Button>
      </FieldGroup>
    </form>
  );
}
