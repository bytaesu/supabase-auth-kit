"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { resetPasswordAction } from "@/actions/reset-password";
import { resetPasswordFormSchema } from "@/lib/validation-schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AUTH_ROUTES } from "@/lib/supabase/auth-config";

/**
 * ResetPasswordForm Component
 * A form for users to reset their password by entering and confirming their new password.
 * Includes form validation and submission handling.
 */
const ResetPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof resetPasswordFormSchema>>({
    resolver: zodResolver(resetPasswordFormSchema),
    reValidateMode: "onSubmit",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  /**
   * Handles form submission.
   * - Submits the new password and, upon success, navigates the user to the private home page.
   */
  const onSubmit = async (
    formData: z.infer<typeof resetPasswordFormSchema>
  ) => {
    setIsLoading(true);

    const { error } = await resetPasswordAction(formData.confirmPassword);

    if (error) {
      setIsLoading(false);
      toast.error(error);
      return;
    }

    toast.success("Successfully changed your password.");
    router.replace(AUTH_ROUTES.Private.PrivateHome);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <FormField
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input id="password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input id="confirmPassword" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mt-6">
          <Button
            variant={"blue"}
            isLoading={isLoading}
            type="submit"
            className="w-full"
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
