"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

type FormValues = z.infer<typeof formSchema>;

function SignInForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleSubmit(values: FormValues) {
    setLoading(true);

    const { error } = await authClient.signIn.email({
      email: values.email,
      password: values.password,
    });

    if (error?.code === "EMAIL_NOT_VERIFIED") {
      toast.error("Please verify your email address before logging in", {
        duration: 9000,
        position: "top-center",
      });
      console.log(error);
      return;
    } else if (error?.code === "INVALID_EMAIL_OR_PASSWORD") {
      toast.error("Invalid email or password", {
        duration: 9000,
        position: "top-center",
      });
      console.log(error);
      return;
    } else if (error) {
      toast.error("There was an error signing you in");
      console.log(error);
      return;
    }

    setLoading(false);
    router.push("/create-property");
  }
  return (
    <div>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FieldGroup>
          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input {...field} id={field.name} autoComplete="name" />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]}></FieldError>
                )}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="password"
                  autoComplete="current-password"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]}></FieldError>
                )}
              </Field>
            )}
          />
          <Button type="submit" disabled={loading}>
            {loading && (
              <>
                <Spinner />
                <span className="sr-only">Signing In</span>{" "}
              </>
            )}
            Sign In
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}

export { SignInForm };
