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
import { PropertyFormValues, propertySchema } from "@/schemas/property";
import createPropertyAction from "../_actions/create-property";

export default function CreatePropertyForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
  });

  async function onSubmit(formData: PropertyFormValues) {
    setLoading(true);

    const validate = propertySchema.safeParse(formData);

    if (!validate.success) {
      toast.error("Property could not be created", { position: "top-center" });
      setLoading(false);
      return validate.error;
    }
    const result = await createPropertyAction({
      ...formData,
      price: Number(formData.price),
    });

    if (result?.success) {
      toast.success("Property created", { position: "top-center" });
      router.push("/properties");
    } else {
      toast.error("Property could not be created", { position: "top-center" });
    }
    setLoading(false);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="address"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-address">Address</FieldLabel>
              <Input
                {...field}
                name="address"
                id="form-address"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="agent"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-agent">Agent</FieldLabel>
              <Input
                {...field}
                name="agent"
                id="form-agent"
                aria-invalid={fieldState.invalid}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="price"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-price">Price</FieldLabel>
              <Input
                {...field}
                name="price"
                id="form-price"
                aria-invalid={fieldState.invalid}
                type="number"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-description">Description</FieldLabel>
              <Input
                {...field}
                name="description"
                id="form-description"
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
