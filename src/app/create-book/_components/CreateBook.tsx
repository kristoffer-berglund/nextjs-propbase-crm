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
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import { BookFormValues, bookSchema } from "@/schemas/book";
import createBookAction from "../_actions/create-book";

export default function CreateBookForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<BookFormValues>({
    resolver: zodResolver(bookSchema),
  });

  async function onSubmit(formData: BookFormValues) {
    setLoading(true);

    const validate = bookSchema.safeParse(formData);

    if (!validate.success) {
      toast.error("Book could not be created", { position: "top-center" });
      return validate.error;
    } else {
      const result = await createBookAction(formData);

      if (result?.success && result?.book?.id) {
        console.log(result);
        toast.success("Book created successfully!", {
          position: "top-center",
        });
        router.push(`/books/${result?.book?.id}`);
      } else {
        toast.error("Could not redirect to URL: Missing ID");
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
                id="form-published"
                aria-invalid={fieldState.invalid}
                type="date"
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
          arial-label="Submit"
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
