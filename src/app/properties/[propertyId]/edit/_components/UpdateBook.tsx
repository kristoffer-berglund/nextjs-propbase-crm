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
import updatePropertyAction from "../_actions/update-property";
import { PropertyFormValues, propertySchema } from "@/schemas/property";

type Property = {
  id: string;
  address: string;
  agent: string;
  price: number;
  listingNumber?: string | null;
  description?: string | null;
};

export default function EditPropertyForm({ property }: { property: Property }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      id: property.id,
      address: property.address,
      agent: property.agent,
      price: Number(property.price),
      listingNumber: property.listingNumber ?? undefined,
      description: property.description ?? undefined,
    },
  });

  async function onSubmit(formData: PropertyFormValues) {
    setLoading(true);

    const validate = propertySchema.safeParse(formData);

    if (!validate.success) {
      toast.error("Property could not be updated", { position: "top-center" });
      setLoading(false);
      return validate.error;
    }

    const result = await updatePropertyAction({
      ...formData,
      price: Number(formData.price),
    });

    if (result?.success) {
      toast.success("Property updated", { position: "top-center" });
      router.push(`/properties/${result.property.id}`);
    } else {
      toast.error("Property could not be updated", { position: "top-center" });
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
                type="number"
                id="form-price"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="listingNumber"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-listingNumber">
                Listing Number
              </FieldLabel>
              <Input
                {...field}
                name="listingNumber"
                id="form-listingNumber"
                aria-invalid={fieldState.invalid}
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
